import os from 'node:os';
import fs from 'fs/promises';
import path from 'path';
import { list } from './fs/list.js';

export class Navigation {
    _currentDir = os.homedir();

    get currentDir() {
        return this._currentDir;
    }

    constructor() {
    }

    async run(command) {
        const [operator, arg] = command.split(' ');
        await this[operator](arg);
    }

    async ls() {
        await list(this._currentDir);
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