"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateNode_1 = require("./StateNode");
function Machine(config, options) {
    return new StateNode_1.StateNode(config, options);
}
exports.Machine = Machine;
