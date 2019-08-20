'use strict';

const strip = require('./strip');
const { erase, cursor } = require('sisteransi');

const width = str => [...strip(str)].length;

module.exports = function(prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase.line + cursor.to(0);

  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};
