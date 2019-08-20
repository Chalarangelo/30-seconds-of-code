export function srcOver(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var r = (src.r * src.a + dst.r * dst.a * (1 - src.a)) / a;
  var g = (src.g * src.a + dst.g * dst.a * (1 - src.a)) / a;
  var b = (src.b * src.a + dst.b * dst.a * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function dstOver(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var r = (dst.r * dst.a + src.r * src.a * (1 - dst.a)) / a;
  var g = (dst.g * dst.a + src.g * src.a * (1 - dst.a)) / a;
  var b = (dst.b * dst.a + src.b * src.a * (1 - dst.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function multiply(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (sra * dra + sra * (1 - dst.a) + dra * (1 - src.a)) / a;
  var g = (sga * dga + sga * (1 - dst.a) + dga * (1 - src.a)) / a;
  var b = (sba * dba + sba * (1 - dst.a) + dba * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function screen(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (sra * dst.a + dra * src.a - sra * dra + sra * (1 - dst.a) + dra * (1 - src.a)) / a;
  var g = (sga * dst.a + dga * src.a - sga * dga + sga * (1 - dst.a) + dga * (1 - src.a)) / a;
  var b = (sba * dst.a + dba * src.a - sba * dba + sba * (1 - dst.a) + dba * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function overlay(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (2 * dra <= dst.a ? 2 * sra * dra + sra * (1 - dst.a) + dra * (1 - src.a) : sra * (1 + dst.a) + dra * (1 + src.a) - 2 * dra * sra - dst.a * src.a) / a;
  var g = (2 * dga <= dst.a ? 2 * sga * dga + sga * (1 - dst.a) + dga * (1 - src.a) : sga * (1 + dst.a) + dga * (1 + src.a) - 2 * dga * sga - dst.a * src.a) / a;
  var b = (2 * dba <= dst.a ? 2 * sba * dba + sba * (1 - dst.a) + dba * (1 - src.a) : sba * (1 + dst.a) + dba * (1 + src.a) - 2 * dba * sba - dst.a * src.a) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function darken(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (Math.min(sra * dst.a, dra * src.a) + sra * (1 - dst.a) + dra * (1 - src.a)) / a;
  var g = (Math.min(sga * dst.a, dga * src.a) + sga * (1 - dst.a) + dga * (1 - src.a)) / a;
  var b = (Math.min(sba * dst.a, dba * src.a) + sba * (1 - dst.a) + dba * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function lighten(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (Math.max(sra * dst.a, dra * src.a) + sra * (1 - dst.a) + dra * (1 - src.a)) / a;
  var g = (Math.max(sga * dst.a, dga * src.a) + sga * (1 - dst.a) + dga * (1 - src.a)) / a;
  var b = (Math.max(sba * dst.a, dba * src.a) + sba * (1 - dst.a) + dba * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function hardLight(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (2 * sra <= src.a ? 2 * sra * dra + sra * (1 - dst.a) + dra * (1 - src.a) : sra * (1 + dst.a) + dra * (1 + src.a) - 2 * dra * sra - dst.a * src.a) / a;
  var g = (2 * sga <= src.a ? 2 * sga * dga + sga * (1 - dst.a) + dga * (1 - src.a) : sga * (1 + dst.a) + dga * (1 + src.a) - 2 * dga * sga - dst.a * src.a) / a;
  var b = (2 * sba <= src.a ? 2 * sba * dba + sba * (1 - dst.a) + dba * (1 - src.a) : sba * (1 + dst.a) + dba * (1 + src.a) - 2 * dba * sba - dst.a * src.a) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function difference(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (sra + dra - 2 * Math.min(sra * dst.a, dra * src.a)) / a;
  var g = (sga + dga - 2 * Math.min(sga * dst.a, dga * src.a)) / a;
  var b = (sba + dba - 2 * Math.min(sba * dst.a, dba * src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export function exclusion(src, dst) {
  var ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  src.a *= ops;
  var a = dst.a + src.a - dst.a * src.a;
  var sra = src.r * src.a;
  var sga = src.g * src.a;
  var sba = src.b * src.a;
  var dra = dst.r * dst.a;
  var dga = dst.g * dst.a;
  var dba = dst.b * dst.a;
  var r = (sra * dst.a + dra * src.a - 2 * sra * dra + sra * (1 - dst.a) + dra * (1 - src.a)) / a;
  var g = (sga * dst.a + dga * src.a - 2 * sga * dga + sga * (1 - dst.a) + dga * (1 - src.a)) / a;
  var b = (sba * dst.a + dba * src.a - 2 * sba * dba + sba * (1 - dst.a) + dba * (1 - src.a)) / a;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
//# sourceMappingURL=composite-modes.js.map