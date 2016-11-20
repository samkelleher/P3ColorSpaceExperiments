// @flow
import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick';
import TestWithSharp from './sharp/TestWithSharp';
import ReadBlobFromLocal from './ReadBlobFromLocal';
import ReadBufferFromLocal from './ReadBufferFromLocal';

type TestFileArgs = {
    fileName: string,
    fullPath: string
}
type TestFileResults = {
    graphicsMagic: ?Object,
    sharp: ?Object,
    fileName: string,
    fullPath: string
}
export default async function TestFile({
    fileName,
    fullPath
}: TestFileArgs): Promise<TestFileResults> {
    console.log(`Starting ${fileName}`);

    const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
        fileName,
        imageStream: await ReadBlobFromLocal(fullPath)
    });

    const testWithSharpResults = await TestWithSharp({
        imageStream: await ReadBufferFromLocal(fullPath)
    });

    console.log(`Finished ${fileName}`);

    return {
        graphicsMagic: testWithGraphicsMagickResults,
        sharp: testWithSharpResults,
        fileName,
        fullPath
    };
}
