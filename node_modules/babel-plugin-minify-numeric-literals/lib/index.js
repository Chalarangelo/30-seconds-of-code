"use strict";

module.exports = function () {
  return {
    name: "minify-numeric-literals",
    visitor: {
      NumericLiteral(path) {
        if (!path.node.extra) return;

        var normal = path.node.value.toString().replace(/^0\./, ".");
        var exponential = path.node.value.toExponential().replace(/\+/g, "");

        if (exponential.indexOf(".") >= 0 && exponential.indexOf("e") >= 0) {
          var lastChar = exponential.substr(exponential.lastIndexOf("e") + 1);
          var dotIndex = exponential.lastIndexOf(".") + 1;
          var subLength = exponential.substr(dotIndex, exponential.lastIndexOf("e") - dotIndex).length;
          exponential = (exponential.substr(0, exponential.lastIndexOf("e") + 1) + (lastChar - subLength)).replace(".", "").replace(/e0/, "");
        }

        var replacement = normal.length > exponential.length ? exponential : normal;

        if (path.node.extra.raw.length > replacement.length) {
          path.node.extra.raw = replacement;
        }
      }
    }
  };
};