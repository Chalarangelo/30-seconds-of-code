/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function getUniqueKey(pathname) {
    return pathname.replace(/[\\/]/g, '_');
}

function getOutput(cache) {
    return Object.keys(cache).reduce((output, key) => {
        const item = cache[key];
        return Object.assign(output, {
            [item.file]: item.mappedCoverage
        });
    }, {});
}

module.exports = { getUniqueKey, getOutput };
