var hpack = require('../hpack');
var utils = hpack.utils;
var encoder = hpack.encoder;
var table = hpack.table;
var assert = utils.assert;

var inherits = require('inherits');
var Duplex = require('readable-stream').Duplex;

function Compressor(options) {
  Duplex.call(this, {
    writableObjectMode: true
  });

  this._encoder = null;
  this._table = table.create(options.table);
}
inherits(Compressor, Duplex);
module.exports = Compressor;

Compressor.create = function create(options) {
  return new Compressor(options);
};

Compressor.prototype._read = function _read() {
  // We only push!
};

Compressor.prototype._write = function _write(data, enc, cb) {
  assert(Array.isArray(data), 'Compressor.write() expects list of headers');

  this._encoder = encoder.create();
  for (var i = 0; i < data.length; i++)
    this._encodeHeader(data[i]);

  var data = this._encoder.render();
  this._encoder = null;

  cb(null);
  for (var i = 0; i < data.length; i++)
    this.push(data[i]);
};

Compressor.prototype.updateTableSize = function updateTableSize(size) {
  if (size >= this._table.protocolMaxSize) {
    size = this._table.protocolMaxSize;

    var enc = encoder.create();

    // indexed = 0
    // incremental = 0
    // update = 1
    enc.encodeBits(1, 3);
    enc.encodeInt(size);

    var data = enc.render();
    for (var i = 0; i < data.length; i++)
      this.push(data[i]);
  }

  this._table.updateSize(size);
};

Compressor.prototype.reset = function reset() {
  var enc = encoder.create();
  var size = this._table.maxSize;

  // indexed = 0
  // incremental = 0
  // update = 1
  enc.encodeBits(1, 3);
  enc.encodeInt(0);

  // Evict everything
  this._table.updateSize(0);

  // indexed = 0
  // incremental = 0
  // update = 1
  enc.encodeBits(1, 3);
  enc.encodeInt(size);

  // Revert size
  this._table.updateSize(size);

  var data = enc.render();
  for (var i = 0; i < data.length; i++)
    this.push(data[i]);
};

Compressor.prototype._encodeHeader = function _encodeHeader(header) {
  if (header.neverIndex) {
    var index = 0;
    var neverIndex = 1;
    var isIndexed = 0;
    var isIncremental = 0;
  } else {
    var index = this._table.reverseLookup(header.name, header.value);
    var isIndexed = index > 0;
    var isIncremental = header.incremental !== false;
    var neverIndex = 0;
  }

  this._encoder.encodeBit(isIndexed);
  if (isIndexed) {
    this._encoder.encodeInt(index);
    return;
  }

  var name = utils.toArray(header.name);
  var value = utils.toArray(header.value);

  this._encoder.encodeBit(isIncremental);
  if (isIncremental) {
    this._table.add(header.name, header.value, name.length, value.length);
  } else {
    // Update = false
    this._encoder.encodeBit(0);
    this._encoder.encodeBit(neverIndex);
  }

  // index is negative for `name`-only headers
  this._encoder.encodeInt(-index);
  if (index === 0)
    this._encoder.encodeStr(name, header.huffman !== false);
  this._encoder.encodeStr(value, header.huffman !== false);
};
