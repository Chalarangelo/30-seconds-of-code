'use strict';

const colors = require('./utils/colors');
const chalk = require('chalk');
const stringWidth = require('string-width');
const readline = require('readline');
const stripAnsi = require('strip-ansi');

class Debugger {

  constructor () {
    this.enabled = true;
    this.capturing = false;
    this.capturedMessages = [];
  }

  enable () {
    this.enabled = true;
  }

  capture () {
    this.enabled = true;
    this.capturing = true;
  }

  endCapture () {
    this.enabled = false;
    this.capturing = false;
    this.capturedMessages = [];
  }

  log () {
    if (this.enabled) {
      this.captureConsole(Array.from(arguments), console.log);
    }
  }

  info (message) {
    if (this.enabled) {
      const titleFormatted = colors.formatTitle('info', 'I');
      this.log(titleFormatted, message);
    }
  }

  note (message) {
    if (this.enabled) {
      const titleFormatted = colors.formatTitle('note', 'N');
      this.log(titleFormatted, message);
    }
  }

  title (severity, title, subtitle) {
    if (this.enabled) {
      const date = new Date();
      const dateString = chalk.grey(date.toLocaleTimeString());
      const titleFormatted = colors.formatTitle(severity, title);
      const subTitleFormatted = colors.formatText(severity, subtitle);
      const message = `${titleFormatted} ${subTitleFormatted}`

      // In test environment we don't include timestamp
      if(process.env.NODE_ENV === 'test') {
        this.log(message);
        this.log();
        return;
      }

      // Make timestamp appear at the end of the line
      let logSpace = process.stdout.columns - stringWidth(message) - stringWidth(dateString)
      if (logSpace <= 0) {
        logSpace = 10
      }

      this.log(`${message}${' '.repeat(logSpace)}${dateString}`);
      this.log();
    }
  }

  clearConsole () {
    if (!this.capturing && this.enabled && process.stdout.isTTY) {
      // Fill screen with blank lines. Then move to 0 (beginning of visible part) and clear it
      const blank = '\n'.repeat(process.stdout.rows)
      console.log(blank)
      readline.cursorTo(process.stdout, 0, 0)
      readline.clearScreenDown(process.stdout)
    }
  }

  captureLogs (fun) {
    try {
      this.capture();
      fun.call();
      return this.capturedMessages;
    } catch (e) {
      throw e;
    } finally {
      this.endCapture();
    }
  }

  captureConsole (args, method) {
    if (this.capturing) {
      this.capturedMessages.push(stripAnsi(args.join(' ')).trim());
    } else {
      method.apply(console, args);
    }
  }
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = new Debugger();
