'use strict';

function Path() {
  this.area = 0;
  this.len = 0;
  this.curve = {};
  this.pt = [];
  this.minX = 100000;
  this.minY = 100000;
  this.maxX = -1;
  this.maxY = -1;
}

module.exports = Path;