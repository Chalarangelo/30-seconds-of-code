var hpack = require('../hpack');
var utils = hpack.utils;
var huffman = hpack.huffman.encode;
var assert = utils.assert;

var WBuf = require('wbuf');

function Encoder() {
  this.buffer = new WBuf();
  this.word = 0;
  this.bitOffset = 0;
}
module.exports = Encoder;

Encoder.create = function create() {
  return new Encoder();
};

Encoder.prototype.render = function render() {
  return this.buffer.render();
};

Encoder.prototype.encodeBit = function encodeBit(bit) {
  var octet;

  this.word <<= 1;
  this.word |= bit;
  this.bitOffset++;

  if (this.bitOffset === 8) {
    this.buffer.writeUInt8(this.word);
    this.word = 0;
    this.bitOffset = 0;
  }
};

Encoder.prototype.encodeBits = function encodeBits(bits, len) {
  var left = bits;
  var leftLen = len;

  while (leftLen > 0) {
    var avail = Math.min(leftLen, 8 - this.bitOffset);
    var toWrite = left >>> (leftLen - avail);

    if (avail === 8) {
      this.buffer.writeUInt8(toWrite);
    } else {
      this.word <<= avail;
      this.word |= toWrite;
      this.bitOffset += avail;
      if (this.bitOffset === 8) {
        this.buffer.writeUInt8(this.word);
        this.word = 0;
        this.bitOffset = 0;
      }
    }

    leftLen -= avail;
    left &= (1 << leftLen) - 1;
  }
};

// Just for testing
Encoder.prototype.skipBits = function skipBits(num) {
  this.bitOffset += num;
  this.buffer.skip(this.bitOffset >> 3);
  this.bitOffset &= 0x7;
};

Encoder.prototype.encodeInt = function encodeInt(num) {
  var prefix = 8 - this.bitOffset;

  // We are going to end up octet-aligned
  this.bitOffset = 0;

  var max = (1 << prefix) - 1;

  // Fast case - int fits into the prefix
  if (num < max) {
    this.buffer.writeUInt8((this.word << prefix) | num);
    return octet;
  }

  var left = num - max;
  this.buffer.writeUInt8((this.word << prefix) | max);
  do {
    var octet = left & 0x7f;
    left >>= 7;
    if (left !== 0)
      octet |= 0x80;

    this.buffer.writeUInt8(octet);
  } while (left !== 0);
};

Encoder.prototype.encodeStr = function encodeStr(value, isHuffman) {
  this.encodeBit(isHuffman ? 1 : 0);

  if (!isHuffman) {
    this.buffer.reserve(value.length + 1);
    this.encodeInt(value.length);
    for (var i = 0; i < value.length; i++)
      this.buffer.writeUInt8(value[i]);
    return;
  }

  var codes = [];
  var len = 0;
  var pad = 0;

  for (var i = 0; i < value.length; i++) {
    var code = huffman[value[i]];
    codes.push(code);
    len += code[0];
  }
  if (len % 8 !== 0)
    pad = 8 - (len % 8);
  len += pad;

  this.buffer.reserve((len / 8) + 1);
  this.encodeInt(len / 8);
  for (var i = 0; i < codes.length; i++) {
    var code = codes[i];
    this.encodeBits(code[1], code[0]);
  }

  // Append padding
  this.encodeBits(0xff >>> (8 - pad), pad);
};
