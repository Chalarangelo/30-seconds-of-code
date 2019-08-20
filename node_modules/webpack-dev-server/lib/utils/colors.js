'use strict';

const colors = {
  info(useColor, msg) {
    if (useColor) {
      // Make text blue and bold, so it *pops*
      return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`;
    }

    return msg;
  },
  error(useColor, msg) {
    if (useColor) {
      // Make text red and bold, so it *pops*
      return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`;
    }

    return msg;
  },
};

module.exports = colors;
