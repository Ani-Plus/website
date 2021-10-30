import moment from "moment";
import colors from "./colors";

export default function logger(text: string) {
    return process.stdout.write(`[${colors.red + moment().format("YYYY-MM-DD HH:mm:ss") + colors.reset}]: ${colors.green + text + colors.reset}\n`);
};