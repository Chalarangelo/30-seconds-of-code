'use strict';

const NodeWatcher = require('./src/node_watcher');
const PollWatcher = require('./src/poll_watcher');
const WatchmanWatcher = require('./src/watchman_watcher');
const WatchexecWatcher = require('./src/watchexec_watcher');

function throwNoFSEventsSupports() {
  throw new Error('Sane >= 4 no longer support the fsevents module.');
}

function sane(dir, options) {
  options = options || {};
  if (options.watcher) {
    const WatcherClass = require(options.watcher);
    return new WatcherClass(dir, options);
  } else if (options.poll) {
    return new PollWatcher(dir, options);
  } else if (options.watchman) {
    return new WatchmanWatcher(dir, options);
  } else if (options.watchexec) {
    return new WatchexecWatcher(dir, options);
  } else if (options.fsevents) {
    throwNoFSEventsSupports();
  } else {
    return new NodeWatcher(dir, options);
  }
}

module.exports = sane;
sane.NodeWatcher = NodeWatcher;
sane.PollWatcher = PollWatcher;
sane.WatchmanWatcher = WatchmanWatcher;
sane.WatchexecWatcher = WatchexecWatcher;

Object.defineProperty(sane, 'FSEventsWatcher', {
  get() {
    return throwNoFSEventsSupports();
  },
});
