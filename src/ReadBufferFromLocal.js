import fs from 'fs';

export default async function ReadBufferFromLocal(fullPath) {
    return await new Promise((resolve, reject) => {
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
