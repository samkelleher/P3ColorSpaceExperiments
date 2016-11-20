import gm from './GraphicsMagic';

export default function ({ imageStream, fileName }) {
    return new Promise((resolve, reject) => {
        const imageTransformer = gm(imageStream, fileName);

        imageTransformer.identify((error, value) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            console.log(value);

            const iccProfile = value.Profiles['Profile-icc'];

            const result = {
                library: {
                    metadata: value
                },
                width: value.size.width,
                height: value.size.height,
                colorProfile: iccProfile ? iccProfile : 'No Profile',
                colorSpaceName: value.Colorspace,
                device: `${value.Properties['exif:Make']} ${value.Properties['exif:Model']}`,
                libraryName: 'GM'
            };

            resolve(result);
        });
    });
}
