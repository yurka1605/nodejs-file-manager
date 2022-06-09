import { CommandLine } from './command/index.js';
import { Printer } from './command/printer.js';
import { errors } from './constants.js';

try {
    new CommandLine();
} catch (err) {
    Printer.printError(errors.unknown + err);
}