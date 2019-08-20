'use strict';

const Hoek = require('@hapi/hoek');

const Symbols = require('../symbols');


const internals = {};


exports.concat = function (target, source) {

    if (!source) {
        return target;
    }

    const obj = Object.assign({}, target);

    const language = source.language;

    Object.assign(obj, source);

    if (language && target && target.language) {
        obj.language = Hoek.applyToDefaults(target.language, language);
    }

    if (obj[Symbols.settingsCache]) {
        delete obj[Symbols.settingsCache];
    }

    return obj;
};
