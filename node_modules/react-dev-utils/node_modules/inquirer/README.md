Inquirer.js
===========

[![npm](https://badge.fury.io/js/inquirer.svg)](http://badge.fury.io/js/inquirer) [![tests](https://travis-ci.org/SBoudrias/Inquirer.js.svg?branch=master)](http://travis-ci.org/SBoudrias/Inquirer.js) [![Coverage Status](https://coveralls.io/repos/yeoman/generator/badge.svg)](https://coveralls.io/r/SBoudrias/Inquirer.js) [![dependencies](https://david-dm.org/SBoudrias/Inquirer.js.svg?theme=shields.io)](https://david-dm.org/SBoudrias/Inquirer.js)

A collection of common interactive command line user interfaces.

## Table of Contents

  1. [Documentation](#documentation)
    1. [Installation](#installation)
    2. [Examples](#examples)
    3. [Methods](#methods)
    4. [Objects](#objects)
      1. [Questions](#questions)
      2. [Answers](#answers)
      3. [Separator](#separator)
    4. [Prompt Types](#prompt)
  2. [User Interfaces and Layouts](#layouts)
    1. [Reactive Interface](#reactive)
  3. [Support](#support)
  4. [News](#news)
  5. [Contributing](#contributing)
  6. [License](#license)
  7. [Plugins](#plugins)


## Goal and Philosophy

<img align="right" alt="Inquirer Logo" src="/assets/inquirer_readme.png" title="Inquirer.js"/>

**`Inquirer.js`** strives to be an easily embeddable and beautiful command line interface for [Node.js](https://nodejs.org/) (and perhaps the "CLI [Xanadu](https://en.wikipedia.org/wiki/Citizen_Kane)").

**`Inquirer.js`** should ease the process of
- providing *error feedback*
- *asking questions*
- *parsing* input
- *validating* answers
- managing *hierarchical prompts*

> **Note:** **`Inquirer.js`** provides the user interface and the inquiry session flow. If you're searching for a full blown command line program utility, then check out [commander](https://github.com/visionmedia/commander.js), [vorpal](https://github.com/dthree/vorpal) or [args](https://github.com/leo/args).


## [Documentation](#documentation)
<a name="documentation"></a>

### Installation
<a name="installation"></a>

``` shell
npm install inquirer
```

```javascript
var inquirer = require('inquirer');
inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
	// Use user feedback for... whatever!!
});
```

<a name="examples"></a>
### Examples (Run it and see it)
Check out the `examples/` folder for code and interface examples.

``` shell
node examples/pizza.js
node examples/checkbox.js
# etc...
```


### Methods
<a name="methods"></a>
#### `inquirer.prompt(questions) -> promise`

Launch the prompt interface (inquiry session)

- **questions** (Array) containing [Question Object](#question) (using the [reactive interface](#reactive-interface), you can also pass a `Rx.Observable` instance)
- returns a **Promise**

#### `inquirer.registerPrompt(name, prompt)`

Register prompt plugins under `name`.

- **name** (string) name of the this new prompt. (used for question `type`)
- **prompt** (object) the prompt object itself (the plugin)

#### `inquirer.createPromptModule() -> prompt function`

Create a self contained inquirer module. If you don't want to affect other libraries that also rely on inquirer when you overwrite or add new prompt types.

```js
var prompt = inquirer.createPromptModule();

prompt(questions).then(/* ... */);
```

### Objects
<a name="objects"></a>

#### Question
<a name="questions"></a>
A question object is a `hash` containing question related values:

- **type**: (String) Type of the prompt. Defaults: `input` - Possible values: `input`, `confirm`,
`list`, `rawlist`, `expand`, `checkbox`, `password`, `editor`
- **name**: (String) The name to use when storing the answer in the answers hash. If the name contains periods, it will define a path in the answers hash.
- **message**: (String|Function) The question to print. If defined as a function, the first parameter will be the current inquirer session answers.
- **default**: (String|Number|Array|Function) Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.
- **choices**: (Array|Function) Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers.
Array values can be simple `strings`, or `objects` containing a `name` (to display in list), a `value` (to save in the answers hash) and a `short` (to display after selection) properties. The choices array can also contain [a `Separator`](#separator).
- **validate**: (Function) Receive the user input and answers hash. Should return `true` if the value is valid, and an error message (`String`) otherwise. If `false` is returned, a default error message is provided.
- **filter**: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the _Answers_ hash.
- **when**: (Function, Boolean) Receive the current user answers hash and should return `true` or `false` depending on whether or not this question should be asked. The value can also be a simple boolean.
- **pageSize**: (Number) Change the number of lines that will be rendered when using `list`, `rawList`, `expand` or `checkbox`.
- **prefix**: (String) Change the default _prefix_ message.
- **suffix**: (String) Change the default _suffix_ message.

`default`, `choices`(if defined as functions), `validate`, `filter` and `when` functions can be called asynchronous. Either return a promise or use `this.async()` to get a callback you'll call with the final value.

``` javascript
{
  /* Preferred way: with promise */
  filter: function () {
    return new Promise(/* etc... */);
  },

  /* Legacy way: with this.async */
  validate: function (input) {
    // Declare function as asynchronous, and save the done callback
    var done = this.async();

    // Do async stuff
    setTimeout(function () {
      if (typeof input !== 'number') {
        // Pass the return value in the done callback
        done('You need to provide a number');
        return;
      }
      // Pass the return value in the done callback
      done(null, true);
    }, 3000);
  }
}
```

### Answers
<a name="answers"></a>
A key/value hash containing the client answers in each prompt.

- **Key** The `name` property of the _question_ object
- **Value** (Depends on the prompt)
  - `confirm`: (Boolean)
  - `input` : User input (filtered if `filter` is defined) (String)
  - `rawlist`, `list` : Selected choice value (or name if no value specified) (String)

### Separator
<a name="separator"></a>
A separator can be added to any `choices` array:

```
// In the question object
choices: [ "Choice A", new inquirer.Separator(), "choice B" ]

// Which'll be displayed this way
[?] What do you want to do?
 > Order a pizza
   Make a reservation
   --------
   Ask opening hours
   Talk to the receptionist
```

The constructor takes a facultative `String` value that'll be use as the separator. If omitted, the separator will be `--------`.

Separator instances have a property `type` equal to `separator`. This should allow tools façading Inquirer interface from detecting separator types in lists.

<a name="prompt"></a>
### Prompt types
---------------------

> **Note:**: _allowed options written inside square brackets (`[]`) are optional. Others are required._

#### List - `{type: 'list'}`

Take `type`, `name`, `message`, `choices`[, `default`, `filter`] properties. (Note that
default must be the choice `index` in the array or a choice `value`)

![List prompt](assets/screenshots/list-prompt.png)

---

#### Raw List - `{type: 'rawlist'}`

Take `type`, `name`, `message`, `choices`[, `default`, `filter`] properties. (Note that
default must the choice `index` in the array)

![Raw list prompt](assets/screenshots/rawlist-prompt.png)

---

#### Expand - `{type: 'expand'}`

Take `type`, `name`, `message`, `choices`[, `default`] properties. (Note that
default must be the choice `index` in the array. If `default` key not provided, then `help` will be used as default choice)

Note that the `choices` object will take an extra parameter called `key` for the `expand` prompt. This parameter must be a single (lowercased) character. The `h` option is added by the prompt and shouldn't be defined by the user.

See `examples/expand.js` for a running example.

![Expand prompt closed](assets/screenshots/expand-prompt-1.png)
![Expand prompt expanded](assets/screenshots/expand-prompt-2.png)

---

#### Checkbox - `{type: 'checkbox'}`

Take `type`, `name`, `message`, `choices`[, `filter`, `validate`, `default`] properties. `default` is expected to be an Array of the checked choices value.

Choices marked as `{checked: true}` will be checked by default.

Choices whose property `disabled` is truthy will be unselectable. If `disabled` is a string, then the string will be outputted next to the disabled choice, otherwise it'll default to `"Disabled"`. The `disabled` property can also be a synchronous function receiving the current answers as argument and returning a boolean or a string.

![Checkbox prompt](assets/screenshots/checkbox-prompt.png)

---

#### Confirm - `{type: 'confirm'}`

Take `type`, `name`, `message`[, `default`] properties. `default` is expected to be a boolean if used.

![Confirm prompt](assets/screenshots/confirm-prompt.png)

---

#### Input - `{type: 'input'}`

Take `type`, `name`, `message`[, `default`, `filter`, `validate`] properties.

![Input prompt](assets/screenshots/input-prompt.png)

---

#### Password - `{type: 'password'}`

Take `type`, `name`, `message`[, `default`, `filter`, `validate`] properties.

![Password prompt](assets/screenshots/password-prompt.png)

---

#### Editor - `{type: 'editor'}`

Take `type`, `name`, `message`[, `default`, `filter`, `validate`] properties

Launches an instance of the users preferred editor on a temporary file. Once the user exits their editor, the contents of the temporary file are read in as the result. The editor to use is determined by reading the $VISUAL or $EDITOR environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.

<a name="layouts"></a>
## User Interfaces and layouts


Along with the prompts, Inquirer offers some basic text UI.

#### Bottom Bar - `inquirer.ui.BottomBar`

This UI present a fixed text at the bottom of a free text zone. This is useful to keep a message to the bottom of the screen while outputting command outputs on the higher section.

```javascript
var ui = new inquirer.ui.BottomBar();

// pipe a Stream to the log zone
outputStream.pipe(ui.log);

// Or simply write output
ui.log.write('something just happened.');
ui.log.write('Almost over, standby!');

// During processing, update the bottom bar content to display a loader
// or output a progress bar, etc
ui.updateBottomBar('new bottom bar content');
```

<a name="reactive"></a>
## Reactive interface


Internally, Inquirer uses the [JS reactive extension](https://github.com/Reactive-Extensions/RxJS) to handle events and async flows.

This mean you can take advantage of this feature to provide more advanced flows. For example, you can dynamically add questions to be asked:

```js
var prompts = new Rx.Subject();
inquirer.prompt(prompts);

// At some point in the future, push new questions
prompts.onNext({ /* question... */ });
prompts.onNext({ /* question... */ });

// When you're done
prompts.onCompleted();
```

And using the return value `process` property, you can access more fine grained callbacks:

```js
inquirer.prompt(prompts).ui.process.subscribe(
  onEachAnswer,
  onError,
  onComplete
);
```

## Support (OS Terminals)
<a name="support"></a>

You should expect mostly good support for the CLI below. This does not mean we won't
look at issues found on other command line - feel free to report any!

- **Mac OS**:
  - Terminal.app
  - iTerm
- **Windows**:
  - [ConEmu](https://conemu.github.io/)
  - cmd.exe
  - Powershell
  - Cygwin
- **Linux (Ubuntu, openSUSE, Arch Linux, etc)**:
  - gnome-terminal (Terminal GNOME)
  - konsole


## News on the march (Release notes)
<a name="news"></a>


Please refer to the [Github releases section for the changelog](https://github.com/SBoudrias/Inquirer.js/releases)


## Contributing
<a name="contributing"></a>

**Unit test**
Unit test are written in [Mocha](https://mochajs.org/). Please add a unit test for every new feature or bug fix. `npm test` to run the test suite.

**Documentation**
Add documentation for every API change. Feel free to send typo fixes and better docs!

We're looking to offer good support for multiple prompts and environments. If you want to
help, we'd like to keep a list of testers for each terminal/OS so we can contact you and
get feedback before release. Let us know if you want to be added to the list (just tweet
to [@vaxilart](https://twitter.com/Vaxilart)) or just add your name to [the wiki](https://github.com/SBoudrias/Inquirer.js/wiki/Testers)

## License
<a name="license"></a>

Copyright (c) 2016 Simon Boudrias (twitter: [@vaxilart](https://twitter.com/Vaxilart))
Licensed under the MIT license.

## Plugins
<a name="plugins"></a>

### Prompts ###

[__autocomplete__](https://github.com/mokkabonna/inquirer-autocomplete-prompt)<br>
Presents a list of options as the user types, compatible with other packages such as fuzzy (for search)<br>
<br>
![autocomplete prompt](https://github.com/mokkabonna/inquirer-autocomplete-prompt/raw/master/inquirer.gif)

[__datetime__](https://github.com/DerekTBrown/inquirer-datepicker-prompt)<br>
Customizable date/time selector using both number pad and arrow keys<br>
<br>
![Datetime Prompt](https://github.com/DerekTBrown/inquirer-datepicker-prompt/raw/master/example/datetime-prompt.png)

[__inquirer-select-line__](https://github.com/adam-golab/inquirer-select-line)<br>
Prompt for selecting index in array where add new element<br>
<br>
![inquirer-select-line gif](https://media.giphy.com/media/xUA7b1MxpngddUvdHW/giphy.gif)

[__command__](https://github.com/sullof/inquirer-command-prompt)<br>
<br>
Simple prompt with command history and dynamic autocomplete

[__inquirer-chalk-pipe__](https://github.com/LitoMore/inquirer-chalk-pipe)<br>
Prompt for input chalk-pipe style strings<br>
<br>
![inquirer-chalk-pipe](https://github.com/LitoMore/inquirer-chalk-pipe/raw/master/screenshot.gif)
