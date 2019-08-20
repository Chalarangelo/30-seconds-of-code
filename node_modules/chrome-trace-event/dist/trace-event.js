"use strict";
/**
 * trace-event - A library to create a trace of your node app per
 * Google's Trace Event format:
 * // JSSTYLED
 *      https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var stream_1 = require("stream");
function evCommon() {
    var hrtime = process.hrtime(); // [seconds, nanoseconds]
    var ts = hrtime[0] * 1000000 + Math.round(hrtime[1] / 1000); // microseconds
    return {
        ts: ts,
        pid: process.pid,
        tid: process.pid // no meaningful tid for node.js
    };
}
var Tracer = /** @class */ (function (_super) {
    tslib_1.__extends(Tracer, _super);
    function Tracer(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        _this.noStream = false;
        _this.events = [];
        if (typeof opts !== "object") {
            throw new Error("Invalid options passed (must be an object)");
        }
        if (opts.parent != null && typeof opts.parent !== "object") {
            throw new Error("Invalid option (parent) passed (must be an object)");
        }
        if (opts.fields != null && typeof opts.fields !== "object") {
            throw new Error("Invalid option (fields) passed (must be an object)");
        }
        if (opts.objectMode != null &&
            (opts.objectMode !== true && opts.objectMode !== false)) {
            throw new Error("Invalid option (objectsMode) passed (must be a boolean)");
        }
        _this.noStream = opts.noStream || false;
        _this.parent = opts.parent;
        if (_this.parent) {
            _this.fields = Object.assign({}, opts.parent && opts.parent.fields);
        }
        else {
            _this.fields = {};
        }
        if (opts.fields) {
            Object.assign(_this.fields, opts.fields);
        }
        if (!_this.fields.cat) {
            // trace-viewer *requires* `cat`, so let's have a fallback.
            _this.fields.cat = "default";
        }
        else if (Array.isArray(_this.fields.cat)) {
            _this.fields.cat = _this.fields.cat.join(",");
        }
        if (!_this.fields.args) {
            // trace-viewer *requires* `args`, so let's have a fallback.
            _this.fields.args = {};
        }
        if (_this.parent) {
            // TODO: Not calling Readable ctor here. Does that cause probs?
            //      Probably if trying to pipe from the child.
            //      Might want a serpate TracerChild class for these guys.
            _this._push = _this.parent._push.bind(_this.parent);
        }
        else {
            _this._objectMode = Boolean(opts.objectMode);
            var streamOpts = { objectMode: _this._objectMode };
            if (_this._objectMode) {
                _this._push = _this.push;
            }
            else {
                _this._push = _this._pushString;
                streamOpts.encoding = "utf8";
            }
            stream_1.Readable.call(_this, streamOpts);
        }
        return _this;
    }
    /**
     * If in no streamMode in order to flush out the trace
     * you need to call flush.
     */
    Tracer.prototype.flush = function () {
        if (this.noStream === true) {
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var evt = _a[_i];
                this._push(evt);
            }
            this._flush();
        }
    };
    Tracer.prototype._read = function (_) { };
    Tracer.prototype._pushString = function (ev) {
        var separator = "";
        if (!this.firstPush) {
            this.push("[");
            this.firstPush = true;
        }
        else {
            separator = ",\n";
        }
        this.push(separator + JSON.stringify(ev), "utf8");
    };
    Tracer.prototype._flush = function () {
        if (!this._objectMode) {
            this.push("]");
        }
    };
    Tracer.prototype.child = function (fields) {
        return new Tracer({
            parent: this,
            fields: fields
        });
    };
    Tracer.prototype.begin = function (fields) {
        return this.mkEventFunc("b")(fields);
    };
    Tracer.prototype.end = function (fields) {
        return this.mkEventFunc("e")(fields);
    };
    Tracer.prototype.completeEvent = function (fields) {
        return this.mkEventFunc("X")(fields);
    };
    Tracer.prototype.instantEvent = function (fields) {
        return this.mkEventFunc("I")(fields);
    };
    Tracer.prototype.mkEventFunc = function (ph) {
        var _this = this;
        return function (fields) {
            var ev = evCommon();
            // Assign the event phase.
            ev.ph = ph;
            if (fields) {
                if (typeof fields === "string") {
                    ev.name = fields;
                }
                else {
                    for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
                        var k = _a[_i];
                        if (k === "cat") {
                            ev.cat = fields.cat.join(",");
                        }
                        else {
                            ev[k] = fields[k];
                        }
                    }
                }
            }
            if (!_this.noStream) {
                _this._push(ev);
            }
            else {
                _this.events.push(ev);
            }
        };
    };
    return Tracer;
}(stream_1.Readable));
exports.Tracer = Tracer;
/*
 * These correspond to the "Async events" in the Trace Events doc.
 *
 * Required fields:
 * - name
 * - id
 *
 * Optional fields:
 * - cat (array)
 * - args (object)
 * - TODO: stack fields, other optional fields?
 *
 * Dev Note: We don't explicitly assert that correct fields are
 * used for speed (premature optimization alert!).
 */
//# sourceMappingURL=trace-event.js.map