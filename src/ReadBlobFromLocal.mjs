import fs from 'fs';

export default async function ReadBlobFromLocal(fullPath) {
    return await new Promise((resolve, reject) => {
        let result = null;

        try {
            result = fs.createReadStream(fullPath);
        } catch (ex) {
            console.log(`Failed to create read stream of ${fullPath}`, ex);
            reject(ex);
            return;
        }

        resolve(result);
    });
}
