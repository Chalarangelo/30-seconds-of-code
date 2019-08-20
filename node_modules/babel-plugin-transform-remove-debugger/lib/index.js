"use strict";

module.exports = function () {
  return {
    name: "transform-remove-debugger",
    visitor: {
      DebuggerStatement(path) {
        path.remove();
      }

    }
  };
};