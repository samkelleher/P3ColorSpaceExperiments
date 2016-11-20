// @flow
import path from 'path';
import WalkSync from './WalkSync';
import TestFile from './TestFile';
import FormatResults from './FormatResults';

export default function app() {
    const images = path.resolve(__dirname, '../images');

    const filesToQuery = [];
    WalkSync(images, filesToQuery);

    type TestFileResults = {
        results: Array<Object>,
        fileName: string,
        fullPath: string
    }

    const testEveryFile = async function testEveryFile(files): Promise<Array<TestFileResults>> {
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
        console.log('Place some image files in the ./images directory to test.');
        return;
    }

    testEveryFile(filesToQuery)
        .then(results => {
            console.log(`There are ${results.length} results completed.`);

            const table = FormatResults(results);
            console.log(table.toString());
        });
}
