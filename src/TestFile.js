import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick';
import TestWithSharp from './sharp/TestWithSharp';
import ReadBlobFromLocal from './ReadBlobFromLocal';

export default async function TestFile({
    fileName,
    fullPath
}) {
    console.log(`Starting ${fileName}`);

    const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
        fileName,
        imageStream: ReadBlobFromLocal(fullPath)
    });

    const testWithSharpResults = await TestWithSharp({
        imageStream: ReadBlobFromLocal(fullPath)
    });

    console.log(`Finished ${fileName}`);
}
