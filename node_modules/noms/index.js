'use strict';

var Readable = require('readable-stream').Readable;
var inherits = require('inherits');
inherits(Noms, Readable);
function Noms (options) {
  Readable.call(this,options);
  this.inProgress = false;
  this.lastPush = void 0;
  this.started = false;
  this.errored = false;
}
Noms.prototype.push = function(chunk, encoding) {
      this.lastPush = Readable.prototype.push.call(this, chunk, encoding);
      return this.lastPush;
  };
Noms.prototype.nom = function (callback) {
  callback(null, null);
};
Noms.prototype._read = function (size) {
  if (this.inProgress || this.errored) {
    return;
  }
  if (this.started === false) {
    this.inProgress = true;
    this.callStart(size);
    return;
  }
  this.inProgress = true;
  this.callRead(size);
};
Noms.prototype._before = function (next) {
  next();
};
Noms.prototype.callRead = function (size) {
  var useSize = this.nom.length > 1;
  // so if nothing is pushed, we'll go agian
  this.lastPush = true;
  var self = this;
  function cb(err, chunk) {
    if (err) {
      self.errored = true;
      self.inProgress = false;
      self.emit('error', err);
      return;
    }
    if (chunk !== undefined) {
      self.push(chunk);
    }
    if (self.lastPush) {
      return self.callRead(size);
    } else {
      self.inProgress = false;
    }
  }
  if (useSize) {
    this.nom(size, cb);
  } else {
     this.nom(cb);
  }
};
Noms.prototype.callStart = function (size) {
  var self = this;
  function cb(err, chunk) {
    self.started = true;
    if (err) {
      self.errored = true;
      self.inProgress = false;
      self.emit('error', err);
      return;
    }
    if (chunk !== undefined) {
      self.push(chunk);
    }
    self.callRead(size);
  }
  this._before(cb);
};
function ctor(read, before) {
  inherits(YourStream, Noms);
  function YourStream (opts) {
    Noms.call(this, opts);
  }
  YourStream.prototype.nom = read;
  if (typeof before === 'function') {
    YourStream.prototype._before = before;
  }
  return YourStream;
}
module.exports = exports = function(options, read, before) {
  if (typeof options === 'function') {
    before = read;
    read = options;
    options = {};
  }
  return new (ctor(read, before))(options);
};
exports.ctor = ctor;
exports.obj = function(options, read, before) {
  var out = {};
  if (typeof options === 'function') {
    before = read;
    read = options;
    options = undefined;
  }
  options = options || {};
  Object.keys(options).forEach(function (key) {
    out[key] = options[key];
  });
  out.objectMode = true;
  return new (ctor(read, before))(out);
};