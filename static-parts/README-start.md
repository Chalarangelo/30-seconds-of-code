![Logo](/logo.png)

# 30 seconds of code

[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/LICENSE) [![Gitter chat](https://img.shields.io/badge/chat-on%20gitter-4FB999.svg)](https://gitter.im/30-seconds-of-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.org/Chalarangelo/30-seconds-of-code.svg?branch=master)](https://travis-ci.org/Chalarangelo/30-seconds-of-code) [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/Chalarangelo/30-seconds-of-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![ProductHunt](https://img.shields.io/badge/producthunt-vote-orange.svg)](https://www.producthunt.com/posts/30-seconds-of-code)


> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.


- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.
- You can import these snippets into your text editor of choice (VSCode, Atom, Sublime) using the files found in [this repo](https://github.com/Rob-Rychs/30-seconds-of-code-texteditorsnippets).
- You can import these snippets into Alfred 3, using [this file](https://github.com/lslvxy/30-seconds-of-code-alfredsnippets).

#### Package

You can find a package with all the snippets on [npm](https://www.npmjs.com/package/30-seconds-of-code). 

```
npm install 30-seconds-of-code
```

⚠️ **WARNING:** Snippets are not production ready.

To import the whole module:

```js
// CommonJS
const _30s = require('30-seconds-of-code');
_30s.average(1, 2, 3);

// ES Modules
import _30s from '30-seconds-of-code';
_30s.average(1, 2, 3);
```

To import snippets directly:

```js
// CommonJS
const { average } = require('30-seconds-of-code');
average(1, 2, 3);

// ES Modules
import { average } from '30-seconds-of-code';
average(1, 2, 3);
```

## Table of Contents
