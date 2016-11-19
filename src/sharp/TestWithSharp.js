import sharp from 'sharp';
import icc from 'icc';

export default async function TestWithSharp({ imageStream }) {
    const image = sharp();

    // try {
    //     image = sharp(imageStream);
    // } catch (ex) {
    //     console.log(ex);
    //     return;
    // }

    imageStream.pipe(image);

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
        metadata,
        iccProfile
    };
}
