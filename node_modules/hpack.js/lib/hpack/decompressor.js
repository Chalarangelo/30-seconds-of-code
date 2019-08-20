var hpack = require('../hpack');
var utils = hpack.utils;
var decoder = hpack.decoder;
var table = hpack.table;
var assert = utils.assert;

var inherits = require('inherits');
var Duplex = require('readable-stream').Duplex;

function Decompressor(options) {
  Duplex.call(this, {
    readableObjectMode: true
  });

  this._decoder = decoder.create();
  this._table = table.create(options.table);
}
inherits(Decompressor, Duplex);
module.exports = Decompressor;

Decompressor.create = function create(options) {
  return new Decompressor(options);
};

Decompressor.prototype._read = function _read() {
  // We only push!
};

Decompressor.prototype._write = function _write(data, enc, cb) {
  this._decoder.push(data);

  cb(null);
};

Decompressor.prototype.execute = function execute(cb) {
  while (!this._decoder.isEmpty()) {
    try {
      this._execute();
    } catch (err) {
      if (cb)
        return done(err);
      else
        return this.emit('error', err);
    }
  }

  if (cb)
    done(null);

  function done(err) {
    process.nextTick(function() {
      cb(err);
    });
  }
};

Decompressor.prototype.updateTableSize = function updateTableSize(size) {
  this._table.updateSize(size);
};

Decompressor.prototype._execute = function _execute() {
  var isIndexed = this._decoder.decodeBit();
  if (isIndexed)
    return this._processIndexed();

  var isIncremental = this._decoder.decodeBit();
  var neverIndex = 0;
  if (!isIncremental) {
    var isUpdate = this._decoder.decodeBit();
    if (isUpdate)
      return this._processUpdate();

    neverIndex = this._decoder.decodeBit();
  }

  this._processLiteral(isIncremental, neverIndex);
};

Decompressor.prototype._processIndexed = function _processIndexed() {
  var index = this._decoder.decodeInt();

  var lookup = this._table.lookup(index);
  this.push({ name: lookup.name, value: lookup.value, neverIndex: false });
};

Decompressor.prototype._processLiteral = function _processLiteral(inc, never) {
  var index = this._decoder.decodeInt();

  var name;
  var nameSize;

  // Literal header-name too
  if (index === 0) {
    name = this._decoder.decodeStr();
    nameSize = name.length;
    name = utils.stringify(name);
  } else {
    var lookup = this._table.lookup(index);
    nameSize = lookup.nameSize;
    name = lookup.name;
  }

  var value = this._decoder.decodeStr();
  var valueSize = value.length;
  value = utils.stringify(value);

  if (inc)
    this._table.add(name, value, nameSize, valueSize);

  this.push({ name: name, value: value, neverIndex: never !== 0});
};

Decompressor.prototype._processUpdate = function _processUpdate() {
  var size = this._decoder.decodeInt();
  this.updateTableSize(size);
};
