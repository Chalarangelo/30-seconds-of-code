function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function concatUint8Arrays() {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var totalLength = arrays.reduce(function (a, b) {
    return a + b.length;
  }, 0);
  var result = new Uint8Array(totalLength);
  var offset = 0;

  for (var _i = 0; _i < arrays.length; _i++) {
    var arr = arrays[_i];

    if (arr instanceof Uint8Array === false) {
      throw new Error("arr must be of type Uint8Array");
    }

    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

export function overrideBytesInBuffer(buffer, startLoc, endLoc, newBytes) {
  var beforeBytes = buffer.slice(0, startLoc);
  var afterBytes = buffer.slice(endLoc, buffer.length); // replacement is empty, we can omit it

  if (newBytes.length === 0) {
    return concatUint8Arrays(beforeBytes, afterBytes);
  }

  var replacement = Uint8Array.from(newBytes);
  return concatUint8Arrays(beforeBytes, replacement, afterBytes);
}
export function makeBuffer() {
  for (var _len2 = arguments.length, splitedBytes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    splitedBytes[_key2] = arguments[_key2];
  }

  var bytes = [].concat.apply([], splitedBytes);
  return new Uint8Array(bytes).buffer;
}
export function fromHexdump(str) {
  var lines = str.split("\n"); // remove any leading left whitespace

  lines = lines.map(function (line) {
    return line.trim();
  });
  var bytes = lines.reduce(function (acc, line) {
    var cols = line.split(" "); // remove the offset, left column

    cols.shift();
    cols = cols.filter(function (x) {
      return x !== "";
    });
    var bytes = cols.map(function (x) {
      return parseInt(x, 16);
    });
    acc.push.apply(acc, _toConsumableArray(bytes));
    return acc;
  }, []);
  return Buffer.from(bytes);
}