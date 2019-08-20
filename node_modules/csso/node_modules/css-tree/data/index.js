var mdnProperties = require('mdn-data/css/properties.json');
var mdnSyntaxes = require('mdn-data/css/syntaxes.json');
var patch = require('./patch.json');

function buildDictionary(dict, patchDict) {
    var result = {};

    // copy all syntaxes for an original dict
    for (var key in dict) {
        result[key] = dict[key].syntax;
    }

    // apply a patch
    for (var key in patchDict) {
        if (key in dict) {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax;
            } else {
                delete result[key];
            }
        } else {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax;
            }
        }
    }

    return result;
}

module.exports = {
    properties: buildDictionary(mdnProperties, patch.properties),
    types: buildDictionary(mdnSyntaxes, patch.syntaxes)
};
