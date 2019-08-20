var $export = require('./$.export')
  , define  = require('./$.object-define');

$export($export.S + $export.F, 'Object', {define: define});