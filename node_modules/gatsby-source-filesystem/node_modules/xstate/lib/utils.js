"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
function getEventType(event) {
    try {
        return typeof event === 'string' || typeof event === 'number'
            ? "" + event
            : event.type;
    }
    catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
exports.getEventType = getEventType;
function getActionType(action) {
    try {
        return typeof action === 'string' || typeof action === 'number'
            ? "" + action
            : typeof action === 'function'
                ? action.name
                : action.type;
    }
    catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
exports.getActionType = getActionType;
function toStatePath(stateId, delimiter) {
    try {
        if (Array.isArray(stateId)) {
            return stateId;
        }
        return stateId.toString().split(delimiter);
    }
    catch (e) {
        throw new Error("'" + stateId + "' is not a valid state path.");
    }
}
exports.toStatePath = toStatePath;
function toStateValue(stateValue, delimiter) {
    if (stateValue instanceof State_1.State) {
        return stateValue.value;
    }
    if (typeof stateValue === 'object' && !(stateValue instanceof State_1.State)) {
        return stateValue;
    }
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
}
exports.toStateValue = toStateValue;
function pathToStateValue(statePath) {
    if (statePath.length === 1) {
        return statePath[0];
    }
    var value = {};
    var marker = value;
    for (var i = 0; i < statePath.length - 1; i++) {
        if (i === statePath.length - 2) {
            marker[statePath[i]] = statePath[i + 1];
        }
        else {
            marker[statePath[i]] = {};
            marker = marker[statePath[i]];
        }
    }
    return value;
}
exports.pathToStateValue = pathToStateValue;
function mapValues(collection, iteratee) {
    var result = {};
    Object.keys(collection).forEach(function (key) {
        result[key] = iteratee(collection[key], key, collection);
    });
    return result;
}
exports.mapValues = mapValues;
function mapFilterValues(collection, iteratee, predicate) {
    var result = {};
    Object.keys(collection).forEach(function (key) {
        var item = collection[key];
        if (!predicate(item)) {
            return;
        }
        result[key] = iteratee(item, key, collection);
    });
    return result;
}
exports.mapFilterValues = mapFilterValues;
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */
exports.path = function (props) { return function (object) {
    var result = object;
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        result = result[prop];
    }
    return result;
}; };
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */
function nestedPath(props, accessorProp) {
    return function (object) {
        var result = object;
        for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
            var prop = props_2[_i];
            result = result[accessorProp][prop];
        }
        return result;
    };
}
exports.nestedPath = nestedPath;
exports.toStatePaths = function (stateValue) {
    if (typeof stateValue === 'string') {
        return [[stateValue]];
    }
    var result = exports.flatMap(Object.keys(stateValue).map(function (key) {
        return exports.toStatePaths(stateValue[key]).map(function (subPath) {
            return [key].concat(subPath);
        });
    }));
    return result;
};
exports.pathsToStateValue = function (paths) {
    var result = {};
    if (paths && paths.length === 1 && paths[0].length === 1) {
        return paths[0][0];
    }
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var currentPath = paths_1[_i];
        var marker = result;
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < currentPath.length; i++) {
            var subPath = currentPath[i];
            if (i === currentPath.length - 2) {
                marker[subPath] = currentPath[i + 1];
                break;
            }
            marker[subPath] = marker[subPath] || {};
            marker = marker[subPath];
        }
    }
    return result;
};
exports.flatMap = function (array) {
    return array.reduce(function (a, b) { return a.concat(b); }, []);
};
