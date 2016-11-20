import sharp from 'sharp';
import icc from 'icc';

export default async function TestWithSharp({ imageStream }) {
    const started = process.hrtime();
    const image = sharp(imageStream);

    // try {
    //     image = sharp(imageStream);
    // } catch (ex) {
    //     console.log(ex);
    //     return;
    // }

    //imageStream.pipe(image);

    const metadata = await image.metadata();
    let iccProfile;

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

    return {
        library: {
            metadata,
            iccProfile
        },
        width: metadata.width,
        height: metadata.height,
        colorProfile: metadata.hasProfile && metadata.icc ? (iccProfile ? (iccProfile.description || 'Profile missing name') : 'Profile did not parse.') : 'No Profile',
        colorSpaceName: metadata.space,
        device: 'Unknown',
        libraryName: 'Sharp',
        count: process.hrtime(started)
    };
}
