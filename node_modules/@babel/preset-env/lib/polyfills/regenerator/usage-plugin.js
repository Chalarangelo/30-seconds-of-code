"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("../../utils");

function _default() {
  return {
    name: "regenerator-usage",

    pre() {
      this.usesRegenerator = false;
    },

    visitor: {
      Function(path) {
        const {
          node
        } = path;

        if (!this.usesRegenerator && (node.generator || node.async)) {
          this.usesRegenerator = true;
          (0, _utils.createImport)(path, "regenerator-runtime");
        }
      }

    },

    post() {
      if (this.opts.debug && this.usesRegenerator) {
        console.log(`\n[${this.file.opts.filename}] Based on your code and targets, added regenerator-runtime.`);
      }
    }

  };
}