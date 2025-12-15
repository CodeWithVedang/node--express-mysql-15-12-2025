import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "sample.txt");

// READ FILE (ESM export)
export const readFile = () => {
    return new Promise((resolve) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return resolve("No file found. Write data first.");
            resolve(data);
        });
    });
};

// WRITE FILE (ESM export)
export const writeFile = (content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
