if(require('./$.descriptors')){
  var $export = require('./$.export');
  $export($export.G + $export.W + $export.F * !require('./$.typed').ABV, {DataView: require('./$.buffer').DataView});
}