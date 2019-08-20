function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function con(b) {
  if ((b & 0xc0) === 0x80) {
    return b & 0x3f;
  } else {
    throw new Error("invalid UTF-8 encoding");
  }
}

function code(min, n) {
  if (n < min || 0xd800 <= n && n < 0xe000 || n >= 0x10000) {
    throw new Error("invalid UTF-8 encoding");
  } else {
    return n;
  }
}

export function decode(bytes) {
  return _decode(bytes).map(function (x) {
    return String.fromCharCode(x);
  }).join("");
}

function _decode(bytes) {
  if (bytes.length === 0) {
    return [];
  }
  /**
   * 1 byte
   */


  {
    var _bytes = _toArray(bytes),
        b1 = _bytes[0],
        bs = _bytes.slice(1);

    if (b1 < 0x80) {
      return [code(0x0, b1)].concat(_toConsumableArray(_decode(bs)));
    }

    if (b1 < 0xc0) {
      throw new Error("invalid UTF-8 encoding");
    }
  }
  /**
   * 2 bytes
   */

  {
    var _bytes2 = _toArray(bytes),
        _b = _bytes2[0],
        b2 = _bytes2[1],
        _bs = _bytes2.slice(2);

    if (_b < 0xe0) {
      return [code(0x80, ((_b & 0x1f) << 6) + con(b2))].concat(_toConsumableArray(_decode(_bs)));
    }
  }
  /**
   * 3 bytes
   */

  {
    var _bytes3 = _toArray(bytes),
        _b2 = _bytes3[0],
        _b3 = _bytes3[1],
        b3 = _bytes3[2],
        _bs2 = _bytes3.slice(3);

    if (_b2 < 0xf0) {
      return [code(0x800, ((_b2 & 0x0f) << 12) + (con(_b3) << 6) + con(b3))].concat(_toConsumableArray(_decode(_bs2)));
    }
  }
  /**
   * 4 bytes
   */

  {
    var _bytes4 = _toArray(bytes),
        _b4 = _bytes4[0],
        _b5 = _bytes4[1],
        _b6 = _bytes4[2],
        b4 = _bytes4[3],
        _bs3 = _bytes4.slice(4);

    if (_b4 < 0xf8) {
      return [code(0x10000, (((_b4 & 0x07) << 18) + con(_b5) << 12) + (con(_b6) << 6) + con(b4))].concat(_toConsumableArray(_decode(_bs3)));
    }
  }
  throw new Error("invalid UTF-8 encoding");
}