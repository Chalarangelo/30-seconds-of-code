"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig = require("cosmiconfig");
function getConf(dir) {
    const explorer = cosmiconfig('husky');
    const { config = {} } = explorer.searchSync(dir) || {};
    const defaults = {
        skipCI: true
    };
    return Object.assign({}, defaults, config);
}
exports.default = getConf;
