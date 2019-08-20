var fs = require('fs');
var Writable = require('readable-stream/writable');

var exists = function(path) {
	try {
		return fs.existsSync(path);
	} catch (err) {
		return false;
	}
};

module.exports = function() {
	var s = new Writable({highWaterMark:0});

	var cb;
	var data;
	var tries = 0;
	var offset = 0;

	var write = function() {
		fs.write(1, data, offset, data.length - offset, null, onwrite);
	};

	var onwrite = function(err, written) {
		if (err && err.code === 'EPIPE') return cb()
		if (err && err.code === 'EAGAIN' && tries++ < 30) return setTimeout(write, 10);
		if (err) return cb(err);

		tries = 0;
		if (offset + written >= data.length) return cb();

		offset += written;
		write();
	};

	s._write = function(_data, enc, _cb) {
		offset = 0;
		cb = _cb;
		data = _data;
		write();
	};

	s._isStdio = true;
	s.isTTY = process.stdout.isTTY;

	s.on('finish', function() {
		fs.close(1, function(err) {
			if (err) s.emit('error', err);
		});
	});

	return s;
}();
