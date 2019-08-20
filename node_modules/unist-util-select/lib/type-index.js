'use strict';


module.exports = function TypeIndex () {
  var typeLists = Object.create(null);

  var index = function (node) {
    var type = node.type;

    if (!typeLists[type]) {
      typeLists[type] = [];
    }

    return typeLists[type].push(node) - 1;
  };

  index.count = function (node) {
    var typeList = typeLists[node.type];
    return typeList ? typeList.length : 0;
  };

  return index;
};
