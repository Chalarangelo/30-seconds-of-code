'use strict';

const Assert = require('./assert');
const Clone = require('./clone');
const Merge = require('./merge');
const Utils = require('./utils');


const internals = {};


module.exports = function (defaults, source, options = {}) {

    Assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
    Assert(!source || source === true || typeof source === 'object', 'Invalid source value: must be true, falsy or an object');
    Assert(typeof options === 'object', 'Invalid options: must be an object');

    if (!source) {                                                  // If no source, return null
        return null;
    }

    if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
    }

    const copy = Clone(defaults);

    if (source === true) {                                          // If source is set to true, use defaults
        return copy;
    }

    const nullOverride = options.nullOverride !== undefined ? options.nullOverride : false;
    return Merge(copy, source, { nullOverride, mergeArrays: false });
};


internals.applyToDefaultsWithShallow = function (defaults, source, options) {

    const keys = options.shallow;
    Assert(Array.isArray(keys), 'Invalid keys');

    options = Object.assign({}, options);
    options.shallow = false;

    const copy = Clone(defaults, { shallow: keys });

    if (source === true) {                                                      // If source is set to true, use defaults
        return copy;
    }

    const storage = Utils.store(source, keys);                              // Move shallow copy items to storage
    Merge(copy, source, { mergeArrays: false, nullOverride: false });   // Deep copy the rest
    Utils.restore(copy, source, storage);                                   // Shallow copy the stored items and restore
    return copy;
};
