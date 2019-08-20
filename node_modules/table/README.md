<a name="table"></a>
# Table

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/table?style=flat-square)](https://gitspo.com/mentions/gajus/table)
[![Travis build status](http://img.shields.io/travis/gajus/table/master.svg?style=flat-square)](https://travis-ci.org/gajus/table)
[![Coveralls](https://img.shields.io/coveralls/gajus/table.svg?style=flat-square)](https://coveralls.io/github/gajus/table)
[![NPM version](http://img.shields.io/npm/v/table.svg?style=flat-square)](https://www.npmjs.org/package/table)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

* [Table](#table)
    * [Features](#table-features)
    * [Install](#table-install)
    * [Usage](#table-usage)
        * [Cell Content Alignment](#table-usage-cell-content-alignment)
        * [Column Width](#table-usage-column-width)
        * [Custom Border](#table-usage-custom-border)
        * [Draw Horizontal Line](#table-usage-draw-horizontal-line)
        * [Single Line Mode](#table-usage-single-line-mode)
        * [Padding Cell Content](#table-usage-padding-cell-content)
        * [Predefined Border Templates](#table-usage-predefined-border-templates)
        * [Streaming](#table-usage-streaming)
        * [Text Truncation](#table-usage-text-truncation)
        * [Text Wrapping](#table-usage-text-wrapping)


Produces a string that represents array data in a text table.

![Demo of table displaying a list of missions to the Moon.](./.README/demo.png)

<a name="table-features"></a>
## Features

* Works with strings containing [fullwidth](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) characters.
* Works with strings containing [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).
* Configurable border characters.
* Configurable content alignment per column.
* Configurable content padding per column.
* Configurable column width.
* Text wrapping.

<a name="table-install"></a>
## Install

```bash
npm install table

```

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/gajus)
[![Become a Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/gajus)

<a name="table-usage"></a>
## Usage

Table data is described using an array (rows) of array (cells).

```js
import {
  table
} from 'table';

// Using commonjs?
// const {table} = require('table');

let data,
    output;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

/**
 * @typedef {string} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~columns
 * @property {string} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {number} width Column width (default: auto).
 * @property {number} truncate Number of characters are which the content will be truncated (default: Infinity).
 * @property {number} paddingLeft Cell content padding width left (default: 1).
 * @property {number} paddingRight Cell content padding width right (default: 1).
 */

/**
 * @typedef {Object} table~border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * Used to dynamically tell table whether to draw a line separating rows or not.
 * The default behavior is to always return true.
 *
 * @typedef {function} drawHorizontalLine
 * @param {number} index
 * @param {number} size
 * @return {boolean}
 */

/**
 * @typedef {Object} table~config
 * @property {table~border} border
 * @property {table~columns[]} columns Column specific configuration.
 * @property {table~columns} columnDefault Default values for all columns. Column specific settings overwrite the default values.
 * @property {table~drawHorizontalLine} drawHorizontalLine
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} rows
 * @param {table~config} config
 * @return {String}
 */
output = table(data);

console.log(output);
```

```
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝

```


<a name="table-usage-cell-content-alignment"></a>
### Cell Content Alignment

`{string} config.columns[{number}].alignment` property controls content horizontal alignment within a cell.

Valid values are: "left", "right" and "center".

```js
let config,
  data,
  output;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

config = {
  columns: {
    0: {
      alignment: 'left',
      width: 10
    },
    1: {
      alignment: 'center',
      width: 10
    },
    2: {
      alignment: 'right',
      width: 10
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔════════════╤════════════╤════════════╗
║ 0A         │     0B     │         0C ║
╟────────────┼────────────┼────────────╢
║ 1A         │     1B     │         1C ║
╟────────────┼────────────┼────────────╢
║ 2A         │     2B     │         2C ║
╚════════════╧════════════╧════════════╝
```

<a name="table-usage-column-width"></a>
### Column Width

`{number} config.columns[{number}].width` property restricts column width to a fixed width.

```js
let data,
  output,
  options;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

options = {
  columns: {
    1: {
      width: 10
    }
  }
};

output = table(data, options);

console.log(output);
```

```
╔════╤════════════╤════╗
║ 0A │ 0B         │ 0C ║
╟────┼────────────┼────╢
║ 1A │ 1B         │ 1C ║
╟────┼────────────┼────╢
║ 2A │ 2B         │ 2C ║
╚════╧════════════╧════╝
```

<a name="table-usage-custom-border"></a>
### Custom Border

`{object} config.border` property describes characters used to draw the table border.

```js
let config,
  data,
  output;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

output = table(data, config);

console.log(output);
```

```
┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘
```

<a name="table-usage-draw-horizontal-line"></a>
### Draw Horizontal Line

`{function} config.drawHorizontalLine` property is a function that is called for every non-content row in the table. The result of the function `{boolean}` determines whether a row is drawn.

```js
let data,
  output,
  options;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C'],
  ['3A', '3B', '3C'],
  ['4A', '4B', '4C']
];

options = {
  /**
    * @typedef {function} drawHorizontalLine
    * @param {number} index
    * @param {number} size
    * @return {boolean}
    */
  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size - 1 || index === size;
  }
};

output = table(data, options);

console.log(output);

```

```
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
║ 2A │ 2B │ 2C ║
║ 3A │ 3B │ 3C ║
╟────┼────┼────╢
║ 4A │ 4B │ 4C ║
╚════╧════╧════╝

```

<a name="table-usage-single-line-mode"></a>
### Single Line Mode

Horizontal lines inside the table are not drawn.

```js
import {
  table,
  getBorderCharacters
} from 'table';

const data = [
  ['-rw-r--r--', '1', 'pandorym', 'staff', '1529', 'May 23 11:25', 'LICENSE'],
  ['-rw-r--r--', '1', 'pandorym', 'staff', '16327', 'May 23 11:58', 'README.md'],
  ['drwxr-xr-x', '76', 'pandorym', 'staff', '2432', 'May 23 12:02', 'dist'],
  ['drwxr-xr-x', '634', 'pandorym', 'staff', '20288', 'May 23 11:54', 'node_modules'],
  ['-rw-r--r--', '1,', 'pandorym', 'staff', '525688', 'May 23 11:52', 'package-lock.json'],
  ['-rw-r--r--@', '1', 'pandorym', 'staff', '2440', 'May 23 11:25', 'package.json'],
  ['drwxr-xr-x', '27', 'pandorym', 'staff', '864', 'May 23 11:25', 'src'],
  ['drwxr-xr-x', '20', 'pandorym', 'staff', '640', 'May 23 11:25', 'test'],
];

const config = {
  singleLine: true
};

const output = table(data, config);
console.log(output);
```

```
╔═════════════╤═════╤══════════╤═══════╤════════╤══════════════╤═══════════════════╗
║ -rw-r--r--  │ 1   │ pandorym │ staff │ 1529   │ May 23 11:25 │ LICENSE           ║
║ -rw-r--r--  │ 1   │ pandorym │ staff │ 16327  │ May 23 11:58 │ README.md         ║
║ drwxr-xr-x  │ 76  │ pandorym │ staff │ 2432   │ May 23 12:02 │ dist              ║
║ drwxr-xr-x  │ 634 │ pandorym │ staff │ 20288  │ May 23 11:54 │ node_modules      ║
║ -rw-r--r--  │ 1,  │ pandorym │ staff │ 525688 │ May 23 11:52 │ package-lock.json ║
║ -rw-r--r--@ │ 1   │ pandorym │ staff │ 2440   │ May 23 11:25 │ package.json      ║
║ drwxr-xr-x  │ 27  │ pandorym │ staff │ 864    │ May 23 11:25 │ src               ║
║ drwxr-xr-x  │ 20  │ pandorym │ staff │ 640    │ May 23 11:25 │ test              ║
╚═════════════╧═════╧══════════╧═══════╧════════╧══════════════╧═══════════════════╝
```

<a name="table-usage-padding-cell-content"></a>
### Padding Cell Content

`{number} config.columns[{number}].paddingLeft` and `{number} config.columns[{number}].paddingRight` properties control content padding within a cell. Property value represents a number of whitespaces used to pad the content.

```js
let config,
  data,
  output;

data = [
  ['0A', 'AABBCC', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

config = {
  columns: {
    0: {
      paddingLeft: 3
    },
    1: {
      width: 2,
      paddingRight: 3
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔══════╤══════╤════╗
║   0A │ AA   │ 0C ║
║      │ BB   │    ║
║      │ CC   │    ║
╟──────┼──────┼────╢
║   1A │ 1B   │ 1C ║
╟──────┼──────┼────╢
║   2A │ 2B   │ 2C ║
╚══════╧══════╧════╝
```

<a name="table-usage-predefined-border-templates"></a>
### Predefined Border Templates

You can load one of the predefined border templates using `getBorderCharacters` function.

```js
import {
  table,
  getBorderCharacters
} from 'table';

let config,
  data;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

config = {
  border: getBorderCharacters(`name of the template`)
};

table(data, config);
```

```
# honeywell

╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝

# norc

┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘

# ramac (ASCII; for use in terminals that do not support Unicode characters)

+----+----+----+
| 0A | 0B | 0C |
|----|----|----|
| 1A | 1B | 1C |
|----|----|----|
| 2A | 2B | 2C |
+----+----+----+

# void (no borders; see "bordless table" section of the documentation)

 0A  0B  0C

 1A  1B  1C

 2A  2B  2C

```

Raise [an issue](https://github.com/gajus/table/issues) if you'd like to contribute a new border template.

<a name="table-usage-predefined-border-templates-borderless-table"></a>
#### Borderless Table

Simply using "void" border character template creates a table with a lot of unnecessary spacing.

To create a more plesant to the eye table, reset the padding and remove the joining rows, e.g.

```js
let output;

output = table(data, {
    border: getBorderCharacters(`void`),
    columnDefault: {
        paddingLeft: 0,
        paddingRight: 1
    },
    drawHorizontalLine: () => {
        return false
    }
});

console.log(output);
```

```
0A 0B 0C
1A 1B 1C
2A 2B 2C
```

<a name="table-usage-streaming"></a>
### Streaming

`table` package exports `createStream` function used to draw a table and append rows.

`createStream` requires `{number} columnDefault.width` and `{number} columnCount` configuration properties.

```js
import {
  createStream
} from 'table';

let config,
  stream;

config = {
  columnDefault: {
    width: 50
  },
  columnCount: 1
};

stream = createStream(config);

setInterval(() => {
  stream.write([new Date()]);
}, 500);
```

![Streaming current date.](./.README/streaming.gif)

`table` package uses ANSI escape codes to overwrite the output of the last line when a new row is printed.

The underlying implementation is explained in this [Stack Overflow answer](http://stackoverflow.com/a/32938658/368691).

Streaming supports all of the configuration properties and functionality of a static table (such as auto text wrapping, alignment and padding), e.g.

```js
import {
  createStream
} from 'table';

import _ from 'lodash';

let config,
  stream,
  i;

config = {
  columnDefault: {
    width: 50
  },
  columnCount: 3,
  columns: {
    0: {
      width: 10,
      alignment: 'right'
    },
    1: {
      alignment: 'center',
    },
    2: {
      width: 10
    }
  }
};

stream = createStream(config);

i = 0;

setInterval(() => {
  let random;

  random = _.sample('abcdefghijklmnopqrstuvwxyz', _.random(1, 30)).join('');

  stream.write([i++, new Date(), random]);
}, 500);
```

![Streaming random data.](./.README/streaming-random.gif)

<a name="table-usage-text-truncation"></a>
### Text Truncation

To handle a content that overflows the container width, `table` package implements [text wrapping](#table-usage-text-wrapping). However, sometimes you may want to truncate content that is too long to be displayed in the table.

`{number} config.columns[{number}].truncate` property (default: `Infinity`) truncates the text at the specified length.

```js
let config,
  data,
  output;

data = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

config = {
  columns: {
    0: {
      width: 20,
      truncate: 100
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris conva...  ║
╚══════════════════════╝
```

<a name="table-usage-text-wrapping"></a>
### Text Wrapping

`table` package implements auto text wrapping, i.e. text that has width greater than the container width will be separated into multiple lines, e.g.

```js
let config,
  data,
  output;

data = [
    ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

config = {
  columns: {
    0: {
      width: 20
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris convallis ║
║ dapibus. Nunc venena ║
║ tis tempus nulla sit ║
║ amet viverra.        ║
╚══════════════════════╝
```

When `wrapWord` is `true` the text is broken at the nearest space or one of the special characters ("-", "_", "\", "/", ".", ",", ";"), e.g.

```js
let config,
  data,
  output;

data = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

config = {
  columns: {
    0: {
      width: 20,
      wrapWord: true
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔══════════════════════╗
║ Lorem ipsum dolor    ║
║ sit amet,            ║
║ consectetur          ║
║ adipiscing elit.     ║
║ Phasellus pulvinar   ║
║ nibh sed mauris      ║
║ convallis dapibus.   ║
║ Nunc venenatis       ║
║ tempus nulla sit     ║
║ amet viverra.        ║
╚══════════════════════╝

```

