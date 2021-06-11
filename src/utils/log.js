const reset = "\x1b[0m";
const cd = "\x1b[1m\x1b[36mCDTickets >>";

function log(type, data) {
    switch (type) {
        case "error":
            return console.error(
                `${reset}\x1b[31m[ERROR]${reset} ${cd}${reset} ${data}`
            );
        case "warn":
            return console.warn(
                `${reset}\x1b[33m[WARNING]${reset} ${cd}${reset} ${data}`
            );
        case "info":
            return console.log(
                `${reset}\x1b[34m[INFO]${reset} ${cd}${reset} ${data}`
            );
    }
}