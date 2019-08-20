'use strict';
var Buffer = require('../../').Buffer;



var assert = require('assert');


function T(n) {
  var ui8 = new Uint8Array(n);
  Object.setPrototypeOf(ui8, T.prototype);
  return ui8;
}
Object.setPrototypeOf(T.prototype, Buffer.prototype);
Object.setPrototypeOf(T, Buffer);

T.prototype.sum = function sum() {
  var cntr = 0;
  for (var i = 0; i < this.length; i++)
    cntr += this[i];
  return cntr;
};


var vals = [new T(4), T(4)];

vals.forEach(function(t) {
  assert.equal(t.constructor, T);
  assert.equal(Object.getPrototypeOf(t), T.prototype);
  assert.equal(Object.getPrototypeOf(Object.getPrototypeOf(t)),
    Buffer.prototype);

  t.fill(5);
  var cntr = 0;
  for (var i = 0; i < t.length; i++)
    cntr += t[i];
  assert.equal(t.length * 5, cntr);

  // Check this does not throw
  t.toString();
});

