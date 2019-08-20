'use strict';

const execa = require('execa');

const { statSync } = require('fs');
const path = require('path');
const common = require('./common');
const EventEmitter = require('events').EventEmitter;

const { EOL } = require('os');

/**
 * Constants
 */

const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

const typeMap = {
  rename: CHANGE_EVENT,
  write: CHANGE_EVENT,
  remove: DELETE_EVENT,
  create: ADD_EVENT,
};

const messageRegexp = /(rename|write|remove|create)\s(.+)/;

/**
 * Manages streams from subprocess and turns into sane events
 *
 * @param {Stream} data
 * @private
 */
function _messageHandler(data) {
  data
    .toString()
    .split(EOL)
    .filter(str => str.trim().length)
    .filter(str => messageRegexp.test(str))
    .map(line => {
      const [, command, path] = [...line.match(messageRegexp)];
      return [command, path];
    })
    .forEach(([command, file]) => {
      let stat;
      const type = typeMap[command];
      if (type === DELETE_EVENT) {
        stat = null;
      } else {
        try {
          stat = statSync(file);
        } catch (e) {
          // There is likely a delete coming down the pipe.
          if (e.code === 'ENOENT') {
            return;
          }
          throw e;
        }
      }
      this.emitEvent(type, path.relative(this.root, file), stat);
    });
}

/**
 * Export `WatchexecWatcher` class.
 * Watches `dir`.
 *
 * @class WatchexecWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */
class WatchexecWatcher extends EventEmitter {
  constructor(dir, opts) {
    super();

    common.assignOptions(this, opts);

    this.root = path.resolve(dir);

    this._process = execa(
      'watchexec',
      ['-n', '--', 'node', __dirname + '/watchexec_client.js'],
      { cwd: dir }
    );

    this._process.stdout.on('data', _messageHandler.bind(this));
    this._readyTimer = setTimeout(this.emit.bind(this, 'ready'), 1000);
  }

  close(callback) {
    clearTimeout(this._readyTimer);
    this.removeAllListeners();
    this._process && !this._process.killed && this._process.kill();
    if (typeof callback === 'function') {
      setImmediate(callback.bind(null, null, true));
    }
  }

  /**
   * Transform and emit an event comming from the poller.
   *
   * @param {EventEmitter} monitor
   * @public
   */
  emitEvent(type, file, stat) {
    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }
}

WatchexecWatcher._messageHandler = _messageHandler;

module.exports = WatchexecWatcher;
