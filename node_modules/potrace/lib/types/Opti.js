'use strict';

var Point = require('./Point');

function Opti() {
  this.pen = 0;
  this.c = [new Point(), new Point()];
  this.t = 0;
  this.s = 0;
  this.alpha = 0;
}

module.exports = Opti;