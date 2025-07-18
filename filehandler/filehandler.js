import { error } from 'console';
import fs from 'fs'
import path from 'path'
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "./data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const revesionFiles = {
    today: "todayStudyLog.json",
    first: "firstRevision.json",
    second: "secondRevision.json",
    third: "thirdRevision.json",
    fourth: "fourthRevision.json",
    fifth: "fifthRevision.json",
    sixth: "SixthRevision.json",
    todayTODO: "todayTODO.json",
}

const getFilePath = (revesionKey) => {
    const filename = revesionFiles[revesionKey];
    if (!filename) {
        throw new Error("No such key exists");
    }
    return path.join(dataDir, filename);
}

export const writeRevesionData = (revisionKey, dataArray) => {
    const filepath = getFilePath(revisionKey);
    fs.writeFileSync(filepath, JSON.stringify(dataArray, null, 2));
}

export const readRevesionData = (revisionKey) => {
    const filepath = getFilePath(revisionKey);

    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, []);
    }
    const data = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(data);
}