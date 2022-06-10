import os from 'os';
import { Printer } from '../shared/printer.js';

export class OperatingSystem {
    static operations = {
        '--EOL': this.getEOL,
        '--cpus': this.getCpus,
        '--homedir': this.getHomedir,
        '--username': this.getSystemUsername,
        '--architecture': this.getArchitecture
    };

    static run(cmd) {
        const [_, operationName] = cmd.split(' ');

        if (this.operations[operationName]) {
            this.operations[operationName]();
        } else {
            const errorMassage = operationName ? `Unknown argument - "${operationName}"` : `Argument not found`;
            throw new Error(errorMassage);
        }
    }

    static getEOL() {
        Printer.print(JSON.stringify(os.EOL));
    }

    static getCpus() {
        const cpusInfo = os.cpus().map(({model, speed}) => ({
            model,
            speed: speed/1000 + ' GHz'
        }));

        Printer.printLog(cpusInfo);
    }

    static getHomedir() {
        Printer.print(os.homedir());
    }

    static getSystemUsername() {
        Printer.print(os.userInfo().username);
    }

    static getArchitecture() {
        Printer.print(os.arch());
    }
}