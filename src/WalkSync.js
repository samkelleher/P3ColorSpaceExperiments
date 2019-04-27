import fs from 'fs';

export default function WalkSync(dir, filesFound, parent = '') {
    const files = fs.readdirSync(dir);
    let filesEdited = filesFound;
    files.forEach(file => {
        const fullPath = `${dir}/${file}`;
        if (fs.statSync(fullPath).isDirectory()) {
            filesEdited = WalkSync(fullPath, filesFound, `${(parent.length ? `${parent}/` : '')}${file}`);
        } else if (file !== 'README.md' && file !== '.DS_Store') {
            filesEdited.push(`${(parent.length ? `${parent}/` : '')}${file}`);
        }
    });
    return filesEdited;
}
