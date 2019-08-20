var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING];
if(new Date(NaN) + '' != INVALID_DATE){
  require('./$.redefine')(DateProto, TO_STRING, function toString(){
    var value = +this;
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}