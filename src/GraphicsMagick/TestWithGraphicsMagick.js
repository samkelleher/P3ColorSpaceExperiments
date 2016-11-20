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
            resolve(value);
        });
    });
}
