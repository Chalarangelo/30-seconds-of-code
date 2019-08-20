/* eslint-disable class-methods-use-this */
'use strict';

const
    UTIL = require('util'),
    PATH = require('path'),
    EOL = require('os').EOL,

    Q = require('q'),
    chalk = require('chalk'),

    CoaObject = require('./coaobject'),
    Opt = require('./opt'),
    Arg = require('./arg'),
    completion = require('./completion');

/**
 * Command
 *
 * Top level entity. Commands may have options and arguments.
 *
 * @namespace
 * @class Cmd
 * @extends CoaObject
 */
class Cmd extends CoaObject {
    /**
     * @constructs
     * @param {COA.Cmd} [cmd] parent command
     */
    constructor(cmd) {
        super(cmd);

        this._parent(cmd);
        this._cmds = [];
        this._cmdsByName = {};
        this._opts = [];
        this._optsByKey = {};
        this._args = [];
        this._api = null;
        this._ext = false;
    }

    static create(cmd) {
        return new Cmd(cmd);
    }

    /**
     * Returns object containing all its subcommands as methods
     * to use from other programs.
     *
     * @returns {Object}
     */
    get api() {
        // Need _this here because of passed arguments into _api
        const _this = this;
        this._api || (this._api = function () {
            return _this.invoke.apply(_this, arguments);
        });

        const cmds = this._cmdsByName;
        Object.keys(cmds).forEach(cmd => { this._api[cmd] = cmds[cmd].api; });

        return this._api;
    }

    _parent(cmd) {
        this._cmd = cmd || this;

        this.isRootCmd ||
            cmd._cmds.push(this) &&
            this._name &&
            (this._cmd._cmdsByName[this._name] = this);

        return this;
    }

    get isRootCmd() {
        return this._cmd === this;
    }

    /**
     * Set a canonical command identifier to be used anywhere in the API.
     *
     * @param {String} name - command name
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    name(name) {
        super.name(name);

        this.isRootCmd ||
            (this._cmd._cmdsByName[name] = this);

        return this;
    }

    /**
     * Create new or add existing subcommand for current command.
     *
     * @param {COA.Cmd} [cmd] existing command instance
     * @returns {COA.Cmd} new subcommand instance
     */
    cmd(cmd) {
        return cmd?
            cmd._parent(this)
            : new Cmd(this);
    }

    /**
     * Create option for current command.
     *
     * @returns {COA.Opt} new option instance
     */
    opt() {
        return new Opt(this);
    }

    /**
     * Create argument for current command.
     *
     * @returns {COA.Opt} new argument instance
     */
    arg() {
        return new Arg(this);
    }

    /**
     * Add (or set) action for current command.
     *
     * @param {Function} act - action function,
     *         invoked in the context of command instance
     *         and has the parameters:
     *                 - {Object} opts - parsed options
     *                 - {String[]} args - parsed arguments
     *                 - {Object} res - actions result accumulator
     *         It can return rejected promise by Cmd.reject (in case of error)
     *         or any other value treated as result.
     * @param {Boolean} [force=false] flag for set action instead add to existings
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    act(act, force) {
        if(!act) return this;

        (!this._act || force) && (this._act = []);
        this._act.push(act);

        return this;
    }

    /**
     * Make command "helpful", i.e. add -h --help flags for print usage.
     *
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    helpful() {
        return this.opt()
            .name('help')
            .title('Help')
            .short('h')
            .long('help')
            .flag()
            .only()
            .act(function() {
                return this.usage();
            })
            .end();
    }

    /**
     * Adds shell completion to command, adds "completion" subcommand,
     * that makes all the magic.
     * Must be called only on root command.
     *
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    completable() {
        return this.cmd()
            .name('completion')
            .apply(completion)
            .end();
    }

    /**
     * Allow command to be extendable by external node.js modules.
     *
     * @param {String} [pattern]  Pattern of node.js module to find subcommands at.
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    extendable(pattern) {
        this._ext = pattern || true;
        return this;
    }

    _exit(msg, code) {
        return process.once('exit', function(exitCode) {
            msg && console[code === 0 ? 'log' : 'error'](msg);
            process.exit(code || exitCode || 0);
        });
    }

    /**
     * Build full usage text for current command instance.
     *
     * @returns {String} usage text
     */
    usage() {
        const res = [];

        this._title && res.push(this._fullTitle());

        res.push('', 'Usage:');

        this._cmds.length
            && res.push([
                '', '', chalk.redBright(this._fullName()), chalk.blueBright('COMMAND'),
                chalk.greenBright('[OPTIONS]'), chalk.magentaBright('[ARGS]')
            ].join(' '));

        (this._opts.length + this._args.length)
            && res.push([
                '', '', chalk.redBright(this._fullName()),
                chalk.greenBright('[OPTIONS]'), chalk.magentaBright('[ARGS]')
            ].join(' '));

        res.push(
            this._usages(this._cmds, 'Commands'),
            this._usages(this._opts, 'Options'),
            this._usages(this._args, 'Arguments')
        );

        return res.join(EOL);
    }

    _usage() {
        return chalk.blueBright(this._name) + ' : ' + this._title;
    }

    _usages(os, title) {
        if(!os.length) return;

        return ['', title + ':']
            .concat(os.map(o => `  ${o._usage()}`))
            .join(EOL);
    }

    _fullTitle() {
        return `${this.isRootCmd? '' : this._cmd._fullTitle() + EOL}${this._title}`;
    }

    _fullName() {
        return `${this.isRootCmd? '' : this._cmd._fullName() + ' '}${PATH.basename(this._name)}`;
    }

    _ejectOpt(opts, opt) {
        const pos = opts.indexOf(opt);
        if(pos === -1) return;

        return opts[pos]._arr?
            opts[pos] :
            opts.splice(pos, 1)[0];
    }

    _checkRequired(opts, args) {
        if(this._opts.some(opt => opt._only && opts.hasOwnProperty(opt._name))) return;

        const all = this._opts.concat(this._args);
        let i;
        while(i = all.shift())
            if(i._req && i._checkParsed(opts, args))
                return this.reject(i._requiredText());
    }

    _parseCmd(argv, unparsed) {
        unparsed || (unparsed = []);

        let i,
            optSeen = false;
        while(i = argv.shift()) {
            i.indexOf('-') || (optSeen = true);

            if(optSeen || !/^\w[\w-_]*$/.test(i)) {
                unparsed.push(i);
                continue;
            }

            let pkg, cmd = this._cmdsByName[i];
            if(!cmd && this._ext) {
                if(this._ext === true) {
                    pkg = i;
                    let c = this;
                    while(true) { // eslint-disable-line
                        pkg = c._name + '-' + pkg;
                        if(c.isRootCmd) break;
                        c = c._cmd;
                    }
                } else if(typeof this._ext === 'string')
                    pkg = ~this._ext.indexOf('%s')?
                        UTIL.format(this._ext, i) :
                        this._ext + i;

                let cmdDesc;
                try {
                    cmdDesc = require(pkg);
                } catch(e) {
                    // Dummy
                }

                if(cmdDesc) {
                    if(typeof cmdDesc === 'function') {
                        this.cmd().name(i).apply(cmdDesc).end();
                    } else if(typeof cmdDesc === 'object') {
                        this.cmd(cmdDesc);
                        cmdDesc.name(i);
                    } else throw new Error('Error: Unsupported command declaration type, '
                        + 'should be a function or COA.Cmd() object');

                    cmd = this._cmdsByName[i];
                }
            }

            if(cmd) return cmd._parseCmd(argv, unparsed);

            unparsed.push(i);
        }

        return { cmd : this, argv : unparsed };
    }

    _parseOptsAndArgs(argv) {
        const opts = {},
            args = {},
            nonParsedOpts = this._opts.concat(),
            nonParsedArgs = this._args.concat();

        let res, i;
        while(i = argv.shift()) {
            if(i !== '--' && i[0] === '-') {
                const m = i.match(/^(--\w[\w-_]*)=(.*)$/);
                if(m) {
                    i = m[1];
                    this._optsByKey[i]._flag || argv.unshift(m[2]);
                }

                const opt = this._ejectOpt(nonParsedOpts, this._optsByKey[i]);
                if(!opt) return this.reject(`Unknown option: ${i}`);

                if(Q.isRejected(res = opt._parse(argv, opts))) return res;

                continue;
            }

            i === '--' && (i = argv.splice(0));
            Array.isArray(i) || (i = [i]);

            let a;
            while(a = i.shift()) {
                let arg = nonParsedArgs.shift();
                if(!arg) return this.reject(`Unknown argument: ${a}`);

                arg._arr && nonParsedArgs.unshift(arg);
                if(Q.isRejected(res = arg._parse(a, args))) return res;
            }
        }

        return {
            opts : this._setDefaults(opts, nonParsedOpts),
            args : this._setDefaults(args, nonParsedArgs)
        };
    }

    _setDefaults(params, desc) {
        for(const item of desc)
            item._def !== undefined &&
                !params.hasOwnProperty(item._name) &&
                item._saveVal(params, item._def);

        return params;
    }

    _processParams(params, desc) {
        const notExists = [];

        for(const item of desc) {
            const n = item._name;

            if(!params.hasOwnProperty(n)) {
                notExists.push(item);
                continue;
            }

            const vals = Array.isArray(params[n])? params[n] : [params[n]];
            delete params[n];

            let res;
            for(const v of vals)
                if(Q.isRejected(res = item._saveVal(params, v)))
                    return res;
        }

        return this._setDefaults(params, notExists);
    }

    _parseArr(argv) {
        return Q.when(this._parseCmd(argv), p =>
            Q.when(p.cmd._parseOptsAndArgs(p.argv), r => ({
                cmd : p.cmd,
                opts : r.opts,
                args : r.args
            })));
    }

    _do(inputPromise) {
        return Q.when(inputPromise, input => {
            return [this._checkRequired]
                .concat(input.cmd._act || [])
                .reduce((res, act) =>
                    Q.when(res, prev => act.call(input.cmd, input.opts, input.args, prev)),
                    undefined);
        });
    }

    /**
     * Parse arguments from simple format like NodeJS process.argv
     * and run ahead current program, i.e. call process.exit when all actions done.
     *
     * @param {String[]} argv - arguments
     * @returns {COA.Cmd} - this instance (for chainability)
     */
    run(argv) {
        argv || (argv = process.argv.slice(2));

        const cb = code =>
            res => res?
                this._exit(res.stack || res.toString(), (res.hasOwnProperty('exitCode')? res.exitCode : code) || 0) :
                this._exit();

        Q.when(this.do(argv), cb(0), cb(1)).done();

        return this;
    }

    /**
     * Invoke specified (or current) command using provided
     * options and arguments.
     *
     * @param {String|String[]} [cmds] - subcommand to invoke (optional)
     * @param {Object} [opts] - command options (optional)
     * @param {Object} [args] - command arguments (optional)
     * @returns {Q.Promise}
     */
    invoke(cmds, opts, args) {
        cmds || (cmds = []);
        opts || (opts = {});
        args || (args = {});
        typeof cmds === 'string' && (cmds = cmds.split(' '));

        if(arguments.length < 3 && !Array.isArray(cmds)) {
            args = opts;
            opts = cmds;
            cmds = [];
        }

        return Q.when(this._parseCmd(cmds), p => {
            if(p.argv.length)
                return this.reject(`Unknown command: ${cmds.join(' ')}`);

            return Q.all([
                this._processParams(opts, this._opts),
                this._processParams(args, this._args)
            ]).spread((_opts, _args) =>
                this._do({
                    cmd : p.cmd,
                    opts : _opts,
                    args : _args
                })
                .fail(res => (res && res.exitCode === 0)?
                    res.toString() :
                    this.reject(res)));
        });
    }
}

/**
 * Convenient function to run command from tests.
 *
 * @param {String[]} argv - arguments
 * @returns {Q.Promise}
 */
Cmd.prototype.do = function(argv) {
    return this._do(this._parseArr(argv || []));
};

module.exports = Cmd;
