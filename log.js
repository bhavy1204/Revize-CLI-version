import chalk from "chalk";

export const log = {
    blueBold: msg => chalk.bold.blue(`${msg}`),
    yellow: msg => chalk.yellow(`${msg}`),
    cyan: msg => chalk.cyan(`${msg}`),
    brightGreen: msg => chalk.greenBright(`${msg}`),
    gray:msg => chalk.gray(`${msg}`),
}