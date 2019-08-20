"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesState_1 = require("./matchesState");
function mapState(stateMap, stateId) {
    var foundStateId;
    Object.keys(stateMap).forEach(function (mappedStateId) {
        if (matchesState_1.matchesState(mappedStateId, stateId) &&
            (!foundStateId || stateId.length > foundStateId.length)) {
            foundStateId = mappedStateId;
        }
    });
    return stateMap[foundStateId];
}
exports.mapState = mapState;
