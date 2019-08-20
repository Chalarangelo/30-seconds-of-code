'use strict';
var Buffer = require('../../').Buffer;


var assert = require('assert');

var Buffer = require('../../').Buffer;

var b = Buffer.from('abcdef');
var buf_a = Buffer.from('a');
var buf_bc = Buffer.from('bc');
var buf_f = Buffer.from('f');
var buf_z = Buffer.from('z');
var buf_empty = Buffer.from('');

assert(b.includes('a'));
assert(!b.includes('a', 1));
assert(!b.includes('a', -1));
assert(!b.includes('a', -4));
assert(b.includes('a', -b.length));
assert(b.includes('a', NaN));
assert(b.includes('a', -Infinity));
assert(!b.includes('a', Infinity));
assert(b.includes('bc'));
assert(!b.includes('bc', 2));
assert(!b.includes('bc', -1));
assert(!b.includes('bc', -3));
assert(b.includes('bc', -5));
assert(b.includes('bc', NaN));
assert(b.includes('bc', -Infinity));
assert(!b.includes('bc', Infinity));
assert(b.includes('f'), b.length - 1);
assert(!b.includes('z'));
assert(!b.includes(''));
assert(!b.includes('', 1));
assert(!b.includes('', b.length + 1));
assert(!b.includes('', Infinity));
assert(b.includes(buf_a));
assert(!b.includes(buf_a, 1));
assert(!b.includes(buf_a, -1));
assert(!b.includes(buf_a, -4));
assert(b.includes(buf_a, -b.length));
assert(b.includes(buf_a, NaN));
assert(b.includes(buf_a, -Infinity));
assert(!b.includes(buf_a, Infinity));
assert(b.includes(buf_bc));
assert(!b.includes(buf_bc, 2));
assert(!b.includes(buf_bc, -1));
assert(!b.includes(buf_bc, -3));
assert(b.includes(buf_bc, -5));
assert(b.includes(buf_bc, NaN));
assert(b.includes(buf_bc, -Infinity));
assert(!b.includes(buf_bc, Infinity));
assert(b.includes(buf_f), b.length - 1);
assert(!b.includes(buf_z));
assert(!b.includes(buf_empty));
assert(!b.includes(buf_empty, 1));
assert(!b.includes(buf_empty, b.length + 1));
assert(!b.includes(buf_empty, Infinity));
assert(b.includes(0x61));
assert(!b.includes(0x61, 1));
assert(!b.includes(0x61, -1));
assert(!b.includes(0x61, -4));
assert(b.includes(0x61, -b.length));
assert(b.includes(0x61, NaN));
assert(b.includes(0x61, -Infinity));
assert(!b.includes(0x61, Infinity));
assert(!b.includes(0x0));

// test offsets
assert(b.includes('d', 2));
assert(b.includes('f', 5));
assert(b.includes('f', -1));
assert(!b.includes('f', 6));

assert(b.includes(Buffer.from('d'), 2));
assert(b.includes(Buffer.from('f'), 5));
assert(b.includes(Buffer.from('f'), -1));
assert(!b.includes(Buffer.from('f'), 6));

assert(!Buffer.from('ff').includes(Buffer.from('f'), 1, 'ucs2'));

// test hex encoding
assert.strictEqual(
  Buffer.from(b.toString('hex'), 'hex')
    .includes('64', 0, 'hex'),
  true
);
assert.strictEqual(
  Buffer.from(b.toString('hex'), 'hex')
    .includes(Buffer.from('64', 'hex'), 0, 'hex'),
  true
);

// test base64 encoding
assert.strictEqual(
  Buffer.from(b.toString('base64'), 'base64')
    .includes('ZA==', 0, 'base64'),
  true
);
assert.strictEqual(
  Buffer.from(b.toString('base64'), 'base64')
    .includes(Buffer.from('ZA==', 'base64'), 0, 'base64'),
  true
);

// test ascii encoding
assert.strictEqual(
  Buffer.from(b.toString('ascii'), 'ascii')
    .includes('d', 0, 'ascii'),
  true
);
assert.strictEqual(
  Buffer.from(b.toString('ascii'), 'ascii')
    .includes(Buffer.from('d', 'ascii'), 0, 'ascii'),
  true
);

// test latin1 encoding
assert.strictEqual(
  Buffer.from(b.toString('latin1'), 'latin1')
    .includes('d', 0, 'latin1'),
  true
);
assert.strictEqual(
  Buffer.from(b.toString('latin1'), 'latin1')
    .includes(Buffer.from('d', 'latin1'), 0, 'latin1'),
  true
);

// test binary encoding
assert.strictEqual(
  Buffer.from(b.toString('binary'), 'binary')
    .includes('d', 0, 'binary'),
  true
);
assert.strictEqual(
  Buffer.from(b.toString('binary'), 'binary')
    .includes(Buffer.from('d', 'binary'), 0, 'binary'),
  true
);


// test usc2 encoding
var twoByteString = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

assert(twoByteString.includes('\u0395', 4, 'ucs2'));
assert(twoByteString.includes('\u03a3', -4, 'ucs2'));
assert(twoByteString.includes('\u03a3', -6, 'ucs2'));
assert(twoByteString.includes(
  Buffer.from('\u03a3', 'ucs2'), -6, 'ucs2'));
assert(!twoByteString.includes('\u03a3', -2, 'ucs2'));

var mixedByteStringUcs2 =
    Buffer.from('\u039a\u0391abc\u03a3\u03a3\u0395', 'ucs2');
assert(mixedByteStringUcs2.includes('bc', 0, 'ucs2'));
assert(mixedByteStringUcs2.includes('\u03a3', 0, 'ucs2'));
assert(!mixedByteStringUcs2.includes('\u0396', 0, 'ucs2'));

assert(
    6, mixedByteStringUcs2.includes(Buffer.from('bc', 'ucs2'), 0, 'ucs2'));
assert(
    10, mixedByteStringUcs2.includes(Buffer.from('\u03a3', 'ucs2'),
    0, 'ucs2'));
assert(
    -1, mixedByteStringUcs2.includes(Buffer.from('\u0396', 'ucs2'),
    0, 'ucs2'));

twoByteString = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

// Test single char pattern
assert(twoByteString.includes('\u039a', 0, 'ucs2'));
assert(twoByteString.includes('\u0391', 0, 'ucs2'), 'Alpha');
assert(twoByteString.includes('\u03a3', 0, 'ucs2'), 'First Sigma');
assert(twoByteString.includes('\u03a3', 6, 'ucs2'), 'Second Sigma');
assert(twoByteString.includes('\u0395', 0, 'ucs2'), 'Epsilon');
assert(!twoByteString.includes('\u0392', 0, 'ucs2'), 'Not beta');

// Test multi-char pattern
assert(twoByteString.includes('\u039a\u0391', 0, 'ucs2'), 'Lambda Alpha');
assert(twoByteString.includes('\u0391\u03a3', 0, 'ucs2'), 'Alpha Sigma');
assert(twoByteString.includes('\u03a3\u03a3', 0, 'ucs2'), 'Sigma Sigma');
assert(twoByteString.includes('\u03a3\u0395', 0, 'ucs2'), 'Sigma Epsilon');

var mixedByteStringUtf8 = Buffer.from('\u039a\u0391abc\u03a3\u03a3\u0395');
assert(mixedByteStringUtf8.includes('bc'));
assert(mixedByteStringUtf8.includes('bc', 5));
assert(mixedByteStringUtf8.includes('bc', -8));
assert(mixedByteStringUtf8.includes('\u03a3'));
assert(!mixedByteStringUtf8.includes('\u0396'));


// Test complex string includes algorithms. Only trigger for long strings.
// Long string that isn't a simple repeat of a shorter string.
var longString = 'A';
for (var i = 66; i < 76; i++) {  // from 'B' to 'K'
  longString = longString + String.fromCharCode(i) + longString;
}

var longBufferString = Buffer.from(longString);

// pattern of 15 chars, repeated every 16 chars in long
var pattern = 'ABACABADABACABA';
for (var i = 0; i < longBufferString.length - pattern.length; i += 7) {
  var includes = longBufferString.includes(pattern, i);
  assert(includes, 'Long ABACABA...-string at index ' + i);
}
assert(longBufferString.includes('AJABACA'), 'Long AJABACA, First J');
assert(longBufferString.includes('AJABACA', 511), 'Long AJABACA, Second J');

pattern = 'JABACABADABACABA';
assert(longBufferString.includes(pattern), 'Long JABACABA..., First J');
assert(longBufferString.includes(pattern, 512), 'Long JABACABA..., Second J');

// Search for a non-ASCII string in a pure ASCII string.
var asciiString = Buffer.from(
    'arglebargleglopglyfarglebargleglopglyfarglebargleglopglyf');
assert(!asciiString.includes('\x2061'));
assert(asciiString.includes('leb', 0));

// Search in string containing many non-ASCII chars.
var allCodePoints = [];
for (var i = 0; i < 65536; i++) allCodePoints[i] = i;
var allCharsString = String.fromCharCode.apply(String, allCodePoints);
var allCharsBufferUtf8 = Buffer.from(allCharsString);
var allCharsBufferUcs2 = Buffer.from(allCharsString, 'ucs2');

// Search for string long enough to trigger complex search with ASCII pattern
// and UC16 subject.
assert(!allCharsBufferUtf8.includes('notfound'));
assert(!allCharsBufferUcs2.includes('notfound'));

// Find substrings in Utf8.
var lengths = [1, 3, 15];  // Single char, simple and complex.
var indices = [0x5, 0x60, 0x400, 0x680, 0x7ee, 0xFF02, 0x16610, 0x2f77b];
for (var lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
  for (var i = 0; i < indices.length; i++) {
    var index = indices[i];
    var length = lengths[lengthIndex];

    if (index + length > 0x7F) {
      length = 2 * length;
    }

    if (index + length > 0x7FF) {
      length = 3 * length;
    }

    if (index + length > 0xFFFF) {
      length = 4 * length;
    }

    var patternBufferUtf8 = allCharsBufferUtf8.slice(index, index + length);
    assert(index, allCharsBufferUtf8.includes(patternBufferUtf8));

    var patternStringUtf8 = patternBufferUtf8.toString();
    assert(index, allCharsBufferUtf8.includes(patternStringUtf8));
  }
}

// Find substrings in Usc2.
lengths = [2, 4, 16];  // Single char, simple and complex.
indices = [0x5, 0x65, 0x105, 0x205, 0x285, 0x2005, 0x2085, 0xfff0];
for (var lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
  for (var i = 0; i < indices.length; i++) {
    var index = indices[i] * 2;
    var length = lengths[lengthIndex];

    var patternBufferUcs2 =
        allCharsBufferUcs2.slice(index, index + length);
    assert(
        index, allCharsBufferUcs2.includes(patternBufferUcs2, 0, 'ucs2'));

    var patternStringUcs2 = patternBufferUcs2.toString('ucs2');
    assert(
        index, allCharsBufferUcs2.includes(patternStringUcs2, 0, 'ucs2'));
  }
}

assert.throws(function() {
  b.includes(function() { });
});
assert.throws(function() {
  b.includes({});
});
assert.throws(function() {
  b.includes([]);
});

// test truncation of Number arguments to uint8
{
  var buf = Buffer.from('this is a test');
  assert.ok(buf.includes(0x6973));
  assert.ok(buf.includes(0x697320));
  assert.ok(buf.includes(0x69732069));
  assert.ok(buf.includes(0x697374657374));
  assert.ok(buf.includes(0x69737374));
  assert.ok(buf.includes(0x69737465));
  assert.ok(buf.includes(0x69737465));
  assert.ok(buf.includes(-140));
  assert.ok(buf.includes(-152));
  assert.ok(!buf.includes(0xff));
  assert.ok(!buf.includes(0xffff));
}

