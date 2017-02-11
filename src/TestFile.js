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
    results: Array<Object>,
    fileName: string,
    fullPath: string
}
export default async function TestFile({
    fileName,
    fullPath
}: TestFileArgs): Promise<TestFileResults> {
    console.log(`Starting ${fileName}`);

    const results = [];

    try {
        const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
            fileName,
            imageStream: await ReadBlobFromLocal(fullPath)
        });
        results.push(testWithGraphicsMagickResults);
    } catch (exception) {
        console.log(exception);
    }

    try {
        const testWithSharpResults = await TestWithSharp({
            imageStream: await ReadBufferFromLocal(fullPath)
        });
        results.push(testWithSharpResults);
    } catch (exception) {
        console.log(exception);
    }

    console.log(`Finished ${fileName}`);

    return {
        results,
        fileName,
        fullPath
    };
}
