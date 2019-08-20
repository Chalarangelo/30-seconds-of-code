  yargs
========

Yargs be a node.js library fer hearties tryin' ter parse optstrings.

With yargs, ye be havin' a map that leads straight to yer treasure! Treasure of course, being a simple option hash.

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![NPM version][npm-image]][npm-url]
[![Windows Tests][windows-image]][windows-url]
[![js-standard-style][standard-image]][standard-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
[![Gitter][gitter-image]][gitter-url]

> Yargs is the official successor to optimist. Please feel free to submit issues and pull requests. If you'd like to contribute and don't know where to start, have a look at [the issue list](https://github.com/yargs/yargs/issues) :)

examples
========

With yargs, the options be just a hash!
-------------------------------------------------------------------

plunder.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs').argv;

if (argv.ships > 3 && argv.distance < 53.5) {
    console.log('Plunder more riffiwobbles!');
} else {
    console.log('Retreat from the xupptumblers!');
}
````

***

    $ ./plunder.js --ships=4 --distance=22
    Plunder more riffiwobbles!

    $ ./plunder.js --ships 12 --distance 98.7
    Retreat from the xupptumblers!

![Joe was one optimistic pirate.](https://i.imgur.com/4WFGVJ9.png)

But don't walk the plank just yet! There be more! You can do short options:
-------------------------------------------------

short.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs').argv;
console.log('(%d,%d)', argv.x, argv.y);
````

***

    $ ./short.js -x 10 -y 21
    (10,21)

And booleans, both long, short, and even grouped:
----------------------------------

bool.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs').argv;

if (argv.s) {
    process.stdout.write(argv.fr ? 'Le perroquet dit: ' : 'The parrot says: ');
}
console.log(
    (argv.fr ? 'couac' : 'squawk') + (argv.p ? '!' : '')
);
````

***

    $ ./bool.js -s
    The parrot says: squawk

    $ ./bool.js -sp
    The parrot says: squawk!

    $ ./bool.js -sp --fr
    Le perroquet dit: couac!

And non-hyphenated options too! Just use `argv._`!
-------------------------------------------------

nonopt.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs').argv;
console.log('(%d,%d)', argv.x, argv.y);
console.log(argv._);
````

***

    $ ./nonopt.js -x 6.82 -y 3.35 rum
    (6.82,3.35)
    [ 'rum' ]

    $ ./nonopt.js "me hearties" -x 0.54 yo -y 1.12 ho
    (0.54,1.12)
    [ 'me hearties', 'yo', 'ho' ]

Yargs even counts your booleans!
----------------------------------------------------------------------

count.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .count('verbose')
    .alias('v', 'verbose')
    .argv;

VERBOSE_LEVEL = argv.verbose;

function WARN()  { VERBOSE_LEVEL >= 0 && console.log.apply(console, arguments); }
function INFO()  { VERBOSE_LEVEL >= 1 && console.log.apply(console, arguments); }
function DEBUG() { VERBOSE_LEVEL >= 2 && console.log.apply(console, arguments); }

WARN("Showing only important stuff");
INFO("Showing semi-important stuff too");
DEBUG("Extra chatty mode");
````

***
    $ node count.js
    Showing only important stuff

    $ node count.js -v
    Showing only important stuff
    Showing semi-important stuff too

    $ node count.js -vv
    Showing only important stuff
    Showing semi-important stuff too
    Extra chatty mode

    $ node count.js -v --verbose
    Showing only important stuff
    Showing semi-important stuff too
    Extra chatty mode

Tell users how to use yer options and make demands.
-------------------------------------------------

area.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .usage('Usage: $0 -w [num] -h [num]')
    .demandOption(['w','h'])
    .argv;

console.log("The area is:", argv.w * argv.h);
````

***

    $ ./area.js -w 55 -h 11
    The area is: 605

    $ node ./area.js -w 4.91 -w 2.51
    Usage: area.js -w [num] -h [num]

    Options:
      -w  [required]
      -h  [required]

    Missing required arguments: h

After yer demands have been met, demand more! Ask for non-hyphenated arguments!
-----------------------------------------

demand_count.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .demandCommand(2)
    .argv;
console.dir(argv);
````

***

	$ ./demand_count.js a

	Not enough non-option arguments: got 1, need at least 2

	$ ./demand_count.js a b
	{ _: [ 'a', 'b' ], '$0': 'demand_count.js' }

	$ ./demand_count.js a b c
	{ _: [ 'a', 'b', 'c' ], '$0': 'demand_count.js' }

EVEN MORE SHIVER ME TIMBERS!
------------------

default_singles.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .default('x', 10)
    .default('y', 10)
    .argv
;
console.log(argv.x + argv.y);
````

***

    $ ./default_singles.js -x 5
    15

default_hash.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .default({ x : 10, y : 10 })
    .argv
;
console.log(argv.x + argv.y);
````

***

    $ ./default_hash.js -y 7
    17

And if you really want to get all descriptive about it...
---------------------------------------------------------

boolean_single.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .boolean('v')
    .argv
;
console.dir(argv.v);
console.dir(argv._);
````

***

    $ ./boolean_single.js -v "me hearties" yo ho
    true
    [ 'me hearties', 'yo', 'ho' ]


boolean_double.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .boolean(['x','y','z'])
    .argv
;
console.dir([ argv.x, argv.y, argv.z ]);
console.dir(argv._);
````

***

    $ ./boolean_double.js -x -z one two three
    [ true, false, true ]
    [ 'one', 'two', 'three' ]

Yargs is here to help you...
---------------------------

Ye can describe parameters fer help messages and set aliases. Yargs figures
out how ter format a handy help string automatically.

line_count.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('count', 'Count the lines in a file')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var fs = require('fs');
var s = fs.createReadStream(argv.file);

var lines = 0;
s.on('data', function (buf) {
    lines += buf.toString().match(/\n/g).length;
});

s.on('end', function () {
    console.log(lines);
});
````

***
    $ node line_count.js count
    Usage: line_count.js <command> [options]

    Commands:
      count    Count the lines in a file

    Options:
      -f, --file  Load a file        [required]
      -h, --help  Show help           [boolean]

    Examples:
      line_count.js count -f foo.js  count the lines in the given file

    copyright 2015

    Missing required arguments: f

    $ node line_count.js count --file line_count.js
    26

    $ node line_count.js count -f line_count.js
    26

methods
=======

By itself,

````javascript
require('yargs').argv
````

will use the `process.argv` array to construct the `argv` object.

You can pass in the `process.argv` yourself:

````javascript
require('yargs')([ '-x', '1', '-y', '2' ]).argv
````

or use `.parse()` to do the same thing:

````javascript
require('yargs').parse([ '-x', '1', '-y', '2' ])
````

The rest of these methods below come in just before the terminating `.argv`.

<a name="alias"></a>.alias(key, alias)
------------------

Set key names as equivalent such that updates to a key will propagate to aliases
and vice-versa.

Optionally `.alias()` can take an object that maps keys to aliases.
Each key of this object should be the canonical version of the option, and each
value should be a string or an array of strings.

.argv
-----

Get the arguments as a plain old object.

Arguments without a corresponding flag show up in the `argv._` array.

The script name or node command is available at `argv.$0` similarly to how `$0`
works in bash or perl.

If `yargs` is executed in an environment that embeds node and there's no script name (e.g.
[Electron](http://electron.atom.io/) or [nw.js](http://nwjs.io/)), it will ignore the first parameter since it
expects it to be the script name. In order to override this behavior, use `.parse(process.argv.slice(1))`
instead of `.argv` and the first parameter won't be ignored.

<a name="array"></a>.array(key)
----------

Tell the parser to interpret `key` as an array. If `.array('foo')` is set,
`--foo foo bar` will be parsed as `['foo', 'bar']` rather than as `'foo'`.

<a name="boolean"></a>.boolean(key)
-------------

Interpret `key` as a boolean. If a non-flag option follows `key` in
`process.argv`, that string won't get set as the value of `key`.

`key` will default to `false`, unless a `default(key, undefined)` is
explicitly set.

If `key` is an array, interpret all the elements as booleans.

.check(fn, [global=true])
----------

Check that certain conditions are met in the provided arguments.

`fn` is called with two arguments, the parsed `argv` hash and an array of options and their aliases.

If `fn` throws or returns a non-truthy value, show the thrown error, usage information, and
exit.

`global` indicates whether `check()` should be enabled both
at the top-level and for each sub-command.

<a name="choices"></a>.choices(key, choices)
----------------------

Limit valid values for `key` to a predefined set of `choices`, given as an array
or as an individual value.

```js
var argv = require('yargs')
  .alias('i', 'ingredient')
  .describe('i', 'choose your sandwich ingredients')
  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help('help')
  .argv
```

If this method is called multiple times, all enumerated values will be merged
together. Choices are generally strings or numbers, and value matching is
case-sensitive.

Optionally `.choices()` can take an object that maps multiple keys to their
choices.

Choices can also be specified as `choices` in the object given to `option()`.

```js
var argv = require('yargs')
  .option('size', {
    alias: 's',
    describe: 'choose a size',
    choices: ['xs', 's', 'm', 'l', 'xl']
  })
  .argv
```

<a name="coerce"></a>.coerce(key, fn)
----------------

Provide a synchronous function to coerce or transform the value(s) given on the
command line for `key`.

The coercion function should accept one argument, representing the parsed value
from the command line, and should return a new value or throw an error. The
returned value will be used as the value for `key` (or one of its aliases) in
`argv`.

If the function throws, the error will be treated as a validation
failure, delegating to either a custom [`.fail()`](#fail) handler or printing
the error message in the console.

Coercion will be applied to a value after
all other modifications, such as [`.normalize()`](#normalize).

_Examples:_

```js
var argv = require('yargs')
  .coerce('file', function (arg) {
    return require('fs').readFileSync(arg, 'utf8')
  })
  .argv
```

Optionally `.coerce()` can take an object that maps several keys to their
respective coercion function.

```js
var argv = require('yargs')
  .coerce({
    date: Date.parse,
    json: JSON.parse
  })
  .argv
```

You can also map the same function to several keys at one time. Just pass an
array of keys as the first argument to `.coerce()`:

```js
var path = require('path')
var argv = require('yargs')
  .coerce(['src', 'dest'], path.resolve)
  .argv
```

If you are using dot-notion or arrays, .e.g., `user.email` and `user.password`,
coercion will be applied to the final object that has been parsed:

```js
// --user.name Batman --user.password 123
// gives us: {name: 'batman', password: '[SECRET]'}
var argv = require('yargs')
  .option('user')
  .coerce('user', opt => {
    opt.name = opt.name.toLowerCase()
    opt.password = '[SECRET]'
    return opt
  })
  .argv
```

.command(cmd, desc, [builder], [handler])
-----------------------------------------
.command(cmd, desc, [module])
-----------------------------
.command(module)
----------------

Define the commands exposed by your application.

`cmd` should be a string representing the command or an array of strings
representing the command and its aliases. Read more about command aliases in the
subsection below.

Use `desc` to provide a description for each command your application accepts (the
values stored in `argv._`).  Set `desc` to `false` to create a hidden command.
Hidden commands don't show up in the help output and aren't available for
completion.

Optionally, you can provide a `builder` object to give hints about the
options that your command accepts:

```js
yargs
  .command('get', 'make a get HTTP request', {
    url: {
      alias: 'u',
      default: 'http://yargs.js.org/'
    }
  })
  .help()
  .argv
```

`builder` can also be a function. This function is executed
with a `yargs` instance, and can be used to provide _advanced_ command specific help:

```js
yargs
  .command('get', 'make a get HTTP request', function (yargs) {
    return yargs.option('url', {
      alias: 'u',
      default: 'http://yargs.js.org/'
    })
  })
  .help()
  .argv
```

You can also provide a handler function, which will be executed with the
parsed `argv` object:

```js
yargs
  .command(
    'get',
    'make a get HTTP request',
    function (yargs) {
      return yargs.option('u', {
        alias: 'url',
        describe: 'the URL to make an HTTP request to'
      })
    },
    function (argv) {
      console.log(argv.url)
    }
  )
  .help()
  .argv
```

### Default Commands

To specify a default command use the character `*`. A default command
will be run if the positional arguments provided match no known
commands:

```js
const argv = require('yargs')
  .command('*', 'the default command', () => {}, (argv) => {
    console.log('this command will be run by default')
  })
```

The command defined above will be executed if the program
is run with `./my-cli.js --x=22`.

Default commands can also be used as a command alias, like so:

```js
const argv = require('yargs')
  .command(['serve', '*'], 'the serve command', () => {}, (argv) => {
    console.log('this command will be run by default')
  })
```

The command defined above will be executed if the program
is run with `./my-cli.js --x=22`, or with `./my-cli.js serve --x=22`.

### Positional Arguments

Commands can accept _optional_ and _required_ positional arguments. Required
positional arguments take the form `<foo>`, and optional arguments
take the form `[bar]`. The parsed positional arguments will be populated in
`argv`:

```js
yargs.command('get <source> [proxy]', 'make a get HTTP request')
  .help()
  .argv
```

#### Positional Argument Aliases

Aliases can be provided for positional arguments using the `|` character.
As an example, suppose our application allows either a username _or_
an email as the first argument:

```js
yargs.command('get <username|email> [password]', 'fetch a user by username or email.')
  .help()
  .argv
```

In this way, both `argv.username` and `argv.email` would be populated with the
same value when the command is executed.

#### Variadic Positional Arguments

The last positional argument can optionally accept an array of
values, by using the `..` operator:

```js
yargs.command('download <url> [files..]', 'download several files')
  .help()
  .argv
```

### Command Execution

When a command is given on the command line, yargs will execute the following:

1. push the command into the current context
2. reset non-global configuration
3. apply command configuration via the `builder`, if given
4. parse and validate args from the command line, including positional args
5. if validation succeeds, run the `handler` function, if given
6. pop the command from the current context

### Command Aliases

You can define aliases for a command by putting the command and all of its
aliases into an array.

Alternatively, a command module may specify an `aliases` property, which may be
a string or an array of strings. All aliases defined via the `command` property
and the `aliases` property will be concatenated together.

The first element in the array is considered the canonical command, which may
define positional arguments, and the remaining elements in the array are
considered aliases. Aliases inherit positional args from the canonical command,
and thus any positional args defined in the aliases themselves are ignored.

If either the canonical command or any of its aliases are given on the command
line, the command will be executed.

```js
#!/usr/bin/env node
require('yargs')
  .command(['start [app]', 'run', 'up'], 'Start up an app', {}, (argv) => {
    console.log('starting up the', argv.app || 'default', 'app')
  })
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv
```

```
$ ./svc.js help
Commands:
  start [app]              Start up an app            [aliases: run, up]
  configure <key> [value]  Set a config variable  [aliases: config, cfg]

Options:
  --help  Show help                                            [boolean]

$ ./svc.js cfg concurrency 4
setting concurrency to 4

$ ./svc.js run web
starting up the web app
```

### Providing a Command Module

For complicated commands you can pull the logic into a module. A module
simply needs to export:

* `exports.command`: string (or array of strings) that executes this command when given on the command line, first string may contain positional args
* `exports.aliases`: array of strings (or a single string) representing aliases of `exports.command`, positional args defined in an alias are ignored
* `exports.describe`: string used as the description for the command in help text, use `false` for a hidden command
* `exports.builder`: object declaring the options the command accepts, or a function accepting and returning a yargs instance
* `exports.handler`: a function which will be passed the parsed argv.

```js
// my-module.js
exports.command = 'get <source> [proxy]'

exports.describe = 'make a get HTTP request'

exports.builder = {
  banana: {
    default: 'cool'
  },
  batman: {
    default: 'sad'
  }
}

exports.handler = function (argv) {
  // do something with argv.
}
```

You then register the module like so:

```js
yargs.command(require('my-module'))
  .help()
  .argv
```

Or if the module does not export `command` and `describe` (or if you just want to override them):

```js
yargs.command('get <source> [proxy]', 'make a get HTTP request', require('my-module'))
  .help()
  .argv
```

.commandDir(directory, [opts])
------------------------------

Apply command modules from a directory relative to the module calling this method.

This allows you to organize multiple commands into their own modules under a
single directory and apply all of them at once instead of calling
`.command(require('./dir/module'))` multiple times.

By default, it ignores subdirectories. This is so you can use a directory
structure to represent your command hierarchy, where each command applies its
subcommands using this method in its builder function. See the example below.

Note that yargs assumes all modules in the given directory are command modules
and will error if non-command modules are encountered. In this scenario, you
can either move your module to a different directory or use the `exclude` or
`visit` option to manually filter it out. More on that below.

`directory` is a relative directory path as a string (required).

`opts` is an options object (optional). The following options are valid:

- `recurse`: boolean, default `false`

    Look for command modules in all subdirectories and apply them as a flattened
    (non-hierarchical) list.

- `extensions`: array of strings, default `['js']`

    The types of files to look for when requiring command modules.

- `visit`: function

    A synchronous function called for each command module encountered. Accepts
    `commandObject`, `pathToFile`, and `filename` as arguments. Returns
    `commandObject` to include the command; any falsy value to exclude/skip it.

- `include`: RegExp or function

    Whitelist certain modules. See [`require-directory` whitelisting](https://www.npmjs.com/package/require-directory#whitelisting) for details.

- `exclude`: RegExp or function

    Blacklist certain modules. See [`require-directory` blacklisting](https://www.npmjs.com/package/require-directory#blacklisting) for details.

### Example command hierarchy using `.commandDir()`

Desired CLI:

```sh
$ myapp --help
$ myapp init
$ myapp remote --help
$ myapp remote add base http://yargs.js.org
$ myapp remote prune base
$ myapp remote prune base fork whatever
```

Directory structure:

```
myapp/
├─ cli.js
└─ cmds/
   ├─ init.js
   ├─ remote.js
   └─ remote_cmds/
      ├─ add.js
      └─ prune.js
```

cli.js:

```js
#!/usr/bin/env node
require('yargs')
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv
```

cmds/init.js:

```js
exports.command = 'init [dir]'
exports.desc = 'Create an empty repo'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('init called for dir', argv.dir)
}
```

cmds/remote.js:

```js
exports.command = 'remote <command>'
exports.desc = 'Manage set of tracked repos'
exports.builder = function (yargs) {
  return yargs.commandDir('remote_cmds')
}
exports.handler = function (argv) {}
```

cmds/remote_cmds/add.js:

```js
exports.command = 'add <name> <url>'
exports.desc = 'Add remote named <name> for repo at url <url>'
exports.builder = {}
exports.handler = function (argv) {
  console.log('adding remote %s at url %s', argv.name, argv.url)
}
```

cmds/remote_cmds/prune.js:

```js
exports.command = 'prune <name> [names..]'
exports.desc = 'Delete tracked branches gone stale for remotes'
exports.builder = {}
exports.handler = function (argv) {
  console.log('pruning remotes %s', [].concat(argv.name).concat(argv.names).join(', '))
}
```

.completion([cmd], [description], [fn])
---------------------------------------

Enable bash-completion shortcuts for commands and options.

`cmd`: When present in `argv._`, will result in the `.bashrc` completion script
being outputted. To enable bash completions, concat the generated script to your
`.bashrc` or `.bash_profile`.

`description`: Provide a description in your usage instructions for the command
that generates bash completion scripts.

`fn`: Rather than relying on yargs' default completion functionality, which
shiver me timbers is pretty awesome, you can provide your own completion
method.

If invoked without parameters, `.completion()` will make `completion` the command to output
the completion script.

```js
var argv = require('yargs')
  .completion('completion', function(current, argv) {
    // 'current' is the current command being completed.
    // 'argv' is the parsed arguments so far.
    // simply return an array of completions.
    return [
      'foo',
      'bar'
    ];
  })
  .argv;
```

You can also provide asynchronous completions.

```js
var argv = require('yargs')
  .completion('completion', function(current, argv, done) {
    setTimeout(function() {
      done([
        'apple',
        'banana'
      ]);
    }, 500);
  })
  .argv;
```

But wait, there's more! You can return an asynchronous promise.

```js
var argv = require('yargs')
  .completion('completion', function(current, argv, done) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(['apple', 'banana'])
      }, 10)
    })
  })
  .argv;
```

<a name="config"></a>.config([key], [description], [parseFn])
-------------------------------------------------------------
.config(object)
---------------

Tells the parser that if the option specified by `key` is passed in, it
should be interpreted as a path to a JSON config file. The file is loaded
and parsed, and its properties are set as arguments. Because the file is
loaded using Node's require(), the filename MUST end in `.json` to be
interpreted correctly.

If invoked without parameters, `.config()` will make `--config` the option to pass the JSON config file.

An optional `description` can be provided to customize the config (`key`) option
in the usage string.

An optional `parseFn` can be used to provide a custom parser. The parsing
function must be synchronous, and should return an object containing
key value pairs or an error.

```js
var argv = require('yargs')
  .config('settings', function (configPath) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  })
  .argv
```

You can also pass an explicit configuration `object`, it will be parsed
and its properties will be set as arguments.

```js
var argv = require('yargs')
  .config({foo: 1, bar: 2})
  .argv
console.log(argv)
```

```
$ node test.js
{ _: [],
  foo: 1,
  bar: 2,
  '$0': 'test.js' }
```

Note that a configuration object may extend from a JSON file using the `"extends"` property. When doing so, the `"extends"` value should be a path (relative or absolute) to the extended JSON file.

<a name="conflicts"></a>.conflicts(x, y)
----------------------------------------------

Given the key `x` is set, the key `y` must not be set.

Optionally `.conflicts()` can accept an object specifying multiple conflicting keys.

<a name="count"></a>.count(key)
------------

Interpret `key` as a boolean flag, but set its parsed value to the number of
flag occurrences rather than `true` or `false`. Default value is thus `0`.

<a name="default"></a>.default(key, value, [description])
---------------------------------------------------------
.defaults(key, value, [description])
------------------------------------

**Note:** The `.defaults()` alias is deprecated. It will be
removed in the next major version.

Set `argv[key]` to `value` if no option was specified in `process.argv`.

Optionally `.default()` can take an object that maps keys to default values.

But wait, there's more! The default value can be a `function` which returns
a value. The name of the function will be used in the usage string:

```js
var argv = require('yargs')
  .default('random', function randomValue() {
    return Math.random() * 256;
  }).argv;
```

Optionally, `description` can also be provided and will take precedence over
displaying the value in the usage instructions:

```js
.default('timeout', 60000, '(one-minute)')
```

<a name="demand"></a>.demand(count, [max], [msg]) [DEPRECATED]
--------------------

`demand()` has been deprecated, please instead see [`demandOption()`](#demandOption) and
[`demandCommand()`](#demandCommand).

<a name="demandOption"></a>.demandOption(key, [msg | boolean])
------------------------------
.demandOption(key, msg)
------------------------------

If `key` is a string, show the usage information and exit if `key` wasn't
specified in `process.argv`.

If `key` is an array, demand each element.

If a `msg` string is given, it will be printed when the argument is missing, instead of the standard error message.

```javascript
// demand an array of keys to be provided
require('yargs')
  .option('run', {
    alias: 'r',
    describe: 'run your program'
  })
  .option('path', {
    alias: 'p',
    describe: 'provide a path to file'
  })
  .option('spec', {
    alias: 's',
    describe: 'program specifications'
  })
  .demandOption(['run', 'path'], 'Please provide both run and path arguments to work with this tool')
  .help()
  .argv
```
which will provide the following output:
```bash
Options:
  --run, -r   run your program                [required]
  --path, -p  provide a path to file          [required]
  --spec, -s  program specifications
  --help      Show help                        [boolean]

  Missing required arguments: run, path
  Please provide both run and path arguments to work with this tool
```

If a `boolean` value is given, it controls whether the option is demanded;
this is useful when using `.options()` to specify command line parameters.

```javascript
// demand individual options within the option constructor
require('yargs')
  .options({
    'run': {
      alias: 'r',
      describe: 'run your program',
      demandOption: true
    },
    'path': {
      alias: 'p',
      describe: 'provide a path to file',
      demandOption: true
    },
    'spec': {
      alias: 's',
      describe: 'program specifications'
    }
  })
  .help()
  .argv
```
which will provide the following output:
```bash
Options:
  --run, -r   run your program                                       [required]
  --path, -p  provide a path to file                                 [required]
  --spec, -s  program specifications
  --help      Show help                                               [boolean]

Missing required arguments: run, path
```

<a name="demandCommand"></a>.demandCommand([min=1], [minMsg])
------------------------------
.demandCommand([min=1], [max], [minMsg], [maxMsg])
------------------------------

Demand in context of commands. You can demand a minimum and a maximum number a user can have within your program, as well as provide corresponding error messages if either of the demands is not met.
```javascript
require('yargs')
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  // provide a minimum demand and a minimum demand message
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv
```

which will provide the following output:

```bash
Commands:
  configure <key> [value]  Set a config variable         [aliases: config, cfg]

Options:
  --help  Show help                                                   [boolean]

You need at least one command before moving on
```

_Note: in `minMsg` and `maxMsg`, every occurrence of `$0` will be replaced
with the observed value, and every instance of `$1` will be replaced with the
expected value._

<a name="describe"></a>.describe(key, desc)
--------------------

Describe a `key` for the generated usage information.

Optionally `.describe()` can take an object that maps keys to descriptions.

.detectLocale(boolean)
-----------

Should yargs attempt to detect the os' locale? Defaults to `true`.

.env([prefix])
--------------

Tell yargs to parse environment variables matching the given prefix and apply
them to argv as though they were command line arguments.

Use the "__" separator in the environment variable to indicate nested options.
(e.g. prefix_nested__foo => nested.foo)

If this method is called with no argument or with an empty string or with `true`,
then all env vars will be applied to argv.

Program arguments are defined in this order of precedence:

1. Command line args
2. Env vars
3. Config file/objects
4. Configured defaults

```js
var argv = require('yargs')
  .env('MY_PROGRAM')
  .option('f', {
    alias: 'fruit-thing',
    default: 'apple'
  })
  .argv
console.log(argv)
```

```
$ node fruity.js
{ _: [],
  f: 'apple',
  'fruit-thing': 'apple',
  fruitThing: 'apple',
  '$0': 'fruity.js' }
```

```
$ MY_PROGRAM_FRUIT_THING=banana node fruity.js
{ _: [],
  fruitThing: 'banana',
  f: 'banana',
  'fruit-thing': 'banana',
  '$0': 'fruity.js' }
```

```
$ MY_PROGRAM_FRUIT_THING=banana node fruity.js -f cat
{ _: [],
  f: 'cat',
  'fruit-thing': 'cat',
  fruitThing: 'cat',
  '$0': 'fruity.js' }
```

Env var parsing is disabled by default, but you can also explicitly disable it
by calling `.env(false)`, e.g. if you need to undo previous configuration.

.epilog(str)
------------
.epilogue(str)
--------------

A message to print at the end of the usage instructions, e.g.

```js
var argv = require('yargs')
  .epilogue('for more information, find our manual at http://example.com');
```

.example(cmd, desc)
-------------------

Give some example invocations of your program. Inside `cmd`, the string
`$0` will get interpolated to the current script name or node command for the
present script similar to how `$0` works in bash or perl.
Examples will be printed out as part of the help message.

<a name="exitprocess"></a>.exitProcess(enable)
----------------------------------

By default, yargs exits the process when the user passes a help flag, uses the
`.version` functionality, or when validation fails. Calling
`.exitProcess(false)` disables this behavior, enabling further actions after
yargs have been validated.

<a name="fail"></a>.fail(fn)
---------

Method to execute when a failure occurs, rather than printing the failure message.

`fn` is called with the failure message that would have been printed, the
`Error` instance originally thrown and yargs state when the failure
occured.

```js
var argv = require('yargs')
  .fail(function (msg, err, yargs) {
    if (err) throw err // preserve stack
    console.error('You broke it!')
    console.error(msg)
    console.error('You should be doing', yargs.help())
    process.exit(1)
  })
  .argv
```

.getCompletion(args, done);
---------------------------

Allows to programmatically get completion choices for any line.

`args`: An array of the words in the command line to complete.

`done`: The callback to be called with the resulting completions.

For example:

```js
require('yargs')
  .option('foobar')
  .option('foobaz')
  .completion()
  .getCompletion(['./test.js', '--foo'], function (completions) {
    console.log(completions)
  })
```

Outputs the same completion choices as `./test.js --foo`<kbd>TAB</kbd>: `--foobar` and `--foobaz`

<a name="global"></a>.global(globals, [global=true])
------------

Indicate that an option (or group of options) should not be reset when a command
is executed, as an example:

```js
var argv = require('yargs')
  .option('a', {
    alias: 'all',
    default: true,
    global: false
  })
  .option('n', {
    alias: 'none',
    default: true,
    global: false
  })
  .command('foo', 'foo command', function (yargs) {
    return yargs.option('b', {
      alias: 'bar'
    })
  })
  .help('help')
  .global('a')
  .argv
```

If the `foo` command is executed the `all` option will remain, but the `none`
option will have been eliminated.

Options default to being global.

<a name="group"></a>.group(key(s), groupName)
--------------------

Given a key, or an array of keys, places options under an alternative heading
when displaying usage instructions, e.g.,

```js
var yargs = require('yargs')(['--help'])
  .help()
  .group('batman', 'Heroes:')
  .describe('batman', "world's greatest detective")
  .wrap(null)
  .argv
```
***
    Heroes:
      --batman  world's greatest detective

    Options:
      --help  Show help  [boolean]

<a name="help"></a>.help()
-----------------------------------------
.help([option | boolean])
-----------------------------------------
.help([option, [description | boolean]])
-----------------------------------------
.help([option, [description, [boolean]]])
-----------------------------------------

Add an option (e.g. `--help`) and implicit command that displays the usage
string and exits the process.

If present, the `description` parameter customizes the description of
the help option in the usage string.

If a boolean argument is provided, it will enable or disable the use of an
implicit command. The implicit command is enabled by default, but it can be
disabled by passing `false`.

Note that any multi-char aliases (e.g. `help`) used for the help option will
also be used for the implicit command. If there are no multi-char aliases (e.g.
`h`), then all single-char aliases will be used for the command.

If invoked without parameters, `.help()` will use `--help` as the option and
`help` as the implicit command to trigger help output.

Example:

```js
var yargs = require("yargs")(['--help'])
  .usage("$0 -operand1 number -operand2 number -operation [add|subtract]")
  .help()
  .argv
```

Later on, `argv` can be retrieved with `yargs.argv`.

<a name="implies"></a>.implies(x, y)
--------------

Given the key `x` is set, it is required that the key `y` is set.

Optionally `.implies()` can accept an object specifying multiple implications.

.locale()
---------

Return the locale that yargs is currently using.

By default, yargs will auto-detect the operating system's locale so that
yargs-generated help content will display in the user's language.

To override this behavior with a static locale, pass the desired locale as a
string to this method (see below).

.locale(locale)
---------------

Override the auto-detected locale from the user's operating system with a static
locale. Note that the OS locale can be modified by setting/exporting the `LC_ALL`
environment variable.

```js
var argv = require('yargs')
  .usage('./$0 - follow ye instructions true')
  .option('option', {
    alias: 'o',
    describe: "'tis a mighty fine option",
    demandOption: true
  })
  .command('run', "Arrr, ya best be knowin' what yer doin'")
  .example('$0 run foo', "shiver me timbers, here's an example for ye")
  .help('help')
  .wrap(70)
  .locale('pirate')
  .argv
```

***

```shell
./test.js - follow ye instructions true

Choose yer command:
  run  Arrr, ya best be knowin' what yer doin'

Options for me hearties!
  --option, -o  'tis a mighty fine option               [requi-yar-ed]
  --help        Parlay this here code of conduct             [boolean]

Ex. marks the spot:
  test.js run foo  shiver me timbers, here's an example for ye

Ye be havin' to set the followin' argument land lubber: option
```

Locales currently supported:

* **de:** German.
* **en:** American English.
* **es:** Spanish.
* **fr:** French.
* **hi:** Hindi.
* **hu:** Hungarian.
* **id:** Indonesian.
* **it:** Italian.
* **ja:** Japanese.
* **ko:** Korean.
* **nb:** Norwegian Bokmål.
* **pirate:** American Pirate.
* **pl:** Polish.
* **pt:** Portuguese.
* **pt_BR:** Brazilian Portuguese.
* **ru:** Russian.
* **th:** Thai.
* **tr:** Turkish.
* **zh_CN:** Chinese.

To submit a new translation for yargs:

1. use `./locales/en.json` as a starting point.
2. submit a pull request with the new locale file.

*The [Microsoft Terminology Search](http://www.microsoft.com/Language/en-US/Search.aspx) can be useful for finding the correct terminology in your locale.*

<a name="nargs"></a>.nargs(key, count)
-----------

The number of arguments that should be consumed after a key. This can be a
useful hint to prevent parsing ambiguity. For example:

```js
var argv = require('yargs')
  .nargs('token', 1)
  .parse(['--token', '-my-token']);
```

parses as:

`{ _: [], token: '-my-token', '$0': 'node test' }`

Optionally `.nargs()` can take an object of `key`/`narg` pairs.

<a name="normalize"></a>.normalize(key)
---------------

The key provided represents a path and should have `path.normalize()` applied.

<a name="number"></a>.number(key)
------------

Tell the parser to always interpret `key` as a number.

If `key` is an array, all elements will be parsed as numbers.

If the option is given on the command line without a value, `argv` will be
populated with `undefined`.

If the value given on the command line cannot be parsed as a number, `argv` will
be populated with `NaN`.

Note that decimals, hexadecimals, and scientific notation are all accepted.

```js
var argv = require('yargs')
  .number('n')
  .number(['width', 'height'])
  .argv
```

.option(key, [opt])
-----------------
.options(key, [opt])
------------------

This method can be used to make yargs aware of options that _could_
exist. You can also pass an `opt` object which can hold further
customization, like `.alias()`, `.demandOption()` etc. for that option.

For example:

````javascript
var argv = require('yargs')
    .option('f', {
        alias: 'file',
        demandOption: true,
        default: '/etc/passwd',
        describe: 'x marks the spot',
        type: 'string'
    })
    .argv
;
````

is the same as

````javascript
var argv = require('yargs')
    .alias('f', 'file')
    .demandOption('f')
    .default('f', '/etc/passwd')
    .describe('f', 'x marks the spot')
    .string('f')
    .argv
;
````

Optionally `.options()` can take an object that maps keys to `opt` parameters.

````javascript
var argv = require('yargs')
    .options({
      'f': {
        alias: 'file',
        demandOption: true,
        default: '/etc/passwd',
        describe: 'x marks the spot',
        type: 'string'
      }
    })
    .argv
;
````

Valid `opt` keys include:

- `alias`: string or array of strings, alias(es) for the canonical option key, see [`alias()`](#alias)
- `array`: boolean, interpret option as an array, see [`array()`](#array)
- `boolean`: boolean, interpret option as a boolean flag, see [`boolean()`](#boolean)
- `choices`: value or array of values, limit valid option arguments to a predefined set, see [`choices()`](#choices)
- `coerce`: function, coerce or transform parsed command line values into another value, see [`coerce()`](#coerce)
- `config`: boolean, interpret option as a path to a JSON config file, see [`config()`](#config)
- `configParser`: function, provide a custom config parsing function, see [`config()`](#config)
- `conflicts`: string or object, require certain keys not to be set, see [`conflicts()`](#conflicts)
- `count`: boolean, interpret option as a count of boolean flags, see [`count()`](#count)
- `default`: value, set a default value for the option, see [`default()`](#default)
- `defaultDescription`: string, use this description for the default value in help content, see [`default()`](#default)
- `demandOption`: boolean or string, demand the option be given, with optional error message, see [`demandOption()`](#demandOption)
- `desc`/`describe`/`description`: string, the option description for help content, see [`describe()`](#describe)
- `global`: boolean, indicate that this key should not be [reset](#reset) when a command is invoked, see [`global()`](#global)
- `group`: string, when displaying usage instructions place the option under an alternative group heading, see [`group()`](#group)
- `implies`: string or object, require certain keys to be set, see [`implies()`](#implies)
- `nargs`: number, specify how many arguments should be consumed for the option, see [`nargs()`](#nargs)
- `normalize`: boolean, apply `path.normalize()` to the option, see [`normalize()`](#normalize)
- `number`: boolean, interpret option as a number, [`number()`](#number)
- `requiresArg`: boolean, require the option be specified with a value, see [`requiresArg()`](#requiresArg)
- `skipValidation`: boolean, skips validation if the option is present, see [`skipValidation()`](#skipValidation)
- `string`: boolean, interpret option as a string, see [`string()`](#string)
- `type`: one of the following strings
    - `'array'`: synonymous for `array: true`, see [`array()`](#array)
    - `'boolean'`: synonymous for `boolean: true`, see [`boolean()`](#boolean)
    - `'count'`: synonymous for `count: true`, see [`count()`](#count)
    - `'number'`: synonymous for `number: true`, see [`number()`](#number)
    - `'string'`: synonymous for `string: true`, see [`string()`](#string)

.parse(args, [context], [parseCallback])
------------

Parse `args` instead of `process.argv`. Returns the `argv` object.
`args` may either be a pre-processed argv array, or a raw argument string.

A `context` object can optionally be given as the second argument to `parse()`, providing a
useful mechanism for passing state information to commands:

```js
const parser = yargs
  .command('lunch-train <restaurant>', 'start lunch train', function () {}, function (argv) {
    console.log(argv.restaurant, argv.time)
  })
  .parse("lunch-train rudy's", {time: '12:15'})
```

A `parseCallback` can also be provided to `.parse()`. If a callback is given, it will be invoked with three arguments:

1. `err`: populated if any validation errors raised while parsing.
2. `argv`: the parsed argv object.
3. `output`: any text that would have been output to the terminal, had a
  callback not been provided.

```js
// providing the `fn` argument to `parse()` runs yargs in headless mode, this
// makes it easy to use yargs in contexts other than the CLI, e.g., writing
// a chat-bot.
const parser = yargs
  .command('lunch-train <restaurant> <time>', 'start lunch train', function () {}, function (argv) {
    api.scheduleLunch(argv.restaurant, moment(argv.time))
  })
  .help()

parser.parse(bot.userText, function (err, argv, output) {
  if (output) bot.respond(output)
})
```

***Note:*** Providing a callback to `parse()` disables the [`exitProcess` setting](#exitprocess) until after the callback is invoked.

.pkgConf(key, [cwd])
------------

Similar to [`config()`](#config), indicates that yargs should interpret the object from the specified key in package.json
as a configuration object.

`cwd` can optionally be provided, the package.json will be read
from this location.

Note that a configuration stanza in package.json may extend from an identically keyed stanza in another package.json file using the `"extends"` property. When doing so, the `"extends"` value should be a path (relative or absolute) to the extended package.json file.

.recommendCommands()
---------------------------

Should yargs provide suggestions regarding similar commands if no matching
command is found?

.require(key, [msg | boolean])
------------------------------
.required(key, [msg | boolean])
------------------------------

An alias for [`demand()`](#demand). See docs there.

<a name="requiresArg"></a>.requiresArg(key)
-----------------

Specifies either a single option key (string), or an array of options that
must be followed by option values. If any option value is missing, show the
usage information and exit.

The default behavior is to set the value of any key not followed by an
option value to `true`.

<a name="reset"></a>.reset()
--------

Reset the argument object built up so far. This is useful for
creating nested command line interfaces. Use [global](#global)
to specify keys that should not be reset.

```js
var yargs = require('yargs')
  .usage('$0 command')
  .command('hello', 'hello command')
  .command('world', 'world command')
  .demandCommand(1, 'must provide a valid command'),
  argv = yargs.argv,
  command = argv._[0];

if (command === 'hello') {
  yargs.reset()
    .usage('$0 hello')
    .help('h')
    .example('$0 hello', 'print the hello message!')
    .argv

  console.log('hello!');
} else if (command === 'world'){
  yargs.reset()
    .usage('$0 world')
    .help('h')
    .example('$0 world', 'print the world message!')
    .argv

  console.log('world!');
} else {
  yargs.showHelp();
}
```

.showCompletionScript()
----------------------

Generate a bash completion script. Users of your application can install this
script in their `.bashrc`, and yargs will provide completion shortcuts for
commands and options.

.showHelp(consoleLevel='error')
---------------------------

Print the usage data using the [`console`](https://nodejs.org/api/console.html) function `consoleLevel` for printing.

Example:

```js
var yargs = require("yargs")
  .usage("$0 -operand1 number -operand2 number -operation [add|subtract]");
yargs.showHelp(); //prints to stderr using console.error()
```

Or, to print the usage data to `stdout` instead, you can specify the use of `console.log`:

```js
yargs.showHelp("log"); //prints to stdout using console.log()
```

Later on, `argv` can be retrieved with `yargs.argv`.

.showHelpOnFail(enable, [message])
----------------------------------

By default, yargs outputs a usage string if any error is detected. Use the
`.showHelpOnFail()` method to customize this behavior. If `enable` is `false`,
the usage string is not output. If the `message` parameter is present, this
message is output after the error message.

line_count.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .usage('Count the lines in a file.\nUsage: $0 -f <file>')
    .demandOption('f')
    .alias('f', 'file')
    .describe('f', 'Load a file')
    .string('f')
    .showHelpOnFail(false, 'Specify --help for available options')
    .help('help')
    .argv;

// etc.
````

***

```
$ node line_count.js
Missing argument value: f

Specify --help for available options
```

<a name="skipValidation"></a>.skipValidation(key)
-----------------

Specifies either a single option key (string), or an array of options.
If any of the options is present, yargs validation is skipped.

.strict([global=true])
---------

Any command-line argument given that is not demanded, or does not have a
corresponding description, will be reported as an error.

`global` indicates whether `strict()` should be enabled both
at the top-level and for each sub-command.

<a name="string"></a>.string(key)
------------

Tell the parser logic not to interpret `key` as a number or boolean.
This can be useful if you need to preserve leading zeros in an input.

If `key` is an array, interpret all the elements as strings.

`.string('_')` will result in non-hyphenated arguments being interpreted as strings,
regardless of whether they resemble numbers.

.updateLocale(obj)
------------------
.updateStrings(obj)
------------------

Override the default strings used by yargs with the key/value
pairs provided in `obj`:

```js
var argv = require('yargs')
  .command('run', 'the run command')
  .help('help')
  .updateStrings({
    'Commands:': 'My Commands -->\n'
  })
  .wrap(null)
  .argv
```

***

```shell
My Commands -->

  run  the run command

Options:
  --help  Show help  [boolean]
```

If you explicitly specify a `locale()`, you should do so *before* calling
`updateStrings()`.

.usage(message, [opts])
---------------------

Set a usage message to show which commands to use. Inside `message`, the string
`$0` will get interpolated to the current script name or node command for the
present script similar to how `$0` works in bash or perl.

`opts` is optional and acts like calling `.options(opts)`.

<a name="version"></a>.version([option], [description], [version])
----------------------------------------

Add an option (e.g. `--version`) that displays the version number (given by the
`version` parameter) and exits the process.

If no arguments are passed to `version` (`.version()`), yargs will parse the `package.json`
of your module and use its `version` value. The default value of `option` is `--version`.

You can provide a `function` for version, rather than a string.
This is useful if you want to use a version stored in a location other than package.json:

```js
var argv = require('yargs')
  .version(function() {
    return require('../lib/version').version;
  })
  .argv;
```

<a name="wrap"></a>.wrap(columns)
--------------

Format usage output to wrap at `columns` many columns.

By default wrap will be set to `Math.min(80, windowWidth)`. Use `.wrap(null)` to
specify no column limit (no right-align). Use `.wrap(yargs.terminalWidth())` to
maximize the width of yargs' usage instructions.

parsing tricks
==============

stop parsing
------------

Use `--` to stop parsing flags and stuff the remainder into `argv._`.

    $ node examples/reflect.js -a 1 -b 2 -- -c 3 -d 4
    { _: [ '-c', '3', '-d', '4' ],
      a: 1,
      b: 2,
      '$0': 'examples/reflect.js' }

negate fields
-------------

If you want to explicitly set a field to false instead of just leaving it
undefined or to override a default you can do `--no-key`.

    $ node examples/reflect.js -a --no-b
    { _: [], a: true, b: false, '$0': 'examples/reflect.js' }

numbers
-------

Every argument that looks like a number (`!isNaN(Number(arg))`) is converted to
one. This way you can just `net.createConnection(argv.port)` and you can add
numbers out of `argv` with `+` without having that mean concatenation,
which is super frustrating.

duplicates
----------

If you specify a flag multiple times it will get turned into an array containing
all the values in order.

    $ node examples/reflect.js -x 5 -x 8 -x 0
    { _: [], x: [ 5, 8, 0 ], '$0': 'examples/reflect.js' }

dot notation
------------

When you use dots (`.`s) in argument names, an implicit object path is assumed.
This lets you organize arguments into nested objects.

    $ node examples/reflect.js --foo.bar.baz=33 --foo.quux=5
    { _: [],
      foo: { bar: { baz: 33 }, quux: 5 },
      '$0': 'examples/reflect.js' }

short numbers
-------------

Short numeric `-n5` style arguments work too:

    $ node examples/reflect.js -n123 -m456
    { _: [], n: 123, m: 456, '$0': 'examples/reflect.js' }

installation
============

With [npm](https://github.com/npm/npm), just do:

    npm install yargs

or clone this project on github:

    git clone http://github.com/yargs/yargs.git

To run the tests with npm, just do:

    npm test

configuration
=============

Using the `yargs` stanza in your `package.json` you can turn on and off
some of yargs' parsing features:

```json
{
  "yargs": {
    "short-option-groups": true,
    "camel-case-expansion": true,
    "dot-notation": true,
    "parse-numbers": true,
    "boolean-negation": true
  }
}
```

See the [yargs-parser](https://github.com/yargs/yargs-parser#configuration) module
for detailed documentation of this feature.

inspired by
===========

This module is loosely inspired by Perl's
[Getopt::Casual](http://search.cpan.org/~photo/Getopt-Casual-0.13.1/Casual.pm).

[travis-url]: https://travis-ci.org/yargs/yargs
[travis-image]: https://img.shields.io/travis/yargs/yargs/master.svg
[coveralls-url]: https://coveralls.io/github/yargs/yargs
[coveralls-image]: https://img.shields.io/coveralls/yargs/yargs.svg
[npm-url]: https://www.npmjs.com/package/yargs
[npm-image]: https://img.shields.io/npm/v/yargs.svg
[windows-url]: https://ci.appveyor.com/project/bcoe/yargs-ljwvf
[windows-image]: https://img.shields.io/appveyor/ci/bcoe/yargs-ljwvf/master.svg?label=Windows%20Tests
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[conventional-commits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-url]: https://conventionalcommits.org/
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000
[gitter-url]: https://gitter.im/yargs/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link
