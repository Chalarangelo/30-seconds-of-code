"use strict";

exports.__esModule = true;

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function () {
    function Processor(func, options) {
        _classCallCheck(this, Processor);

        this.func = func || function noop() {};
        this.funcRes = null;
        this.options = options;
    }

    Processor.prototype._shouldUpdateSelector = function _shouldUpdateSelector(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var merged = Object.assign({}, this.options, options);
        if (merged.updateSelector === false) {
            return false;
        } else {
            return typeof rule !== "string";
        }
    };

    Processor.prototype._isLossy = function _isLossy() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var merged = Object.assign({}, this.options, options);
        if (merged.lossless === false) {
            return true;
        } else {
            return false;
        }
    };

    Processor.prototype._root = function _root(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var parser = new _parser2.default(rule, this._parseOptions(options));
        return parser.root;
    };

    Processor.prototype._parseOptions = function _parseOptions(options) {
        return {
            lossy: this._isLossy(options)
        };
    };

    Processor.prototype._run = function _run(rule) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return new Promise(function (resolve, reject) {
            try {
                var root = _this._root(rule, options);
                Promise.resolve(_this.func(root)).then(function (transform) {
                    var string = undefined;
                    if (_this._shouldUpdateSelector(rule, options)) {
                        string = root.toString();
                        rule.selector = string;
                    }
                    return { transform: transform, root: root, string: string };
                }).then(resolve, reject);
            } catch (e) {
                reject(e);
                return;
            }
        });
    };

    Processor.prototype._runSync = function _runSync(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var root = this._root(rule, options);
        var transform = this.func(root);
        if (transform && typeof transform.then === "function") {
            throw new Error("Selector processor returned a promise to a synchronous call.");
        }
        var string = undefined;
        if (options.updateSelector && typeof rule !== "string") {
            string = root.toString();
            rule.selector = string;
        }
        return { transform: transform, root: root, string: string };
    };

    /**
     * Process rule into a selector AST.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<parser.Root>} The AST of the selector after processing it.
     */


    Processor.prototype.ast = function ast(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.root;
        });
    };

    /**
     * Process rule into a selector AST synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {parser.Root} The AST of the selector after processing it.
     */


    Processor.prototype.astSync = function astSync(rule, options) {
        return this._runSync(rule, options).root;
    };

    /**
     * Process a selector into a transformed value asynchronously
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<any>} The value returned by the processor.
     */


    Processor.prototype.transform = function transform(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.transform;
        });
    };

    /**
     * Process a selector into a transformed value synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {any} The value returned by the processor.
     */


    Processor.prototype.transformSync = function transformSync(rule, options) {
        return this._runSync(rule, options).transform;
    };

    /**
     * Process a selector into a new selector string asynchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */


    Processor.prototype.process = function process(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.string || result.root.toString();
        });
    };

    /**
     * Process a selector into a new selector string synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */


    Processor.prototype.processSync = function processSync(rule, options) {
        var result = this._runSync(rule, options);
        return result.string || result.root.toString();
    };

    return Processor;
}();

exports.default = Processor;
module.exports = exports["default"];