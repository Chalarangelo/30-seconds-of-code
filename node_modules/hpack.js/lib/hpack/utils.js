exports.assert = function assert(cond, text) {
  if (!cond)
    throw new Error(text);
};

exports.stringify = function stringify(arr) {
  var res = '';
  for (var i = 0; i < arr.length; i++)
    res += String.fromCharCode(arr[i]);
  return res;
};

exports.toArray = function toArray(str) {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    var hi = c >>> 8;
    var lo = c & 0xff;
    if (hi)
      res.push(hi, lo);
    else
      res.push(lo);
  }
  return res;
};
