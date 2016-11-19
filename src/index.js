import fs from 'fs';
import path from 'path';
import TestWithGraphicsMagick from './GraphicsMagick/TestWithGraphicsMagick';
import TestWithSharp from './sharp/TestWithSharp';

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

const ReadBlobFromLocal = fullPath => {
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

filesToQuery.map(async originalFileName => {
    console.log(`Starting ${originalFileName}`);
    const fullPath = path.resolve(__dirname, `../images/${originalFileName}`);

    const testWithGraphicsMagickResults = await TestWithGraphicsMagick({
        originalFileName,
        imageStream: ReadBlobFromLocal(fullPath)
    });

    const testWithSharpResults = await TestWithSharp({
        imageStream: ReadBlobFromLocal(fullPath)
    });

    console.log(`Finished ${originalFileName}`);
});
