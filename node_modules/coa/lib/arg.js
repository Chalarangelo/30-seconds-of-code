'use strict';

const
    CoaParam = require('./coaparam'),
    chalk = require('chalk');

/**
 * Argument
 *
 * Unnamed entity. From command line arguments passed as list of unnamed values.
 *
 * @class Arg
 * @extends CoaParam
 */
module.exports = class Arg extends CoaParam {
    /**
     * @constructs
     * @param {COA.Cmd} cmd - parent command
     */
    constructor(cmd) {
        super(cmd);

        this._cmd._args.push(this);
    }

    _saveVal(args, val) {
        this._val && (val = this._val(val));

        const name = this._name;
        this._arr
            ? (args[name] || (args[name] = [])).push(val)
            : (args[name] = val);

        return val;
    }

    _parse(arg, args) {
        return this._saveVal(args, arg);
    }

    _checkParsed(opts, args) {
        return !args.hasOwnProperty(this._name);
    }

    _usage() {
        const res = [];

        res.push(chalk.magentaBright(this._name.toUpperCase()), ' : ', this._title);

        this._req && res.push(' ', chalk.redBright('(required)'));

        return res.join('');
    }

    _requiredText() {
        return `Missing required argument:\n  ${this._usage()}`;
    }
};
