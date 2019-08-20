'use strict';
var Buffer = require('../../').Buffer;



var assert = require('assert');

var Buffer = require('../../').Buffer;
var LENGTH = 16;

var ab = new ArrayBuffer(LENGTH);
var dv = new DataView(ab);
var ui = new Uint8Array(ab);
var buf = Buffer.from(ab);


assert.ok(buf instanceof Buffer);
// For backwards compatibility of old .parent property test that if buf is not
// a slice then .parent should be undefined.
assert.equal(buf.parent, undefined);
assert.equal(buf.buffer, ab);
assert.equal(buf.length, ab.byteLength);


buf.fill(0xC);
for (var i = 0; i < LENGTH; i++) {
  assert.equal(ui[i], 0xC);
  ui[i] = 0xF;
  assert.equal(buf[i], 0xF);
}

buf.writeUInt32LE(0xF00, 0);
buf.writeUInt32BE(0xB47, 4);
buf.writeDoubleLE(3.1415, 8);

assert.equal(dv.getUint32(0, true), 0xF00);
assert.equal(dv.getUint32(4), 0xB47);
assert.equal(dv.getFloat64(8, true), 3.1415);


// Now test protecting users from doing stupid things

assert.throws(function() {
  function AB() { }
  Object.setPrototypeOf(AB, ArrayBuffer);
  Object.setPrototypeOf(AB.prototype, ArrayBuffer.prototype);
  Buffer.from(new AB());
}, TypeError);

// write{Double,Float}{LE,BE} with noAssert should not crash, cf. #3766
var b = Buffer.allocUnsafe(1);
b.writeFloatLE(11.11, 0, true);
b.writeFloatBE(11.11, 0, true);
b.writeDoubleLE(11.11, 0, true);
b.writeDoubleBE(11.11, 0, true);

// Test the byteOffset and length arguments
{
  var ab = new Uint8Array(5);
  ab[0] = 1;
  ab[1] = 2;
  ab[2] = 3;
  ab[3] = 4;
  ab[4] = 5;
  var buf = Buffer.from(ab.buffer, 1, 3);
  assert.equal(buf.length, 3);
  assert.equal(buf[0], 2);
  assert.equal(buf[1], 3);
  assert.equal(buf[2], 4);
  buf[0] = 9;
  assert.equal(ab[1], 9);

  assert.throws(() => Buffer.from(ab.buffer, 6), (err) => {
    assert(err instanceof RangeError);
    assert(/'offset' is out of bounds/.test(err.message));
    return true;
  });
  assert.throws(() => Buffer.from(ab.buffer, 3, 6), (err) => {
    assert(err instanceof RangeError);
    assert(/'length' is out of bounds/.test(err.message));
    return true;
  });
}

// Test the deprecated Buffer() version also
{
  var ab = new Uint8Array(5);
  ab[0] = 1;
  ab[1] = 2;
  ab[2] = 3;
  ab[3] = 4;
  ab[4] = 5;
  var buf = Buffer(ab.buffer, 1, 3);
  assert.equal(buf.length, 3);
  assert.equal(buf[0], 2);
  assert.equal(buf[1], 3);
  assert.equal(buf[2], 4);
  buf[0] = 9;
  assert.equal(ab[1], 9);

  assert.throws(() => Buffer(ab.buffer, 6), (err) => {
    assert(err instanceof RangeError);
    assert(/'offset' is out of bounds/.test(err.message));
    return true;
  });
  assert.throws(() => Buffer(ab.buffer, 3, 6), (err) => {
    assert(err instanceof RangeError);
    assert(/'length' is out of bounds/.test(err.message));
    return true;
  });
}

