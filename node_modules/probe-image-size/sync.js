'use strict';


var parsers = require('./lib/parsers_sync');


function probeBuffer(buffer) {
  var parser_names = Object.keys(parsers);

  for (var i = 0; i < parser_names.length; i++) {
    var result = parsers[parser_names[i]](buffer);

    if (result) return result;
  }

  return null;
}


///////////////////////////////////////////////////////////////////////
// Exports
//

module.exports = function get_image_size(src) {
  return probeBuffer(src);
};

module.exports.parsers = parsers;
