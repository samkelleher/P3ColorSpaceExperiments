import sharp from 'sharp';

export default function TestWithSharp({ imageStream }) {
    let image = sharp();

    // try {
    //     image = sharp(imageStream);
    // } catch (ex) {
    //     console.log(ex);
    //     return;
    // }

    imageStream.pipe(image);

    image
        .metadata()
        .then(metadata => console.log(metadata))
        .catch(error => console.log(error));
}
