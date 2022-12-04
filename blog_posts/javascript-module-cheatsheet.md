---
title: JavaScript modules Cheat Sheet
type: cheatsheet
tags: javascript,cheatsheet
author: chalarangelo
cover: blog_images/mountain-lake-2.jpg
excerpt: Learn everything you need to know about JavaScript modules with this handy cheatsheet.
firstSeen: 2020-08-04T19:41:35+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Named exports

```js
/* environment.js */
export const key = 'this-is-a-secret';

/* index.js */
import { key } from 'environment';
```

- Named exports use a name.
- A module can have any number of named exports.
- Import and export name should be the same.
- Importing requires `{}`.

### Default exports

```js
/* environment.js */
const environment = {
  key: 'this-is-a-secret',
  port: 8000
};

export default environment;
/* index.js */
import environment from 'environment';

const { key, port } = environment;
```

- Default exports expose a default value, use the `default` keyword.
- A module can only have one default export.
- Import name can be anything.
- Importing does not require `{}`.

### Default + named

```js
/* environment.js */
export const envType = 'DEV';

const environment = {
  key: 'this-is-a-secret',
  port: 8000
};

export default environment;

/* index.js */
import { envType }, environment from 'environment';

const { key, port } = environment;
```

- Default and named exports can be mixed.
- Rules about number of exports and naming conventions apply as before.
- Import rules apply as before, can be mixed if necessary.

### Export list

```js
/* environment.js */
const key = 'this-is-a-secret';
const port = 8000;

export {
  key,
  port
};

/* index.js */
import { key, port } from 'environment';
```

- An export list is a compact way to write multiple named exports.
- Rules about number of exports, naming conventions and import rules are the same as those of named exports.
- Export lists are not objects.

### Rename export

```js
/* environment.js */
const key = 'this-is-a-secret';

export { key as authKey };

/* index.js */
import { authKey } from 'environment';
```

- Named exports can make use of the `as` keyword to rename an export.
- Import name should be the same as the renamed export.

### Rename import

```js
/* environment.js */
export const key = 'this-is-a-secret';

/* index.js */
import { key as authKey } from 'environment';
```

- Named imports can make use of the `as` keyword to rename an import.
- Import name (before the `as` keyword) should be the same as the export.

### Import all

```js
/* environment.js */
export const envType = 'DEV';

const environment = {
  key: 'this-is-a-secret',
  port: 8000
};

export default environment;

/* index.js */
import * as env from 'environment';

const { default: { key, port}, envType } = environment;
```

- Use `*` to import everything a module exports.
- Named exports will be available by their names on the imported object.
- Default export will be available as the `default` key on the imported object.
