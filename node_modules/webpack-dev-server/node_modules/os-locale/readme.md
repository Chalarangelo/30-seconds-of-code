# os-locale [![Build Status](https://travis-ci.org/sindresorhus/os-locale.svg?branch=master)](https://travis-ci.org/sindresorhus/os-locale)

> Get the system [locale](https://en.wikipedia.org/wiki/Locale_(computer_software))

Useful for localizing your module or app.

POSIX systems: The returned locale refers to the [`LC_MESSAGE`](http://www.gnu.org/software/libc/manual/html_node/Locale-Categories.html#Locale-Categories) category, suitable for selecting the language used in the user interface for message translation.

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-os-locale?utm_source=npm-os-locale&utm_medium=referral&utm_campaign=readme">Get professional support for 'os-locale' with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

---

## Install

```
$ npm install os-locale
```


## Usage

```js
const osLocale = require('os-locale');

(async () => {
	console.log(await osLocale());
	//=> 'en_US'
})();
```


## API

### osLocale([options])

Returns a `Promise` for the locale.

### osLocale.sync([options])

Returns the locale.

#### options

Type: `Object`

##### spawn

Type: `boolean`<br>
Default: `true`

Set to `false` to avoid spawning subprocesses and instead only resolve the locale from environment variables.


## Security

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
