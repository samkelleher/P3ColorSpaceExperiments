import gm from './GraphicsMagic';

export default function ({ imageStream, originalFileName }) {
    return new Promise((resolve, reject) => {
        const imageTransformer = gm(imageStream, originalFileName);

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
