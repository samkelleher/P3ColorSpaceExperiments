import path from 'path';
import Debug from 'debug';
import WalkSync from './WalkSync.mjs';
import TestFile from './TestFile.mjs';
import FormatResults from './FormatResults.mjs';

const debug = Debug('App:Main');

export default async function app() {
    const cwd = process.cwd();
    const images = path.resolve(cwd, './images');

    const filesToQuery = [];
    WalkSync(images, filesToQuery);

    const testEveryFile = async function testEveryFile(files) {
        const results = [];
        for (const fileName of files) {
            const fullPath = path.resolve(cwd, `./images/${fileName}`);
            const fullResults = await TestFile({
                fullPath,
                fileName
            });
            results.push(fullResults);
        }
        return results;
    };

    if (!filesToQuery.length) {
        throw new Error('Place some image files in the ./images directory to test.');
    }

    await testEveryFile(filesToQuery)
        .then(results => {
            debug(`There are ${results.length} results completed.`);

            const table = FormatResults(results);
            console.log(table.toString());
        });
}

