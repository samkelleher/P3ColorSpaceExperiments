import path from 'path';
import fs from 'fs';
import TestFile from './TestFile';

const walkSync = (dir, filesFound, parent = '') => {
    const files = fs.readdirSync(dir);
    let filesEdited = filesFound;
    files.forEach(file => {
        const fullPath = `${dir}/${file}`;
        if (fs.statSync(fullPath).isDirectory()) {
            filesEdited = walkSync(fullPath, filesFound, `${(parent.length ? `${parent}/` : '')}${file}`);
        } else if (file !== 'README.md' && file !== '.DS_Store') {
            filesEdited.push(`${(parent.length ? `${parent}/` : '')}${file}`);
        }
    });
    return filesEdited;
};

const images = path.resolve(__dirname, '../images');

const filesToQuery = [];
walkSync(images, filesToQuery);

// const results = filesToQuery.map(async fileName => {
//     const fullPath = path.resolve(__dirname, `../images/${fileName}`);
//     const fullResults = await TestFile({
//         fullPath,
//         fileName
//     });
//     return fullResults;
// });

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

testEveryFile(filesToQuery)
    .then(results => {
        console.log(`There are ${results.length} results completed.`);
    });

