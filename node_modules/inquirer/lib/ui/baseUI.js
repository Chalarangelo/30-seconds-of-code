'use strict';
var _ = require('lodash');
var MuteStream = require('mute-stream');
var readline = require('readline');

/**
 * Base interface class other can inherits from
 */

class UI {
  constructor(opt) {
    // Instantiate the Readline interface
    // @Note: Don't reassign if already present (allow test to override the Stream)
    if (!this.rl) {
      this.rl = readline.createInterface(setupReadlineOptions(opt));
    }

    this.rl.resume();

    this.onForceClose = this.onForceClose.bind(this);

    // Make sure new prompt start on a newline when closing
    process.on('exit', this.onForceClose);

    // Terminate process on SIGINT (which will call process.on('exit') in return)
    this.rl.on('SIGINT', this.onForceClose);
  }

  /**
   * Handle the ^C exit
   * @return {null}
   */

  onForceClose() {
    this.close();
    process.kill(process.pid, 'SIGINT');
    console.log('');
  }

  /**
   * Close the interface and cleanup listeners
   */

  close() {
    // Remove events listeners
    this.rl.removeListener('SIGINT', this.onForceClose);
    process.removeListener('exit', this.onForceClose);

    this.rl.output.unmute();

    if (this.activePrompt && typeof this.activePrompt.close === 'function') {
      this.activePrompt.close();
    }

    // Close the readline
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}

function setupReadlineOptions(opt) {
  opt = opt || {};

  // Default `input` to stdin
  var input = opt.input || process.stdin;

  // Add mute capabilities to the output
  var ms = new MuteStream();
  ms.pipe(opt.output || process.stdout);
  var output = ms;

  return _.extend(
    {
      terminal: true,
      input: input,
      output: output
    },
    _.omit(opt, ['input', 'output'])
  );
}

module.exports = UI;
