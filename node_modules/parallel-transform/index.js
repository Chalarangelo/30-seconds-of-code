var Transform = require('readable-stream').Transform;
var inherits = require('inherits');
var cyclist = require('cyclist');
var util = require('util');

var ParallelTransform = function(maxParallel, opts, ontransform) {
	if (!(this instanceof ParallelTransform)) return new ParallelTransform(maxParallel, opts, ontransform);

	if (typeof maxParallel === 'function') {
		ontransform = maxParallel;
		opts = null;
		maxParallel = 1;
	}
	if (typeof opts === 'function') {
		ontransform = opts;
		opts = null;
	}

	if (!opts) opts = {};
	if (!opts.highWaterMark) opts.highWaterMark = Math.max(maxParallel, 16);
	if (opts.objectMode !== false) opts.objectMode = true;

	Transform.call(this, opts);

	this._maxParallel = maxParallel;
	this._ontransform = ontransform;
	this._destroyed = false;
	this._flushed = false;
	this._ordered = opts.ordered !== false;
	this._buffer = this._ordered ? cyclist(maxParallel) : [];
	this._top = 0;
	this._bottom = 0;
	this._ondrain = null;
};

inherits(ParallelTransform, Transform);

ParallelTransform.prototype.destroy = function() {
	if (this._destroyed) return;
	this._destroyed = true;
	this.emit('close');
};

ParallelTransform.prototype._transform = function(chunk, enc, callback) {
	var self = this;
	var pos = this._top++;

	this._ontransform(chunk, function(err, data) {
		if (self._destroyed) return;
		if (err) {
			self.emit('error', err);
			self.push(null);
			self.destroy();
			return;
		}
		if (self._ordered) {
			self._buffer.put(pos, (data === undefined || data === null) ? null : data);
		}
		else {
			self._buffer.push(data);
		}
		self._drain();
	});

	if (this._top - this._bottom < this._maxParallel) return callback();
	this._ondrain = callback;
};

ParallelTransform.prototype._flush = function(callback) {
	this._flushed = true;
	this._ondrain = callback;
	this._drain();
};

ParallelTransform.prototype._drain = function() {
	if (this._ordered) {
		while (this._buffer.get(this._bottom) !== undefined) {
			var data = this._buffer.del(this._bottom++);
			if (data === null) continue;
			this.push(data);
		}
	}
	else {
		while (this._buffer.length > 0) {
			var data =  this._buffer.pop();
			this._bottom++;
			if (data === null) continue;
			this.push(data);
		}
	}


	if (!this._drained() || !this._ondrain) return;

	var ondrain = this._ondrain;
	this._ondrain = null;
	ondrain();
};

ParallelTransform.prototype._drained = function() {
	var diff = this._top - this._bottom;
	return this._flushed ? !diff : diff < this._maxParallel;
};

module.exports = ParallelTransform;
