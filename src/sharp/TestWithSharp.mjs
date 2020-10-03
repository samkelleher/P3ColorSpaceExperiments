import sharp from 'sharp';
import Debug from 'debug';
import icc from 'icc';
import exifReader from 'exif-reader';

const debug = Debug('App:TestWithSharp');

export async function GetExif(exifBuffer) {
    return new Promise(resolve => {
        resolve(exifReader(exifBuffer));
    });
}

export default async function TestWithSharp({ imageStream, processExif = true, fileName }) {
    debug(`Starting ${fileName}`);
    const started = process.hrtime();

    const resizeResult = await sharp(imageStream)
        .resize(900, 900, {
            withoutEnlargement: true,
            fit: 'contain'
        })
        .withMetadata()
        .toFormat('jpeg')
        .toBuffer();

    const image = sharp(resizeResult);

    // try {
    //     image = sharp(imageStream);
    // } catch (ex) {
    //     console.log(ex);
    //     return;
    // }

    // imageStream.pipe(image);

    const metadata = await image.metadata();
    let iccProfile;
    let exifProfile;

    console.log(metadata);

    if (metadata.hasProfile && metadata.icc) {
        try {
            iccProfile = icc.parse(metadata.icc);
        } catch (exception) {
            console.log('ICC PROFILE PARSE ERROR:');
            console.log(exception);
        }
        console.log('ICC PROFILE:');
        console.log(iccProfile);
    }

    if (processExif && metadata.exif) {
        try {
            exifProfile = await GetExif(metadata.exif);
            console.log('GOT EXIF!!!');
            console.log(exifProfile);
        } catch (exception) {
            console.log('EXIF PARSE ERROR:');
            console.log(exception);
        }
    }

    let colorProfile = 'No Profile';

    if (metadata.hasProfile && metadata.icc) {
        if (iccProfile) {
            if (iccProfile.description) {
                colorProfile = iccProfile.description;
            } else if (iccProfile.cmm) {
                colorProfile = `${iccProfile.cmm} (Connection: ${iccProfile.connectionSpace})`;
            } else {
                colorProfile = 'Profile missing name';
            }
        } else {
            colorProfile = 'Profile did not parse.';
        }
    }

    let device = 'Unknown';

    if (exifProfile && exifProfile.image) {
        const deviceMake = exifProfile.image.Make;
        const deviceModel = exifProfile.image.Model;
        if (deviceMake && deviceModel) {
            device = `${deviceMake} ${deviceModel}`;
        }
    }

    debug(`Finished ${fileName}`);

    return {
        library: {
            metadata,
            iccProfile,
            exifProfile
        },
        width: metadata.width,
        height: metadata.height,
        colorProfile,
        colorSpaceName: metadata.space,
        device,
        libraryName: 'Sharp',
        count: process.hrtime(started)
    };
}
