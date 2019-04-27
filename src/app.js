import path from 'path';
import Debug from 'debug';
import WalkSync from './WalkSync';
import TestFile from './TestFile';
import FormatResults from './FormatResults';

const debug = Debug('App:Main');

export default function app() {
    const images = path.resolve(__dirname, '../images');

    const filesToQuery = [];
    WalkSync(images, filesToQuery);

    const testEveryFile = async function testEveryFile(files) {
        const results = [];
        for (const fileName of files) {
            const fullPath = path.resolve(__dirname, `../images/${fileName}`);
            const fullResults = await TestFile({
                fullPath,
                fileName
            });
            results.push(fullResults);
        }
        return results;
    };

    if (!filesToQuery.length) {
        debug('Place some image files in the ./images directory to test.');
        return;
    }

    testEveryFile(filesToQuery)
        .then(results => {
            debug(`There are ${results.length} results completed.`);

            const table = FormatResults(results);
            console.log(table.toString());
        });
}
