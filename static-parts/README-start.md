![Logo](/logo.png)

# 30 seconds of code

[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/LICENSE) [![npm Downloads](https://img.shields.io/npm/dt/30-seconds-of-code.svg)](https://www.npmjs.com/package/30-seconds-of-code) [![npm Version](https://img.shields.io/npm/v/30-seconds-of-code.svg)](https://www.npmjs.com/package/30-seconds-of-code) [![Gitter chat](https://img.shields.io/badge/chat-on%20gitter-4FB999.svg)](https://gitter.im/30-seconds-of-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.com/Chalarangelo/30-seconds-of-code.svg?branch=master)](https://travis-ci.org/Chalarangelo/30-seconds-of-code) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/207ea6fa2c204ccda61dc3047986e144)](https://www.codacy.com/app/Chalarangelo/30-seconds-of-code?utm_source=github.com&utm_medium=referral&utm_content=Chalarangelo/30-seconds-of-code&utm_campaign=badger) [![Maintainability](https://api.codeclimate.com/v1/badges/e9020d1c963a91c0c8a2/maintainability)](https://codeclimate.com/github/Chalarangelo/30-seconds-of-code/maintainability)  [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/Chalarangelo/30-seconds-of-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![ProductHunt](https://img.shields.io/badge/producthunt-vote-orange.svg)](https://www.producthunt.com/posts/30-seconds-of-code)


> Curated collection of useful JavaScript snippets that you can understand in 30 seconds or less.

[![Sponsored by DigitalOcean](/sponsored_by_DigitalOcean.png)](https://www.digitalocean.com)


- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.
- You can import these snippets into your text editor of choice (VSCode, Atom, Sublime) using the files found in [this repo](https://github.com/Rob-Rychs/30-seconds-of-code-texteditorsnippets).
- You can import these snippets into Alfred 3, using [this file](https://github.com/lslvxy/30-seconds-of-code-alfredsnippets).

#### Related

- [30 Seconds of CSS](https://atomiks.github.io/30-seconds-of-css/)
- [30 Seconds of Python](https://github.com/kriadmin/30-seconds-of-python-code)

#### Package

⚠️ **WARNING:** Snippets are not production ready.

You can find a package with all the snippets on [npm](https://www.npmjs.com/package/30-seconds-of-code).

```bash
# With npm
npm install 30-seconds-of-code

# With yarn
yarn add 30-seconds-of-code
```

CDN links
- [ES2017 Full (UMD)](https://unpkg.com/30-seconds-of-code)
- [ES5 Minified (UMD)](https://unpkg.com/30-seconds-of-code/dist/_30s.es5.min.js)

<details>
<summary>Details</summary>

**Browser**

> IMPORTANT: replace the `src` with the full version link and desired target spec (such as ES5 minified)):

```html
<script src="https://unpkg.com/30-seconds-of-code"></script>
<script>
  _30s.average(1, 2, 3);
</script>
```

**Node**

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
</details>

## Table of Contents
