import { argv } from 'process';

export class User {
    _name = 'stranger';

    get name() {
       return this._name; 
    }

    set name(val) {
        if (val) {
            this._name = val.split('=')[1] ?? this._name;
        }
    }

    constructor() {
        this.name = argv.find(prop => prop.includes('--username'));
    }
}