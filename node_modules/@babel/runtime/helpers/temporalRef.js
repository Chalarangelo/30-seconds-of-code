var temporalUndefined = require("./temporalUndefined");

function _temporalRef(val, name) {
  if (val === temporalUndefined) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
}

module.exports = _temporalRef;