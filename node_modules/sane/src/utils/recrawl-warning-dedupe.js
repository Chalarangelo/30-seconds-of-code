'use strict';

class RecrawlWarning {
  constructor(root, count) {
    this.root = root;
    this.count = count;
  }

  static findByRoot(root) {
    for (let i = 0; i < this.RECRAWL_WARNINGS.length; i++) {
      let warning = this.RECRAWL_WARNINGS[i];
      if (warning.root === root) {
        return warning;
      }
    }
  }

  static isRecrawlWarningDupe(warningMessage) {
    if (typeof warningMessage !== 'string') {
      return false;
    }
    let match = warningMessage.match(this.REGEXP);
    if (!match) {
      return false;
    }
    let count = Number(match[1]);
    let root = match[2];

    let warning = this.findByRoot(root);

    if (warning) {
      // only keep the highest count, assume count to either stay the same or
      // increase.
      if (warning.count >= count) {
        return true;
      } else {
        // update the existing warning to the latest (highest) count
        warning.count = count;
        return false;
      }
    } else {
      this.RECRAWL_WARNINGS.push(new RecrawlWarning(root, count));
      return false;
    }
  }
}

RecrawlWarning.RECRAWL_WARNINGS = [];
RecrawlWarning.REGEXP = /Recrawled this watch (\d+) times, most recently because:\n([^:]+)/;

module.exports = RecrawlWarning;
