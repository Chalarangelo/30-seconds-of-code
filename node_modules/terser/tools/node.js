var fs = require("fs");

var bundle_path = __dirname + "/../dist/bundle.js";
var UglifyJS = require(bundle_path);
module.exports = UglifyJS;

function infer_options(options) {
    var result = UglifyJS.minify("", options);
    return result.error && result.error.defs;
}

UglifyJS.default_options = function() {
    var defs = {};
    Object.keys(infer_options({ 0: 0 })).forEach(function(component) {
        var options = {};
        options[component] = { 0: 0 };
        if (options = infer_options(options)) {
            defs[component] = options;
        }
    });
    return defs;
};
