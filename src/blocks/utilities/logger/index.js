import chalk from 'chalk';
import process from 'process';
const { bold, blue, green, red, yellow, gray } = chalk;

export class Logger {
  static outputStream = process.stdout;

  static formatDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium',
    hour12: false,
  }).format;

  static prefixes = {
    info: `${blue('info')}`,
    success: `${green('done')}`,
    error: `${red('errr')}`,
    warning: `${yellow('warn')}`,
  };

  constructor(procName) {
    this.procName = procName;
  }

  log(msg) {
    return Logger._log(msg, 'info', this.procName);
  }

  info(msg) {
    return Logger._log(msg, 'info', this.procName);
  }

  success(msg) {
    return Logger._log(msg, 'success', this.procName);
  }

  error(msg) {
    return Logger._log(msg, 'error', this.procName);
  }

  warning(msg) {
    return Logger._log(msg, 'warning', this.procName);
  }

  static _log(msg, type, procName) {
    const timestamp = Logger.formatDate(new Date());
    const firstLine = `${gray(`* [${timestamp}]`)} ${
      Logger.prefixes[type]
    } - ${procName}`;
    const secondLine = `  ${msg}`;
    Logger.outputStream.write(`${firstLine}\n${secondLine}\n\n`);
  }

  static log(msg) {
    Logger.outputStream.write(`${msg}\n`);
  }

  static logProcessInfo = () => {
    [
      `${bold(blue('Operating system:'))}  ${process.platform} (node: ${
        process.version
      })`,
      `${bold(blue('Process info:'))}      ${process.title} (pid: ${
        process.pid
      })`,
      `${bold(blue('Working directory:'))} ${process.cwd()}`,
      `${bold(blue('Executable info:'))}   ${process.execPath} {${
        process.execArgv
      }}`,
      `${bold(blue('Command-line args:'))} ${process.argv.slice(2)}`,
    ].forEach(m => Logger.outputStream.write(`${m}\n`));
    Logger.outputStream.write('\n');
  };
}
