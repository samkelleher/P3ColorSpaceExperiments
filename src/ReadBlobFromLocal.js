import fs from 'fs';

export default function ReadBlobFromLocal(fullPath) {
    let result = null;

    try {
        result = fs.createReadStream(fullPath);
    } catch (ex) {
        console.log(`Failed to create read stream of ${fullPath}`, ex);
    }

    return result;
}
