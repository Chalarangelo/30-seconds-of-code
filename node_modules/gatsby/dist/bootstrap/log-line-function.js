"use strict";

;
[`log`, `warn`].forEach(function (method) {
  var old = console[method];

  console[method] = function () {
    var stack = new Error().stack.split(/\n/); // Chrome includes a single "Error" line, FF doesn't.

    if (stack[0].indexOf(`Error`) === 0) {
      stack = stack.slice(1);
    }

    var args = [].slice.apply(arguments).concat([stack[1].trim()]);
    return old.apply(console, args);
  };
});
//# sourceMappingURL=log-line-function.js.map