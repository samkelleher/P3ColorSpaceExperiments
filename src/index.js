// @flow
import path from 'path';
import WalkSync from './WalkSync';
import TestFile from './TestFile';

const images = path.resolve(__dirname, '../images');

const filesToQuery = [];
WalkSync(images, filesToQuery);

const testEveryFile = async function testEveryFile(files): Promise<Array<Object>> {
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

testEveryFile(filesToQuery)
    .then(results => {
        console.log(`There are ${results.length} results completed.`);
    });

