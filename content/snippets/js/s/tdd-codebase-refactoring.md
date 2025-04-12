---
title: Using Test-Driven Development to refactor a JavaScript project
shortTitle: Refactoring a codebase
language: javascript
tags: [webdev,regexp,function]
cover: succulent-11
excerpt: In the last installment of the series, we'll refactor our codebase to reduce bundle size and complexity, while making it more maintainable.
listed: true
dateModified: 2025-03-28
journeyId: js/tdd-library-design
---

In the past three articles, I've covered [kickstarting a project with TDD](/js/s/test-driven-development-intro), [designing a user-centric API](/js/s/user-centric-api-design), and [implementing the library with Vite](/js/s/tdd-library-implementation-with-vite-vitest). In this article, I'll **refactor** the library to make it more maintainable and reduce its bundle size, down from 6.04 kB (1.63 kB gzipped). Let's dive right in!

## Refactoring goals

The main goals of this refactoring are threefold: reduce **complexity**, make the code **less error-prone**, and make the code **more maintainable**. As a health metric, we'll be aiming to keep **readability** at about the same level. We'll also be leaning quite heavily on the test suite to ensure that we don't break anything.

As I was originally looking to reduce the bundle size, I went with an approach akin to <dnf title="Code golf is a type of recreational computer programming competition in which participants strive to achieve the shortest possible source code that solves a certain problem.">code golf</dnf>, but not quite. I first took a long hard look at what may be redundant or could be simplified, and then I tried to simplify and shorten pieces of logic that seemed like they were doing too much.

_Why code golf?_ Because it's a really fun thing to do. It's been quite a long time since I last did it, and I felt like making something this small even tinier was a fun place to dust off those skills.

## Refactoring process

Like I said, I started by taking a long hard look at the code. Where could one spot complexity that wasn't really necessary? What patterns could be extracted into abstractions?

> [!NOTE]
>
> Some details of the refactoring process have been omitted for brevity. If you're interested in the full process, you can check out the [GitHub repository](https://github.com/Chalarangelo/readex).

### Unnecessary options objects

Some of my intermediate abstractions were using **options objects**. Upon closer inspection, those weren't really necessary. Let's look at the example of groups:

```js title="src/group.js"
import { Segment, toSegments, joinSegments } from './segment.js';

const toGroup = (expressions, { capture, name } = {}) => {
  const expression = joinSegments(toSegments(...expressions)).source;

  if (name) return new Segment(`(?<${name}>${expression})`);
  if (capture) return new Segment(`(${expression})`);
  return new Segment(`(?:${expression})`);
};

export const captureGroup = (...expressions) =>
  toGroup(expressions, { capture: true });

export const nonCaptureGroup = (...expressions) =>
  toGroup(expressions, { capture: false });

export const namedGroup = ({ name }, ...expressions) =>
  toGroup(expressions, { name });
```

The `captrue` and `name` options are only ever used in the `toGroup` function to produce the group prefix. And, in all three use cases, we can **calculate the resulting value ahead of time** before calling `toGroup`. Let's refactor it to remove the options object:

```js title="src/group.js"
import { Segment, toSegments, joinSegments } from './segment.js';

const toGroup = (expressions, prefix) => {
  const expression = joinSegments(toSegments(...expressions)).source;
  return new Segment(`${prefix}${expression})`);
};

export const captureGroup = (...expressions) =>
  toGroup(expressions, '(');

export const nonCaptureGroup = (...expressions) =>
  toGroup(expressions, '(?:');

export const namedGroup = ({ name }, ...expressions) =>
  toGroup(expressions, `(?<${name}>`);
```

The same logic can be applied for quantifiers and lookarounds, making all three of the intermediate creation functions pretty simple and similar.

```js title="src/quantifiers.js"
import { Segment } from './segment.js';
import { nonCaptureGroup } from './group.js';

const toQuantifier = (expressions, suffix) =>
  new Segment(`${nonCaptureGroup(...expressions).source}${suffix}`);

export const zeroOrOne = (...expressions) =>
  toQuantifier(expressions, '?');
export const zeroOrOneLazy = (...expressions) =>
  toQuantifier(expressions, '??');

export const oneOrMore = (...expressions) =>
  toQuantifier(expressions, '+');
export const oneOrMoreLazy = (...expressions) =>
  toQuantifier(expressions, '+?');

export const zeroOrMore = (...expressions) =>
  toQuantifier(expressions, '*');
export const zeroOrMoreLazy = (...expressions) =>
  toQuantifier(expressions, '*?');
```

```js title="src/lookArounds.js"
import { Segment } from './segment.js';
import { nonCaptureGroup } from './group.js';

const toLookAround = (expressions, prefix) =>
  new Segment(`(?${prefix}${nonCaptureGroup(...expressions).source})`);

export const lookahead = (...expressions) =>
  toLookAround(expressions, '=');
export const negativeLookahead = (...expressions) =>
  toLookAround(expressions, '!');

export const lookbehind = (...expressions) =>
  toLookAround(expressions, '<=');
export const negativeLookbehind = (...expressions) =>
  toLookAround(expressions, '<!');
```

Notice how we've replaced the use of `concat` with `nonCaptureGroup` in lookarounds. As the former is basically an alias of the latter, we can make these two functions **look more similar**, which will come in handy later.

Notice also how how we're spreading the raw expressions in both lookarounds and quantifiers. Upon closer inspection of the `toGroup` method, it's clear that the conversion to `Segment`s and the joining is done there, so **no reason to redo it** elsewhere. This will also facilitate the next step.

### Merging functions

At this point, `joinSegments` is only ever called in tandem with `toSegments`. It stands to reason that these two functions, simple as they are, could be **merged into a single function**. Let's do that:

```js title="src/segment.js"
export const joinSegments = (expressions, separator = '') =>
  new RegExp(
    expressions
      .map(toSegment)
      .map(s => s.source)
      .join(separator)
  );
```

On second look, it's now clear that the code could be optimized here, as we're **looping twice** over our expressions. We can merge the two `Array.prototype.map` calls into one:

```js title="src/segment.js"
export const joinSegments = (expressions, separator = '') =>
  new RegExp(
    expressions
      .map(e => toSegment(e).source)
      .join(separator)
  );
```

Then, we can update our code to match this new signature:

```js title="src/group.js"
import { Segment, joinSegments } from './segment.js';

const toGroup = (expressions, prefix) =>
  new Segment(`${prefix}${joinSegments(expressions).source})`);
```

### Curried functions

All three of the creation utilities we've focused on expect an array of expressions and _something_. The functions that call them expect any number of expressions and then add either a prefix or suffix before calling them.

By refactoring the function signatures of the creation utilities, we could make this a lot more concise. We can use [**currying**](/js/s/currying) to make this happen. Remember, we can only change the signature of creation utilities, such as `toGroup`, to keep the API as-is.

```js title="src/group.js"
import { Segment, joinSegments } from './segment.js';

const toGroup = prefix => (...expressions) =>
  new Segment(`${prefix}${joinSegments(expressions).source})`);

export const captureGroup = toGroup('(');
export const nonCaptureGroup = toGroup('(?:');
export const namedGroup = name => toGroup(`(?<${name}>`);
```

```js title="src/quantifiers.js"
import { Segment } from './segment.js';
import { nonCaptureGroup } from './group.js';

const toQuantifier = suffix => (...expressions) =>
  new Segment(`${nonCaptureGroup(...expressions).source}${suffix}`);

export const zeroOrOne = toQuantifier('?');
export const zeroOrOneLazy = toQuantifier('??');
export const oneOrMore = toQuantifier('+');
export const oneOrMoreLazy = toQuantifier('+?');
export const zeroOrMore = toQuantifier('*');
export const zeroOrMoreLazy = toQuantifier('*?');
```

```js title="src/lookArounds.js"
import { Segment } from './segment.js';
import { nonCaptureGroup } from './group.js';

const toLookAround = prefix => (...expressions) =>
  new Segment(`(?${prefix}${nonCaptureGroup(...expressions).source})`);

export const lookahead = toLookAround('=');
export const negativeLookahead = toLookAround('!');
export const lookbehind = toLookAround('<=');
export const negativeLookbehind = toLookAround('<!');
```

### Extracting common patterns

There's another **commonality** between the creation utilities: they all join a bunch of expressions together, then wrap them in a prefix and/or suffix. We can extract this pattern into a [**higher-order function**](/js/s/higher-order-functions):

```js title="src/segment.js"
export const wrapSegments =
  (prefix = '', suffix = '', separator = '') =>
  (...expressions) =>
    new RegExp(
      `${prefix}${
        joinSegments(expressions, separator).source
      }${suffix}`
    );
```

Then, we can use this function to simplify the creation utilities:

```js title="src/group.js"
import { wrapSegments } from './segment.js';

const toGroup = prefix =>
  wrapSegments(`(${prefix}`, ')');
```

```js title="src/quantifiers.js"
import { wrapSegments } from './segment.js';

const toQuantifier = suffix =>
  wrapSegments(`(?:`, `)${suffix}`);
```

```js title="src/lookArounds.js"
import { wrapSegments } from './segment.js';

const toLookAround = prefix =>
  wrapSegments(`(?${prefix}(?:`, `))`);
```

### Removing redundancy

At this point, the creation utilities serve little to **no purpose**. We can **inline** them into the functions that call them and save a few more lines:

```js title="src/group.js"
import { wrapSegments } from './segment.js';

export const captureGroup = wrapSegments('(', ')');
export const nonCaptureGroup = wrapSegments('(?:', ')');
export const namedGroup = name => wrapSegments(`(?<${name}>`, ')');
```

```js title="src/quantifiers.js"
import { wrapSegments } from './segment.js';

export const zeroOrOne = wrapSegments('(?:', ')?');
export const zeroOrOneLazy = wrapSegments('(?:', ')?');
export const oneOrMore = wrapSegments('(?:', ')+');
export const oneOrMoreLazy = wrapSegments('(?:', ')+?');
export const zeroOrMore = wrapSegments('(?:', ')*');
export const zeroOrMoreLazy = wrapSegments('(?:', ')*?');
```

```js title="src/lookArounds.js"
import { wrapSegments } from './segment.js';

export const lookahead = wrapSegments('(?=', ')');
export const negativeLookahead = wrapSegments('(?!', ')');
export const lookbehind = wrapSegments('(?<=', ')');
export const negativeLookbehind = wrapSegments('(?<!', ')');
```

### Taking abstractions further

Having moved a lot of the logic into the `wrapSegments` function, it seems like the **outstanding case** for a standalone `joinSegments` is the `toCharacterSet` utility. By adding a way for `wrapSegments` to map values before joining them, we can remove `joinSegments` altogether. While we're at it, let's rename it to `toSegments`, too:

```js title="src/segment.js"
export const toSegments =
  (prefix = '', suffix = '', separator = '', mapFn = x => x) =>
  (...expressions) =>
    new RegExp(
      `${prefix}${expressions
        .map(e => toSegment(mapFn(e)).source)
        .join(separator)}${suffix}`
    );
```

Then, we can refactor `toCharacterSet` to use this new utility:

```js title="src/characterSet.js"
import { toSegments } from './segment.js';

export const toCharacterSet = expression => {
  if (Array.isArray(expression) && expression.length === 2)
    return toSegments('', '', '-')(...expression);
  return toSegments()(expression);
};

export const anythingFrom = toSegments('[', ']', '|', toCharacterSet);
export const anythingBut = toSegments('[^', ']', '|', toCharacterSet);
```

Under the hood, this change also improves the **performance** of the library, as we're no longer **looping twice** over the expressions for ranges. Subtle, yet effective.

### Removing the `Segment` class

The `Segment` class seems like another **good candidate for removal**. After all, all it really gives us is a convenience wrapper over `RegExp`. By making a few changes to the only method that directly interfaces with it, `toSegment`, we can get rid of it altogether.

```js title="src/segment.js"
import { sanitize } from './sanitize.js';

export const toSegment = expression => {
  if (expression instanceof RegExp)
    return new RegExp(expression.source);
  return new RegExp(sanitize(expression));
};
```

We'll also update all of the constants we created for anchors, wildcards, and character classes to be regular `RegExp` instances (pun intended):

```js title="src/sequences.js"
export const startOfLine = /^/;
export const endOfLine = /$/;
export const wordBoundary = /\b/;
export const nonWordBoundary = /\B/;
export const digit = /\d/;
export const nonDigit = /\D/;
export const wordCharacter = /\w/;
export const nonWordCharacter = /\W/;
export const whitespaceCharacter = /\s/;
export const nonWhitespaceCharacter = /\S/;
export const anyCharacter = /./;
export const anything = /.*/;
export const something = /.+/;
```

And that's pretty much all I could think of to refactor. Let's see how we did!

## Results

It's definitely easy to see that the code is significantly shorter. I don't really think we sacrificed too much readability, either. If anything, you now need to read through and understand a handful of methods and the rest just falls into place.

### Bundle size

The original size of the bundled code before these changes was **6.04 kB** (**1.63 kB** gzipped). After running `npm run build` anew, here's what we got:

```plaintext
> readex@1.0.0 build
> vite build

vite v6.2.0 building for production...
✓ 9 modules transformed.
dist/readex.js  4.08 kB │ gzip: 1.36 kB
✓ built in 51ms
```

That's **a reduction of 32.5% in size**! Not bad for a few hours of work.

### Minified bundle

As promised, I'd like to release the **minified code** of the library. Let's update our Vite configuration to produce two builds - one raw and one minified:

```js title="vite.config.js"
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const config = {
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'readex',
        fileName: 'readex',
        formats: ['es'],
      },
      minify: false,
    },
  };

  if (mode === 'min') {
    config.build.lib.fileName = 'readex.min';
    config.build.minify = true;
  }

  return config;
});
```

And the changes to the `package.json` to match:

```json title="package.json"
{
  "name": "readex",
  "type": "module",
  "version": "1.0.0",
  "files": ["dist"],
  "module": "./dist/readex.min.js",
  "exports": {
    ".": {
      "import": "./dist/readex.min.js"
    }
  },
  "scripts": {
    "test": "vitest",
    "build:min": "vite build --mode min",
    "build:raw": "vite build --mode raw",
    "build": "npm run build:min && npm run build:raw"
  },
}
```

Running `npm run build` will now produce two bundles. Let's see what we get:

```plaintext
> readex@1.0.0 build:min
> vite build --mode min

vite v6.2.0 building for min...
✓ 10 modules transformed.
dist/readex.min.js  2.85 kB │ gzip: 1.23 kB
✓ built in 50ms

> readex@1.0.0 build:raw
> vite build --mode raw

vite v6.2.0 building for raw...
✓ 10 modules transformed.
dist/readex.js  4.08 kB │ gzip: 1.36 kB
✓ built in 41ms
```

The minified version is **2.85 kB** (**1.23 kB** gzipped), which is pretty damn tiny. I don't think I can get it any lower without removing integral parts of the logic.

## Conclusion

After a long journey, we've finally arrived at the end of this series. We've seen how TDD can help us design a user-centric API, implement it, bundle it with Vite and, finally, refactor it without worrying about breaking things.

I hope you've enjoyed the series as much as I did. You can find the source code for the entire project on [GitHub](https://github.com/Chalarangelo/readex), whereas the package itself is available on [npm](https://www.npmjs.com/package/readex).
