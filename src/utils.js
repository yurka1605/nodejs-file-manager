import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { consoleColors } from './constants.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const colorize = (message, color) => {
    return color + message + consoleColors.Default;
}
