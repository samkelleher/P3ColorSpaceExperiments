import fs from 'fs';
import path from 'path';
import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick';

const walkSync = (dir, filesFound, parent = '') => {
    const files = fs.readdirSync(dir);
    let filesEdited = filesFound;
    files.forEach(file => {
        const fullPath = `${dir}/${file}`;
        if (fs.statSync(fullPath).isDirectory()) {
            filesEdited = walkSync(fullPath, filesFound, `${(parent.length ? `${parent}/` : '')}${file}`);
        } else {
            filesEdited.push(`${(parent.length ? `${parent}/` : '')}${file}`);
        }
    });
    return filesEdited;
};

const ReadBlobFromLocal = (fullPath) => {
    console.log(`Creating read stream from ${fullPath}`);

    let result = null;

    try {
        result = fs.createReadStream(fullPath);
    } catch (ex) {
        console.log(`Failed to create read stream of ${fullPath}`, ex);
    }

    return result;
};

const images = path.resolve(__dirname, '../images');

const filesToQuery = [];
walkSync(images, filesToQuery);

filesToQuery.map(originalFileName => {
    console.log(`Starting ${originalFileName}`);
    const fullPath = path.resolve(__dirname, `../images/${originalFileName}`);
    const imageStream = ReadBlobFromLocal(fullPath);

    TestWithGraphicsMagick({
        originalFileName,
        imageStream
    });

    console.log(`Finished ${originalFileName}`);
});
