'use strict';

const strip = require('./strip');

module.exports = function (msg, perLine = process.stdout.columns) {
  let lines = String(strip(msg) || '').split(/\r?\n/);

  if (!perLine) return lines.length;
  return lines.map(l => Math.ceil(l.length / perLine))
      .reduce((a, b) => a + b);
};
