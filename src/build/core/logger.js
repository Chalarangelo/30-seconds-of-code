import chalk from 'chalk';
import process from 'process';
const { bold, blue, green, red, yellow } = chalk;

global.yild = global.yild || {};
global.yild.logger = undefined;

/**
 * Format a string with the given chalk formatter.
 * @param {string} msg - The message to be formatted.
 * @param {array} format - The name of the chalk function(s) to use.
 */
export const format = (msg, ...format) =>
  format.reduce((m, f) => chalk[f] ? chalk[f](m) : m, msg);

/**
 * Logger class-like, should be used to have a logger singleton.
 * Automatically instantiated on import if not already.
 */
function logger() {
  // Return singleton if exists, instantiate otherwise.
  if (global.yild.logger) return global.yild.logger;
  global.yild.logger = this;
  this.outputStream = process.stdout;

  const prefixes = {
    'info': `${bold(blue('info'))}`,
    'success': `${bold(green('done'))}`,
    'error': `${bold(red('errr'))}`,
    'warning': `${bold(yellow('warn'))}`,
  };

  const validTypes = Object.keys(prefixes);

  const defaultLogOpts = {
    breakLine: true,
    type: null,
    process: null,
  };

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
  this.log = (msg, options = {}) => {
    const opts = options && typeof options === 'object'
      ? {...defaultLogOpts, ...options}
      : typeof options === 'string'
        ? {...defaultLogOpts, type: options}
        : {...defaultLogOpts};
    const { breakLine, type, process: procName } = opts;

    let message = breakLine ? `${msg}\n` : `${msg}`;
    if(procName) message = `[${bold(procName)}] ${message}`;
    if(validTypes.includes(type)) message = `${prefixes[type]}  ${message}`;

    this.outputStream.write(message);
  };

  /**
   * Returns this with the log's `process` option preset to the given procName.
   * @param {string} procName - The name of the current process.
   */
  this.bindProcessLogger = procName => {
    const boundLog = _procName => (msg, options) => {
      if (typeof options === 'string')
        this.log(msg, { type: options, process: _procName});
      else
        this.log(msg, { ...options, process: _procName });
    };

    const _boundLog = boundLog(procName);
    _boundLog.rebind = subprocName =>
      this.bindProcessLogger(`${procName}:${subprocName}`);
    return _boundLog;
  };

  /**
   * Logs an empty line.
   */
  this.breakLine = () => {
    this.log('', 'info');
  };

  /**
   * Logs information about the current process.
   */
  this.logProcessInfo = () => {
    const information = [
      `Operating system:  ${process.platform} (node: ${process.version})`,
      `Process info:      ${process.title} (pid: ${process.pid})`,
      `Working directory: ${process.cwd()}`,
      `Executable info:   ${process.execPath} {${process.execArgv}}`,
      `Command-line args: ${process.argv.slice(2)}`,
    ];
    information.forEach(i => this.log(i, 'info'));
  };

  /**
   * Logs information about options.
   */
  this.logOptionList = actions => {
    const _t = '    ';
    const actionsInformation = Object.keys(actions)
      .reduce((acc, action) => {
        const actionData = actions[action];
        let short, long;
        if(actionData.key) {
          short = `${format(`-${actionData.key.short}`, 'magenta', 'bold')}`;
          long = `${format(`--${actionData.key.long}`, 'magenta', 'bold')}`;
        } else {
          short = `${format(`-${action.slice(0, 1)}`, 'magenta', 'bold')}`;
          long = `${format(`--${action}`, 'magenta', 'bold')}`;
        }
        acc.push(`${_t}${short}, ${long}${ actionData.param ? `=[${format(actionData.param, 'green', 'bold')}]` : ''}`);
        acc.push(`${_t}${_t}${actionData.description.replace(/\n/gm, `\n${_t}${_t}`)}\n`);
        return acc;
      }, []);

    const information = [
      `\n`,
      `${format('Name', 'bold')}`,
      `    yild - content extraction and update system\n`,
      `${format('Synopsis', 'bold')}`,
      `    npm run yild -- [${format('options', 'green')}]\n`,
      `${format('Description', 'bold')}`,
      `    Handle asset preprocessing and content extraction for 30-seconds-web.\n`,
      ...actionsInformation,
    ];
    information.forEach(i => this.log(i));
  };

  return global.yild.logger;
}

// IIFE here to instantiate the logger
(() => new logger())();

export default global.yild.logger;
