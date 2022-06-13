import { CommandLine } from './command/index.js';
import { Printer } from './shared/printer.js';
import { errors } from './shared/constants.js';

try {
    new CommandLine();
} catch (err) {
    Printer.printError(errors.unknown + err);
}