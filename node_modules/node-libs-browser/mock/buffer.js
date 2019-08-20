function Buffer() {
	throw new Error("Buffer is not included.");
}
Buffer.isBuffer = function() {
  return false;
};

exports.INSPECT_MAX_BYTES = 50;
exports.SlowBuffer = Buffer;
exports.Buffer = Buffer;
