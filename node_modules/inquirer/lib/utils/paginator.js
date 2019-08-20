'use strict';

var _ = require('lodash');
var chalk = require('chalk');

/**
 * The paginator keeps track of a pointer index in a list and returns
 * a subset of the choices if the list is too long.
 */

class Paginator {
  constructor(screen) {
    this.pointer = 0;
    this.lastIndex = 0;
    this.screen = screen;
  }

  paginate(output, active, pageSize) {
    pageSize = pageSize || 7;
    var middleOfList = Math.floor(pageSize / 2);
    var lines = output.split('\n');

    if (this.screen) {
      lines = this.screen.breakLines(lines);
      active = _.sum(lines.map(lineParts => lineParts.length).splice(0, active));
      lines = _.flatten(lines);
    }

    // Make sure there's enough lines to paginate
    if (lines.length <= pageSize) {
      return output;
    }

    // Move the pointer only when the user go down and limit it to the middle of the list
    if (
      this.pointer < middleOfList &&
      this.lastIndex < active &&
      active - this.lastIndex < pageSize
    ) {
      this.pointer = Math.min(middleOfList, this.pointer + active - this.lastIndex);
    }

    this.lastIndex = active;

    // Duplicate the lines so it give an infinite list look
    var infinite = _.flatten([lines, lines, lines]);
    var topIndex = Math.max(0, active + lines.length - this.pointer);

    var section = infinite.splice(topIndex, pageSize).join('\n');
    return section + '\n' + chalk.dim('(Move up and down to reveal more choices)');
  }
}

module.exports = Paginator;
