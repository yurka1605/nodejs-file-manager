import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { Printer } from '../printer.js';

export class Hash {
    static run(command, currentDir) {
        const [_, pathToFile] = command.split(' ');
        this.calculateHash(path.resolve(currentDir, pathToFile));
    }

    async calculateHash(path) {
        const fileBuffer = await fs.readFile(path);
        const hash = crypto.createHash('SHA256');
        Printer.printLog(hash.update(fileBuffer).digest('hex'));
    }
}