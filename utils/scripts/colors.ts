const colors = {
    reset: "\x1b[0m",
    bold: (message: string) => `\x1b[1m${message}\x1b[0m`,
    bright: "\x1b[1m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
};

export default colors