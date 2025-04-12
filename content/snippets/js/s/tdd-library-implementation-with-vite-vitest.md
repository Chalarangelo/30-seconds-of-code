---
title: Implementing a library for readable regular expressions in JavaScript
shortTitle: Implementing a RegEx library
language: javascript
tags: [webdev,regexp,testing]
cover: succulent-7
excerpt: Having set up our environment and designed the API, it's time to implement the RegExp library we've been planning, using Vite and Vitest.
listed: true
dateModified: 2025-03-24
journeyId: js/tdd-library-design
---

In the last two articles, I've touched upon [using TDD to kickstart a small project](/js/s/test-driven-development-intro) and [designing a user-centric API](/js/s/user-centric-api-design). Now, it's time to implement the API we've designed!

## API design recap

Let's quickly recap the decisions we've made in terms of the project and the API so far. The project itself is a **simplified, readable and reusable API** on top of the regular expression <dfn title="A domain-specific language (DSL) is a computer language specialized to a particular application domain. This is in contrast to a general-purpose language (GPL), which is broadly applicable across domains.">DSL</dfn>, developed using the <dfn title="Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed.">TDD</dfn> approach.

The API is designed with users somewhat familiar with RegEx in mind, moving towards a more **natural language** approach. The interface will use simple naming, <dfn title="A variadic function is a function of indefinite arity, i.e., one which accepts a variable number of arguments.">**variadic functions**</dfn> and **named arguments** for special cases, such as named groups, lookaheads or quantifier counts. Finally, we'll export a function that will accept an **array of patterns** and a **flags object**, and return a regular expression object.

## API implementation

For the API implementation, I'll once again focus on the **decision-making** part of the process. The implementation is either trivial or too complex, depending on your skill level and experience. I'll try to explain the reasoning behind the decisions I make, rather than the code itself, which can be browsed through on the [GitHub repository](https://github.com/Chalarangelo/readex).

> [!NOTE]
>
> Some of the code in this article is **simplified** (e.g. no error handling) for brevity. Filling in the gaps isn't particularly hard, if you're trying to recreate the project yourself.

### Regular expression patterns

My initial approach hinged on creating a pattern class that could be used to build regular expressions. This approach assumed that any pattern should be possible to test on its own (thus making TDD more feasible). Therefore, I started with a `Segment` class (maybe the name wasn't perfect) that would represent **a single pattern segment**.

```js title="src/segment.js"
export class Segment {
  constructor(expression) {
    if (expression instanceof Segment) this.value = expression.value;
    if (expression instanceof RegExp) this.value = expression.source;
    if (typeof expression === 'string') this.value = expression;
  }
}
```

This class had a simple job: processing any valid value (`Segment`, `RegExp` or `string`) into a `Segment` object with a `value` property. This would allow me to build a regular expression by combining multiple `Segment` objects.

#### Using native structures

After a little fiddling around, I came to realize that my `Segment` class should, in fact, subclass `RegExp` itself. This meant that its `value` was roughly equivalent to `RegExp.prototype.source`. This change made the class simpler and more intuitive.

```js title="src/segment.js"
export class Segment extends RegExp {
  constructor(expression) {
    super(expression instanceof RegExp ? expression.source : expression);
  }
}
```

This would now allow me to tackle the problem of **testing individual patterns**, as every `Segment` could take the place of a regular expression. Therefore, the tests I had in place at the time would pass with flying colors:

```js title="spec/segment.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { Segment } from '../src/segment.js';

describe('Segment', () => {
  it('should work with a regular expression', () => {
    expect(new Segment(/abc/)).toMatch('abc');
  });

  it('should work with a string', () => {
    expect(new Segment('abc')).toMatch('abc');
  });

  it('should work with another segment', () => {
    expect(new Segment(new Segment('abc'))).toMatch('abc');
  });
});
```

#### Sanitization & conversion

One core thing I had to deal with early on was **string sanitization**. Luckily, it's a simple matter of finding and replacing special characters. However, I'd also need to create segments without some escapes (e.g. `+` or `*` when building quantifiers later on).

```js title="spec/segment.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { Segment, toSegment } from '../src/segment.js';

describe('Segment', () => {
  // ...
  it('should not escape special characters', () => {
    expect(new Segment('[a-z]+')).toMatch('d');
  });
});

describe('toSegment', () => {
  it('should work with a regular expression', () => {
    expect(toSegment(/[a-z]+/)).toMatch('d');
  });

  it('should work with a string', () => {
    expect(toSegment('abc')).toMatch('abc');
  });

  it('should work with another segment', () => {
    expect(toSegment(new Segment('abc'))).toMatch('abc');
  });

  it('should escape special characters in strings', () => {
    expect(toSegment('[a-z]+')).toMatch('[a-z]+');
  });
});
```

After settling on the use cases and writing my tests, I decided to separate the sanitization and **conversion** into `Segment`s into their own functions.

```js title="src/sanitize.js"
export const sanitize = val => {
  if (typeof val !== 'string' && typeof val !== 'number')
    throw new TypeError('Value must be a string or a number');
  return `${val}`.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
};
```

> [!TIP]
>
> I've covered [escaping special characters in regulars expressions](/js/s/escape-reg-exp/) in the past.

```js title="src/segment.js"
import { sanitize } from './sanitize.js';

//...

export const toSegment = expression => {
  if (expression instanceof Segment) return expression;
  if (expression instanceof RegExp) return new Segment(expression);
  return new Segment(sanitize(expression));
};
```

#### Reusable utilities

After building a `toSegment` function, I realized I needed a way to **join segments**, too. I also seemed to need a way to map an array of patterns to segments.

```js title="spec/segment.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { toSegments, joinSegments } from '../src/segment.js';

describe('joinSegments', () => {
  it.each([
    [
      'a string, a RegExp, and a number',
      ['a', /b/, 123],
      ['a', 'b', '123']
    ],
    [
      'regular expressions with special patterns',
      [/[a-z]/, /[0-9]/],
      ['[a-z]', '[0-9]']
    ],
    [
      'strings with special patterns',
      ['[a-z]', '[0-9]'],
      [String.raw`[a-z]`, String.raw`[0-9]`]
    ],
  ])('when called with %s', (_, expressions, expected) => {
    it.each(['', '-', '|'])('and a "%s" separator', separator => {
      expect(
        joinSegments(toSegments(...expressions), separator).source
      ).toEqual(expected.join(separator));
    });
  });
});
```

> [!TIP]
>
> Notice the use of `String.raw()` in the last test case. This is a handy way to avoid escaping special characters in strings.

Having written some test cases that I could use to verify my implementation, I built the `toSegments` and `joinSegments` functions.

```js title="src/segment.js"
export const toSegments = (...expressions) => expressions.map(toSegment);

export const joinSegments = (segments, separator = '') =>
  new Segment(segments.join(separator));
```

I spent a good amount of time trying to figure out why my tests wouldn't pass no matter what I did. Then, it hit me: `RegExp.prototype.toString()` didn't behave the way I wanted! Naturally, I had to override it.

```js title="src/segment.js"
export class Segment extends RegExp {
  //...
  toString() {
    return this.source;
  }
}
```

This simple, albeit a little inelegant solution, fixed my tests and allowed me to move on to the next part of the implementation. With a `joinSegments` function in place, I could start building **reusable building blocks for patterns**.

## Reusable abstractions

As mentioned in the previous article, I want to provide the basic building blocks for people to create their own patterns. This means I need to provide a way to create groups, lookaheads, quantifiers, and more. Let's give each one of these a try.

### Anchors, wildcards & character classes

The simplest building blocks are anchors, wildcards, and character classes. They're all just a matter of creating the right `Segment` objects.

```js title="src/anchors.js"
import { Segment } from './segment.js';

export const startOfLine = new Segment('^');
export const endOfLine = new Segment('$');
export const wordBoundary = new Segment(String.raw`\b`);
export const nonWordBoundary = new Segment(String.raw`\B`);
```

```js title="src/wildcards.js"
import { Segment } from './segment.js';

export const anyCharacter = new Segment('.');
export const anything = new Segment('.*');
export const something = new Segment('.+');
```

```js title="src/characterClasses.js"
import { Segment } from './segment.js';

export const digit = new Segment(String.raw`\d`);
export const nonDigit = new Segment(String.raw`\D`);
export const wordCharacter = new Segment(String.raw`\w`);
export const nonWordCharacter = new Segment(String.raw`\W`);
export const whitespaceCharacter = new Segment(String.raw`\s`);
export const nonWhitespaceCharacter = new Segment(String.raw`\S`);
```

> [!NOTE]
>
> The tests for these constants are pretty much trivial, so they're omitted here.

### Backreferences

Let's also get backreferences out of the way, as they're another trivial piece of code to write, even if using them feels like a more advanced technique.

```js title="spec/backReference.test.js"
import { describe, it, expect } from 'vitest';

// Temporary test setup, until `readEx` is implemented
const toRegExp = expressions => joinSegments(toSegments(...expressions));

import { backReference } from '../src/backReference.js';

describe('backReference', () => {
  it('should work with an index reference', () => {
    const regexp = toRegExp([/^/, /(a)/, backReference(1), /$/]);
    const [fullMatch, match] = regexp.exec('aa');
    expect(fullMatch).toBe('aa');
    expect(match).toBe('a');
  });

  it('should work with a named reference', () => {
    const regexp = toRegExp([
      /^/, /(?<myName>a)/, backReference('myName'), /$/,
    ]);
    const [fullMatch, match] = regexp.exec('aa');
    expect(fullMatch).toBe('aa');
    expect(match).toBe('a');
  });
});
```

```js title="src/backReference.js"
import { Segment } from './segment.js';

export const backReference = reference =>
  new Segment(
    typeof reference === 'number' ?
    `\\${reference}` :
    `\\k<${reference}>`
  );
```

### Groups

Groups are the next logical step, as they'll allow us to write more complex patterns (hint: we need the non-capturing group in several places).

```js title="spec/groups.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

// Temporary test setup, until `readEx` is implemented
const toRegExp = expressions => joinSegments(toSegments(...expressions));

import {
  captureGroup, nonCaptureGroup, namedGroup, concat, or,
} from '../src/group.js';

describe('captureGroup', () => {
  it('should create a capturing group', () => {
    const regexp = toRegExp([/^/, 'a', captureGroup('bc'), /$/]);
    const [fullMatch, match] = regexp.exec('abc');
    expect(fullMatch).toBe('abc');
    expect(match).toBe('bc');
  });
});

describe('nonCaptureGroup', () => {
  it('should create a non-capturing group', () => {
    const regexp = toRegExp([/^/, nonCaptureGroup('a', /b/, 'c'), /$/]);
    const [fullMatch, match] = regexp.exec('abc');
    expect(fullMatch).toBe('abc');
    expect(match).not.toBe('abc');
  });
});

describe('namedGroup', () => {
  it('should create a named capturing group', () => {
    const regexp = toRegExp([
      /^/, 'a', namedGroup({ name: 'myName' }, 'bc'), /$/,
    ]);
    const matches = regexp.exec('abc');
    expect(matches[0]).toBe('abc');
    expect(matches.groups.myName).toBe('bc');
  });
});

describe('concat', () => {
  it('should combine expressions' => {
    const expressions = ['a', /b/, 'c'];
    const regexp = toRegExp([/^/, concat(...expressions), /$/]);
    expect(regexp).toMatchString('abc');
    expect(regexp).not.toMatchString('a');
    expect(regexp).not.toMatchString('ab');
  });
});

describe('or', () => {
  it('should match either of the patterns', () => {
    const regexp = toRegExp([/^/, or('a', 'b'), /$/]);
    expect(regexp).toMatchString('a');
    expect(regexp).toMatchString('b');
  });
});
```

Apart from passing all tests, I wanted to make sure there's a **shared group creation utility**, which I'll call `toGroup`. This made sure that I didn't repeat myself too much.

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

export const concat = (...expressions) => nonCaptureGroup(...expressions);

export const or = (...expressions) =>
  nonCaptureGroup(joinSegments(toSegments(...expressions), '|'));
```

### Lookarounds

@[Quick refresher](/js/s/6-regexp-tricks#lookaheads)

Lookaheads and lookbehinds followed a very similar pattern. I wrote some tests, implemented a reusable creation utility, and created the necessary building blocks. The only point of note here is the use of the `concat` utility from the group implementation.

```js title="src/lookAround.js"
import { Segment, toSegments } from './segment.js';
import { concat } from './group.js';

const toLookAround = (expressions, { lookbehind, negative } = {}) => {
  const expression = concat(...toSegments(...expressions)).source;
  const prefix = `?${lookbehind ? '<' : ''}${negative ? '!' : '='}`;
  return new Segment(`(${prefix}${expression})`);
};

export const lookahead = (...expressions) =>
  toLookAround(expressions, { lookbehind: false, negative: false });

export const negativeLookahead = (...expressions) =>
  toLookAround(expressions, { lookbehind: false, negative: true });

export const lookbehind = (...expressions) =>
  toLookAround(expressions, { lookbehind: true, negative: false });

export const negativeLookbehind = (...expressions) =>
  toLookAround(expressions, { lookbehind: true, negative: true });
```

> [!NOTE]
>
> Tests are omitted here, for brevity, as they're not too different from the ones for groups.

### Quantifiers

The meat of the implementation seemed to be quantifiers. After all, they're the most common building blocks. Tests were a blessing here, especially the ones for `repeat`, with its trickier API. I'll focus on just those, as the others are pretty straightforward.

```js title="spec/quantifiers.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

// Temporary test setup, until `readEx` is implemented
const toRegExp = expressions => joinSegments(toSegments(...expressions));

import { repeat } from '../src/quantifiers.js';

describe('repeat', () => {
  describe('should match the pattern the specified number of times', () => {
    it('with an exact number of times', () => {
      const regexp = toRegExp([/^/, repeat({ times: 3 }, 'a'), /$/]);
      expect(regexp).toMatchString('aaa');
    });

    it('when only a min is given', () => {
      const regexp = toRegExp([/^/, repeat({ times: [2] }, 'a'), /$/]);
      expect(regexp).toMatchString('aa');
      expect(regexp).toMatchString('aaa');
    });

    it('when only a max is given', () => {
      const regexp = toRegExp([/^/, repeat({ times: [, 2] }, 'a'), /$/]);
      expect(regexp).toMatchString('a');
      expect(regexp).toMatchString('aa');
    });

    it('when given both a min and a max', () => {
      const regexp = toRegExp([/^/, repeat({ times: [2, 3] }, 'a'), /$/]);
      expect(regexp).toMatchString('aa');
      expect(regexp).toMatchString('aaa');
    });
  });
});
```

Notice also that I decided to make **lazy variants** of each quantifier their own functions, as to minimize friction for the end user. Instead of having to specify options for, say `zeroOrOne`, one can just use `zeroOrOneLazy`.

```js title="src/quantifiers.js"
import { Segment, toSegments } from './segment.js';
import { nonCaptureGroup } from './group.js';

const toQuantifier = (expressions, { suffix, lazy } = {}) => {
  const expression = nonCaptureGroup(...toSegments(...expressions)).source;
  return new Segment(`${expression}${suffix}${lazy ? '?' : ''}`);
};

const toRepeat = (expressions, options) => {
  const { times, lazy } = options;
  const [min = null, max = null] = Array.isArray(times)
    ? times
    : [times, times];

  const [start, end] = [min ?? 0, max ?? ''];
  const suffix = start === end ? `{${start}}` : `{${start},${end}}`;

  return toQuantifier(expressions, { suffix, lazy });
};

export const zeroOrOne = (...expressions) =>
  toQuantifier(expressions, { suffix: '?' });

export const zeroOrOneLazy = (...expressions) =>
  toQuantifier(expressions, { suffix: '?', lazy: true });

export const oneOrMore = (...expressions) =>
  toQuantifier(expressions, { suffix: '+' });

export const oneOrMoreLazy = (...expressions) =>
  toQuantifier(expressions, { suffix: '+', lazy: true });

export const zeroOrMore = (...expressions) =>
  toQuantifier(expressions, { suffix: '*' });

export const zeroOrMoreLazy = (...expressions) =>
  toQuantifier(expressions, { suffix: '*', lazy: true });

export const repeat = (options, ...expressions) =>
  toRepeat(expressions, options);

export const repeatLazy = (options, ...expressions) =>
  toRepeat(expressions, { ...options, lazy: true });
```

### Character sets

Ranges and character sets are the last building blocks I wanted to implement. As these functions can accept **range patterns**, we need to make sure, these work as expected, hence a few more test cases to be sure.

```js title="spec/characterSets.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

// Temporary test setup, until `readEx` is implemented
const toRegExp = expressions => joinSegments(toSegments(...expressions));

import { anythingBut, anythingFrom } from '../src/characterSet.js';

describe('anythingFrom', () => {
  describe.each([
    ['abc', ['a', 'b', 'c'], ['d']],
    ['a-z', ['a', '-', 'z'], ['b']],
    ['[ab]', ['a', '[', 'b', ']'], ['d']],
    ['[^a]', ['^', '[', 'a', ']'], ['d']],
  ])('matches exactly', (expression, matches, nonMatches) => {
    matches.forEach(str => {
      it(`${expression} matches ${str}`, () => {
        expect(toRegExp([/^/, anythingFrom(expression), /$/]))
          .toMatchString(str);
      });
    });

    nonMatches.forEach(str => {
      it(`${expression} does not match ${str}`, () => {
        expect(toRegExp([/^/, anythingFrom(expression), /$/]))
          .not.toMatchString(str);
      });
    });
  });
});

describe('anythingBut', () => {
  describe.each([
    ['abc', ['d'], ['a', 'b', 'c']],
    ['a-z', ['d'], ['a', '-', 'z']],
    ['[ab]', ['d'], ['a', '[', 'b', ']']],
    ['[^a]', ['d'], ['^', '[', 'a', ']']],
  ])('matches exactly', (expression, matches, nonMatches) => {
    matches.forEach(str => {
      it(`${expression} matches ${str}`, () => {
        expect(toRegExp([/^/, anythingBut(expression), /$/]))
          .toMatchString(str);
      });
    });

    nonMatches.forEach(str => {
      it(`${expression} does not match ${str}`, () => {
        expect(toRegExp([/^/, anythingBut(expression), /$/]))
          .not.toMatchString(str);
      });
    });
  });
});
```

To make this happen, I settled on a `toCharacterSet` utility function, which would handle the conversion of range patterns to `Segment` objects. From that point onward, it was just a matter of building the `anythingFrom` and `anythingBut` functions.

```js title="src/characterSet.js"
import { Segment, toSegment, toSegments, joinSegments } from './segment.js';

export const toCharacterSet = expression => {
  if (Array.isArray(expression))
    return joinSegments(toSegments(...expression), '-');
  return toSegment(expression);
};

const toAnything = (prefix, ...expressions) =>
  new Segment(
    `[${prefix}${joinSegments(expressions.map(toCharacterSet), '|').source}]`
  );

export const anythingFrom = (...expressions) =>
  toAnything('', ...expressions);
export const anythingBut = (...expressions) =>
  toAnything('^', ...expressions);
```

## The main function

Finally, we can build the main function, `readEx`, that will accept an array of patterns and a flags object, and return a `RegExp`. We've already written tests for a lot of the code, so our test scaffolding can pretty much be converted to the final implementation.

```js title="src/readex.js"
import { joinSegments, toSegments } from './utils.js';

const DEFAULT_FLAGS = {
  dotAll: false, global: true, ignoreCase: false,
  multiline: true, sticky: false, unicode: false,
};
const FLAG_MAP = {
  dotAll: 's', global: 'g', ignoreCase: 'i',
  multiline: 'm', sticky: 'y', unicode: 'u',
};

const asFlags = flags =>
  Object.entries(Object.entries(flags).reduce(
    (acc, [flag, value]) => {
      if (value !== undefined) acc[flag] = value;
      return acc;
    }, { ...DEFAULT_FLAGS }
  )).reduce((acc, [flag, value]) =>
    (value ? acc + FLAG_MAP[flag] : acc), ''
  );

const readEx = (expressions, flags = {}) =>
  new RegExp(joinSegments(toSegments(...expressions)).source, asFlags(flags));
```

After implementing the main function, I went ahead and updated all the test cases to replace the `toRegExp` function with `readEx`. This way, I could make sure that the final implementation worked as expected. I also wrote a bunch of [integration tests](https://github.com/Chalarangelo/readex/blob/1c32a561790b7fd671599984a8c18149313c33dc/spec/index.test.js), which are too complex to cover here, but feel free to check them out on the GitHub repository.

## Exports

Finally, I exported all the building blocks and the main function from the `index.js` file. This way, I could bundle everything up in a nice neat package.

```js title="src/index.js"
export * from './readEx.js';
export * from './backReference.js';
export * from './group.js';
export * from './lookAround.js';
export * from './quantifiers.js';
export * from './sequences.js';
export * from './characterSet.js';
```

Having used **named exports** throughout the project and separating utilities, I could simply export everything from the individual files in the `index.js` file. This makes it even easier to add new functions to the library in the future, but has the potential drawback of internal code being exported, if I'm not careful.

## Packaging the code

We've already set up [Vitest](https://vitest.dev/) for testing, but we'll need a **bundler** to package our code. I've chosen [Vite](https://vitejs.dev/) for its speed and simplicity.

### Vite configuration

Vite's configuration is minimal, and it's very easy to set up. This is in stark contrast with tools like Webpack, which have always haunted me with their complexity (although, admittedly, this could be due to my own incompetence).

```js title="vite.config.js"
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'readex',
      fileName: 'readex',
      formats: ['es'],
    },
    minify: false,
  },
});
```

I've based this configuration off of [Vite's library mode](https://vite.dev/guide/build.html#library-mode) documentation. The `lib` object specifies the entry point, the library name, the output file name, and the format. We're using ES modules for compatibility with modern browsers and Node.js.

Notice that I've also set `minify` to `false` for the time being. I'll revisit this in the next article, but for now, I want to be able to read the final output easily.

### Building the code

We'll also add a `build` **script** to our `package.json` before we can bundle our code:

```json title="package.json"
{
  "scripts": {
    "build": "vite build"
  }
}
```

Then, we can finally run the `build` script:

```shell
npm run build
```

This results in the following output:

```plaintext
> readex@1.0.0 build
> vite build

vite v6.2.0 building for production...
✓ 9 modules transformed.
dist/readex.js  6.04 kB │ gzip: 1.63 kB
✓ built in 51ms
```

In it, we can see the **output path** (`dist/readex.js`), the **size of the bundle** (6.04 kB), and the **gzipped size** (1.63 kB). This is a very small bundle size, which is great for a utility library like ours. Yet, I feel like we can do better, which I'm going to explore in the next article, where I refactor much of the codebase.

### Publishing to npm

Finally, we can **publish our package to npm**. We'll need to specify a few things in our `package.json` first to make sure the right files are included and the package is importable as an ES module:

```json title="package.json"
{
  "name": "readex",
  "type": "module",
  "version": "1.0.0",
  "files": ["dist"],
  "module": "./dist/readex.js",
  "exports": {
    ".": {
      "import": "./dist/readex.js"
    }
  }
}
```

After that, if you haven't already, you'll need to **create an account** on the [npm website](https://www.npmjs.com/). Then, you can log in from the command line:

```shell
npm login
```

After logging in, you can publish your package:

```shell
npm publish
```

We just made our package available to the world! You can check it out on the npm website or install it in another project to test it out.

## Conclusion

Phew! That was quite a long journey, but I think the library is now ready for use. Using TDD and a carefully designed API before starting out, the library took shape easily and quickly. The resulting bundle is small and the code is easy to read and understand. Next time, we'll take a stab at refactoring the code to make it even more efficient and readable. Stay tuned!
