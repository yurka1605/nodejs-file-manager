import { consoleColors } from '../constants.js';
import { colorize } from '../utils.js';

export class Printer {
    static printError(errorMessage) {
        console.error(colorize(errorMessage, consoleColors.Red));
    }

    static printInfo(message) {
        console.info(colorize(message, consoleColors.Green));
    }

    static print(message) {
        console.log(colorize(message, consoleColors.Blue));
    }

    static printLog(message) {
        console.log(message);
    }
}