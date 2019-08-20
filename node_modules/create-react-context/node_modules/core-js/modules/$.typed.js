var global = require('./$.global')
  , hide   = require('./$.hide')
  , uid    = require('./$.uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , ARRAYS = true
  , i = 0, l = 9;

var TypedArrayConstructors = [
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array'
];

while(i < l){
  var Typed = global[TypedArrayConstructors[i++]];
  if(Typed){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else ARRAYS = false;
}

module.exports = {
  ARRAYS: ARRAYS,
  ABV:    ABV,
  CONSTR: ARRAYS && ABV,
  TYPED:  TYPED,
  VIEW:   VIEW
};