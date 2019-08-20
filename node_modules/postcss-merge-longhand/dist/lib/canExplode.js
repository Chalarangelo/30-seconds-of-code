"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isCustomProp = require("./isCustomProp");

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasInherit = node => node.value.toLowerCase().includes("inherit");
const hasInitial = node => node.value.toLowerCase().includes("initial");
const hasUnset = node => node.value.toLowerCase().includes("unset");

exports.default = (prop, includeCustomProps = true) => {
    if (includeCustomProps && (0, _isCustomProp2.default)(prop)) {
        return false;
    }

    return !hasInherit(prop) && !hasInitial(prop) && !hasUnset(prop);
};

module.exports = exports["default"];