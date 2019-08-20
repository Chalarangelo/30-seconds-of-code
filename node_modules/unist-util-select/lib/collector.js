'use strict';


// @example
//   var collect = Collector();
//   collect('foo');
//   collect(['foo', 'bar', 'baz']);
//   collect.result
//   //=> ['foo', 'bar', 'baz']
//
module.exports = function Collector () {
  var result = [];

  // Append elements to array, filtering out duplicates.
  function collect (source) {
    if (Array.isArray(source)) {
      source.forEach(collectOne);
    }
    else {
      collectOne(source);
    }

    function collectOne (element) {
      if (result.indexOf(element) < 0) {
        result.push(element);
      }
    }
  }

  collect.result = result;
  return collect;
};
