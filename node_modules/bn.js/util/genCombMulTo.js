'use strict';

// NOTE: This could be potentionally used to generate loop-less multiplications
function genCombMulTo (alen, blen) {
  var len = alen + blen - 1;
  var src = [
    'var a = self.words;',
    'var b = num.words;',
    'var o = out.words;',
    'var c = 0;',
    'var lo;',
    'var mid;',
    'var hi;'
  ];
  for (var i = 0; i < alen; i++) {
    src.push('var a' + i + ' = a[' + i + '] | 0;');
    src.push('var al' + i + ' = a' + i + ' & 0x1fff;');
    src.push('var ah' + i + ' = a' + i + ' >>> 13;');
  }
  for (i = 0; i < blen; i++) {
    src.push('var b' + i + ' = b[' + i + '] | 0;');
    src.push('var bl' + i + ' = b' + i + ' & 0x1fff;');
    src.push('var bh' + i + ' = b' + i + ' >>> 13;');
  }
  src.push('');
  src.push('out.negative = self.negative ^ num.negative;');
  src.push('out.length = ' + len + ';');

  for (var k = 0; k < len; k++) {
    var minJ = Math.max(0, k - alen + 1);
    var maxJ = Math.min(k, blen - 1);

    src.push('\/* k = ' + k + ' *\/');
    src.push('var w' + k + ' = c;');
    src.push('c = 0;');
    for (var j = minJ; j <= maxJ; j++) {
      i = k - j;

      src.push('lo = Math.imul(al' + i + ', bl' + j + ');');
      src.push('mid = Math.imul(al' + i + ', bh' + j + ');');
      src.push('mid = (mid + Math.imul(ah' + i + ', bl' + j + ')) | 0;');
      src.push('hi = Math.imul(ah' + i + ', bh' + j + ');');

      src.push('w' + k + ' = (w' + k + ' + lo) | 0;');
      src.push('w' + k + ' = (w' + k + ' + ((mid & 0x1fff) << 13)) | 0;');
      src.push('c = (c + hi) | 0;');
      src.push('c = (c + (mid >>> 13)) | 0;');
      src.push('c = (c + (w' + k + ' >>> 26)) | 0;');
      src.push('w' + k + ' &= 0x3ffffff;');
    }
  }
  // Store in separate step for better memory access
  for (k = 0; k < len; k++) {
    src.push('o[' + k + '] = w' + k + ';');
  }
  src.push('if (c !== 0) {',
           '  o[' + k + '] = c;',
           '  out.length++;',
           '}',
           'return out;');

  return src.join('\n');
}

console.log(genCombMulTo(10, 10));
