'use strict';

const fs = require('fs');
const path = require('path');
const watch = require('@cnakazawa/watch');
const common = require('./common');
const EventEmitter = require('events').EventEmitter;

/**
 * Constants
 */

const DEFAULT_DELAY = common.DEFAULT_DELAY;
const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

/**
 * Export `PollWatcher` class.
 * Watches `dir`.
 *
 * @class PollWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */

module.exports = class PollWatcher extends EventEmitter {
  constructor(dir, opts) {
    super();

    opts = common.assignOptions(this, opts);

    this.watched = Object.create(null);
    this.root = path.resolve(dir);

    watch.createMonitor(
      this.root,
      {
        interval: (opts.interval || DEFAULT_DELAY) / 1000,
        filter: this.filter.bind(this),
      },
      this.init.bind(this)
    );
  }

  /**
   * Given a fullpath of a file or directory check if we need to watch it.
   *
   * @param {string} filepath
   * @param {object} stat
   * @private
   */

  filter(filepath, stat) {
    return (
      stat.isDirectory() ||
      common.isFileIncluded(
        this.globs,
        this.dot,
        this.doIgnore,
        path.relative(this.root, filepath)
      )
    );
  }

  /**
   * Initiate the polling file watcher with the event emitter passed from
   * `watch.watchTree`.
   *
   * @param {EventEmitter} monitor
   * @public
   */

  init(monitor) {
    this.watched = monitor.files;
    monitor.on('changed', this.emitEvent.bind(this, CHANGE_EVENT));
    monitor.on('removed', this.emitEvent.bind(this, DELETE_EVENT));
    monitor.on('created', this.emitEvent.bind(this, ADD_EVENT));
    // 1 second wait because mtime is second-based.
    setTimeout(this.emit.bind(this, 'ready'), 1000);
  }

  /**
   * Transform and emit an event comming from the poller.
   *
   * @param {EventEmitter} monitor
   * @public
   */

  emitEvent(type, file, stat) {
    file = path.relative(this.root, file);

    if (type === DELETE_EVENT) {
      // Matching the non-polling API
      stat = null;
    }

    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }

  /**
   * End watching.
   *
   * @public
   */

  close(callback) {
    Object.keys(this.watched).forEach(filepath => fs.unwatchFile(filepath));
    this.removeAllListeners();
    if (typeof callback === 'function') {
      setImmediate(callback.bind(null, null, true));
    }
  }
};
