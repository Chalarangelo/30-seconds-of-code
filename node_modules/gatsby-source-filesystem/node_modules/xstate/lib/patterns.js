"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toggle(onState, offState, eventType) {
    var _a, _b, _c;
    return _a = {},
        _a[onState] = {
            on: (_b = {}, _b[eventType] = offState, _b)
        },
        _a[offState] = {
            on: (_c = {}, _c[eventType] = onState, _c)
        },
        _a;
}
exports.toggle = toggle;
