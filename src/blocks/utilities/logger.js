import chalk from 'chalk';
import process from 'process';
const { bold, blue, green, red, yellow, gray, magenta } = chalk;

export class Logger {
  static outputStream = process.stdout;
  static timers = new Map();
  static muteGlbobal = false;

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
    debug: `${yellow('debug')}`,
  };

  constructor(procName, { muted = false } = {}) {
    this.procName = procName;
    this.startTime = new Date();
    if (muted) this.muted = muted;
  }

  log(msg) {
    if (this.muted) return;
    return Logger._log(msg, 'info', this.procName);
  }

  info(msg) {
    if (this.muted) return;
    return Logger._log(msg, 'info', this.procName);
  }

  success(msg) {
    if (this.muted) return;
    const timer = new Date() - this.startTime;
    this.startTime = new Date();
    return Logger._log(msg, 'success', this.procName, timer);
  }

  error(msg) {
    // Muted loggers still log errors and warnings
    return Logger._log(msg, 'error', this.procName);
  }

  warn(msg) {
    // Muted loggers still log errors and warnings
    return Logger._log(msg, 'warning', this.procName);
  }

  static _headerLine(msg, type, procName) {
    const timestamp = Logger.formatDate(new Date());
    return `${gray(`* [${timestamp}]`)} ${Logger.prefixes[type]} - ${procName}`;
  }

  static _log(msg, type, procName, timer) {
    const firstLine = Logger._headerLine(msg, type, procName);
    let secondLine = `  ${msg}`;
    if (timer) secondLine += ` ${gray(`(${timer}ms)`)}`;
    Logger._write(`${firstLine}\n${secondLine}\n\n`);
  }

  static _write(msg) {
    if (Logger.muteGlbobal) return;
    Logger.outputStream.write(msg);
  }

  static log(msg) {
    Logger._write(`${msg}\n`);
  }

  static timeStart(name) {
    Logger.timers.set(name, new Date());
  }

  static timeEnd(name) {
    const timer = new Date() - Logger.timers.get(name);
    Logger.timers.delete(name);
    Logger.debug(`${name} took ${timer}ms`);
  }

  static debug(msg, printTrace = false) {
    const header = Logger._headerLine(msg, 'debug', 'Logger.debug');

    let _msg;
    if (typeof msg === 'string') _msg = msg;
    if (typeof msg === 'number') _msg = green(msg);
    if (typeof msg === 'boolean') _msg = magenta(msg);
    if (typeof msg === 'function') _msg = blue(msg.toString());
    if (typeof msg === 'object' || Array.isArray(msg))
      _msg = yellow(JSON.stringify(msg, null, 2).replace(/\n/g, '\n  '));

    const trace = printTrace
      ? `\n${new Error().stack.split('\n').slice(2).join('\n')}`
      : '';
    Logger._write(`${header}\n  ${_msg}${trace}\n\n`);
  }

  static logProcessInfo = () => {
    [
      `  ${bold(blue('Operating system:'))}  ${process.platform} (node: ${
        process.version
      })`,
      `  ${bold(blue('Process info:'))}      ${process.title} (pid: ${
        process.pid
      })`,
      `  ${bold(blue('Working directory:'))} ${process.cwd()}`,
      `  ${bold(blue('Executable info:'))}   ${process.execPath} {${
        process.execArgv
      }}`,
      `  ${bold(blue('Command-line args:'))} ${process.argv.slice(2)}`,
    ].forEach(m => Logger._write(`${m}\n`));
    Logger._write('\n');
  };
}
