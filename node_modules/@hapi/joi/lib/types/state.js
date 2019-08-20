'use strict';

const internals = {};


module.exports = class {
    constructor(key, path, parent, reference) {

        this.key = key;
        this.path = path;
        this.parent = parent;
        this.reference = reference;
    }
};
