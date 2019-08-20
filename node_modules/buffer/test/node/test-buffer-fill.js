'use strict';
var Buffer = require('../../').Buffer;



var assert = require('assert');
var os = require('os');
var SIZE = 28;

var buf1 = Buffer.allocUnsafe(SIZE);
var buf2 = Buffer.allocUnsafe(SIZE);


// Default encoding
testBufs('abc');
testBufs('\u0222aa');
testBufs('a\u0234b\u0235c\u0236');
testBufs('abc', 4);
testBufs('abc', 5);
testBufs('abc', SIZE);
testBufs('\u0222aa', 2);
testBufs('\u0222aa', 8);
testBufs('a\u0234b\u0235c\u0236', 4);
testBufs('a\u0234b\u0235c\u0236', 12);
testBufs('abc', 4, -1);
testBufs('abc', 4, 1);
testBufs('abc', 5, 1);
testBufs('\u0222aa', 2, -1);
testBufs('\u0222aa', 8, 1);
testBufs('a\u0234b\u0235c\u0236', 4, -1);
testBufs('a\u0234b\u0235c\u0236', 4, 1);
testBufs('a\u0234b\u0235c\u0236', 12, 1);


// UTF8
testBufs('abc', 'utf8');
testBufs('\u0222aa', 'utf8');
testBufs('a\u0234b\u0235c\u0236', 'utf8');
testBufs('abc', 4, 'utf8');
testBufs('abc', 5, 'utf8');
testBufs('abc', SIZE, 'utf8');
testBufs('\u0222aa', 2, 'utf8');
testBufs('\u0222aa', 8, 'utf8');
testBufs('a\u0234b\u0235c\u0236', 4, 'utf8');
testBufs('a\u0234b\u0235c\u0236', 12, 'utf8');
testBufs('abc', 4, -1, 'utf8');
testBufs('abc', 4, 1, 'utf8');
testBufs('abc', 5, 1, 'utf8');
testBufs('\u0222aa', 2, -1, 'utf8');
testBufs('\u0222aa', 8, 1, 'utf8');
testBufs('a\u0234b\u0235c\u0236', 4, -1, 'utf8');
testBufs('a\u0234b\u0235c\u0236', 4, 1, 'utf8');
testBufs('a\u0234b\u0235c\u0236', 12, 1, 'utf8');
assert.equal(Buffer.allocUnsafe(1).fill(0).fill('\u0222')[0], 0xc8);


// BINARY
testBufs('abc', 'binary');
testBufs('\u0222aa', 'binary');
testBufs('a\u0234b\u0235c\u0236', 'binary');
testBufs('abc', 4, 'binary');
testBufs('abc', 5, 'binary');
testBufs('abc', SIZE, 'binary');
testBufs('\u0222aa', 2, 'binary');
testBufs('\u0222aa', 8, 'binary');
testBufs('a\u0234b\u0235c\u0236', 4, 'binary');
testBufs('a\u0234b\u0235c\u0236', 12, 'binary');
testBufs('abc', 4, -1, 'binary');
testBufs('abc', 4, 1, 'binary');
testBufs('abc', 5, 1, 'binary');
testBufs('\u0222aa', 2, -1, 'binary');
testBufs('\u0222aa', 8, 1, 'binary');
testBufs('a\u0234b\u0235c\u0236', 4, -1, 'binary');
testBufs('a\u0234b\u0235c\u0236', 4, 1, 'binary');
testBufs('a\u0234b\u0235c\u0236', 12, 1, 'binary');


// LATIN1
testBufs('abc', 'latin1');
testBufs('\u0222aa', 'latin1');
testBufs('a\u0234b\u0235c\u0236', 'latin1');
testBufs('abc', 4, 'latin1');
testBufs('abc', 5, 'latin1');
testBufs('abc', SIZE, 'latin1');
testBufs('\u0222aa', 2, 'latin1');
testBufs('\u0222aa', 8, 'latin1');
testBufs('a\u0234b\u0235c\u0236', 4, 'latin1');
testBufs('a\u0234b\u0235c\u0236', 12, 'latin1');
testBufs('abc', 4, -1, 'latin1');
testBufs('abc', 4, 1, 'latin1');
testBufs('abc', 5, 1, 'latin1');
testBufs('\u0222aa', 2, -1, 'latin1');
testBufs('\u0222aa', 8, 1, 'latin1');
testBufs('a\u0234b\u0235c\u0236', 4, -1, 'latin1');
testBufs('a\u0234b\u0235c\u0236', 4, 1, 'latin1');
testBufs('a\u0234b\u0235c\u0236', 12, 1, 'latin1');


// UCS2
testBufs('abc', 'ucs2');
testBufs('\u0222aa', 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 'ucs2');
testBufs('abc', 4, 'ucs2');
testBufs('abc', SIZE, 'ucs2');
testBufs('\u0222aa', 2, 'ucs2');
testBufs('\u0222aa', 8, 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 4, 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 12, 'ucs2');
testBufs('abc', 4, -1, 'ucs2');
testBufs('abc', 4, 1, 'ucs2');
testBufs('abc', 5, 1, 'ucs2');
testBufs('\u0222aa', 2, -1, 'ucs2');
testBufs('\u0222aa', 8, 1, 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 4, -1, 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 4, 1, 'ucs2');
testBufs('a\u0234b\u0235c\u0236', 12, 1, 'ucs2');
assert.equal(Buffer.allocUnsafe(1).fill('\u0222', 'ucs2')[0],
             os.endianness() === 'LE' ? 0x22 : 0x02);


// HEX
testBufs('616263', 'hex');
testBufs('c8a26161', 'hex');
testBufs('61c8b462c8b563c8b6', 'hex');
testBufs('616263', 4, 'hex');
testBufs('616263', 5, 'hex');
testBufs('616263', SIZE, 'hex');
testBufs('c8a26161', 2, 'hex');
testBufs('c8a26161', 8, 'hex');
testBufs('61c8b462c8b563c8b6', 4, 'hex');
testBufs('61c8b462c8b563c8b6', 12, 'hex');
testBufs('616263', 4, -1, 'hex');
testBufs('616263', 4, 1, 'hex');
testBufs('616263', 5, 1, 'hex');
testBufs('c8a26161', 2, -1, 'hex');
testBufs('c8a26161', 8, 1, 'hex');
testBufs('61c8b462c8b563c8b6', 4, -1, 'hex');
testBufs('61c8b462c8b563c8b6', 4, 1, 'hex');
testBufs('61c8b462c8b563c8b6', 12, 1, 'hex');
// Make sure this operation doesn't go on forever
buf1.fill('yKJh', 'hex');
assert.throws(() => buf1.fill('\u0222', 'hex'));


// BASE64
testBufs('YWJj', 'ucs2');
testBufs('yKJhYQ==', 'ucs2');
testBufs('Yci0Ysi1Y8i2', 'ucs2');
testBufs('YWJj', 4, 'ucs2');
testBufs('YWJj', SIZE, 'ucs2');
testBufs('yKJhYQ==', 2, 'ucs2');
testBufs('yKJhYQ==', 8, 'ucs2');
testBufs('Yci0Ysi1Y8i2', 4, 'ucs2');
testBufs('Yci0Ysi1Y8i2', 12, 'ucs2');
testBufs('YWJj', 4, -1, 'ucs2');
testBufs('YWJj', 4, 1, 'ucs2');
testBufs('YWJj', 5, 1, 'ucs2');
testBufs('yKJhYQ==', 2, -1, 'ucs2');
testBufs('yKJhYQ==', 8, 1, 'ucs2');
testBufs('Yci0Ysi1Y8i2', 4, -1, 'ucs2');
testBufs('Yci0Ysi1Y8i2', 4, 1, 'ucs2');
testBufs('Yci0Ysi1Y8i2', 12, 1, 'ucs2');


// Buffer
function deepStrictEqualValues(buf, arr) {
  for (var [index, value] of buf.entries()) {
    assert.deepStrictEqual(value, arr[index]);
  }
}


var buf2Fill = Buffer.allocUnsafe(1).fill(2);
deepStrictEqualValues(genBuffer(4, [buf2Fill]), [2, 2, 2, 2]);
deepStrictEqualValues(genBuffer(4, [buf2Fill, 1]), [0, 2, 2, 2]);
deepStrictEqualValues(genBuffer(4, [buf2Fill, 1, 3]), [0, 2, 2, 0]);
deepStrictEqualValues(genBuffer(4, [buf2Fill, 1, 1]), [0, 0, 0, 0]);
deepStrictEqualValues(genBuffer(4, [buf2Fill, 1, -1]), [0, 0, 0, 0]);
var hexBufFill = Buffer.allocUnsafe(2).fill(0).fill('0102', 'hex');
deepStrictEqualValues(genBuffer(4, [hexBufFill]), [1, 2, 1, 2]);
deepStrictEqualValues(genBuffer(4, [hexBufFill, 1]), [0, 1, 2, 1]);
deepStrictEqualValues(genBuffer(4, [hexBufFill, 1, 3]), [0, 1, 2, 0]);
deepStrictEqualValues(genBuffer(4, [hexBufFill, 1, 1]), [0, 0, 0, 0]);
deepStrictEqualValues(genBuffer(4, [hexBufFill, 1, -1]), [0, 0, 0, 0]);


// Check exceptions
assert.throws(() => buf1.fill(0, -1));
assert.throws(() => buf1.fill(0, 0, buf1.length + 1));
assert.throws(() => buf1.fill('', -1));
assert.throws(() => buf1.fill('', 0, buf1.length + 1));
assert.throws(() => buf1.fill('a', 0, buf1.length, 'node rocks!'));
assert.throws(() => buf1.fill('a', 0, 0, NaN));
assert.throws(() => buf1.fill('a', 0, 0, null));
assert.throws(() => buf1.fill('a', 0, 0, 'foo'));


function genBuffer(size, args) {
  var b = Buffer.allocUnsafe(size);
  return b.fill(0).fill.apply(b, args);
}


function bufReset() {
  buf1.fill(0);
  buf2.fill(0);
}


// This is mostly accurate. Except write() won't write partial bytes to the
// string while fill() blindly copies bytes into memory. To account for that an
// error will be thrown if not all the data can be written, and the SIZE has
// been massaged to work with the input characters.
function writeToFill(string, offset, end, encoding) {
  if (typeof offset === 'string') {
    encoding = offset;
    offset = 0;
    end = buf2.length;
  } else if (typeof end === 'string') {
    encoding = end;
    end = buf2.length;
  } else if (end === undefined) {
    end = buf2.length;
  }

  if (offset < 0 || end > buf2.length)
    throw new RangeError('Out of range index');

  if (end <= offset)
    return buf2;

  offset >>>= 0;
  end >>>= 0;
  assert(offset <= buf2.length);

  // Convert "end" to "length" (which write understands).
  var length = end - offset < 0 ? 0 : end - offset;

  var wasZero = false;
  do {
    var written = buf2.write(string, offset, length, encoding);
    offset += written;
    // Safety check in case write falls into infinite loop.
    if (written === 0) {
      if (wasZero)
        throw new Error('Could not write all data to Buffer');
      else
        wasZero = true;
    }
  } while (offset < buf2.length);

  // Correction for UCS2 operations.
  if (os.endianness() === 'BE' && encoding === 'ucs2') {
    for (var i = 0; i < buf2.length; i += 2) {
      var tmp = buf2[i];
      buf2[i] = buf2[i + 1];
      buf2[i + 1] = tmp;
    }
  }

  return buf2;
}


function testBufs(string, offset, length, encoding) {
  bufReset();
  buf1.fill.apply(buf1, arguments);
  // Swap bytes on BE archs for ucs2 encoding.
  assert.deepStrictEqual(buf1.fill.apply(buf1, arguments),
                         writeToFill.apply(null, arguments));
}

