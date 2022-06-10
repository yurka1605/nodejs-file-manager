import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { Printer } from '../printer.js';

export class Zip {
    static async run(cmd, dir) {
        const [operator, pathToSource, pathToDestination] = cmd.split(' ');
        await this.transformFile(
            operator === 'compress' ? createBrotliCompress() : createBrotliDecompress(),
            path.resolve(dir, pathToSource),
            path.resolve(dir, pathToDestination)
        );

        Printer.print(`File successfully ${operator}ed`);
    }
    
    async transformFile(transformStream, pathToFile, pathToDestination) {
        await pipeline(
            createReadStream(pathToFile),
            transformStream,
            createWriteStream(pathToDestination),
        );
    }
}