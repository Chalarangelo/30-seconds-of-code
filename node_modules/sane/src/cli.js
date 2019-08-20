#!/usr/bin/env node
'use strict';

const sane = require('../');
const argv = require('minimist')(process.argv.slice(2));
const execshell = require('exec-sh');

if (argv._.length === 0) {
  const msg =
    'Usage: sane <command> [...directory] [--glob=<filePattern>] ' +
    '[--ignored=<filePattern>] [--poll] [--watchman] [--watchman-path=<watchmanBinaryPath>] [--dot] ' +
    '[--wait=<seconds>] [--only-changes] [--quiet]';
  console.error(msg);
  process.exit();
}

const opts = {};
const command = argv._[0];
const dir = argv._[1] || process.cwd();
const waitTime = Number(argv.wait || argv.w);
const dot = argv.dot || argv.d;
const glob = argv.glob || argv.g;
const ignored = argv.ignored || argv.i;
const poll = argv.poll || argv.p;
const watchman = argv.watchman || argv.w;
const watchmanPath = argv['watchman-path'];
const onlyChanges = argv['only-changes'] | argv.o;
const quiet = argv.quiet | argv.q;

if (dot) {
  opts.dot = true;
}
if (glob) {
  opts.glob = glob;
}
if (ignored) {
  opts.ignored = ignored;
}
if (poll) {
  opts.poll = true;
}
if (watchman) {
  opts.watchman = true;
}
if (watchmanPath) {
  opts.watchmanPath = watchmanPath;
}

let wait = false;
const watcher = sane(dir, opts);

watcher.on('ready', function() {
  if (!quiet) {
    console.log('Watching: ', dir + '/' + (opts.glob || ''));
  }
  if (!onlyChanges) {
    execshell(command);
  }
});

watcher.on('change', function(filepath) {
  if (wait) {
    return;
  }
  if (!quiet) {
    console.log('Change detected in:', filepath);
  }
  execshell(command);

  if (waitTime > 0) {
    wait = true;
    setTimeout(function() {
      wait = false;
    }, waitTime * 1000);
  }
});
