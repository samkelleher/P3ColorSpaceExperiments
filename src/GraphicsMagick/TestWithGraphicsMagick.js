import gm from './GraphicsMagic';

export default function ({ imageStream, originalFileName }) {
    const imageTransformer = gm(imageStream, originalFileName);

    imageTransformer.identify((error, value) => {
        if (error) {
            console.log(error);
        }
        if (value) {
            console.log(value);
        }
    });
}
