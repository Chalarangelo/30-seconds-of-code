var global  = require('./$.global')
  , core    = require('./$.core')
  , $export = require('./$.export')
  , partial = require('./$.partial');
// https://esdiscuss.org/topic/promise-returning-delay-function
$export($export.G + $export.F, {
  delay: function delay(time){
    return new (core.Promise || global.Promise)(function(resolve){
      setTimeout(partial.call(resolve, true), time);
    });
  }
});