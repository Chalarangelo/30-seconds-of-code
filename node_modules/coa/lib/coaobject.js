/* eslint-disable class-methods-use-this */
'use strict';

const Q = require('q');

/**
 * COA Object
 *
 * Base class for all COA-related objects
 *
 * --------|-----|-----|-----
 *         | Cmd | Opt | Arg
 * --------|-----|-----|-----
 *  name   | ✓   | ✓   | ✓
 *  title  | ✓   | ✓   | ✓
 *  comp   | ✓   | ✓   | ✓
 *  reject | ✓   | ✓   | ✓
 *  end    | ✓   | ✓   | ✓
 *  apply  | ✓   | ✓   | ✓
 *
 * @class CoaObject
 */
module.exports = class CoaObject {
    constructor(cmd) {
        this._cmd = cmd;
        this._name = null;
        this._title = null;
        this._comp = null;
    }

    /**
     * Set a canonical identifier to be used anywhere in the API.
     *
     * @param {String} name - command, option or argument name
     * @returns {COA.CoaObject} - this instance (for chainability)
     */
    name(name) {
        this._name = name;
        return this;
    }

    /**
     * Set a long description to be used anywhere in text messages.
     * @param {String} title - human readable entity title
     * @returns {COA.CoaObject} - this instance (for chainability)
     */
    title(title) {
        this._title = title;
        return this;
    }

    /**
     * Set custom additional completion for current object.
     *
     * @param {Function} comp - completion generation function,
     *         invoked in the context of object instance.
     *         Accepts parameters:
     *                 - {Object} opts - completion options
     *         It can return promise or any other value threated as a result.
     * @returns {COA.CoaObject} - this instance (for chainability)
     */
    comp(comp) {
        this._comp = comp;
        return this;
    }

    /**
     * Apply function with arguments in a context of object instance.
     *
     * @param {Function} fn - body
     * @param {Array.<*>} args... - arguments
     * @returns {COA.CoaObject} - this instance (for chainability)
     */
    apply(fn) {
        arguments.length > 1?
            fn.apply(this, [].slice.call(arguments, 1))
            : fn.call(this);

        return this;
    }

    /**
     * Return reject of actions results promise with error code.
     * Use in .act() for return with error.
     * @param {Object} reason - reject reason
     *         You can customize toString() method and exitCode property
     *         of reason object.
     * @returns {Q.promise} rejected promise
     */
    reject(reason) {
        return Q.reject(reason);
    }

    /**
     * Finish chain for current subcommand and return parent command instance.
     * @returns {COA.Cmd} parent command
     */
    end() {
        return this._cmd;
    }
};
