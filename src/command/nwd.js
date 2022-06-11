import os from 'node:os';
import fs from 'fs/promises';
import path from 'path';
import { Printer } from '../shared/printer.js';
import { throwManyArgsError } from '../shared/utils.js';

export class Navigation {
    _currentDir = os.homedir();

    get currentDir() {
        return this._currentDir;
    }

    constructor() {
    }

    async run(command) {
        const [operator, ...args] = command.split(' ');
        if (args.length > 1 || (args.length > 0 && operator !== 'cd')) {
            throwManyArgsError(operator);
        }
        await this[operator](args[0]);
    }

    async ls() {
        const files = await fs.readdir(this._currentDir);
        Printer.printLog(files);
    }

    async up() {
        await this.cd('../');
    }

    async cd(pathToDirectory) {
        const newPath = path.resolve(this._currentDir, pathToDirectory);
        const stats = await fs.lstat(newPath);
        if (stats.isDirectory()) {
            this._currentDir = newPath;
        } else {
            throw new Error('No such directory');
        }
    }

    getCurrentPosition() {  
        return `You are currently in ${this._currentDir}`;
    }
}