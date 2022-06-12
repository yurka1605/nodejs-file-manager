import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { Printer } from '../shared/printer.js';
import { rename, unlink, open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { throwManyArgsError } from '../shared/utils.js';

export class FileSystemManager {
    static operations = {
        cat: this.showFileContent.bind(this),
        add: this.addNewFile.bind(this),
        mv: this.moveFile.bind(this),
        rn: this.renameFile.bind(this),
        cp: this.copyFile.bind(this),
        rm: this.deleteFile.bind(this),
    }

    static async run(cmd, currentDir) {
        const [operator, ...args] = cmd.split(' ');
        const isOperatorWithOneMaxArgs = operator === 'rm' || operator === 'add' || operator === 'cat';
        if (args.length > 2 || (args.length > 1 && isOperatorWithOneMaxArgs)) {
            throwManyArgsError(operator);
        }

        await this.operations[operator](args, currentDir);
    }

    static async showFileContent([pathToFile], currentDir) {
        return new Promise((resolve, reject) => {
            const stream = createReadStream(
                path.resolve(currentDir, pathToFile), 
                { encoding: 'utf8' }
            );
            
            stream.on('data', Printer.print)
                .on('end', resolve)
                .on('error', reject);
        });
    }

    static async addNewFile([pathToFile], currentDir) {
        const fd = await open(path.resolve(currentDir, pathToFile), 'ax');
        fd.close();
    }

    static async renameFile([oldPath, newFileName], currentDir) {
        const pathToFile = path.resolve(currentDir, oldPath);
        await rename(
            pathToFile,
            path.resolve(pathToFile, '../', newFileName)
        );
    }

    static async copyFile([oldPath, pathToNewDir], currentDir) {
        const pathToFile = path.resolve(currentDir, oldPath);
        const fileName = path.basename(pathToFile);
        await pipeline(
            createReadStream(pathToFile, { encoding: 'utf8' }),
            createWriteStream(path.resolve(currentDir, pathToNewDir, fileName))
        );
    }

    static async moveFile(...args) {
        await this.copyFile(...args);
        await this.deleteFile(...args);
    }

    static async deleteFile([pathToDeletedFile], currentDir) {
        await unlink(path.resolve(currentDir, pathToDeletedFile));
    }
}