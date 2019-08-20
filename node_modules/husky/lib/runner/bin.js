"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
_1.default(process.argv)
    .then(status => process.exit(status))
    .catch(err => {
    console.log('Husky > unexpected error', err);
    process.exit(1);
});
