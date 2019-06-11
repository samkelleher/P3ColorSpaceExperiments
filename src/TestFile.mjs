import Debug from 'debug';
import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick.mjs';
import TestWithSharp from './sharp/TestWithSharp.mjs';
import ReadBlobFromLocal from './ReadBlobFromLocal.mjs';
import ReadBufferFromLocal from './ReadBufferFromLocal.mjs';

const debug = Debug('App:TestFile');

export default async function TestFile({
    fileName,
    fullPath
}) {
    debug(`Starting Tests for ${fileName}`);

    const results = [];

    try {
        const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
            fileName,
            imageStream: await ReadBlobFromLocal(fullPath)
        });
        results.push(testWithGraphicsMagickResults);
    } catch (exception) {
        debug('Caught TestWithGraphicsMagick Exception:');
        console.log(exception);
    }

    try {
        const testWithSharpResults = await TestWithSharp({
            imageStream: await ReadBufferFromLocal(fullPath)
        });
        results.push(testWithSharpResults);
    } catch (exception) {
        debug('Caught TestWithSharp Exception:');
        console.log(exception);
    }

    debug(`Finished Testing ${fileName}`);

    return {
        results,
        fileName,
        fullPath
    };
}
