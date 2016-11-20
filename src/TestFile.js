// @flow
import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick';
import TestWithSharp from './sharp/TestWithSharp';
import ReadBlobFromLocal from './ReadBlobFromLocal';

type TestFileArgs = {
    fileName: string,
    fullPath: string
}
type TestFileResults = {
    graphicsMagic: Object,
    sharp: Object
}
export default async function TestFile({
    fileName,
    fullPath
}: TestFileArgs): Promise<TestFileResults> {
    console.log(`Starting ${fileName}`);

    const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
        fileName,
        imageStream: ReadBlobFromLocal(fullPath)
    });

    const testWithSharpResults = await TestWithSharp({
        imageStream: ReadBlobFromLocal(fullPath)
    });

    console.log(`Finished ${fileName}`);

    return {
        graphicsMagic: testWithGraphicsMagickResults,
        sharp: testWithSharpResults
    };
}
