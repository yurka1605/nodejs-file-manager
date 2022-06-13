export const errors = {
    operation: '[Operation failed]',
    input: 'Invalid input',
    unknown: '[Unknown error]',
};

export const consoleColors = {
    Red: '\x1b[31m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Blue: '\x1b[34m',
    Default: '\x1b[0m',
}

const nwdSettings = {
    instanceName: 'nwd',
};

const osSettings = {
    instanceName: 'os',
};

const fsSettings = {
    instanceName: 'fs',
    needCurrentDir: true,
};

const zipSettings = {
    instanceName: 'zip',
    needCurrentDir: true,
};

const hashSettings = {
    instanceName: 'hash',
    needCurrentDir: true,
};

export const operatorsConfig = {
    up: nwdSettings,
    cd: nwdSettings,
    ls: nwdSettings,
    cat: fsSettings,
    add: fsSettings,
    rn: fsSettings,
    cp: fsSettings,
    mv: fsSettings,
    rm: fsSettings,
    os: osSettings,
    hash: hashSettings,
    compress: zipSettings,
    decompress: zipSettings,
};
