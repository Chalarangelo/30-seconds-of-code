'use strict';

const
    Q = require('q'),

    CoaParam = require('./coaparam'),
    chalk = require('chalk');

/**
 * Option
 *
 * Named entity. Options may have short and long keys for use from command line.
 *
 * @namespace
 * @class Opt
 * @extends CoaParam
 */
module.exports = class Opt extends CoaParam {
    /**
     * @constructs
     * @param {COA.Cmd} cmd - parent command
     */
    constructor(cmd) {
        super(cmd);

        this._short = null;
        this._long = null;
        this._flag = false;
        this._only = false;
        this._cmd._opts.push(this);
    }

    /**
     * Set a short key for option to be used with one hyphen from command line.
     *
     * @param {String} short - short name
     * @returns {COA.Opt} - this instance (for chainability)
     */
    short(short) {
        this._short = short;
        this._cmd._optsByKey[`-${short}`] = this;
        return this;
    }

    /**
     * Set a short key for option to be used with double hyphens from command line.
     *
     * @param {String} long - long name
     * @returns {COA.Opt} - this instance (for chainability)
     */
    long(long) {
        this._long = long;
        this._cmd._optsByKey[`--${long}`] = this;
        return this;
    }

    /**
     * Make an option boolean, i.e. option without value.
     *
     * @returns {COA.Opt} - this instance (for chainability)
     */
    flag() {
        this._flag = true;
        return this;
    }

    /**
     * Makes an option to act as a command,
     * i.e. program will exit just after option action.
     *
     * @returns {COA.Opt} - this instance (for chainability)
     */
    only() {
        this._only = true;
        return this;
    }

    /**
     * Add action for current option command.
     * This action is performed if the current option
     * is present in parsed options (with any value).
     *
     * @param {Function} act - action function,
     *         invoked in the context of command instance
     *         and has the parameters:
     *                 - {Object} opts - parsed options
     *                 - {Array} args - parsed arguments
     *                 - {Object} res - actions result accumulator
     *         It can return rejected promise by Cmd.reject (in case of error)
     *         or any other value treated as result.
     * @returns {COA.Opt} - this instance (for chainability)
     */
    act(act) {
        // Need function here for arguments
        const opt = this;
        this._cmd.act(function(opts) {
            if(!opts.hasOwnProperty(opt._name)) return;

            const res = act.apply(this, arguments);
            if(!opt._only) return res;

            return Q.when(res, out => this.reject({
                toString : () => out.toString(),
                exitCode : 0
            }));
        });

        return this;
    }

    _saveVal(opts, val) {
        this._val && (val = this._val(val));

        const name = this._name;
        this._arr
            ? (opts[name] || (opts[name] = [])).push(val)
            : (opts[name] = val);

        return val;
    }

    _parse(argv, opts) {
        return this._saveVal(opts, this._flag ? true : argv.shift());
    }

    _checkParsed(opts) {
        return !opts.hasOwnProperty(this._name);
    }

    _usage() {
        const res = [],
            nameStr = this._name.toUpperCase();

        if(this._short) {
            res.push('-', chalk.greenBright(this._short));
            this._flag || res.push(' ' + nameStr);
            res.push(', ');
        }

        if(this._long) {
            res.push('--', chalk.green(this._long));
            this._flag || res.push('=' + nameStr);
        }

        res.push(' : ', this._title);

        this._req && res.push(' ', chalk.redBright('(required)'));

        return res.join('');
    }

    _requiredText() {
        return `Missing required option:\n  ${this._usage()}`;
    }
};
