/*
   This file is the executable run by watchexec
   when a change is detected.

   It will extract changes from the environment variables
   set by watchexec and write to stdout in a format
   readable by the file `../watchexec_watcher.js`.
*/
'use strict';

const { EOL } = require('os');

function withPrefixes(prefixes) {
  return function withPrefix(arr, i) {
    return arr.map(str => {
      return `${prefixes[i]} ${str}`;
    });
  };
}

let allPrefixes = ['write', 'rename', 'remove', 'create'];

function extractChanges(context) {
  const {
    WATCHEXEC_COMMON_PATH,
    WATCHEXEC_WRITTEN_PATH,
    WATCHEXEC_RENAMED_PATH,
    WATCHEXEC_REMOVED_PATH,
    WATCHEXEC_CREATED_PATH,
  } = context;

  let events = [
    WATCHEXEC_WRITTEN_PATH,
    WATCHEXEC_RENAMED_PATH,
    WATCHEXEC_REMOVED_PATH,
    WATCHEXEC_CREATED_PATH,
  ];

  let currentPrefixes = events
    .map((l, i) => l && allPrefixes[i])
    .filter(Boolean);

  function toFullPath(arr) {
    return arr.map(path => (WATCHEXEC_COMMON_PATH || '') + path);
  }

  let message = events
    .filter(Boolean)
    .map(str => str.split(':'))
    .map(toFullPath)
    .map(withPrefixes(currentPrefixes))
    .reduce((e, memo) => memo.concat(e), [])
    .join(EOL);

  return message;
}

if (require.main === module) {
  let message = extractChanges(process.env);
  console.log(message);
}

module.exports = extractChanges;
