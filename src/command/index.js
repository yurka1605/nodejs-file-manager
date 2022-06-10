import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'os';
import { operatorsConfig, errors } from '../constants.js';
import { User } from '../shared/user.js';
import { Navigation } from './nwd.js';
import { Printer } from '../shared/printer.js';
import { Hash } from './hash.js';
import { Zip } from './zip.js';
import { OperatingSystem } from './os.js';
import { FileSystemManager } from './fsManager.js';
 
export class CommandLine {
    fs = FileSystemManager;
    os = OperatingSystem;
    hash = Hash;
    zip = Zip;

    constructor() {
        this.user = new User();
        this.nwd = new Navigation();
        this.createReadlineInterface();
        Printer.print(`Welcome to the File Manager, ${this.user.name}!`);
        Printer.printInfo(os.EOL + this.nwd.getCurrentPosition());
    }

    createReadlineInterface() {
        this._readLine = createInterface({ input, output });
        this._readLine
            .on('line', command => this.cmdController(command.trim()))
            .on('close', () => {
                Printer.print(`${os.EOL}Thank you for using File Manager, ${this.user.name}!`);
            });
    }

    async cmdController(command) {
        const operator = command.split(' ')[0];
        if (operator === '.exit') {
            this._readLine.close();
            return;
        }

        const instanceConfig = operatorsConfig[operator];
        if (instanceConfig) {
            await this.runOperation(instanceConfig, command);
        } else {
            Printer.printError(errors.input) 
        }

        Printer.printInfo(this.nwd.getCurrentPosition());
    }

    async runOperation(config, command) {
        try {
            const instanceName = config.instanceName;
            if (!this[instanceName]) {
                throw new Error('Class instance not created');
            }

            const args = [command];
            if (config.needCurrentDir) {
                args.push(this.nwd.currentDir);
            }

            await this[instanceName].run(...args);
        } catch (err) {
            Printer.printError(`${errors.operation}: ${err.message}`);
        }
    }
}