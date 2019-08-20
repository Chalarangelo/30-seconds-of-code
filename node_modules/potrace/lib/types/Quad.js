'use strict';

function Quad() {
  this.data = [0,0,0,0,0,0,0,0,0];
}

Quad.prototype.at = function(x, y) {
  return this.data[x * 3 + y];
};

module.exports = Quad;