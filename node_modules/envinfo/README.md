<p align="center">
  <img src="https://raw.githubusercontent.com/tabrindle/envinfo/master/logo.png" align="center"  width="700px"/>
  <h3 align="center">envinfo generates a report of the common details needed when troubleshooting software issues, such as your operating system, binary versions, browsers, installed languages, and more</h3> 
  <hr/>
</p>

[![Build Status](https://travis-ci.org/tabrindle/envinfo.svg?branch=master)](https://travis-ci.org/tabrindle/envinfo) [![npm version](https://badge.fury.io/js/envinfo.svg)](https://badge.fury.io/js/envinfo) [![npm downloads per month](https://img.shields.io/npm/dm/envinfo.svg?maxAge=86400)](https://www.npmjs.com/package/envinfo) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)

## The problem
- It works on my computer
- "command not found"
- what version of "command" are you running?
- what version of "different command" are you running?
- do you have "insert obscure android sdk version"?
- every github issue reporting template ever:

**Please mention other relevant information such as the browser version, Node.js version, Operating System and programming language.**

## This solution
- Gather all of this information in one spot, quickly, and painlessly.

## Installation

To use as a CLI tool, install this package globally:

```sh
npm install -g envinfo || yarn global add envinfo
```

Or, use without installing with npx:

`npx envinfo`

To use as a library in another project:

```sh
npm install envinfo || yarn add envinfo
```

## CLI Usage

`envinfo` || `npx envinfo`

```bash
  System:
    OS: macOS High Sierra 10.13
    CPU: x64 Intel(R) Core(TM) i7-4870HQ CPU @ 2.50GHz
    Memory: 204.88 MB / 16.00 GB
    Shell: 5.4.2 - /usr/local/bin/zsh
  Binaries:
    Node: 8.11.0 - ~/.nvm/versions/node/v8.11.0/bin/node
    Yarn: 1.5.1 - ~/.yarn/bin/yarn
    npm: 5.6.0 - ~/.nvm/versions/node/v8.11.0/bin/npm
    Watchman: 4.9.0 - /usr/local/bin/watchman
  Utilities:
    CMake: 3.10.2 - /usr/local/bin/cmake
    Make: 3.81 - /usr/bin/make
    GCC: 4.2.1 - /usr/bin/gcc
    Git: 2.17.1 - /usr/local/bin/git
  Servers:
    Apache: 2.4.27 - /usr/sbin/apachectl
    Nginx: 1.13.12 - /usr/local/bin/nginx
  Virtualization:
    Docker: 18.03.1 - /usr/local/bin/docker
    Parallels: 13.3.0 - /usr/local/bin/prlctl
    VirtualBox: 5.2.8 - /usr/local/bin/vboxmanage
  SDKs:
    iOS SDK:
      Platforms: iOS 11.0, macOS 10.13, tvOS 11.0, watchOS 4.0
    Android SDK:
      Build Tools: 27.0.3
      API Levels: 26
  IDEs:
    Android Studio: 3.0 AI-171.4443003
    Atom: 1.23.3
    Emacs: 22.1.1 - /usr/bin/emacs
    Nano: 2.0.6 - /usr/bin/nano
    Vim: 8.0 - /usr/bin/vim
    VSCode: 1.23.1 - /usr/local/bin/code
    Xcode: 9.0/9A235 - /usr/bin/xcodebuild
  Languages:
    Bash: 4.4.12 - /usr/local/bin/bash
    Go: 1.9.3 - /usr/local/bin/go
    Elixir: 1.6.2 - /usr/local/bin/elixir
    Java: 1.8.0 - /usr/bin/javac
    Perl: 5.18.2 - /usr/bin/perl
    PHP: 7.1.7 - /usr/bin/php
    Python: 2.7.14 - /usr/local/bin/python
    Ruby: 2.4.1 - ~/.rvm/rubies/ruby-2.4.1/bin/ruby
    Rust: 1.11.0 - ~/.cargo/bin/rustup
    Scala: 2.12.6 - /usr/local/bin/scalac
  Databases:
    MongoDB: 3.6.4 - /usr/local/bin/mongo
    MySQL: 10.2.14 (MariaDB) - /usr/local/bin/mysql
    PostgreSQL: 10.3 - /usr/local/bin/postgres
    SQLite: 3.19.4 - /usr/local/bin/sqlite3
  Browsers:
    Chrome: 67.0.3396.62
    Chrome Canary: 69.0.3447.2
    Firefox: 59.0.2
    Firefox Developer Edition: 61.0
    Firefox Nightly: 61.0a1
    Safari: 11.0
    Safari Technology Preview: 11.2
  npmPackages:
    apollo-client: ^2.3.1 => 2.3.1 
    jest: ^22.2.1 => 22.2.1
    ...
    react: ^16.3.2 => 16.3.2 
    react-apollo: ^2.1.4 => 2.1.4 
    run4staged: ^1.1.1 => 1.1.1  
    solidarity: 2.0.5 => 2.0.5 
    styled-components: ^3.1.6 => 3.1.6 
  npmGlobalPackages:
    create-react-app: 1.5.2
    create-react-native-app: 1.0.0
    envinfo: 5.10.0
    exp: 49.2.2
    gatsby-cli: 1.1.52
    npm: 5.6.0
    react-native-cli: 2.0.1
    solidarity: 2.1.0
    typescript: 2.8.1
```

## Programmatic Usage

Envinfo takes a configuration object and returns a string (optionally yaml, json or markdown)

```javascript
import envinfo from 'envinfo';

envinfo.run(
  {
    System: ['OS', 'CPU'],
    Binaries: ['Node', 'Yarn', 'npm'],
    Browsers: ['Chrome', 'Firefox', 'Safari'],
    npmPackages: ['styled-components', 'babel-plugin-styled-components'],
  },
  { json: true, console: true, showNotFound: true }
);

```
returns:
```
{
  "System": {
    "OS": "macOS High Sierra 10.13",
    "CPU": "x64 Intel(R) Core(TM) i7-4870HQ CPU @ 2.50GHz"
  },
  "Binaries": {
    "Node": {
      "version": "8.11.0",
      "path": "~/.nvm/versions/node/v8.11.0/bin/node"
    },
    "Yarn": {
      "version": "1.5.1",
      "path": "~/.yarn/bin/yarn"
    },
    "npm": {
      "version": "5.6.0",
      "path": "~/.nvm/versions/node/v8.11.0/bin/npm"
    }
  },
  "Browsers": {
    "Chrome": {
      "version": "67.0.3396.62"
    },
    "Firefox": {
      "version": "59.0.2"
    },
    "Safari": {
      "version": "11.0"
    }
  },
  "npmPackages": {
    "styled-components": {
      "wanted": "^3.2.1",
      "installed": "3.2.1"
    },
    "babel-plugin-styled-components": "Not Found"
  }
}
```

All of envinfo's helpers are also exported for use. You can use envinfo as a whole, or just the parts that you need, like this:

```javascript
const envinfo = require('envinfo');

// each helper returns a promise
const node = await envinfo.helpers.getNodeInfo();

// The promises resolve to an array of values: ["Name", "Version", "Path"]
// e.g. ["Node", "10.9.0", "/usr/local/bin/node"]

console.log(`Node: ${node[1]}`); // "Node: 10.9.0"
```

## CLI Options

```
    --system               Print general system info such as OS, CPU, Memory and Shell
    --browsers             Get version numbers of installed web browsers
    --SDKs                 Get platforms, build tools and SDKs of iOS and Android
    --IDEs                 Get version numbers of installed IDEs
    --languages            Get version numbers of installed languages such as Java, Python, PHP, etc
    --binaries             Get version numbers of node, npm, watchman, etc
    --npmPackages          Get version numbers of locally installed npm packages - glob, string, or comma delimited list
    --npmGlobalPackages    Get version numbers of globally installed npm packages

    --duplicates           Mark duplicate npm packages inside parentheses eg. (2.1.4)
    --fullTree             Traverse entire node_modules dependency tree, not just top level

    --markdown             Print output in markdown format
    --json                 Print output in JSON format
    --console              Print to console (defaults to on for CLI usage, off for programmatic usage)
    --clipboard            Copy output to your system clipboard (uses clipboardy)
```

## Integration

envinfo is live in:

*   [React Native](https://github.com/facebook/react-native) (`react-native info`)
*   [Create React App](https://github.com/facebook/create-react-app) (`create-react-app --info`)
*   [Expo CLI](https://github.com/expo/expo-cli) (`expo diagnostics`)
*   [Webpack](https://github.com/webpack/webpack-cli) (`webpack-cli info`)
*   [Solidarity](https://github.com/infinitered/solidarity) (`solidarity report`)
*   [Gatsby](https://github.com/gatsbyjs/gatsby) (`gatsby info`)

envinfo is used in the ISSUE_TEMPLATE of:
*   [styled-components](https://github.com/styled-components/styled-components)
*   [Jest](https://github.com/facebook/jest)
*   [Apollo Client](https://github.com/apollographql/apollo-client)

## Alternatives
- type `command -v` until you smash your computer
- [specs](https://github.com/mcandre/specs) - an excellent ruby gem that runs `command -v` for you on :all-the-things: Great for raw info.
- [screenfetch](https://github.com/KittyKatt/screenFetch) - fetch system and terminal information, and display a pretty ascii logo
- [Solidarity](https://github.com/infinitered/solidarity) - a project based environment checker
- write your own

## License
MIT

## Contributing

PRs for additional features are welcome! Run `npm run lint && npm run format` before committing.

This project came out of a [PR](https://github.com/facebook/react-native/pull/14428) to the React Native CLI tool - issues are reported frequently without important environment information, like Node/npm versions.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/2925048?v=4" width="100px;"/><br /><sub><b>Trevor Brindle</b></sub>](http://trevorbrindle.com)<br />[💬](#question-tabrindle "Answering Questions") [📝](#blog-tabrindle "Blogposts") [🐛](https://github.com/tabrindle/envinfo/issues?q=author%3Atabrindle "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=tabrindle "Code") [📖](https://github.com/tabrindle/envinfo/commits?author=tabrindle "Documentation") [💡](#example-tabrindle "Examples") [🤔](#ideas-tabrindle "Ideas, Planning, & Feedback") [👀](#review-tabrindle "Reviewed Pull Requests") [📢](#talk-tabrindle "Talks") [⚠️](https://github.com/tabrindle/envinfo/commits?author=tabrindle "Tests") | [<img src="https://avatars0.githubusercontent.com/u/997157?v=4" width="100px;"/><br /><sub><b>Gant Laborde</b></sub>](http://gantlaborde.com/)<br />[📝](#blog-GantMan "Blogposts") [🐛](https://github.com/tabrindle/envinfo/issues?q=author%3AGantMan "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=GantMan "Code") [🤔](#ideas-GantMan "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/599352?v=4" width="100px;"/><br /><sub><b>Anton Fisher</b></sub>](http://antonfisher.com)<br />[🐛](https://github.com/tabrindle/envinfo/issues?q=author%3Aantonfisher "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=antonfisher "Code") | [<img src="https://avatars1.githubusercontent.com/u/960133?v=4" width="100px;"/><br /><sub><b>Ahmad Awais ⚡️</b></sub>](https://AhmadAwais.com/)<br />[🐛](https://github.com/tabrindle/envinfo/issues?q=author%3Aahmadawais "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=ahmadawais "Code") | [<img src="https://avatars2.githubusercontent.com/u/9251453?v=4" width="100px;"/><br /><sub><b>Hasan</b></sub>](https://github.com/LEQADA)<br />[🐛](https://github.com/tabrindle/envinfo/issues?q=author%3ALEQADA "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=LEQADA "Code") | [<img src="https://avatars3.githubusercontent.com/u/1232725?v=4" width="100px;"/><br /><sub><b>Ernesto Ramírez</b></sub>](http://twitter.com/_ErnestoR)<br />[🐛](https://github.com/tabrindle/envinfo/issues?q=author%3AErnestoR "Bug reports") [💻](https://github.com/tabrindle/envinfo/commits?author=ErnestoR "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
