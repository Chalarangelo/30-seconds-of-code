# remark [![Travis][build-badge]][build-status] [![Coverage][coverage-badge]][coverage-status] [![Downloads][dl-badge]][dl] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[**remark**][remark] is a markdown processor powered by [plugins][] part of the
[unified][] [collective][].

*   API by [`unified`][unified]
*   Parses markdown to the tree with [`remark-parse`][parse]
*   [**mdast**][mdast] syntax tree
*   [Plugins][] transform the tree
*   Compiles the tree to markdown using [`remark-stringify`][stringify]

Don’t need the parser?  Or the compiler?  [That’s OK][unified-usage].

* * *

**Announcing the unified collective!  🎉
[Read more about it on Medium »][announcement]**

## Sponsors

<!--lint ignore no-html maximum-line-length-->

<table>
  <tr valign="top">
    <td width="20%" align="center">
      <a href="https://zeit.co"><img src="https://avatars1.githubusercontent.com/u/14985020?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://zeit.co">ZEIT</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.gatsbyjs.org">Gatsby</a></td>
    <td width="20%" align="center">
      <a href="https://compositor.io"><img src="https://avatars1.githubusercontent.com/u/19245838?s=400&v=4"></a>
      <br><br>🥉
      <a href="https://compositor.io">Compositor</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=400&v=4"></a>
      <br><br>
      <a href="https://www.holloway.com">Holloway</a>
    </td>
    <td width="20%" align="center">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong>
    </td>
  </tr>
</table>

## Installation

[npm][]:

```sh
npm install remark
```

## Usage

###### Common example

This example lints markdown and turns it into HTML.

```js
var remark = require('remark')
var recommended = require('remark-preset-lint-recommended')
var html = require('remark-html')
var report = require('vfile-reporter')

remark()
  .use(recommended)
  .use(html)
  .process('## Hello world!', function(err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Yields:

```txt
1:1  warning  Missing newline character at end of file  final-newline  remark-lint

⚠ 1 warning
```

```html
<h2>Hello world!</h2>
```

###### Settings through data

This example prettifies markdown and configures [`remark-parse`][parse] and
[`remark-stringify`][stringify] through [data][].

```js
var remark = require('remark')

remark()
  .data('settings', {commonmark: true, emphasis: '*', strong: '*'})
  .process('_Emphasis_ and __importance__', function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Yields:

```markdown
*Emphasis* and **importance**
```

###### Settings through a preset

This example prettifies markdown and configures [`remark-parse`][parse] and
[`remark-stringify`][stringify] through a [preset][].

```js
var remark = require('remark')

remark()
  .use({
    settings: {commonmark: true, emphasis: '*', strong: '*'}
  })
  .process('_Emphasis_ and __importance__', function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Yields:

```markdown
*Emphasis* and **importance**
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark/master.svg

[build-status]: https://travis-ci.org/remarkjs/remark

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark

[dl-badge]: https://img.shields.io/npm/dm/remark.svg

[dl]: https://www.npmjs.com/package/remark

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark.svg

[size]: https://bundlephobia.com/result?p=remark

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[license]: https://github.com/remarkjs/remark/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[mdast]: https://github.com/syntax-tree/mdast

[parse]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse

[stringify]: https://github.com/remarkjs/remark/blob/master/packages/remark-stringify

[plugins]: https://github.com/remarkjs/remark/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage

[preset]: https://github.com/unifiedjs/unified#preset

[data]: https://github.com/unifiedjs/unified#processordatakey-value

[collective]: https://opencollective.com/unified

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc
