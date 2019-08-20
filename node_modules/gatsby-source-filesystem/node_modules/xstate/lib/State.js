"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var State = /** @class */ (function () {
    function State(value, historyValue, history, actions, activities, data, 
    /**
     * Internal event queue
     */
    events) {
        if (actions === void 0) { actions = []; }
        if (activities === void 0) { activities = constants_1.EMPTY_ACTIVITY_MAP; }
        if (data === void 0) { data = {}; }
        if (events === void 0) { events = []; }
        this.value = value;
        this.historyValue = historyValue;
        this.history = history;
        this.actions = actions;
        this.activities = activities;
        this.data = data;
        this.events = events;
    }
    State.from = function (stateValue) {
        if (stateValue instanceof State) {
            return stateValue;
        }
        return new State(stateValue);
    };
    State.inert = function (stateValue) {
        if (stateValue instanceof State) {
            if (!stateValue.actions.length) {
                return stateValue;
            }
            return new State(stateValue.value, stateValue.historyValue, stateValue.history, [], stateValue.activities);
        }
        return State.from(stateValue);
    };
    State.prototype.toString = function () {
        if (typeof this.value === 'string') {
            return this.value;
        }
        var path = [];
        var marker = this.value;
        while (true) {
            if (typeof marker === 'string') {
                path.push(marker);
                break;
            }
            var _a = Object.keys(marker), firstKey = _a[0], otherKeys = _a.slice(1);
            if (otherKeys.length) {
                return undefined;
            }
            path.push(firstKey);
            marker = marker[firstKey];
        }
        return path.join(constants_1.STATE_DELIMITER);
    };
    return State;
}());
exports.State = State;
