'use strict';

const constants = require('constants');
const fs = require('fs');
const path = require('path');

const Q = require('q');

const shell = require('./shell');
const escape = shell.escape;
const unescape = shell.unescape;

/**
 * Most of the code adopted from the npm package shell completion code.
 * See https://github.com/isaacs/npm/blob/master/lib/completion.js
 *
 * @returns {COA.CoaObject}
 */
module.exports = function completion() {
    return this
        .title('Shell completion')
        .helpful()
        .arg()
            .name('raw')
            .title('Completion words')
            .arr()
            .end()
        .act((opts, args) => {
            if(process.platform === 'win32') {
                const e = new Error('shell completion not supported on windows');
                e.code = 'ENOTSUP';
                e.errno = constants.ENOTSUP;
                return this.reject(e);
            }

            // if the COMP_* isn't in the env, then just dump the script
            if((process.env.COMP_CWORD == null)
                || (process.env.COMP_LINE == null)
                || (process.env.COMP_POINT == null)) {
                return dumpScript(this._cmd._name);
            }

            console.error('COMP_LINE:  %s', process.env.COMP_LINE);
            console.error('COMP_CWORD: %s', process.env.COMP_CWORD);
            console.error('COMP_POINT: %s', process.env.COMP_POINT);
            console.error('args: %j', args.raw);

            // completion opts
            opts = getOpts(args.raw);

            // cmd
            const parsed = this._cmd._parseCmd(opts.partialWords);
            return Q.when(complete(parsed.cmd, parsed.opts), compls => {
                console.error('filtered: %j', compls);
                return console.log(compls.map(escape).join('\n'));
            });
        });
};

function dumpScript(name) {
    const defer = Q.defer();

    fs.readFile(path.resolve(__dirname, 'completion.sh'), 'utf8', function(err, d) {
        if(err) return defer.reject(err);
        d = d.replace(/{{cmd}}/g, path.basename(name)).replace(/^#!.*?\n/, '');

        process.stdout.on('error', onError);
        process.stdout.write(d, () => defer.resolve());
    });

    return defer.promise;

    function onError(err) {
        // Darwin is a real dick sometimes.
        //
        // This is necessary because the "source" or "." program in
        // bash on OS X closes its file argument before reading
        // from it, meaning that you get exactly 1 write, which will
        // work most of the time, and will always raise an EPIPE.
        //
        // Really, one should not be tossing away EPIPE errors, or any
        // errors, so casually. But, without this, `. <(cmd completion)`
        // can never ever work on OS X.
        if(err.errno !== constants.EPIPE) return defer.reject(err);
        process.stdout.removeListener('error', onError);
        return defer.resolve();
    }
}

function getOpts(argv) {
    // get the partial line and partial word, if the point isn't at the end
    // ie, tabbing at: cmd foo b|ar
    const line = process.env.COMP_LINE;
    const w = +process.env.COMP_CWORD;
    const point = +process.env.COMP_POINT;
    const words = argv.map(unescape);
    const word = words[w];
    const partialLine = line.substr(0, point);
    const partialWords = words.slice(0, w);

    // figure out where in that last word the point is
    let partialWord = argv[w] || '';
    let i = partialWord.length;
    while(partialWord.substr(0, i) !== partialLine.substr(-1 * i) && i > 0) i--;

    partialWord = unescape(partialWord.substr(0, i));
    partialWord && partialWords.push(partialWord);

    return {
        line,
        w,
        point,
        words,
        word,
        partialLine,
        partialWords,
        partialWord
    };
}

function complete(cmd, opts) {
    let optWord, optPrefix,
        compls = [];

    // Complete on cmds
    if(opts.partialWord.indexOf('-'))
        compls = Object.keys(cmd._cmdsByName);
        // Complete on required opts without '-' in last partial word
        // (if required not already specified)
        //
        // Commented out because of uselessness:
        // -b, --block suggest results in '-' on cmd line;
        // next completion suggest all options, because of '-'
        //.concat Object.keys(cmd._optsByKey).filter (v) -> cmd._optsByKey[v]._req
    else {
        // complete on opt values: --opt=| case
        const m = opts.partialWord.match(/^(--\w[\w-_]*)=(.*)$/);
        if(m) {
            optWord = m[1];
            optPrefix = optWord + '=';
        } else
            // complete on opts
            // don't complete on opts in case of --opt=val completion
            // TODO: don't complete on opts in case of unknown arg after commands
            // TODO: complete only on opts with arr() or not already used
            // TODO: complete only on full opts?
            compls = Object.keys(cmd._optsByKey);
    }

    // complete on opt values: next arg case
    opts.partialWords[opts.w - 1].indexOf('-') || (optWord = opts.partialWords[opts.w - 1]);

    // complete on opt values: completion
    let opt;
    optWord
        && (opt = cmd._optsByKey[optWord])
        && !opt._flag
        && opt._comp
        && (compls = Q.join(compls,
            Q.when(opt._comp(opts),
                (c, o) => c.concat(o.map(v => (optPrefix || '') + v)))));

    // TODO: complete on args values (context aware, custom completion?)

    // custom completion on cmds
    cmd._comp && (compls = Q.join(compls, Q.when(cmd._comp(opts)), (c, o) => c.concat(o)));

    // TODO: context aware custom completion on cmds, opts and args
    // (can depend on already entered values, especially options)

    return Q.when(compls, complitions => {
        console.error('partialWord: %s', opts.partialWord);
        console.error('compls: %j', complitions);
        return compls.filter(c => c.indexOf(opts.partialWord) === 0);
    });
}
