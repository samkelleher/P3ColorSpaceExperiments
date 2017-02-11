import gm from './GraphicsMagic';

export default async function TestWithGraphicsMagick({ imageStream, fileName }) {
    return new Promise((resolve, reject) => {
        const started = process.hrtime();
        const imageTransformer = gm(imageStream, fileName);

        imageTransformer.profile();

        imageTransformer.identify((error, value) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            console.log(value);

            const iccProfile = value.Profiles['Profile-icc'];

            const deviceMake = value.Properties['exif:Make'];
            const deviceModel = value.Properties['exif:Model'];
            const result = {
                library: {
                    metadata: value
                },
                width: value.size.width,
                height: value.size.height,
                colorProfile: iccProfile || 'No Profile',
                colorSpaceName: value.Colorspace,
                device: deviceMake && deviceModel ? `${value.Properties['exif:Make']} ${value.Properties['exif:Model']}` : 'Unknown',
                libraryName: 'GM',
                count: process.hrtime(started)
            };

            resolve(result);
        });
    });
}
