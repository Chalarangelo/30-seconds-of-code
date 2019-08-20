'use strict';
var Buffer = require('../../').Buffer;

var common = { skip: function () {} };
var assert = require('assert');

var Buffer = require('../../').Buffer;
var SlowBuffer = require('../../').SlowBuffer;

// counter to ensure unique value is always copied
var cntr = 0;

var b = Buffer(1024); // safe constructor

// console.log('b.length == %d', b.length);
assert.strictEqual(1024, b.length);

b[0] = -1;
assert.strictEqual(b[0], 255);

for (var i = 0; i < 1024; i++) {
  b[i] = i % 256;
}

for (var i = 0; i < 1024; i++) {
  assert.strictEqual(i % 256, b[i]);
}

var c = Buffer(512);
// console.log('c.length == %d', c.length);
assert.strictEqual(512, c.length);

var d = new Buffer([]);
assert.strictEqual(0, d.length);

var ui32 = new Uint32Array(4).fill(42);
var e = Buffer(ui32);
for (var [key, value] of e.entries()) {
  assert.deepStrictEqual(value, ui32[key]);
}

// First check Buffer#fill() works as expected.

assert.throws(function() {
  Buffer(8).fill('a', -1);
});

assert.throws(function() {
  Buffer(8).fill('a', 0, 9);
});

// Make sure this doesn't hang indefinitely.
Buffer(8).fill('');

{
  var buf = new Buffer(64);
  buf.fill(10);
  for (var i = 0; i < buf.length; i++)
    assert.equal(buf[i], 10);

  buf.fill(11, 0, buf.length >> 1);
  for (var i = 0; i < buf.length >> 1; i++)
    assert.equal(buf[i], 11);
  for (var i = (buf.length >> 1) + 1; i < buf.length; i++)
    assert.equal(buf[i], 10);

  buf.fill('h');
  for (var i = 0; i < buf.length; i++)
    assert.equal('h'.charCodeAt(0), buf[i]);

  buf.fill(0);
  for (var i = 0; i < buf.length; i++)
    assert.equal(0, buf[i]);

  buf.fill(null);
  for (var i = 0; i < buf.length; i++)
    assert.equal(0, buf[i]);

  buf.fill(1, 16, 32);
  for (var i = 0; i < 16; i++)
    assert.equal(0, buf[i]);
  for (var i = 16; i < 32; i++)
    assert.equal(1, buf[i]);
  for (var i = 32; i < buf.length; i++)
    assert.equal(0, buf[i]);
}

{
  var buf = new Buffer(10);
  buf.fill('abc');
  assert.equal(buf.toString(), 'abcabcabca');
  buf.fill('է');
  assert.equal(buf.toString(), 'էէէէէ');
}

{
  // copy 512 bytes, from 0 to 512.
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 512);
//   console.log('copied %d bytes from b into c', copied);
  assert.strictEqual(512, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}

{
  // copy c into b, without specifying sourceEnd
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = c.copy(b, 0, 0);
//   console.log('copied %d bytes from c into b w/o sourceEnd', copied);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(c[i], b[i]);
  }
}

{
  // copy c into b, without specifying sourceStart
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = c.copy(b, 0);
//   console.log('copied %d bytes from c into b w/o sourceStart', copied);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(c[i], b[i]);
  }
}

{
  // copy longer buffer b to shorter c without targetStart
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c);
//   console.log('copied %d bytes from b into c w/o targetStart', copied);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}

{
  // copy starting near end of b to c
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, b.length - Math.floor(c.length / 2));
//   console.log('copied %d bytes from end of b into beginning of c', copied);
  assert.strictEqual(Math.floor(c.length / 2), copied);
  for (var i = 0; i < Math.floor(c.length / 2); i++) {
    assert.strictEqual(b[b.length - Math.floor(c.length / 2) + i], c[i]);
  }
  for (var i = Math.floor(c.length / 2) + 1; i < c.length; i++) {
    assert.strictEqual(c[c.length - 1], c[i]);
  }
}

{
  // try to copy 513 bytes, and check we don't overrun c
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 513);
//   console.log('copied %d bytes from b trying to overrun c', copied);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}

{
  // copy 768 bytes from b into b
  b.fill(++cntr);
  b.fill(++cntr, 256);
  var copied = b.copy(b, 0, 256, 1024);
//   console.log('copied %d bytes from b into b', copied);
  assert.strictEqual(768, copied);
  for (var i = 0; i < b.length; i++) {
    assert.strictEqual(cntr, b[i]);
  }
}

// copy string longer than buffer length (failure will segfault)
var bb = Buffer(10);
bb.fill('hello crazy world');


// try to copy from before the beginning of b
assert.doesNotThrow(() => { b.copy(c, 0, 100, 10); });

// copy throws at negative sourceStart
assert.throws(function() {
  Buffer(5).copy(Buffer(5), 0, -1);
}, RangeError);

{
  // check sourceEnd resets to targetEnd if former is greater than the latter
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 1025);
//   console.log('copied %d bytes from b into c', copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}

// throw with negative sourceEnd
// console.log('test copy at negative sourceEnd');
assert.throws(function() {
  b.copy(c, 0, 0, -1);
}, RangeError);

// when sourceStart is greater than sourceEnd, zero copied
assert.equal(b.copy(c, 0, 100, 10), 0);

// when targetStart > targetLength, zero copied
assert.equal(b.copy(c, 512, 0, 10), 0);

var caught_error;

// invalid encoding for Buffer.toString
caught_error = null;
try {
  b.toString('invalid');
} catch (err) {
  caught_error = err;
}
assert.strictEqual('Unknown encoding: invalid', caught_error.message);

// invalid encoding for Buffer.write
caught_error = null;
try {
  b.write('test string', 0, 5, 'invalid');
} catch (err) {
  caught_error = err;
}
assert.strictEqual('Unknown encoding: invalid', caught_error.message);

// try to create 0-length buffers
new Buffer('');
new Buffer('', 'ascii');
new Buffer('', 'latin1');
new Buffer('', 'binary');
Buffer(0);

// try to write a 0-length string beyond the end of b
assert.throws(function() {
  b.write('', 2048);
}, RangeError);

// throw when writing to negative offset
assert.throws(function() {
  b.write('a', -1);
}, RangeError);

// throw when writing past bounds from the pool
assert.throws(function() {
  b.write('a', 2048);
}, RangeError);

// throw when writing to negative offset
assert.throws(function() {
  b.write('a', -1);
}, RangeError);

// try to copy 0 bytes worth of data into an empty buffer
b.copy(Buffer(0), 0, 0, 0);

// try to copy 0 bytes past the end of the target buffer
b.copy(Buffer(0), 1, 1, 1);
b.copy(Buffer(1), 1, 1, 1);

// try to copy 0 bytes from past the end of the source buffer
b.copy(Buffer(1), 0, 2048, 2048);

var rangeBuffer = new Buffer('abc');

// if start >= buffer's length, empty string will be returned
assert.equal(rangeBuffer.toString('ascii', 3), '');
assert.equal(rangeBuffer.toString('ascii', +Infinity), '');
assert.equal(rangeBuffer.toString('ascii', 3.14, 3), '');
assert.equal(rangeBuffer.toString('ascii', 'Infinity', 3), '');

// if end <= 0, empty string will be returned
assert.equal(rangeBuffer.toString('ascii', 1, 0), '');
assert.equal(rangeBuffer.toString('ascii', 1, -1.2), '');
assert.equal(rangeBuffer.toString('ascii', 1, -100), '');
assert.equal(rangeBuffer.toString('ascii', 1, -Infinity), '');

// if start < 0, start will be taken as zero
assert.equal(rangeBuffer.toString('ascii', -1, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', -1.99, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', -Infinity, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-1', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-1.99', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-Infinity', 3), 'abc');

// if start is an invalid integer, start will be taken as zero
assert.equal(rangeBuffer.toString('ascii', 'node.js', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', {}, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', [], 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', NaN, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', null, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', undefined, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', false, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '', 3), 'abc');

// but, if start is an integer when coerced, then it will be coerced and used.
assert.equal(rangeBuffer.toString('ascii', '-1', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '1', 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', '-Infinity', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '3', 3), '');
assert.equal(rangeBuffer.toString('ascii', Number(3), 3), '');
assert.equal(rangeBuffer.toString('ascii', '3.14', 3), '');
assert.equal(rangeBuffer.toString('ascii', '1.99', 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', '-1.99', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', 1.99, 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', true, 3), 'bc');

// if end > buffer's length, end will be taken as buffer's length
assert.equal(rangeBuffer.toString('ascii', 0, 5), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, 6.99), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, Infinity), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '5'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '6.99'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, 'Infinity'), 'abc');

// if end is an invalid integer, end will be taken as buffer's length
assert.equal(rangeBuffer.toString('ascii', 0, 'node.js'), '');
assert.equal(rangeBuffer.toString('ascii', 0, {}), '');
assert.equal(rangeBuffer.toString('ascii', 0, NaN), '');
assert.equal(rangeBuffer.toString('ascii', 0, undefined), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, null), '');
assert.equal(rangeBuffer.toString('ascii', 0, []), '');
assert.equal(rangeBuffer.toString('ascii', 0, false), '');
assert.equal(rangeBuffer.toString('ascii', 0, ''), '');

// but, if end is an integer when coerced, then it will be coerced and used.
assert.equal(rangeBuffer.toString('ascii', 0, '-1'), '');
assert.equal(rangeBuffer.toString('ascii', 0, '1'), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, '-Infinity'), '');
assert.equal(rangeBuffer.toString('ascii', 0, '3'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, Number(3)), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '3.14'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '1.99'), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, '-1.99'), '');
assert.equal(rangeBuffer.toString('ascii', 0, 1.99), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, true), 'a');

// try toString() with a object as a encoding
assert.equal(rangeBuffer.toString({toString: function() {
  return 'ascii';
}}), 'abc');

// testing for smart defaults and ability to pass string values as offset
var writeTest = new Buffer('abcdes');
writeTest.write('n', 'ascii');
writeTest.write('o', '1', 'ascii');
writeTest.write('d', '2', 'ascii');
writeTest.write('e', 3, 'ascii');
writeTest.write('j', 4, 'ascii');
assert.equal(writeTest.toString(), 'nodejs');

// ASCII slice test
{
  var asciiString = 'hello world';

  for (var i = 0; i < asciiString.length; i++) {
    b[i] = asciiString.charCodeAt(i);
  }
  var asciiSlice = b.toString('ascii', 0, asciiString.length);
  assert.equal(asciiString, asciiSlice);
}

{
  var asciiString = 'hello world';
  var offset = 100;

  var written = b.write(asciiString, offset, 'ascii');
  assert.equal(asciiString.length, written);
  var asciiSlice = b.toString('ascii', offset, offset + asciiString.length);
  assert.equal(asciiString, asciiSlice);
}

{
  var asciiString = 'hello world';
  var offset = 100;

  var sliceA = b.slice(offset, offset + asciiString.length);
  var sliceB = b.slice(offset, offset + asciiString.length);
  for (var i = 0; i < asciiString.length; i++) {
    assert.equal(sliceA[i], sliceB[i]);
  }
}

// UTF-8 slice test

var utf8String = '¡hέlló wôrld!';
var offset = 100;

b.write(utf8String, 0, Buffer.byteLength(utf8String), 'utf8');
var utf8Slice = b.toString('utf8', 0, Buffer.byteLength(utf8String));
assert.equal(utf8String, utf8Slice);

var written = b.write(utf8String, offset, 'utf8');
assert.equal(Buffer.byteLength(utf8String), written);
utf8Slice = b.toString('utf8', offset, offset + Buffer.byteLength(utf8String));
assert.equal(utf8String, utf8Slice);

var sliceA = b.slice(offset, offset + Buffer.byteLength(utf8String));
var sliceB = b.slice(offset, offset + Buffer.byteLength(utf8String));
for (var i = 0; i < Buffer.byteLength(utf8String); i++) {
  assert.equal(sliceA[i], sliceB[i]);
}

{
  var slice = b.slice(100, 150);
  assert.equal(50, slice.length);
  for (var i = 0; i < 50; i++) {
    assert.equal(b[100 + i], slice[i]);
  }
}

{
  // make sure only top level parent propagates from allocPool
  var b = new Buffer(5);
  var c = b.slice(0, 4);
  var d = c.slice(0, 2);
  assert.equal(b.parent, c.parent);
  assert.equal(b.parent, d.parent);
}

{
  // also from a non-pooled instance
  var b = new SlowBuffer(5);
  var c = b.slice(0, 4);
  var d = c.slice(0, 2);
  assert.equal(c.parent, d.parent);
}

{
  // Bug regression test
  var testValue = '\u00F6\u65E5\u672C\u8A9E'; // ö日本語
  var buffer = new Buffer(32);
  var size = buffer.write(testValue, 0, 'utf8');
//   console.log('bytes written to buffer: ' + size);
  var slice = buffer.toString('utf8', 0, size);
  assert.equal(slice, testValue);
}

{
  // Test triple  slice
  var a = new Buffer(8);
  for (var i = 0; i < 8; i++) a[i] = i;
  var b = a.slice(4, 8);
  assert.equal(4, b[0]);
  assert.equal(5, b[1]);
  assert.equal(6, b[2]);
  assert.equal(7, b[3]);
  var c = b.slice(2, 4);
  assert.equal(6, c[0]);
  assert.equal(7, c[1]);
}

{
  var d = new Buffer([23, 42, 255]);
  assert.equal(d.length, 3);
  assert.equal(d[0], 23);
  assert.equal(d[1], 42);
  assert.equal(d[2], 255);
  assert.deepStrictEqual(d, new Buffer(d));
}

{
  var e = new Buffer('über');
//   console.error('uber: \'%s\'', e.toString());
  assert.deepStrictEqual(e, new Buffer([195, 188, 98, 101, 114]));
}

{
  var f = new Buffer('über', 'ascii');
//   console.error('f.length: %d     (should be 4)', f.length);
  assert.deepStrictEqual(f, new Buffer([252, 98, 101, 114]));
}

['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
  {
    var f = new Buffer('über', encoding);
//     console.error('f.length: %d     (should be 8)', f.length);
    assert.deepStrictEqual(f, new Buffer([252, 0, 98, 0, 101, 0, 114, 0]));
  }

  {
    var f = new Buffer('привет', encoding);
//     console.error('f.length: %d     (should be 12)', f.length);
    var expected = new Buffer([63, 4, 64, 4, 56, 4, 50, 4, 53, 4, 66, 4]);
    assert.deepStrictEqual(f, expected);
    assert.equal(f.toString(encoding), 'привет');
  }

  {
    var f = new Buffer([0, 0, 0, 0, 0]);
    assert.equal(f.length, 5);
    var size = f.write('あいうえお', encoding);
//     console.error('bytes written to buffer: %d     (should be 4)', size);
    assert.equal(size, 4);
    assert.deepStrictEqual(f, new Buffer([0x42, 0x30, 0x44, 0x30, 0x00]));
  }
});

{
  var f = new Buffer('\uD83D\uDC4D', 'utf-16le'); // THUMBS UP SIGN (U+1F44D)
  assert.equal(f.length, 4);
  assert.deepStrictEqual(f, new Buffer('3DD84DDC', 'hex'));
}


var arrayIsh = {0: 0, 1: 1, 2: 2, 3: 3, length: 4};
var g = new Buffer(arrayIsh);
assert.deepStrictEqual(g, new Buffer([0, 1, 2, 3]));
var strArrayIsh = {0: '0', 1: '1', 2: '2', 3: '3', length: 4};
g = new Buffer(strArrayIsh);
assert.deepStrictEqual(g, new Buffer([0, 1, 2, 3]));


//
// Test toString('base64')
//
assert.equal('TWFu', (new Buffer('Man')).toString('base64'));

{
  // test that regular and URL-safe base64 both work
  var expected = [0xff, 0xff, 0xbe, 0xff, 0xef, 0xbf, 0xfb, 0xef, 0xff];
  assert.deepStrictEqual(Buffer('//++/++/++//', 'base64'), Buffer(expected));
  assert.deepStrictEqual(Buffer('__--_--_--__', 'base64'), Buffer(expected));
}

{
  // big example
  var quote = 'Man is distinguished, not only by his reason, but by this ' +
                'singular passion from other animals, which is a lust ' +
                'of the mind, that by a perseverance of delight in the ' +
                'continued and indefatigable generation of knowledge, ' +
                'exceeds the short vehemence of any carnal pleasure.';
  var expected = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb' +
                   '24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlci' +
                   'BhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQ' +
                   'gYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGlu' +
                   'dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZ' +
                   'GdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm' +
                   '5hbCBwbGVhc3VyZS4=';
  assert.equal(expected, (new Buffer(quote)).toString('base64'));

  var b = new Buffer(1024);
  var bytesWritten = b.write(expected, 0, 'base64');
  assert.equal(quote.length, bytesWritten);
  assert.equal(quote, b.toString('ascii', 0, quote.length));

  // check that the base64 decoder ignores whitespace
  var expectedWhite = expected.slice(0, 60) + ' \n' +
                        expected.slice(60, 120) + ' \n' +
                        expected.slice(120, 180) + ' \n' +
                        expected.slice(180, 240) + ' \n' +
                        expected.slice(240, 300) + '\n' +
                        expected.slice(300, 360) + '\n';
  b = new Buffer(1024);
  bytesWritten = b.write(expectedWhite, 0, 'base64');
  assert.equal(quote.length, bytesWritten);
  assert.equal(quote, b.toString('ascii', 0, quote.length));

  // check that the base64 decoder on the constructor works
  // even in the presence of whitespace.
  b = new Buffer(expectedWhite, 'base64');
  assert.equal(quote.length, b.length);
  assert.equal(quote, b.toString('ascii', 0, quote.length));

  // check that the base64 decoder ignores illegal chars
  var expectedIllegal = expected.slice(0, 60) + ' \x80' +
                          expected.slice(60, 120) + ' \xff' +
                          expected.slice(120, 180) + ' \x00' +
                          expected.slice(180, 240) + ' \x98' +
                          expected.slice(240, 300) + '\x03' +
                          expected.slice(300, 360);
  b = new Buffer(expectedIllegal, 'base64');
  assert.equal(quote.length, b.length);
  assert.equal(quote, b.toString('ascii', 0, quote.length));
}

assert.equal(new Buffer('', 'base64').toString(), '');
assert.equal(new Buffer('K', 'base64').toString(), '');

// multiple-of-4 with padding
assert.equal(new Buffer('Kg==', 'base64').toString(), '*');
assert.equal(new Buffer('Kio=', 'base64').toString(), '**');
assert.equal(new Buffer('Kioq', 'base64').toString(), '***');
assert.equal(new Buffer('KioqKg==', 'base64').toString(), '****');
assert.equal(new Buffer('KioqKio=', 'base64').toString(), '*****');
assert.equal(new Buffer('KioqKioq', 'base64').toString(), '******');
assert.equal(new Buffer('KioqKioqKg==', 'base64').toString(), '*******');
assert.equal(new Buffer('KioqKioqKio=', 'base64').toString(), '********');
assert.equal(new Buffer('KioqKioqKioq', 'base64').toString(), '*********');
assert.equal(new Buffer('KioqKioqKioqKg==', 'base64').toString(),
             '**********');
assert.equal(new Buffer('KioqKioqKioqKio=', 'base64').toString(),
             '***********');
assert.equal(new Buffer('KioqKioqKioqKioq', 'base64').toString(),
             '************');
assert.equal(new Buffer('KioqKioqKioqKioqKg==', 'base64').toString(),
             '*************');
assert.equal(new Buffer('KioqKioqKioqKioqKio=', 'base64').toString(),
             '**************');
assert.equal(new Buffer('KioqKioqKioqKioqKioq', 'base64').toString(),
             '***************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKg==', 'base64').toString(),
             '****************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKio=', 'base64').toString(),
             '*****************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKioq', 'base64').toString(),
             '******************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKioqKg==', 'base64').toString(),
             '*******************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKioqKio=', 'base64').toString(),
             '********************');

// no padding, not a multiple of 4
assert.equal(new Buffer('Kg', 'base64').toString(), '*');
assert.equal(new Buffer('Kio', 'base64').toString(), '**');
assert.equal(new Buffer('KioqKg', 'base64').toString(), '****');
assert.equal(new Buffer('KioqKio', 'base64').toString(), '*****');
assert.equal(new Buffer('KioqKioqKg', 'base64').toString(), '*******');
assert.equal(new Buffer('KioqKioqKio', 'base64').toString(), '********');
assert.equal(new Buffer('KioqKioqKioqKg', 'base64').toString(), '**********');
assert.equal(new Buffer('KioqKioqKioqKio', 'base64').toString(), '***********');
assert.equal(new Buffer('KioqKioqKioqKioqKg', 'base64').toString(),
             '*************');
assert.equal(new Buffer('KioqKioqKioqKioqKio', 'base64').toString(),
             '**************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKg', 'base64').toString(),
             '****************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKio', 'base64').toString(),
             '*****************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKioqKg', 'base64').toString(),
             '*******************');
assert.equal(new Buffer('KioqKioqKioqKioqKioqKioqKio', 'base64').toString(),
             '********************');

// handle padding graciously, multiple-of-4 or not
assert.equal(
  new Buffer('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw==', 'base64').length,
  32
);
assert.equal(
  new Buffer('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw=', 'base64').length,
  32
);
assert.equal(
  new Buffer('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw', 'base64').length,
  32
);
assert.equal(
  new Buffer('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg==', 'base64').length,
  31
);
assert.equal(
  new Buffer('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg=', 'base64').length,
  31
);
assert.equal(
  new Buffer('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg', 'base64').length,
  31
);

// This string encodes single '.' character in UTF-16
var dot = new Buffer('//4uAA==', 'base64');
assert.equal(dot[0], 0xff);
assert.equal(dot[1], 0xfe);
assert.equal(dot[2], 0x2e);
assert.equal(dot[3], 0x00);
assert.equal(dot.toString('base64'), '//4uAA==');

{
  // Writing base64 at a position > 0 should not mangle the result.
  //
  // https://github.com/joyent/node/issues/402
  var segments = ['TWFkbmVzcz8h', 'IFRoaXM=', 'IGlz', 'IG5vZGUuanMh'];
  var b = new Buffer(64);
  var pos = 0;

  for (var i = 0; i < segments.length; ++i) {
    pos += b.write(segments[i], pos, 'base64');
  }
  assert.equal(b.toString('latin1', 0, pos), 'Madness?! This is node.js!');
  assert.equal(b.toString('binary', 0, pos), 'Madness?! This is node.js!');
}

// Regression test for https://github.com/nodejs/node/issues/3496.
// assert.equal(Buffer('=bad'.repeat(1e4), 'base64').length, 0);

{
  // Creating buffers larger than pool size.
  var l = Buffer.poolSize + 5;
  var s = 'h'.repeat(l);

  var b = new Buffer(s);

  for (var i = 0; i < l; i++) {
    assert.equal('h'.charCodeAt(0), b[i]);
  }

  var sb = b.toString();
  assert.equal(sb.length, s.length);
  assert.equal(sb, s);
}

{
  // Single argument slice
  var b = new Buffer('abcde');
  assert.equal('bcde', b.slice(1).toString());
}

// slice(0,0).length === 0
assert.equal(0, Buffer('hello').slice(0, 0).length);

// test hex toString
// console.log('Create hex string from buffer');
var hexb = new Buffer(256);
for (var i = 0; i < 256; i++) {
  hexb[i] = i;
}
var hexStr = hexb.toString('hex');
assert.equal(hexStr,
             '000102030405060708090a0b0c0d0e0f' +
             '101112131415161718191a1b1c1d1e1f' +
             '202122232425262728292a2b2c2d2e2f' +
             '303132333435363738393a3b3c3d3e3f' +
             '404142434445464748494a4b4c4d4e4f' +
             '505152535455565758595a5b5c5d5e5f' +
             '606162636465666768696a6b6c6d6e6f' +
             '707172737475767778797a7b7c7d7e7f' +
             '808182838485868788898a8b8c8d8e8f' +
             '909192939495969798999a9b9c9d9e9f' +
             'a0a1a2a3a4a5a6a7a8a9aaabacadaeaf' +
             'b0b1b2b3b4b5b6b7b8b9babbbcbdbebf' +
             'c0c1c2c3c4c5c6c7c8c9cacbcccdcecf' +
             'd0d1d2d3d4d5d6d7d8d9dadbdcdddedf' +
             'e0e1e2e3e4e5e6e7e8e9eaebecedeeef' +
             'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff');

// console.log('Create buffer from hex string');
var hexb2 = new Buffer(hexStr, 'hex');
for (var i = 0; i < 256; i++) {
  assert.equal(hexb2[i], hexb[i]);
}

// Test single hex character throws TypeError
// - https://github.com/nodejs/node/issues/6770
assert.throws(function() {
  Buffer.from('A', 'hex');
}, TypeError);

// Test single base64 char encodes as 0
// assert.strictEqual(Buffer.from('A', 'base64').length, 0);

{
  // test an invalid slice end.
//   console.log('Try to slice off the end of the buffer');
  var b = new Buffer([1, 2, 3, 4, 5]);
  var b2 = b.toString('hex', 1, 10000);
  var b3 = b.toString('hex', 1, 5);
  var b4 = b.toString('hex', 1);
  assert.equal(b2, b3);
  assert.equal(b2, b4);
}

function buildBuffer(data) {
  if (Array.isArray(data)) {
    var buffer = Buffer(data.length);
    data.forEach(function(v, k) {
      buffer[k] = v;
    });
    return buffer;
  }
  return null;
}

var x = buildBuffer([0x81, 0xa3, 0x66, 0x6f, 0x6f, 0xa3, 0x62, 0x61, 0x72]);

// console.log(x.inspect());
assert.equal('<Buffer 81 a3 66 6f 6f a3 62 61 72>', x.inspect());

{
  var z = x.slice(4);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(5, z.length);
  assert.equal(0x6f, z[0]);
  assert.equal(0xa3, z[1]);
  assert.equal(0x62, z[2]);
  assert.equal(0x61, z[3]);
  assert.equal(0x72, z[4]);
}

{
  var z = x.slice(0);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(z.length, x.length);
}

{
  var z = x.slice(0, 4);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(4, z.length);
  assert.equal(0x81, z[0]);
  assert.equal(0xa3, z[1]);
}

{
  var z = x.slice(0, 9);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(9, z.length);
}

{
  var z = x.slice(1, 4);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(3, z.length);
  assert.equal(0xa3, z[0]);
}

{
  var z = x.slice(2, 4);
//   console.log(z.inspect());
//   console.log(z.length);
  assert.equal(2, z.length);
  assert.equal(0x66, z[0]);
  assert.equal(0x6f, z[1]);
}

assert.equal(0, Buffer('hello').slice(0, 0).length);

['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
  var b = new Buffer(10);
  b.write('あいうえお', encoding);
  assert.equal(b.toString(encoding), 'あいうえお');
});

{
  // latin1 encoding should write only one byte per character.
  var b = Buffer([0xde, 0xad, 0xbe, 0xef]);
  var s = String.fromCharCode(0xffff);
  b.write(s, 0, 'latin1');
  assert.equal(0xff, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
  s = String.fromCharCode(0xaaee);
  b.write(s, 0, 'latin1');
  assert.equal(0xee, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
}

{
  // Binary encoding should write only one byte per character.
  var b = Buffer([0xde, 0xad, 0xbe, 0xef]);
  var s = String.fromCharCode(0xffff);
  b.write(s, 0, 'binary');
  assert.equal(0xff, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
  s = String.fromCharCode(0xaaee);
  b.write(s, 0, 'binary');
  assert.equal(0xee, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
}

{
  // #1210 Test UTF-8 string includes null character
  var buf = new Buffer('\0');
  assert.equal(buf.length, 1);
  buf = new Buffer('\0\0');
  assert.equal(buf.length, 2);
}

{
  var buf = new Buffer(2);
  var written = buf.write(''); // 0byte
  assert.equal(written, 0);
  written = buf.write('\0'); // 1byte (v8 adds null terminator)
  assert.equal(written, 1);
  written = buf.write('a\0'); // 1byte * 2
  assert.equal(written, 2);
  written = buf.write('あ'); // 3bytes
  assert.equal(written, 0);
  written = buf.write('\0あ'); // 1byte + 3bytes
  assert.equal(written, 1);
  written = buf.write('\0\0あ'); // 1byte * 2 + 3bytes
  assert.equal(written, 2);
}

{
  var buf = new Buffer(10);
  written = buf.write('あいう'); // 3bytes * 3 (v8 adds null terminator)
  assert.equal(written, 9);
  written = buf.write('あいう\0'); // 3bytes * 3 + 1byte
  assert.equal(written, 10);
}

{
  // #243 Test write() with maxLength
  var buf = new Buffer(4);
  buf.fill(0xFF);
  var written = buf.write('abcd', 1, 2, 'utf8');
//   console.log(buf);
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0xFF);

  buf.fill(0xFF);
  written = buf.write('abcd', 1, 4);
//   console.log(buf);
  assert.equal(written, 3);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0x63);

  buf.fill(0xFF);
  written = buf.write('abcd', 1, 2, 'utf8');
//   console.log(buf);
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0xFF);

  buf.fill(0xFF);
  written = buf.write('abcdef', 1, 2, 'hex');
//   console.log(buf);
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0xAB);
  assert.equal(buf[2], 0xCD);
  assert.equal(buf[3], 0xFF);

  ['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
    buf.fill(0xFF);
    written = buf.write('abcd', 0, 2, encoding);
//     console.log(buf);
    assert.equal(written, 2);
    assert.equal(buf[0], 0x61);
    assert.equal(buf[1], 0x00);
    assert.equal(buf[2], 0xFF);
    assert.equal(buf[3], 0xFF);
  });
}

{
  // test offset returns are correct
  var b = new Buffer(16);
  assert.equal(4, b.writeUInt32LE(0, 0));
  assert.equal(6, b.writeUInt16LE(0, 4));
  assert.equal(7, b.writeUInt8(0, 6));
  assert.equal(8, b.writeInt8(0, 7));
  assert.equal(16, b.writeDoubleLE(0, 8));
}

{
  // test unmatched surrogates not producing invalid utf8 output
  // ef bf bd = utf-8 representation of unicode replacement character
  // see https://codereview.chromium.org/121173009/
  var buf = new Buffer('ab\ud800cd', 'utf8');
  assert.equal(buf[0], 0x61);
  assert.equal(buf[1], 0x62);
  assert.equal(buf[2], 0xef);
  assert.equal(buf[3], 0xbf);
  assert.equal(buf[4], 0xbd);
  assert.equal(buf[5], 0x63);
  assert.equal(buf[6], 0x64);
}

{
  // test for buffer overrun
  var buf = new Buffer([0, 0, 0, 0, 0]); // length: 5
  var sub = buf.slice(0, 4);         // length: 4
  written = sub.write('12345', 'latin1');
  assert.equal(written, 4);
  assert.equal(buf[4], 0);
  written = sub.write('12345', 'binary');
  assert.equal(written, 4);
  assert.equal(buf[4], 0);
}

// Check for fractional length args, junk length args, etc.
// https://github.com/joyent/node/issues/1758

// Call .fill() first, stops valgrind warning about uninitialized memory reads.
Buffer(3.3).fill().toString(); // throws bad argument error in commit 43cb4ec
assert.equal(Buffer(NaN).length, 0);
assert.equal(Buffer(3.3).length, 3);
assert.equal(Buffer({length: 3.3}).length, 3);
assert.equal(Buffer({length: 'BAM'}).length, 0);

// Make sure that strings are not coerced to numbers.
assert.equal(Buffer('99').length, 2);
assert.equal(Buffer('13.37').length, 5);

// Ensure that the length argument is respected.
'ascii utf8 hex base64 latin1 binary'.split(' ').forEach(function(enc) {
  assert.equal(Buffer(1).write('aaaaaa', 0, 1, enc), 1);
});

{
  // Regression test, guard against buffer overrun in the base64 decoder.
  var a = Buffer(3);
  var b = Buffer('xxx');
  a.write('aaaaaaaa', 'base64');
  assert.equal(b.toString(), 'xxx');
}

// issue GH-3416
Buffer(Buffer(0), 0, 0);

[ 'hex',
  'utf8',
  'utf-8',
  'ascii',
  'latin1',
  'binary',
  'base64',
  'ucs2',
  'ucs-2',
  'utf16le',
  'utf-16le' ].forEach(function(enc) {
    assert.equal(Buffer.isEncoding(enc), true);
  });

[ 'utf9',
  'utf-7',
  'Unicode-FTW',
  'new gnu gun' ].forEach(function(enc) {
    assert.equal(Buffer.isEncoding(enc), false);
  });


// GH-5110
{
  var buffer = new Buffer('test');
  var string = JSON.stringify(buffer);

  assert.strictEqual(string, '{"type":"Buffer","data":[116,101,115,116]}');

  assert.deepStrictEqual(buffer, JSON.parse(string, function(key, value) {
    return value && value.type === 'Buffer'
      ? new Buffer(value.data)
      : value;
  }));
}

// issue GH-7849
{
  var buf = new Buffer('test');
  var json = JSON.stringify(buf);
  var obj = JSON.parse(json);
  var copy = new Buffer(obj);

  assert(buf.equals(copy));
}

// issue GH-4331
assert.throws(function() {
  Buffer(0xFFFFFFFF);
}, RangeError);
assert.throws(function() {
  Buffer(0xFFFFFFFFF);
}, RangeError);

// issue GH-5587
assert.throws(function() {
  var buf = new Buffer(8);
  buf.writeFloatLE(0, 5);
}, RangeError);
assert.throws(function() {
  var buf = new Buffer(16);
  buf.writeDoubleLE(0, 9);
}, RangeError);


// attempt to overflow buffers, similar to previous bug in array buffers
assert.throws(function() {
  var buf = Buffer(8);
  buf.readFloatLE(0xffffffff);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.writeFloatLE(0.0, 0xffffffff);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.readFloatLE(0xffffffff);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.writeFloatLE(0.0, 0xffffffff);
}, RangeError);


// ensure negative values can't get past offset
assert.throws(function() {
  var buf = Buffer(8);
  buf.readFloatLE(-1);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.writeFloatLE(0.0, -1);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.readFloatLE(-1);
}, RangeError);

assert.throws(function() {
  var buf = Buffer(8);
  buf.writeFloatLE(0.0, -1);
}, RangeError);

// offset checks
{
  var buf = new Buffer(0);

  assert.throws(function() { buf.readUInt8(0); }, RangeError);
  assert.throws(function() { buf.readInt8(0); }, RangeError);
}

{
  var buf = new Buffer([0xFF]);

  assert.equal(buf.readUInt8(0), 255);
  assert.equal(buf.readInt8(0), -1);
}

[16, 32].forEach(function(bits) {
  var buf = new Buffer(bits / 8 - 1);

  assert.throws(function() { buf['readUInt' + bits + 'BE'](0); },
                RangeError,
                'readUInt' + bits + 'BE');

  assert.throws(function() { buf['readUInt' + bits + 'LE'](0); },
                RangeError,
                'readUInt' + bits + 'LE');

  assert.throws(function() { buf['readInt' + bits + 'BE'](0); },
                RangeError,
                'readInt' + bits + 'BE()');

  assert.throws(function() { buf['readInt' + bits + 'LE'](0); },
                RangeError,
                'readInt' + bits + 'LE()');
});

[16, 32].forEach(function(bits) {
  var buf = new Buffer([0xFF, 0xFF, 0xFF, 0xFF]);

  assert.equal(buf['readUInt' + bits + 'BE'](0),
                (0xFFFFFFFF >>> (32 - bits)));

  assert.equal(buf['readUInt' + bits + 'LE'](0),
                (0xFFFFFFFF >>> (32 - bits)));

  assert.equal(buf['readInt' + bits + 'BE'](0),
                (0xFFFFFFFF >> (32 - bits)));

  assert.equal(buf['readInt' + bits + 'LE'](0),
                (0xFFFFFFFF >> (32 - bits)));
});

// test for common read(U)IntLE/BE
{
  var buf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

  assert.strictEqual(buf.readUIntLE(0, 1), 0x01);
  assert.strictEqual(buf.readUIntBE(0, 1), 0x01);
  assert.strictEqual(buf.readUIntLE(0, 3), 0x030201);
  assert.strictEqual(buf.readUIntBE(0, 3), 0x010203);
  assert.strictEqual(buf.readUIntLE(0, 5), 0x0504030201);
  assert.strictEqual(buf.readUIntBE(0, 5), 0x0102030405);
  assert.strictEqual(buf.readUIntLE(0, 6), 0x060504030201);
  assert.strictEqual(buf.readUIntBE(0, 6), 0x010203040506);
  assert.strictEqual(buf.readIntLE(0, 1), 0x01);
  assert.strictEqual(buf.readIntBE(0, 1), 0x01);
  assert.strictEqual(buf.readIntLE(0, 3), 0x030201);
  assert.strictEqual(buf.readIntBE(0, 3), 0x010203);
  assert.strictEqual(buf.readIntLE(0, 5), 0x0504030201);
  assert.strictEqual(buf.readIntBE(0, 5), 0x0102030405);
  assert.strictEqual(buf.readIntLE(0, 6), 0x060504030201);
  assert.strictEqual(buf.readIntBE(0, 6), 0x010203040506);
}

// test for common write(U)IntLE/BE
{
  var buf = Buffer(3);
  buf.writeUIntLE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
  assert.equal(buf.readUIntLE(0, 3), 0x123456);

  buf = Buffer(3);
  buf.writeUIntBE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
  assert.equal(buf.readUIntBE(0, 3), 0x123456);

  buf = Buffer(3);
  buf.writeIntLE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
  assert.equal(buf.readIntLE(0, 3), 0x123456);

  buf = Buffer(3);
  buf.writeIntBE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
  assert.equal(buf.readIntBE(0, 3), 0x123456);

  buf = Buffer(3);
  buf.writeIntLE(-0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xaa, 0xcb, 0xed]);
  assert.equal(buf.readIntLE(0, 3), -0x123456);

  buf = Buffer(3);
  buf.writeIntBE(-0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcb, 0xaa]);
  assert.equal(buf.readIntBE(0, 3), -0x123456);

  buf = Buffer(3);
  buf.writeIntLE(-0x123400, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0xcc, 0xed]);
  assert.equal(buf.readIntLE(0, 3), -0x123400);

  buf = Buffer(3);
  buf.writeIntBE(-0x123400, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcc, 0x00]);
  assert.equal(buf.readIntBE(0, 3), -0x123400);

  buf = Buffer(3);
  buf.writeIntLE(-0x120000, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0x00, 0xee]);
  assert.equal(buf.readIntLE(0, 3), -0x120000);

  buf = Buffer(3);
  buf.writeIntBE(-0x120000, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xee, 0x00, 0x00]);
  assert.equal(buf.readIntBE(0, 3), -0x120000);

  buf = Buffer(5);
  buf.writeUIntLE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
  assert.equal(buf.readUIntLE(0, 5), 0x1234567890);

  buf = Buffer(5);
  buf.writeUIntBE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
  assert.equal(buf.readUIntBE(0, 5), 0x1234567890);

  buf = Buffer(5);
  buf.writeIntLE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
  assert.equal(buf.readIntLE(0, 5), 0x1234567890);

  buf = Buffer(5);
  buf.writeIntBE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
  assert.equal(buf.readIntBE(0, 5), 0x1234567890);

  buf = Buffer(5);
  buf.writeIntLE(-0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x70, 0x87, 0xa9, 0xcb, 0xed]);
  assert.equal(buf.readIntLE(0, 5), -0x1234567890);

  buf = Buffer(5);
  buf.writeIntBE(-0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcb, 0xa9, 0x87, 0x70]);
  assert.equal(buf.readIntBE(0, 5), -0x1234567890);

  buf = Buffer(5);
  buf.writeIntLE(-0x0012000000, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0x00, 0x00, 0xee, 0xff]);
  assert.equal(buf.readIntLE(0, 5), -0x0012000000);

  buf = Buffer(5);
  buf.writeIntBE(-0x0012000000, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0xff, 0xee, 0x00, 0x00, 0x00]);
  assert.equal(buf.readIntBE(0, 5), -0x0012000000);
}

// test Buffer slice
{
  var buf = new Buffer('0123456789');
  assert.equal(buf.slice(-10, 10), '0123456789');
  assert.equal(buf.slice(-20, 10), '0123456789');
  assert.equal(buf.slice(-20, -10), '');
  assert.equal(buf.slice(), '0123456789');
  assert.equal(buf.slice(0), '0123456789');
  assert.equal(buf.slice(0, 0), '');
  assert.equal(buf.slice(undefined), '0123456789');
  assert.equal(buf.slice('foobar'), '0123456789');
  assert.equal(buf.slice(undefined, undefined), '0123456789');

  assert.equal(buf.slice(2), '23456789');
  assert.equal(buf.slice(5), '56789');
  assert.equal(buf.slice(10), '');
  assert.equal(buf.slice(5, 8), '567');
  assert.equal(buf.slice(8, -1), '8');
  assert.equal(buf.slice(-10), '0123456789');
  assert.equal(buf.slice(0, -9), '0');
  assert.equal(buf.slice(0, -10), '');
  assert.equal(buf.slice(0, -1), '012345678');
  assert.equal(buf.slice(2, -2), '234567');
  assert.equal(buf.slice(0, 65536), '0123456789');
  assert.equal(buf.slice(65536, 0), '');
  assert.equal(buf.slice(-5, -8), '');
  assert.equal(buf.slice(-5, -3), '56');
  assert.equal(buf.slice(-10, 10), '0123456789');
  for (var i = 0, s = buf.toString(); i < buf.length; ++i) {
    assert.equal(buf.slice(i), s.slice(i));
    assert.equal(buf.slice(0, i), s.slice(0, i));
    assert.equal(buf.slice(-i), s.slice(-i));
    assert.equal(buf.slice(0, -i), s.slice(0, -i));
  }

  var utf16Buf = new Buffer('0123456789', 'utf16le');
  assert.deepStrictEqual(utf16Buf.slice(0, 6), Buffer('012', 'utf16le'));

  assert.equal(buf.slice('0', '1'), '0');
  assert.equal(buf.slice('-5', '10'), '56789');
  assert.equal(buf.slice('-10', '10'), '0123456789');
  assert.equal(buf.slice('-10', '-5'), '01234');
  assert.equal(buf.slice('-10', '-0'), '');
  assert.equal(buf.slice('111'), '');
  assert.equal(buf.slice('0', '-111'), '');

  // try to slice a zero length Buffer
  // see https://github.com/joyent/node/issues/5881
  SlowBuffer(0).slice(0, 1);
}

// Regression test for #5482: should throw but not assert in C++ land.
assert.throws(function() {
  Buffer('', 'buffer');
}, TypeError);

// Regression test for #6111. Constructing a buffer from another buffer
// should a) work, and b) not corrupt the source buffer.
{
  var a = [0];
  for (var i = 0; i < 7; ++i) a = a.concat(a);
  a = a.map(function(_, i) { return i; });
  var b = Buffer(a);
  var c = Buffer(b);
  assert.strictEqual(b.length, a.length);
  assert.strictEqual(c.length, a.length);
  for (var i = 0, k = a.length; i < k; ++i) {
    assert.strictEqual(a[i], i);
    assert.strictEqual(b[i], i);
    assert.strictEqual(c[i], i);
  }
}


assert.throws(function() {
  new Buffer((-1 >>> 0) + 1);
}, RangeError);

assert.throws(function() {
  SlowBuffer((-1 >>> 0) + 1);
}, RangeError);

if (common.hasCrypto) {
  // Test truncation after decode
  // var crypto = require('crypto');

  var b1 = new Buffer('YW55=======', 'base64');
  var b2 = new Buffer('YW55', 'base64');

  assert.equal(
    1 /*crypto.createHash('sha1').update(b1).digest('hex')*/,
    1 /*crypto.createHash('sha1').update(b2).digest('hex')*/
  );
} else {
  common.skip('missing crypto');
}

// Test Compare
{
  var b = new Buffer(1).fill('a');
  var c = new Buffer(1).fill('c');
  var d = new Buffer(2).fill('aa');

  assert.equal(b.compare(c), -1);
  assert.equal(c.compare(d), 1);
  assert.equal(d.compare(b), 1);
  assert.equal(b.compare(d), -1);
  assert.equal(b.compare(b), 0);

  assert.equal(Buffer.compare(b, c), -1);
  assert.equal(Buffer.compare(c, d), 1);
  assert.equal(Buffer.compare(d, b), 1);
  assert.equal(Buffer.compare(b, d), -1);
  assert.equal(Buffer.compare(c, c), 0);

  assert.equal(Buffer.compare(Buffer(0), Buffer(0)), 0);
  assert.equal(Buffer.compare(Buffer(0), Buffer(1)), -1);
  assert.equal(Buffer.compare(Buffer(1), Buffer(0)), 1);
}

assert.throws(function() {
  var b = Buffer(1);
  Buffer.compare(b, 'abc');
});

assert.throws(function() {
  var b = Buffer(1);
  Buffer.compare('abc', b);
});

assert.throws(function() {
  var b = Buffer(1);
  b.compare('abc');
});

// Test Equals
{
  var b = new Buffer(5).fill('abcdf');
  var c = new Buffer(5).fill('abcdf');
  var d = new Buffer(5).fill('abcde');
  var e = new Buffer(6).fill('abcdef');

  assert.ok(b.equals(c));
  assert.ok(!c.equals(d));
  assert.ok(!d.equals(e));
  assert.ok(d.equals(d));
}

assert.throws(function() {
  var b = Buffer(1);
  b.equals('abc');
});

// Regression test for https://github.com/nodejs/node/issues/649.
assert.throws(function() { Buffer(1422561062959).toString('utf8'); });

var ps = Buffer.poolSize;
Buffer.poolSize = 0;
assert.equal(Buffer(1).parent, undefined);
Buffer.poolSize = ps;

// Test Buffer.copy() segfault
assert.throws(function() {
  Buffer(10).copy();
});

var regErrorMsg = new RegExp('First argument must be a string, Buffer, ' +
                               'ArrayBuffer, Array, or array-like object.');

assert.throws(function() {
  new Buffer();
}, regErrorMsg);

assert.throws(function() {
  new Buffer(null);
}, regErrorMsg);


// Test prototype getters don't throw
assert.equal(Buffer.prototype.parent, undefined);
assert.equal(Buffer.prototype.offset, undefined);
assert.equal(SlowBuffer.prototype.parent, undefined);
assert.equal(SlowBuffer.prototype.offset, undefined);

{
  // Test that large negative Buffer length inputs don't affect the pool offset.
  // Use the fromArrayLike() variant here because it's more lenient
  // about its input and passes the length directly to allocate().
  assert.deepStrictEqual(Buffer({ length: -Buffer.poolSize }), Buffer.from(''));
  assert.deepStrictEqual(Buffer({ length: -100 }), Buffer.from(''));

  // Check pool offset after that by trying to write string into the pool.
  assert.doesNotThrow(() => Buffer.from('abc'));
}


// Test failed or zero-sized Buffer allocations not affecting typed arrays
{
  var zeroArray = new Uint32Array(10).fill(0);
  var sizes = [1e10, 0, 0.1, -1, 'a', undefined, null, NaN];
  var allocators = [
    Buffer,
    SlowBuffer,
    Buffer.alloc,
    Buffer.allocUnsafe,
    Buffer.allocUnsafeSlow
  ];
  for (var allocator of allocators) {
    for (var size of sizes) {
      try {
        allocator(size);
      } catch (e) {
        assert.deepStrictEqual(new Uint32Array(10), zeroArray);
      }
    }
  }
}

// Test that large negative Buffer length inputs throw errors.
assert.throws(() => Buffer(-Buffer.poolSize),
              '"size" argument must not be negative');
assert.throws(() => Buffer(-100),
              '"size" argument must not be negative');
assert.throws(() => Buffer(-1),
              '"size" argument must not be negative');

