<div align="center">
<h1>cross-env 🔀</h1>

Run scripts that set and use environment variables across platforms

</div>

<hr />

[![Travis Build Status][build-badge]][build]
[![AppVeyor Build Status][win-build-badge]][win-build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![node-version][node-version-badge]][node]
[![downloads][downloads-badge]][npm-stat]

[![MIT License][license-badge]][LICENSE]
[![All Contributors](https://img.shields.io/badge/all_contributors-17-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]
[![Code of Conduct][coc-badge]][coc]
[![Roadmap][roadmap-badge]][roadmap]
[![Examples][examples-badge]][examples]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/cross-env'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/cross-env.svg' />
</a>

## The problem

Most Windows command prompts will choke when you set environment variables with
`NODE_ENV=production` like that. (The exception is [Bash on Windows][win-bash],
which uses native Bash.) Similarly, there's a difference in how windows and
POSIX commands utilize environment variables. With POSIX, you use: `$ENV_VAR`
and on windows you use `%ENV_VAR%`.

## This solution

`cross-env` makes it so you can have a single command without worrying about
setting or using the environment variable properly for the platform. Just set it
like you would if it's running on a POSIX system, and `cross-env` will take care
of setting it properly.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev cross-env
```

> WARNING! Make sure that when you're installing packages that you spell things
> correctly to avoid [mistakenly installing malware][malware]

## Usage

I use this in my npm scripts:

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

Ultimately, the command that is executed (using [`cross-spawn`][cross-spawn])
is:

```
webpack --config build/webpack.config.js
```

The `NODE_ENV` environment variable will be set by `cross-env`

You can also split a command into several ones, or separate the environment
variables declaration from the actual command execution. You can do it this way:

```json
{
  "scripts": {
    "parentScript": "cross-env GREET=\"Joe\" npm run childScript",
    "childScript": "cross-env-shell \"echo Hello $GREET\""
  }
}
```

Where `childScript` holds the actual command to execute and `parentScript` sets
the environment variables to use. Then instead of run the childScript you run
the parent. This is quite useful for launching the same command with different
env variables or when the environment variables are too long to have everything
in one line.  It also means that you can use `$GREET` env var syntax even on
Windows which would usually require it to be `%GREET%`.

If you preceed a dollar sign with an odd number of backslashes the expression statement will not be replaced. Note that this means backslashes after the JSON string escaping took place. `"FOO=\\$BAR"` will not be replaced. `"FOO=\\\\$BAR"` will be replaced though.

Lastly, if you want to pass a JSON string (e.g., when using [ts-loader]), you can do as follows:

```json
{
  "scripts": {
    "test": "cross-env TS_NODE_COMPILER_OPTIONS={\\\"module\\\":\\\"commonjs\\\"} node some_file.test.ts"
  }
}
```

Pay special attention to the **triple backslash** `(\\\)` **before** the **double quotes** `(")` and the **absence** of **single quotes** `(')`.
Both of these conditions have to be met in order to work both on Windows and UNIX.

## `cross-env` vs `cross-env-shell`

The `cross-env` module exposes two bins: `cross-env` and `cross-env-shell`. The
first one executes commands using [`cross-spawn`][cross-spawn], while the
second one uses the `shell` option from Node's `spawn`.

The main use case for `cross-env-shell` is when you need an environment
variable to be set across an entire inline shell script, rather than just one
command.

For example, if you want to have the environment variable apply to several
commands in series then you will need to wrap those in quotes and use 
`cross-env-shell` instead of `cross-env`.

```json
{
  "scripts": {
    "greet": "cross-env-shell GREETING=Hi NAME=Joe \"echo $GREETING && echo $NAME\""
  }
}
```

The rule of thumb is: if you want to pass to `cross-env` a command that
contains special shell characters *that you want interpreted*, then use
`cross-env-shell`. Otherwise stick to `cross-env`.

On Windows you need to use `cross-env-shell`, if you want to handle [signal events](https://nodejs.org/api/process.html#process_signal_events) inside of your program. A common case for that is when you want to capture a `SIGINT` event invoked by pressing `Ctrl + C` on the command-line interface.

## Inspiration

I originally created this to solve a problem I was having with my npm scripts in
[angular-formly][angular-formly]. This made contributing to the project
much easier for Windows users.

## Other Solutions

- [`env-cmd`](https://github.com/toddbluhm/env-cmd) - Reads environment variables from a file instead

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub><b>Kent C. Dodds</b></sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=kentcdodds "Code") [📖](https://github.com/kentcdodds/cross-env/commits?author=kentcdodds "Documentation") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=kentcdodds "Tests") | [<img src="https://avatars1.githubusercontent.com/u/499038?v=3" width="100px;"/><br /><sub><b>Ya Zhuang </b></sub>](https://zhuangya.me)<br />[🔌](#plugin-zhuangya "Plugin/utility libraries") [📖](https://github.com/kentcdodds/cross-env/commits?author=zhuangya "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/3440094?v=3" width="100px;"/><br /><sub><b>James Harris</b></sub>](https://wopian.me)<br />[📖](https://github.com/kentcdodds/cross-env/commits?author=wopian "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8941730?v=3" width="100px;"/><br /><sub><b>compumike08</b></sub>](https://github.com/compumike08)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Acompumike08 "Bug reports") [📖](https://github.com/kentcdodds/cross-env/commits?author=compumike08 "Documentation") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=compumike08 "Tests") | [<img src="https://avatars1.githubusercontent.com/u/2270425?v=3" width="100px;"/><br /><sub><b>Daniel Rodríguez Rivero</b></sub>](https://github.com/danielo515)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Adanielo515 "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=danielo515 "Code") [📖](https://github.com/kentcdodds/cross-env/commits?author=danielo515 "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/1508477?v=3" width="100px;"/><br /><sub><b>Jonas Keinholz</b></sub>](https://github.com/inyono)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Ainyono "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=inyono "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=inyono "Tests") | [<img src="https://avatars3.githubusercontent.com/u/1656170?v=3" width="100px;"/><br /><sub><b>Hugo Wood</b></sub>](https://github.com/hgwood)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Ahgwood "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=hgwood "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=hgwood "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/3715715?v=3" width="100px;"/><br /><sub><b>Thiebaud Thomas</b></sub>](https://github.com/thomasthiebaud)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Athomasthiebaud "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=thomasthiebaud "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=thomasthiebaud "Tests") | [<img src="https://avatars1.githubusercontent.com/u/1715800?v=3" width="100px;"/><br /><sub><b>Daniel Rey López</b></sub>](https://daniel.blog)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=DanReyLop "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=DanReyLop "Tests") | [<img src="https://avatars2.githubusercontent.com/u/6374832?v=3" width="100px;"/><br /><sub><b>Amila Welihinda</b></sub>](http://amilajack.com)<br />[🚇](#infra-amilajack "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/1396?v=3" width="100px;"/><br /><sub><b>Paul Betts</b></sub>](https://twitter.com/paulcbetts)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Apaulcbetts "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=paulcbetts "Code") | [<img src="https://avatars1.githubusercontent.com/u/6371670?v=3" width="100px;"/><br /><sub><b>Turner Hayes</b></sub>](https://github.com/turnerhayes)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Aturnerhayes "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=turnerhayes "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=turnerhayes "Tests") | [<img src="https://avatars2.githubusercontent.com/u/22251956?v=4" width="100px;"/><br /><sub><b>Suhas Karanth</b></sub>](https://github.com/sudo-suhas)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=sudo-suhas "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=sudo-suhas "Tests") | [<img src="https://avatars3.githubusercontent.com/u/512692?v=4" width="100px;"/><br /><sub><b>Sven</b></sub>](https://github.com/sventschui)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=sventschui "Code") [📖](https://github.com/kentcdodds/cross-env/commits?author=sventschui "Documentation") [💡](#example-sventschui "Examples") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=sventschui "Tests") |
| [<img src="https://avatars0.githubusercontent.com/u/5522668?v=4" width="100px;"/><br /><sub><b>D. Nicolás Lopez Zelaya</b></sub>](https://github.com/NicoZelaya)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=NicoZelaya "Code") | [<img src="https://avatars3.githubusercontent.com/u/219289?v=4" width="100px;"/><br /><sub><b>Johan Hernandez</b></sub>](http://bithavoc.io)<br />[💻](https://github.com/kentcdodds/cross-env/commits?author=bithavoc "Code") | [<img src="https://avatars3.githubusercontent.com/u/13559161?v=4" width="100px;"/><br /><sub><b>Jordan Nielson</b></sub>](https://github.com/jnielson94)<br />[🐛](https://github.com/kentcdodds/cross-env/issues?q=author%3Ajnielson94 "Bug reports") [💻](https://github.com/kentcdodds/cross-env/commits?author=jnielson94 "Code") [⚠️](https://github.com/kentcdodds/cross-env/commits?author=jnielson94 "Tests") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind welcome!

> Note: this was added late into the project. If you've contributed to this
> project in any way, please make a pull request to add yourself to the list
> by following the instructions in the `CONTRIBUTING.md`

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/cross-env.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/cross-env
[win-build-badge]: https://img.shields.io/appveyor/ci/kentcdodds/cross-env.svg?style=flat-square
[win-build]: https://ci.appveyor.com/project/kentcdodds/cross-env
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/cross-env.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/cross-env
[dependencyci-badge]: https://dependencyci.com/github/kentcdodds/cross-env/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/kentcdodds/cross-env
[version-badge]: https://img.shields.io/npm/v/cross-env.svg?style=flat-square
[package]: https://www.npmjs.com/package/cross-env
[node-version-badge]: https://img.shields.io/badge/node-%3E%3D%204.0-orange.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/cross-env.svg?style=flat-square
[npm-stat]: http://npm-stat.com/charts.html?package=cross-env&from=2016-04-01
[license-badge]: https://img.shields.io/npm/l/cross-env.svg?style=flat-square
[license]: https://github.com/kentcdodds/cross-env/blob/master/other/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/cross-env/blob/master/other/CODE_OF_CONDUCT.md
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/kentcdodds/cross-env/blob/master/other/ROADMAP.md
[examples-badge]: https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square
[examples]: https://github.com/kentcdodds/cross-env/blob/master/other/EXAMPLES.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/cross-env.svg?style=social
[github-watch]: https://github.com/kentcdodds/cross-env/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/cross-env.svg?style=social
[github-star]: https://github.com/kentcdodds/cross-env/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20cross-env!%20https://github.com/kentcdodds/cross-env%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/cross-env.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[win-bash]: https://msdn.microsoft.com/en-us/commandline/wsl/about
[angular-formly]: https://github.com/formly-js/angular-formly
[cross-spawn]: https://www.npmjs.com/package/cross-spawn
[ts-loader]: https://www.npmjs.com/package/ts-loader
[malware]: http://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry
