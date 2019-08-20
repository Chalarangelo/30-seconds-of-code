"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var PREFIX = 'xstate';
// xstate-specific action types
exports.actionTypes = {
    start: PREFIX + ".start",
    stop: PREFIX + ".stop",
    raise: PREFIX + ".raise",
    send: PREFIX + ".send",
    cancel: PREFIX + ".cancel",
    null: PREFIX + ".null"
};
var createActivityAction = function (actionType) { return function (activity) {
    var data = typeof activity === 'string' || typeof activity === 'number'
        ? { type: activity }
        : activity;
    return {
        type: actionType,
        activity: utils_1.getEventType(activity),
        data: data
    };
}; };
exports.toEventObject = function (event) {
    if (typeof event === 'string' || typeof event === 'number') {
        return { type: event };
    }
    return event;
};
exports.toActionObject = function (action) {
    var actionObject;
    if (typeof action === 'string' || typeof action === 'number') {
        actionObject = { type: action };
    }
    else if (typeof action === 'function') {
        actionObject = { type: action.name };
    }
    else {
        return action;
    }
    Object.defineProperty(actionObject, 'toString', {
        value: function () { return actionObject.type; }
    });
    return actionObject;
};
exports.toActionObjects = function (action) {
    if (!action) {
        return [];
    }
    var actions = Array.isArray(action) ? action : [action];
    return actions.map(exports.toActionObject);
};
exports.raise = function (eventType) { return ({
    type: exports.actionTypes.raise,
    event: eventType
}); };
exports.send = function (event, options) {
    return {
        type: exports.actionTypes.send,
        event: exports.toEventObject(event),
        delay: options ? options.delay : undefined,
        id: options && options.id !== undefined ? options.id : utils_1.getEventType(event)
    };
};
exports.cancel = function (sendId) {
    return {
        type: exports.actionTypes.cancel,
        sendId: sendId
    };
};
exports.start = createActivityAction(exports.actionTypes.start);
exports.stop = createActivityAction(exports.actionTypes.stop);
