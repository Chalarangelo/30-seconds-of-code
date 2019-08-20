# eol
#### [Newline](http://en.wikipedia.org/wiki/Newline) character converter for JavaScript

```
npm install eol --save
```

```js
var eol = require('eol')
```

## API

### `eol.auto(text)`
- Normalize line endings in <var>text</var> for the current operating system
- <b>@return</b> string with line endings normalized to `\r\n` or `\n`

### `eol.crlf(text)`
- Normalize line endings in <var>text</var> to <b>CRLF</b> (Windows, DOS)
- <b>@return</b> string with line endings normalized to `\r\n`

### `eol.lf(text)`
- Normalize line endings in <var>text</var> to <b>LF</b> (Unix, OS X)
- <b>@return</b> string with line endings normalized to `\n`

### `eol.cr(text)`
- Normalize line endings in <var>text</var> to <b>CR</b> (Mac OS)
- <b>@return</b> string with line endings normalized to `\r`

### `eol.before(text)`
- Add linebreak before <var>text</var>
- <b>@return</b> string with linebreak added before text

### `eol.after(text)`
- Add linebreak after <var>text</var>
- <b>@return</b> string with linebreak added after text

### `eol.split(text)`
- Split <var>text</var> by newline
- <b>@return</b> array of lines

## License
MIT
