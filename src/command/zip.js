import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { throwManyArgsError } from '../shared/utils.js';

export class Zip {
    static async run(cmd, dir) {
        const [operator, pathToSource, pathToDestination] = cmd.split(' ');
        
        if (cmd.split(' ').length > 3) {
            throwManyArgsError(operator);
        }

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