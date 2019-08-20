var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimitLoose = require("./iterableToArrayLimitLoose");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArrayLoose(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || nonIterableRest();
}

module.exports = _slicedToArrayLoose;