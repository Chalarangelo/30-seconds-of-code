'use strict';

const fs = require('fs');

const CoaObject = require('./coaobject');

/**
 * COA Parameter
 *
 * Base class for options and arguments
 *
 * --------|-----|-----|-----
 *         | Cmd | Opt | Arg
 * --------|-----|-----|-----
 *  arr    |     | ✓   | ✓
 *  req    |     | ✓   | ✓
 *  val    |     | ✓   | ✓
 *  def    |     | ✓   | ✓
 *  input  |     | ✓   | ✓
 *  output |     | ✓   | ✓
 *
 * @class CoaParam
 * @extends CoaObject
 */
module.exports = class CoaParam extends CoaObject {
    constructor(cmd) {
        super(cmd);

        this._arr = false;
        this._req = false;
        this._val = undefined;
        this._def = undefined;
    }

    /**
     * Makes a param accepts multiple values.
     * Otherwise, the value will be used by the latter passed.
     *
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    arr() {
        this._arr = true;
        return this;
    }

    /**
     * Makes a param required.
     *
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    req() {
        this._req = true;
        return this;
    }

    /**
     * Set a validation (or value) function for param.
     * Value from command line passes through before becoming available from API.
     * Using for validation and convertion simple types to any values.
     *
     * @param {Function} val - validating function,
     *         invoked in the context of option instance
     *         and has one parameter with value from command line.
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    val(val) {
        this._val = val;
        return this;
    }

    /**
     * Set a default value for param.
     * Default value passed through validation function as ordinary value.
     *
     * @param {*} def - default value of function generator
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    def(def) {
        this._def = def;
        return this;
    }

    /**
     * Make option value inputting stream.
     * It's add useful validation and shortcut for STDIN.
     *
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    input() {
        process.stdin.pause();
        return this
            .def(process.stdin)
            .val(function(v) {
                if(typeof v !== 'string')
                    return v;

                if(v === '-')
                    return process.stdin;

                const s = fs.createReadStream(v, { encoding : 'utf8' });
                s.pause();
                return s;
            });
    }

    /**
     * Make option value outputing stream.
     * It's add useful validation and shortcut for STDOUT.
     *
     * @returns {COA.CoaParam} - this instance (for chainability)
     */
    output() {
        return this
            .def(process.stdout)
            .val(function(v) {
                if(typeof v !== 'string')
                    return v;

                if(v === '-')
                    return process.stdout;

                return fs.createWriteStream(v, { encoding : 'utf8' });
            });
    }
};
