# restore-cursor

> Gracefully restore the CLI cursor on exit

Prevent the cursor you've hidden interactively from remaining hidden if the process crashes.


## Install

```
$ npm install --save restore-cursor
```


## Usage

```js
const restoreCursor = require('restore-cursor');
restoreCursor();
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
