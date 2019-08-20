[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]
[![Downloads][downloads-image]][downloads-url]
[![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=282608)](https://www.bountysource.com/trackers/282608-eslint?utm_source=282608&utm_medium=shield&utm_campaign=TRACKER_BADGE)
[![Join the chat at https://gitter.im/eslint/eslint](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/eslint/eslint?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Feslint%2Feslint.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Feslint%2Feslint?ref=badge_shield)

# ESLint

[Website](https://eslint.org) |
[Configuring](https://eslint.org/docs/user-guide/configuring) |
[Rules](https://eslint.org/docs/rules/) |
[Contributing](https://eslint.org/docs/developer-guide/contributing) |
[Reporting Bugs](https://eslint.org/docs/developer-guide/contributing/reporting-bugs) |
[Code of Conduct](https://js.foundation/community/code-of-conduct) |
[Twitter](https://twitter.com/geteslint) |
[Mailing List](https://groups.google.com/group/eslint) |
[Chat Room](https://gitter.im/eslint/eslint)

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions:

* ESLint uses [Espree](https://github.com/eslint/espree) for JavaScript parsing.
* ESLint uses an AST to evaluate patterns in code.
* ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.14), npm version 3+.

There are two ways to install ESLint: globally and locally.

### Local Installation and Usage

If you want to include ESLint as part of your project's build system, we recommend installing it locally. You can do so using npm:

```
$ npm install eslint --save-dev
```

You should then set up a configuration file:

```
$ ./node_modules/.bin/eslint --init
```

After that, you can run ESLint on any file or directory like this:

```
$ ./node_modules/.bin/eslint yourfile.js
```

Any plugins or shareable configs that you use must also be installed locally to work with a locally-installed ESLint.

### Global Installation and Usage

If you want to make ESLint available to tools that run across all of your projects, we recommend installing ESLint globally. You can do so using npm:

```
$ npm install -g eslint
```

You should then set up a configuration file:

```
$ eslint --init
```

After that, you can run ESLint on any file or directory like this:

```
$ eslint yourfile.js
```

Any plugins or shareable configs that you use must also be installed globally to work with a globally-installed ESLint.

**Note:** `eslint --init` is intended for setting up and configuring ESLint on a per-project basis and will perform a local installation of ESLint and its plugins in the directory in which it is run. If you prefer using a global installation of ESLint, any plugins used in your configuration must also be installed globally.

## Configuration

After running `eslint --init`, you'll have a `.eslintrc` file in your directory. In it, you'll see some rules configured like this:

```json
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

The names `"semi"` and `"quotes"` are the names of [rules](https://eslint.org/docs/rules) in ESLint. The first value is the error level of the rule and can be one of these values:

* `"off"` or `0` - turn the rule off
* `"warn"` or `1` - turn the rule on as a warning (doesn't affect exit code)
* `"error"` or `2` - turn the rule on as an error (exit code will be 1)

The three error levels allow you fine-grained control over how ESLint applies rules (for more configuration options and details, see the [configuration docs](https://eslint.org/docs/user-guide/configuring)).

## Code of Conduct

ESLint adheres to the [JS Foundation Code of Conduct](https://js.foundation/community/code-of-conduct).

## Filing Issues

Before filing an issue, please be sure to read the guidelines for what you're reporting:

* [Bug Report](https://eslint.org/docs/developer-guide/contributing/reporting-bugs)
* [Propose a New Rule](https://eslint.org/docs/developer-guide/contributing/new-rules)
* [Proposing a Rule Change](https://eslint.org/docs/developer-guide/contributing/rule-changes)
* [Request a Change](https://eslint.org/docs/developer-guide/contributing/changes)

## Frequently Asked Questions

### I'm using JSCS, should I migrate to ESLint?

Maybe, depending on how much you need it. [JSCS has reached end of life](https://eslint.org/blog/2016/07/jscs-end-of-life), but if it is working for you then there is no reason to move yet. There are still [a few issues](https://github.com/eslint/eslint/milestones/JSCS%20Compatibility) pending. We’ll announce when all of the changes necessary to support JSCS users in ESLint are complete and will start encouraging JSCS users to switch to ESLint at that time.

If you are having issues with JSCS, you can try to move to ESLint. Have a look at our [migration guide](https://eslint.org/docs/user-guide/migrating-from-jscs).

### Does Prettier replace ESLint?

No, ESLint does both traditional linting (looking for problematic patterns) and style checking (enforcement of conventions). You can use ESLint for everything, or you can combine both using Prettier to format your code and ESLint to catch possible errors.

### Why can't ESLint find my plugins?

ESLint can be [globally or locally installed](#installation-and-usage). If you install ESLint globally, your plugins must also be installed globally; if you install ESLint locally, your plugins must also be installed locally.

If you are trying to run globally, make sure your plugins are installed globally (use `npm ls -g`).

If you are trying to run locally:

* Make sure your plugins (and ESLint) are both in your project's `package.json` as devDependencies (or dependencies, if your project uses ESLint at runtime).
* Make sure you have run `npm install` and all your dependencies are installed.

In all cases, make sure your plugins' peerDependencies have been installed as well. You can use `npm view eslint-plugin-myplugin peerDependencies` to see what peer dependencies `eslint-plugin-myplugin` has.

### Does ESLint support JSX?

Yes, ESLint natively supports parsing JSX syntax (this must be enabled in [configuration](https://eslint.org/docs/user-guide/configuring)). Please note that supporting JSX syntax *is not* the same as supporting React. React applies specific semantics to JSX syntax that ESLint doesn't recognize. We recommend using [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) if you are using React and want React semantics.

### What ECMAScript versions does ESLint support?

ESLint has full support for ECMAScript 3, 5 (default), 2015, 2016, 2017, and 2018. You can set your desired ECMAScript syntax (and other settings, like global variables or your target environments) through [configuration](https://eslint.org/docs/user-guide/configuring).

### What about experimental features?

ESLint's parser only officially supports the latest final ECMAScript standard. We will make changes to core rules in order to avoid crashes on stage 3 ECMAScript syntax proposals (as long as they are implemented using the correct experimental ESTree syntax). We may make changes to core rules to better work with language extensions (such as JSX, Flow, and TypeScript) on a case-by-case basis.

In other cases (including if rules need to warn on more or fewer cases due to new syntax, rather than just not crashing), we recommend you use other parsers and/or rule plugins. If you are using Babel, you can use the [babel-eslint](https://github.com/babel/babel-eslint) parser and [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel) to use any option available in Babel.

Once a language feature has been adopted into the ECMAScript standard (stage 4 according to the [TC39 process](https://tc39.github.io/process-document/)), we will accept issues and pull requests related to the new feature, subject to our [contributing guidelines](https://eslint.org/docs/developer-guide/contributing). Until then, please use the appropriate parser and plugin(s) for your experimental feature.

### Where to ask for help?

Join our [Mailing List](https://groups.google.com/group/eslint) or [Chatroom](https://gitter.im/eslint/eslint).

## Releases

We have scheduled releases every two weeks on Friday or Saturday. You can follow a [release issue](https://github.com/eslint/eslint/issues?q=is%3Aopen+is%3Aissue+label%3Arelease) for updates about the scheduling of any particular release.

## Semantic Versioning Policy

ESLint follows [semantic versioning](https://semver.org). However, due to the nature of ESLint as a code quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, we've defined the following semantic versioning policy for ESLint:

* Patch release (intended to not break your lint build)
    * A bug fix in a rule that results in ESLint reporting fewer errors.
    * A bug fix to the CLI or core (including formatters).
    * Improvements to documentation.
    * Non-user-facing changes such as refactoring code, adding, deleting, or modifying tests, and increasing test coverage.
    * Re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone).
* Minor release (might break your lint build)
    * A bug fix in a rule that results in ESLint reporting more errors.
    * A new rule is created.
    * A new option to an existing rule that does not result in ESLint reporting more errors by default.
    * An existing rule is deprecated.
    * A new CLI capability is created.
    * New capabilities to the public API are added (new classes, new methods, new arguments to existing methods, etc.).
    * A new formatter is created.
* Major release (likely to break your lint build)
    * `eslint:recommended` is updated.
    * A new option to an existing rule that results in ESLint reporting more errors by default.
    * An existing formatter is removed.
    * Part of the public API is removed or changed in an incompatible way.

According to our policy, any minor update may report more errors than the previous release (ex: from a bug fix). As such, we recommend using the tilde (`~`) in `package.json` e.g. `"eslint": "~3.1.0"` to guarantee the results of your builds.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Feslint%2Feslint.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Feslint%2Feslint?ref=badge_large)

## Team

These folks keep the project moving and are resources for help.

<!-- NOTE: This section is autogenerated. Do not manually edit.-->
<!--teamstart-->

### Technical Steering Committee (TSC)

The people who manage releases, review feature requests, and meet regularly to ensure ESLint is properly maintained.

<table><tbody><tr><td align="center" valign="top" width="11%">
<a href="https://github.com/nzakas">
<img src="https://github.com/nzakas.png?s=75" width="75" height="75"><br />
Nicholas C. Zakas
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/platinumazure">
<img src="https://github.com/platinumazure.png?s=75" width="75" height="75"><br />
Kevin Partington
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/ilyavolodin">
<img src="https://github.com/ilyavolodin.png?s=75" width="75" height="75"><br />
Ilya Volodin
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/btmills">
<img src="https://github.com/btmills.png?s=75" width="75" height="75"><br />
Brandon Mills
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/mysticatea">
<img src="https://github.com/mysticatea.png?s=75" width="75" height="75"><br />
Toru Nagashima
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/gyandeeps">
<img src="https://github.com/gyandeeps.png?s=75" width="75" height="75"><br />
Gyandeep Singh
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/kaicataldo">
<img src="https://github.com/kaicataldo.png?s=75" width="75" height="75"><br />
Kai Cataldo
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/not-an-aardvark">
<img src="https://github.com/not-an-aardvark.png?s=75" width="75" height="75"><br />
Teddy Katz
</a>
</td></tr></tbody></table>




### Committers

The people who review and fix bugs and help triage issues.

<table><tbody><tr><td align="center" valign="top" width="11%">
<a href="https://github.com/aladdin-add">
<img src="https://github.com/aladdin-add.png?s=75" width="75" height="75"><br />
薛定谔的猫
</a>
</td><td align="center" valign="top" width="11%">
<a href="https://github.com/g-plane">
<img src="https://github.com/g-plane.png?s=75" width="75" height="75"><br />
Pig Fang
</a>
</td></tr></tbody></table>


<!--teamend-->

## Sponsors

The following companies, organizations, and individuals support ESLint's ongoing maintenance and development. [Become a Sponsor](https://opencollective.com/eslint) to get your logo on our README and website.

<!-- NOTE: This section is autogenerated. Do not manually edit.-->
<!--sponsorsstart-->
<h3>Gold Sponsors</h3>
<p><a href="https://www.airbnb.com/"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2F098e3bd0-4d57-11e8-9324-0f6cc1f92bf1.png&height=96" alt="Airbnb" height="96"></a> <a href="https://code.facebook.com/projects/"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Fres.cloudinary.com%2Fopencollective%2Fimage%2Fupload%2Fv1508519428%2FS9gk78AS_400x400_fulq2l.jpg&height=96" alt="Facebook Open Source" height="96"></a> <a href="https://badoo.com/team?utm_source=eslint"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2Fbbdb9cc0-3b5d-11e9-9537-ad85092287b8.png&height=96" alt="Badoo" height="96"></a></p><h3>Silver Sponsors</h3>
<p><a href="https://www.ampproject.org/"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2F68ed8b70-ebf2-11e6-9958-cb7e79408c56.png&height=96" alt="AMP Project" height="64"></a></p><h3>Bronze Sponsors</h3>
<p><a href="http://faithlife.com/ref/about"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Flogo.clearbit.com%2Ffaithlife.com&height=96" alt="Faithlife" height="32"></a> <a href="https://jsheroes.io/"><img src="https://images.opencollective.com/proxy/images/?src=https%3A%2F%2Flogo.clearbit.com%2Fjsheroes.io&height=96" alt="JSHeroes " height="32"></a></p>
<!--sponsorsend-->

## Technology Sponsors

* Site search ([eslint.org](https://eslint.org)) is sponsored by [Algolia](https://www.algolia.com)


[npm-image]: https://img.shields.io/npm/v/eslint.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/eslint
[travis-image]: https://img.shields.io/travis/eslint/eslint/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/eslint/eslint
[appveyor-image]: https://ci.appveyor.com/api/projects/status/iwxmiobcvbw3b0av/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/nzakas/eslint/branch/master
[coveralls-image]: https://img.shields.io/coveralls/eslint/eslint/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/eslint/eslint?branch=master
[downloads-image]: https://img.shields.io/npm/dm/eslint.svg?style=flat-square
[downloads-url]: https://www.npmjs.com/package/eslint
