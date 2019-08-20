module.exports = function bufferIndexOf(buff, search, offset, encoding){
  if (!Buffer.isBuffer(buff)) {
    throw TypeError('buffer is not a buffer');
  }

  // allow optional offset when providing an encoding
  if (encoding === undefined && typeof offset === 'string') {
    encoding = offset;
    offset = undefined;
  }

  if (typeof search === 'string') {
    search = new Buffer(search, encoding || 'utf8');
  } else if (typeof search === 'number' && !isNaN(search)) {
    search = new Buffer([search])
  } else if (!Buffer.isBuffer(search)) {
    throw TypeError('search is not a bufferable object');
  }

  if (search.length === 0) {
    return -1;
  }

  if (offset === undefined || (typeof offset === 'number' && isNaN(offset))) {
    offset = 0;
  } else if (typeof offset !== 'number') {
    throw TypeError('offset is not a number');
  }

  if (offset < 0) {
    offset = buff.length + offset
  }

  if (offset < 0) {
    offset = 0;
  }

  var m = 0;
  var s = -1;

  for (var i = offset; i < buff.length ; ++i) {
    if(buff[i] != search[m]){
      s = -1;
      // <-- go back
      // match abc to aabc
      // 'aabc'
      // 'aab'
      //    ^ no match
      // a'abc'
      //   ^ set index here now and look at these again.
      //   'abc' yay!
      i -= m-1
      m = 0;
    }

    if(buff[i] == search[m]) {
      if(s == -1) {
        s = i;
      }
      ++m;
      if(m == search.length) {
        break;
      }
    }
  }

  if (s > -1 && buff.length - s < search.length) {
    return -1;
  }
  return s;
}


