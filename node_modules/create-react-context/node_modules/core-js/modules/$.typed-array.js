'use strict';
if(require('./$.descriptors')){
  var LIBRARY             = require('./$.library')
    , global              = require('./$.global')
    , $                   = require('./$')
    , fails               = require('./$.fails')
    , $export             = require('./$.export')
    , $typed              = require('./$.typed')
    , $buffer             = require('./$.buffer')
    , ctx                 = require('./$.ctx')
    , strictNew           = require('./$.strict-new')
    , propertyDesc        = require('./$.property-desc')
    , hide                = require('./$.hide')
    , redefineAll         = require('./$.redefine-all')
    , isInteger           = require('./$.is-integer')
    , toInteger           = require('./$.to-integer')
    , toLength            = require('./$.to-length')
    , toIndex             = require('./$.to-index')
    , toPrimitive         = require('./$.to-primitive')
    , isObject            = require('./$.is-object')
    , toObject            = require('./$.to-object')
    , isArrayIter         = require('./$.is-array-iter')
    , isIterable          = require('./core.is-iterable')
    , getIterFn           = require('./core.get-iterator-method')
    , wks                 = require('./$.wks')
    , createArrayMethod   = require('./$.array-methods')
    , createArrayIncludes = require('./$.array-includes')
    , speciesConstructor  = require('./$.species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./$.iterators')
    , $iterDetect         = require('./$.iter-detect')
    , setSpecies          = require('./$.set-species')
    , arrayFill           = require('./$.array-fill')
    , arrayCopyWithin     = require('./$.array-copy-within')
    , ArrayProto          = Array.prototype
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , setDesc             = $.setDesc
    , getDesc             = $.getDesc
    , arrayForEach        = createArrayMethod(0)
    , arrayMap            = createArrayMethod(1)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arrayReverse        = ArrayProto.reverse
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = wks('typed_constructor')
    , DEF_CONSTRUCTOR     = wks('def_constructor')
    , ALL_ARRAYS          = $typed.ARRAYS
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT';

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var fromList = function(O, list){
    var index  = 0
      , length = list.length
      , result = allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && $$len > 2)mapfn = ctx(mapfn, $$[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var addGetter = function(C, key, internal){
    setDesc(C.prototype, key, {get: function(){ return this._d[internal]; }});
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };
  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return fromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return fromList(this, arrayMap(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined)); // TODO
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      return arrayReverse.call(validate(this));
    },
    set: function set(arrayLike /*, offset */){
      validate(this);
      var offset = toInteger(arguments.length > 1 ? arguments[1] : undefined);
      if(offset < 0)throw RangeError();
      var length = this.length;
      var src    = toObject(arrayLike);
      var index  = 0;
      var len    = toLength(src.length);
      if(len + offset > length)throw RangeError();
      while(index < len)this[offset + index] = src[index++];
    },
    slice: function slice(start, end){
      return fromList(this, arraySlice.call(validate(this), start, end)); // TODO
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    },
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && TYPED_ARRAY in target
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : getDesc(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc)){
      if('value' in desc)target[key] = desc.value;
      return target;
    } else return setDesc(target, key, desc);
  };

  if(!ALL_ARRAYS){
    $.getDesc = $getDesc;
    $.setDesc = $setDesc;
  }

  $export($export.S + $export.F * !ALL_ARRAYS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, {
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  $.setDesc($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , FORCED     = !TypedArray || !$typed.ABV
      , $iterator  = proto.values
      , O          = {};
    var addElement = function(that, index){
      setDesc(that, index, {
        get: function(){
          var data = this._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        },
        set: function(it){
          var data = this._d;
          if(CLAMPED)it = (it = Math.round(it)) < 0 ? 0 : it > 0xff ? 0xff : it & 0xff;
          data.v[SETTER](index * BYTES + data.o, it, LITTLE_ENDIAN);
        },
        enumerable: true
      });
    };
    if(!$ArrayBuffer)return;
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        strictNew(that, TypedArray, NAME);
        var index  = 0
          , offset = 0
          , buffer, byteLength, length;
        if(!isObject(data)){
          byteLength = toInteger(data) * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        // TODO TA case
        } else if(data instanceof $ArrayBuffer){
          buffer = data;
          offset = toInteger($offset);
          if(offset < 0 || offset % BYTES)throw RangeError();
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError();
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError();
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError();
          }
        } else return $from.call(TypedArray, data);
        length = byteLength / BYTES;
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArray.prototype = $.create($TypedArrayPrototype$);
      addGetter(TypedArray, 'buffer', 'b');
      addGetter(TypedArray, 'byteOffset', 'o');
      addGetter(TypedArray, 'byteLength', 'l');
      addGetter(TypedArray, 'length', 'e');
      hide(TypedArray, BYTES_PER_ELEMENT, BYTES);
      hide(TypedArray.prototype, BYTES_PER_ELEMENT, BYTES);
      hide(TypedArray.prototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        strictNew(that, TypedArray, NAME);
        if(isObject(data) && isIterable(data))return $from.call(TypedArray, data);
        return $length === undefined ? new Base(data, $offset) : new Base(data, $offset, $length);
      });
      TypedArray.prototype = Base.prototype;
      if(!LIBRARY)TypedArray.prototype.constructor = TypedArray;
    }
    var TypedArrayPrototype = TypedArray.prototype;
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
    TAG in TypedArrayPrototype || $.setDesc(TypedArrayPrototype, TAG, {
      get: function(){ return NAME; }
    });

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S + $export.F * (TypedArray != Base), NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: Base.from || $from,
      of: Base.of || $of
    });

    $export($export.P + $export.F * FORCED, NAME, proto);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      return [1, 2].toLocaleString() != new Typed([1, 2]).toLocaleString()
    }), NAME, {toLocaleString: $toLocaleString});
    
    Iterators[NAME] = $nativeIterator || $iterator;
    LIBRARY || $nativeIterator || hide(TypedArrayPrototype, ITERATOR, $iterator);
    
    setSpecies(NAME);
  };
} else module.exports = function(){ /* empty */};