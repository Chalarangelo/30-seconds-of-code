'use strict';
var $            = require('./$')
  , global       = require('./$.global')
  , $typed       = require('./$.typed')
  , redefineAll  = require('./$.redefine-all')
  , strictNew    = require('./$.strict-new')
  , toInteger    = require('./$.to-integer')
  , toLength     = require('./$.to-length')
  , arrayFill    = require('./$.array-fill')
  , $ArrayBuffer = global.ArrayBuffer
  , $DataView    = global.DataView
  , Math         = global.Math
  , parseInt     = global.parseInt
  , abs          = Math.abs
  , pow          = Math.pow
  , min          = Math.min
  , floor        = Math.floor
  , log          = Math.log
  , LN2          = Math.LN2
  , BYTE_LENGTH  = 'byteLength';

// pack / unpack based on
// https://github.com/inexorabletash/polyfill/blob/v0.1.11/typedarray.js#L123-L264
// TODO: simplify
var signed = function(value, bits){
  var s = 32 - bits;
  return value << s >> s;
};
var unsigned = function(value, bits){
  var s = 32 - bits;
  return value << s >>> s;
};
var roundToEven = function(n){
  var w = floor(n)
    , f = n - w;
  return f < .5 ? w : f > .5 ? w + 1 : w % 2 ? w + 1 : w;
};
var packI8 = function(n){
  return [n & 0xff];
};
var unpackI8 = function(bytes){
  return signed(bytes[0], 8);
};
var packU8 = function(n){
  return [n & 0xff];
};
var unpackU8 = function(bytes){
  return unsigned(bytes[0], 8);
};
var packI16 = function(n){
  return [n & 0xff, n >> 8 & 0xff];
};
var unpackI16 = function(bytes){
  return signed(bytes[1] << 8 | bytes[0], 16);
};
var packU16 = function(n){
  return [n & 0xff, n >> 8 & 0xff];
};
var unpackU16 = function(bytes){
  return unsigned(bytes[1] << 8 | bytes[0], 16);
};
var packI32 = function(n){
  return [n & 0xff, n >> 8 & 0xff, n >> 16 & 0xff, n >> 24 & 0xff];
};
var unpackI32 = function(bytes){
  return signed(bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0], 32);
};
var packU32 = function(n){
  return [n & 0xff, n >> 8 & 0xff, n >> 16 & 0xff, n >> 24 & 0xff];
};
var unpackU32 = function(bytes){
  return unsigned(bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0], 32);
};
var packIEEE754 = function(v, ebits, fbits) {
  var bias = (1 << ebits - 1) - 1
    , s, e, f, i, bits, str, bytes;
  // Compute sign, exponent, fraction
  if (v !== v) {
    // NaN
    // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
    e = (1 << ebits) - 1;
    f = pow(2, fbits - 1);
    s = 0;
  } else if(v === Infinity || v === -Infinity){
    e = (1 << ebits) - 1;
    f = 0;
    s = v < 0 ? 1 : 0;
  } else if(v === 0){
    e = 0;
    f = 0;
    s = 1 / v === -Infinity ? 1 : 0;
  } else {
    s = v < 0;
    v = abs(v);
    if(v >= pow(2, 1 - bias)){
      e = min(floor(log(v) / LN2), 1023);
      var significand = v / pow(2, e);
      if(significand < 1){
        e -= 1;
        significand *= 2;
      }
      if(significand >= 2){
        e += 1;
        significand /= 2;
      }
      f = roundToEven(significand * pow(2, fbits));
      if(f / pow(2, fbits) >= 2){
        e = e + 1;
        f = 1;
      }
      if(e > bias){
        // Overflow
        e = (1 << ebits) - 1;
        f = 0;
      } else {
        // Normalized
        e = e + bias;
        f = f - pow(2, fbits);
      }
    } else {
      // Denormalized
      e = 0;
      f = roundToEven(v / pow(2, 1 - bias - fbits));
    }
  }
  // Pack sign, exponent, fraction
  bits = [];
  for(i = fbits; i; i -= 1){
    bits.push(f % 2 ? 1 : 0);
    f = floor(f / 2);
  }
  for(i = ebits; i; i -= 1){
    bits.push(e % 2 ? 1 : 0);
    e = floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  str = bits.join('');
  // Bits to bytes
  bytes = [];
  while(str.length){
    bytes.unshift(parseInt(str.slice(0, 8), 2));
    str = str.slice(8);
  }
  return bytes;
};
var unpackIEEE754 = function(bytes, ebits, fbits){
  var bits = []
    , i, j, b, str, bias, s, e, f;
  for(i = 0; i < bytes.length; ++i)for(b = bytes[i], j = 8; j; --j){
    bits.push(b % 2 ? 1 : 0);
    b = b >> 1;
  }
  bits.reverse();
  str = bits.join('');
  // Unpack sign, exponent, fraction
  bias = (1 << ebits - 1) - 1;
  s = parseInt(str.slice(0, 1), 2) ? -1 : 1;
  e = parseInt(str.slice(1, 1 + ebits), 2);
  f = parseInt(str.slice(1 + ebits), 2);
  // Produce number
  if(e === (1 << ebits) - 1)return f !== 0 ? NaN : s * Infinity;
  // Normalized
  else if(e > 0)return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
  // Denormalized
  else if(f !== 0)return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
  return s < 0 ? -0 : 0;
};
var unpackF64 = function(b){
  return unpackIEEE754(b, 11, 52);
};
var packF64 = function(v){
  return packIEEE754(v, 11, 52);
};
var unpackF32 = function(b){
  return unpackIEEE754(b, 8, 23);
};
var packF32 = function(v){
  return packIEEE754(v, 8, 23);
};

var addGetter = function(C, key, internal){
  $.setDesc(C.prototype, key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, conversion, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view._l)throw RangeError();
  var store = view._b._b
    , start = intIndex + view._o
    , pack  = store.slice(start, start + bytes);
  isLittleEndian || pack.reverse();
  return conversion(pack);
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view._l)throw RangeError();
  var store = view._b._b
    , start = intIndex + view._o
    , pack  = conversion(+value);
  isLittleEndian || pack.reverse();
  for(var i = 0; i < bytes; i++)store[start + i] = pack[i];
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    strictNew(this, $ArrayBuffer, 'ArrayBuffer');
    var numberLength = +length
      , byteLength   = toLength(numberLength);
    if(numberLength != byteLength)throw RangeError();
    this._b = arrayFill.call(Array(byteLength), 0);
    this._l = byteLength;
  };
  addGetter($ArrayBuffer, BYTE_LENGTH, '_l');

  $DataView = function DataView(buffer, byteOffset, byteLength){
    strictNew(this, $DataView, 'DataView');
    if(!(buffer instanceof $ArrayBuffer))throw TypeError();
    var bufferLength = buffer._l
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError();
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError();
    this._b = buffer;
    this._o = offset;
    this._l = byteLength;
  };
  addGetter($DataView, 'buffer', '_b');
  addGetter($DataView, BYTE_LENGTH, '_l');
  addGetter($DataView, 'byteOffset', '_o');
  redefineAll($DataView.prototype, {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset, unpackI8);
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset, unpackU8);
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      return get(this, 2, byteOffset, unpackI16, arguments.length > 1 ? arguments[1] : undefined);
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      return get(this, 2, byteOffset, unpackU16, arguments.length > 1 ? arguments[1] : undefined);
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return get(this, 4, byteOffset, unpackI32, arguments.length > 1 ? arguments[1] : undefined);
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return get(this, 4, byteOffset, unpackU32, arguments.length > 1 ? arguments[1] : undefined);
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return get(this, 4, byteOffset, unpackF32, arguments.length > 1 ? arguments[1] : undefined);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return get(this, 8, byteOffset, unpackF64, arguments.length > 1 ? arguments[1] : undefined);
    },
    setInt8: function setInt8(byteOffset, value){
      return set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      return set(this, 1, byteOffset, packU8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      return set(this, 2, byteOffset, packI16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      return set(this, 2, byteOffset, packU16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      return set(this, 4, byteOffset, packI32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      return set(this, 4, byteOffset, packU32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      return set(this, 4, byteOffset, packF32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      return set(this, 8, byteOffset, packF64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
}
require('./$.hide')($DataView.prototype, $typed.VIEW, true);
module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView:    $DataView
};