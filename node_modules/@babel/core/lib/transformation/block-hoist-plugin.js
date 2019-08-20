"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadBlockHoistPlugin;

function _sortBy() {
  const data = _interopRequireDefault(require("lodash/sortBy"));

  _sortBy = function () {
    return data;
  };

  return data;
}

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LOADED_PLUGIN;

function loadBlockHoistPlugin() {
  if (!LOADED_PLUGIN) {
    const config = (0, _config.default)({
      babelrc: false,
      configFile: false,
      plugins: [blockHoistPlugin]
    });
    LOADED_PLUGIN = config ? config.passes[0][0] : undefined;
    if (!LOADED_PLUGIN) throw new Error("Assertion failure");
  }

  return LOADED_PLUGIN;
}

const blockHoistPlugin = {
  name: "internal.blockHoist",
  visitor: {
    Block: {
      exit({
        node
      }) {
        let hasChange = false;

        for (let i = 0; i < node.body.length; i++) {
          const bodyNode = node.body[i];

          if (bodyNode && bodyNode._blockHoist != null) {
            hasChange = true;
            break;
          }
        }

        if (!hasChange) return;
        node.body = (0, _sortBy().default)(node.body, function (bodyNode) {
          let priority = bodyNode && bodyNode._blockHoist;
          if (priority == null) priority = 1;
          if (priority === true) priority = 2;
          return -1 * priority;
        });
      }

    }
  }
};