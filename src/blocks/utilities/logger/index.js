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
      typeof options === 'object'
        ? { ...defaultLogOpts, ...options }
        : typeof options === 'string'
        ? { ...defaultLogOpts, type: options }
        : { ...defaultLogOpts };
    const { breakLine, type, process: procName } = opts;

    let message = breakLine ? `${msg}\n` : `${msg}`;
    if (procName) message = `[${bold(procName)}] ${message}`;
    if (type && validTypes.includes(type))
      message = `${prefixes[type]}  ${message}`;

    Logger.outputStream.write(message);
  };

  /**
   * Returns this with the log's `process` option preset to the given procName.
   * @param {string} procName - The name of the current process.
   */
  static bind = procName => (msg, options) => {
    if (typeof options === 'string')
      Logger.log(msg, { type: options, process: procName });
    else Logger.log(msg, { ...options, process: procName });
  };

  /**
   * Logs an empty line.
   */
  static breakLine = () => {
    Logger.log('', 'info');
  };

  /**
   * Logs information about the current process.
   */
  static logProcessInfo = () => {
    [
      `Operating system:  ${process.platform} (node: ${process.version})`,
      `Process info:      ${process.title} (pid: ${process.pid})`,
      `Working directory: ${process.cwd()}`,
      `Executable info:   ${process.execPath} {${process.execArgv}}`,
      `Command-line args: ${process.argv.slice(2)}`,
    ].forEach(i => Logger.log(i, 'info'));
  };
}
