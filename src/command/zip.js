import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

export class Zip {
    static async run(cmd, dir) {
        const [operator, pathToSource, pathToDestination] = cmd.split(' ');
        await this.transformFile(
            operator === 'compress' ? createBrotliCompress() : createBrotliDecompress(),
            path.resolve(dir, pathToSource),
            path.resolve(dir, pathToDestination)
        );
    }
    
    static async transformFile(transformStream, pathToFile, pathToDestination) {
        await pipeline(
            createReadStream(pathToFile),
            transformStream,
            createWriteStream(pathToDestination),
        );
    }
}