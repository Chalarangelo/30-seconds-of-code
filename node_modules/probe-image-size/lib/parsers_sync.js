'use strict';


module.exports = {
  bmp:  require('./parse_sync/bmp'),
  gif:  require('./parse_sync/gif'),
  jpeg: require('./parse_sync/jpeg'),
  png:  require('./parse_sync/png'),
  psd:  require('./parse_sync/psd'),
  svg:  require('./parse_sync/svg'),
  tiff: require('./parse_sync/tiff'),
  webp: require('./parse_sync/webp')
};
