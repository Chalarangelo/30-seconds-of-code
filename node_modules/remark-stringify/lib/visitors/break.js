'use strict';

module.exports = lineBreak;

var map = {true: '\\\n', false: '  \n'};

function lineBreak() {
  return map[this.options.commonmark];
}
