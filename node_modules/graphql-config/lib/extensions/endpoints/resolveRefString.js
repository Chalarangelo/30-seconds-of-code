"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resolveRefString(str, values) {
    var _a = parse(str), strings = _a.strings, rawRefs = _a.rawRefs;
    var refValues = rawRefs.map(function (ref) { return resolveRef(ref, values); });
    var res = '';
    for (var i = 0; i < refValues.length; i++) {
        res += strings[i];
        res += refValues[i];
    }
    res += strings.pop();
    return res;
}
exports.resolveRefString = resolveRefString;
function resolveEnvsInValues(config, env) {
    for (var key in config) {
        var value = config[key];
        if (typeof value === 'string') {
            config[key] = resolveRefString(value, { env: env });
        }
        else if (typeof value === 'object') {
            config[key] = resolveEnvsInValues(value, env);
        }
    }
    return config;
}
exports.resolveEnvsInValues = resolveEnvsInValues;
function getUsedEnvs(config) {
    var result = {};
    var traverse = function (val) {
        if (typeof val === 'string') {
            var rawRefs = parse(val).rawRefs;
            for (var _i = 0, rawRefs_1 = rawRefs; _i < rawRefs_1.length; _i++) {
                var ref = rawRefs_1[_i];
                result[parseRef(ref).ref] = resolveRef(ref, {}, false);
            }
        }
        else if (typeof val === 'object') {
            for (var key in val) {
                traverse(val[key]);
            }
        }
    };
    traverse(config);
    return result;
}
exports.getUsedEnvs = getUsedEnvs;
function parseRef(rawRef) {
    var _a = rawRef.split(/\s*:\s*/), type = _a[0], ref = _a[1];
    return { type: type, ref: ref };
}
function resolveRef(rawRef, values, throwIfUndef) {
    if (values === void 0) { values = {}; }
    if (throwIfUndef === void 0) { throwIfUndef = true; }
    var _a = parseRef(rawRef), type = _a.type, ref = _a.ref;
    if (type === 'env') {
        if (!ref) {
            throw new Error("Reference value is not present for " + type + ": " + rawRef);
        }
        var refValue = (values.env && values.env[ref]) || process.env[ref];
        if (!refValue) {
            if (throwIfUndef) {
                throw new Error("Environment variable " + ref + " is not set");
            }
            else {
                return null;
            }
        }
        return refValue;
    }
    else {
        // support only 'env' for now
        throw new Error('Undefined reference type ${refType}. Only "env" is supported');
    }
}
function parse(str) {
    var regex = /\${([^}]*)}/g;
    var strings = [];
    var rawRefs = [];
    var prevIdx = 0;
    var match;
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = regex.exec(str)) !== null) {
        if (match.index > 0 && str[match.index - 1] === '\\') {
            continue;
        }
        strings.push(str.substring(prevIdx, match.index));
        rawRefs.push(match[1]);
        prevIdx = match.index + match[0].length;
    }
    strings.push(str.substring(prevIdx));
    return { strings: strings, rawRefs: rawRefs };
}
