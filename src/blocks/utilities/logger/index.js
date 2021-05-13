import chalk from 'chalk';
import process from 'process';
const { bold, blue, green, red, yellow } = chalk;

const prefixes = {
  info: `${bold(blue('info'))}`,
  success: `${bold(green('done'))}`,
  error: `${bold(red('errr'))}`,
  warning: `${bold(yellow('warn'))}`,
};

const validTypes = Object.keys(prefixes);

const defaultLogOpts = {
  breakLine: true,
  type: null,
  process: null,
};

export class Logger {
  static outputStream = process.stdout;

  /**
   * Format a string with the given chalk formatter.
   * @param {string} msg - The message to be formatted.
   * @param {array} format - The name of the chalk function(s) to use.
   */
  static format = (msg, ...format) =>
    format.reduce((m, f) => (chalk[f] ? chalk[f](m) : m), msg);

  /**
   * Logs a message to the output stream.
   * @param {string} msg - The message to be logged.
   * @param {*} options - Options for formatting the message.
   *    If omitted the default values will be used.
   *    If passed a string, it will only set the `type` key
   *    If given an object, the following keys are valid:
   *    - breakLine (boolean) - Insert a newline character.
   *    - type (string) - Message type (defaults to null)
   *      Valid types: 'info', 'success', 'error', 'warning'
   */
  static log = (msg, options = {}) => {
    const opts =
      options && typeof options === 'object'
        ? { ...defaultLogOpts, ...options }
        : typeof options === 'string'
        ? { ...defaultLogOpts, type: options }
        : { ...defaultLogOpts };
    const { breakLine, type, process: procName } = opts;

    let message = breakLine ? `${msg}\n` : `${msg}`;
    if (procName) message = `[${bold(procName)}] ${message}`;
    if (validTypes.includes(type)) message = `${prefixes[type]}  ${message}`;

    this.outputStream.write(message);
  };

  /**
   * Returns this with the log's `process` option preset to the given procName.
   * @param {string} procName - The name of the current process.
   */
  static bind = procName => {
    const boundLog = _procName => (msg, options) => {
      if (typeof options === 'string')
        this.log(msg, { type: options, process: _procName });
      else this.log(msg, { ...options, process: _procName });
    };

    const _boundLog = boundLog(procName);
    return _boundLog;
  };

  /**
   * Logs an empty line.
   */
  static breakLine = () => {
    this.log('', 'info');
  };

  /**
   * Logs information about the current process.
   */
  static logProcessInfo = () => {
    const information = [
      `Operating system:  ${process.platform} (node: ${process.version})`,
      `Process info:      ${process.title} (pid: ${process.pid})`,
      `Working directory: ${process.cwd()}`,
      `Executable info:   ${process.execPath} {${process.execArgv}}`,
      `Command-line args: ${process.argv.slice(2)}`,
    ];
    information.forEach(i => this.log(i, 'info'));
  };
}
