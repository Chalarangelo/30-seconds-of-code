function con(b) {
  if ((b & 0xc0) === 0x80) {
    return b & 0x3f;
  } else {
    throw new Error("invalid UTF-8 encoding");
  }
}

function code(min, n) {
  if (n < min || (0xd800 <= n && n < 0xe000) || n >= 0x10000) {
    throw new Error("invalid UTF-8 encoding");
  } else {
    return n;
  }
}

export function decode(bytes) {
  return _decode(bytes)
    .map(x => String.fromCharCode(x))
    .join("");
}

function _decode(bytes) {
  if (bytes.length === 0) {
    return [];
  }

  /**
   * 1 byte
   */
  {
    const [b1, ...bs] = bytes;

    if (b1 < 0x80) {
      return [code(0x0, b1), ..._decode(bs)];
    }

    if (b1 < 0xc0) {
      throw new Error("invalid UTF-8 encoding");
    }
  }

  /**
   * 2 bytes
   */
  {
    const [b1, b2, ...bs] = bytes;

    if (b1 < 0xe0) {
      return [code(0x80, ((b1 & 0x1f) << 6) + con(b2)), ..._decode(bs)];
    }
  }

  /**
   * 3 bytes
   */
  {
    const [b1, b2, b3, ...bs] = bytes;

    if (b1 < 0xf0) {
      return [
        code(0x800, ((b1 & 0x0f) << 12) + (con(b2) << 6) + con(b3)),
        ..._decode(bs)
      ];
    }
  }

  /**
   * 4 bytes
   */
  {
    const [b1, b2, b3, b4, ...bs] = bytes;

    if (b1 < 0xf8) {
      return [
        code(
          0x10000,
          ((((b1 & 0x07) << 18) + con(b2)) << 12) + (con(b3) << 6) + con(b4)
        ),
        ..._decode(bs)
      ];
    }
  }

  throw new Error("invalid UTF-8 encoding");
}
