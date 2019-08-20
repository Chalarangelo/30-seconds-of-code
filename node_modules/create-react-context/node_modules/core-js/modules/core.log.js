var $       = require('./$')
  , global  = require('./$.global')
  , $export = require('./$.export')
  , log     = {}
  , enabled = true;
// Methods from https://github.com/DeveloperToolsWG/console-object/blob/master/api.md
$.each.call((
  'assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,' +
  'info,isIndependentlyComposed,log,markTimeline,profile,profileEnd,table,' +
  'time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn'
).split(','), function(key){
  log[key] = function(){
    var $console = global.console;
    if(enabled && $console && $console[key]){
      return Function.apply.call($console[key], $console, arguments);
    }
  };
});
$export($export.G + $export.F, {log: require('./$.object-assign')(log.log, log, {
  enable: function(){
    enabled = true;
  },
  disable: function(){
    enabled = false;
  }
})});