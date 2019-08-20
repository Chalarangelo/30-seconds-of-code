var path    = require('./$.path')
  , $export = require('./$.export');

// Placeholder
require('./$.core')._ = path._ = path._ || {};

$export($export.P + $export.F, 'Function', {part: require('./$.partial')});