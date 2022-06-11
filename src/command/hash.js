import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Printer } from '../shared/printer.js';
import { throwManyArgsError } from '../shared/utils.js';

export class Hash {
    static async run(command, currentDir) {
        const [operator, pathToFile] = command.split(' ');
        if (command.split(' ').length > 2) {
            throwManyArgsError(operator);
        }

        await this.calculateHash(path.resolve(currentDir, pathToFile));
    }

    static async calculateHash(pathToFile) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('SHA256');
            fs.ReadStream(pathToFile)
                .on('data', data => hash.update(data))
                .on('end', () => {
                    Printer.print(hash.digest('hex'));
                    resolve();
                })
                .on('error', reject);
        });
    }
}