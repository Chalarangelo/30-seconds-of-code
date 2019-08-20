'use strict';


module.exports = {
  bmp:  require('./parse_stream/bmp'),
  gif:  require('./parse_stream/gif'),
  jpeg: require('./parse_stream/jpeg'),
  png:  require('./parse_stream/png'),
  psd:  require('./parse_stream/psd'),
  svg:  require('./parse_stream/svg'),
  tiff: require('./parse_stream/tiff'),
  webp: require('./parse_stream/webp')
};
