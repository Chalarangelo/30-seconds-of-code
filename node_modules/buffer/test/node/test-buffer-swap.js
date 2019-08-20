'use strict';
var Buffer = require('../../').Buffer;



var assert = require('assert');

// Test buffers small enough to use the JS implementation
var buf = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
                         0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10]);

assert.strictEqual(buf, buf.swap16());
assert.deepStrictEqual(buf, Buffer.from([0x02, 0x01, 0x04, 0x03, 0x06, 0x05,
                                         0x08, 0x07, 0x0a, 0x09, 0x0c, 0x0b,
                                         0x0e, 0x0d, 0x10, 0x0f]));
buf.swap16(); // restore

assert.strictEqual(buf, buf.swap32());
assert.deepStrictEqual(buf, Buffer.from([0x04, 0x03, 0x02, 0x01, 0x08, 0x07,
                                         0x06, 0x05, 0x0c, 0x0b, 0x0a, 0x09,
                                         0x10, 0x0f, 0x0e, 0x0d]));
buf.swap32(); // restore

assert.strictEqual(buf, buf.swap64());
assert.deepStrictEqual(buf, Buffer.from([0x08, 0x07, 0x06, 0x05, 0x04, 0x03,
                                         0x02, 0x01, 0x10, 0x0f, 0x0e, 0x0d,
                                         0x0c, 0x0b, 0x0a, 0x09]));

// Operates in-place
var buf3 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7]);
buf3.slice(1, 5).swap32();
assert.deepStrictEqual(buf3, Buffer.from([0x1, 0x5, 0x4, 0x3, 0x2, 0x6, 0x7]));

buf3.slice(1, 5).swap16();
assert.deepStrictEqual(buf3, Buffer.from([0x1, 0x4, 0x5, 0x2, 0x3, 0x6, 0x7]));

var buf3_64 = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                             0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
                             0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                             0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10]);
buf3_64.slice(2, 18).swap64();
assert.deepStrictEqual(buf3_64, Buffer.from([0x01, 0x02, 0x0a, 0x09, 0x08, 0x07,
                                             0x06, 0x05, 0x04, 0x03, 0x02, 0x01,
                                             0x10, 0x0f, 0x0e, 0x0d, 0x0c, 0x0b,
                                             0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                                             0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e,
                                             0x0f, 0x10]));

// Force use of native code (Buffer size above threshold limit for js impl)
var buf4A = new Uint32Array(256).fill(0x04030201);
var buf4 = Buffer.from(buf4A.buffer, buf4A.byteOffset);
var buf5A = new Uint32Array(256).fill(0x03040102);
var buf5 = Buffer.from(buf5A.buffer, buf5A.byteOffset);

buf4.swap16();
assert.deepStrictEqual(buf4, buf5);

var buf6A = new Uint32Array(256).fill(0x04030201);
var buf6 = Buffer.from(buf6A.buffer);
var bu7A = new Uint32Array(256).fill(0x01020304);
var buf7 = Buffer.from(bu7A.buffer, bu7A.byteOffset);

buf6.swap32();
assert.deepStrictEqual(buf6, buf7);

var buf8A = new Uint8Array(256 * 8);
var buf9A = new Uint8Array(256 * 8);
for (var i = 0; i < buf8A.length; i++) {
  buf8A[i] = i % 8;
  buf9A[buf9A.length - i - 1] = i % 8;
}
var buf8 = Buffer.from(buf8A.buffer, buf8A.byteOffset);
var buf9 = Buffer.from(buf9A.buffer, buf9A.byteOffset);

buf8.swap64();
assert.deepStrictEqual(buf8, buf9);

// Test native code with buffers that are not memory-aligned
var buf10A = new Uint8Array(256 * 8);
var buf11A = new Uint8Array(256 * 8 - 2);
for (var i = 0; i < buf10A.length; i++) {
  buf10A[i] = i % 2;
}
for (var i = 1; i < buf11A.length; i++) {
  buf11A[buf11A.length - i] = (i + 1) % 2;
}
var buf10 = Buffer.from(buf10A.buffer, buf10A.byteOffset);
// 0|1 0|1 0|1...
var buf11 = Buffer.from(buf11A.buffer, buf11A.byteOffset);
// 0|0 1|0 1|0...

buf10.slice(1, buf10.length - 1).swap16();
assert.deepStrictEqual(buf10.slice(0, buf11.length), buf11);


var buf12A = new Uint8Array(256 * 8);
var buf13A = new Uint8Array(256 * 8 - 4);
for (var i = 0; i < buf12A.length; i++) {
  buf12A[i] = i % 4;
}
for (var i = 1; i < buf13A.length; i++) {
  buf13A[buf13A.length - i] = (i + 1) % 4;
}
var buf12 = Buffer.from(buf12A.buffer, buf12A.byteOffset);
// 0|1 2 3 0|1 2 3...
var buf13 = Buffer.from(buf13A.buffer, buf13A.byteOffset);
// 0|0 3 2 1|0 3 2...

buf12.slice(1, buf12.length - 3).swap32();
assert.deepStrictEqual(buf12.slice(0, buf13.length), buf13);


var buf14A = new Uint8Array(256 * 8);
var buf15A = new Uint8Array(256 * 8 - 8);
for (var i = 0; i < buf14A.length; i++) {
  buf14A[i] = i % 8;
}
for (var i = 1; i < buf15A.length; i++) {
  buf15A[buf15A.length - i] = (i + 1) % 8;
}
var buf14 = Buffer.from(buf14A.buffer, buf14A.byteOffset);
// 0|1 2 3 4 5 6 7 0|1 2 3 4...
var buf15 = Buffer.from(buf15A.buffer, buf15A.byteOffset);
// 0|0 7 6 5 4 3 2 1|0 7 6 5...

buf14.slice(1, buf14.length - 7).swap64();
assert.deepStrictEqual(buf14.slice(0, buf15.length), buf15);

// Length assertions
var re16 = /Buffer size must be a multiple of 16-bits/;
var re32 = /Buffer size must be a multiple of 32-bits/;
var re64 = /Buffer size must be a multiple of 64-bits/;

assert.throws(() => Buffer.from(buf3).swap16(), re16);
assert.throws(() => Buffer.alloc(1025).swap16(), re16);
assert.throws(() => Buffer.from(buf3).swap32(), re32);
assert.throws(() => buf3.slice(1, 3).swap32(), re32);
assert.throws(() => Buffer.alloc(1025).swap32(), re32);
assert.throws(() => buf3.slice(1, 3).swap64(), re64);
assert.throws(() => Buffer.alloc(1025).swap64(), re64);

