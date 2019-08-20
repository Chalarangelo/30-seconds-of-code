"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils"); // TODO: change to utils
var constants_1 = require("./constants");
function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) { delimiter = constants_1.STATE_DELIMITER; }
    var parentStateValue = utils_1.toStateValue(parentStateId, delimiter);
    var childStateValue = utils_1.toStateValue(childStateId, delimiter);
    if (typeof childStateValue === 'string') {
        if (typeof parentStateValue === 'string') {
            return childStateValue === parentStateValue;
        }
        // Parent more specific than child
        return false;
    }
    if (typeof parentStateValue === 'string') {
        return parentStateValue in childStateValue;
    }
    return Object.keys(parentStateValue).every(function (key) {
        if (!(key in childStateValue)) {
            return false;
        }
        return matchesState(parentStateValue[key], childStateValue[key]);
    });
}
exports.matchesState = matchesState;
