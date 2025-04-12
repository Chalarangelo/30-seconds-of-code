---
title: Designing a user-centric API for a JavaScript library
shortTitle: User-centric API design
language: javascript
tags: [webdev,regexp]
cover: succulent-6
excerpt: Building atop the TDD foundation from last time, let's explore how to design a user-centric API for our JavaScript library.
listed: true
dateModified: 2025-03-20
journeyId: js/tdd-library-design
---

In the [previous article](/js/s/test-driven-development-intro), I briefly touched upon how <dfn title="Test-driven development (TDD) is a software development methodology where developers write automated tests before writing the actual code. It follows a cyclic process of writing a failing test, implementing minimal code to pass it, then refactoring the code to improve its structure while maintaining functionality.">TDD</dfn> helped me design a better **developer experience** for a small library I was working on. This time around, I want to focus on the **API design** side of things.

## Problem brief

My project involves around a simple concept - the **regular expression** <dfn title="A domain-specific language (DSL) is a computer language specialized to a particular application domain. This is in contrast to a general-purpose language (GPL), which is broadly applicable across domains.">DSL</dfn> is hard to write, almost as if it was made for computers, not humans.

I'm sure you're all familiar with this problem to some extent. Writing a RegExp can be a pain, especially when it gets longer and more complex. It's hard to read, hard to maintain, and especially hard to reuse parts of regular expressions. So how can I make it easier for myself and others to write RegExp patterns?

> [!IMPORTANT]
>
> **The code in this article is not functional.** It acts as a rough draft of my thought process, how TDD ties into it, and a way to visualize in code (or pseudocode) what's being discussed. One or more code implementation articles of this project will follow.

## Goal statement

My primary goal is to create a more **natural way to express regular expressions**. As a secondary goal, I also want to make it easier to **reuse patterns**, so that one could conceptually create building blocks or libraries of RegExp patterns. Finally, as with anything I create, I want code written with this library to be **easy to read and maintain**.

### Natural language

As stated before, the main ask is a way to describe regular expressions in a more natural way. To that end, I want to be able to express in code what I would describe to a colleague somewhat familiar with the concept, in **natural language**. This means something like `/.*/` would be roughly described as _any character zero or more times_.

```js title="spec/myDraft.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { anyCharacter, zeroOrMore } from '../src/myDraft.js';

describe('Natural language', () => {
  it('should read like a sentence', () => {
    // Does this read like a sentence?
    const expression = new RegExp(zeroOrMore(anyCharacter));
    expect(expression).toMatch('a');
  });
});
```

```js title="src/myDraft.js"
// Pseudocode approximation of what I imagine under the hood
const anyCharacter = '.';
const zeroOrMore = pattern => `${pattern}*`;
```

Notice how I leaned into the fact that the end user has **some degree of familiarity** with the DSL. The end user is very important here, as we are trying to make _their_ life easier. Someone unfamiliar with RegExp would describe this in a more verbose way due to unfamiliarity with core constructs, making it less efficient to try and target those users.

### Reusability

The less ambitious goal for this project is to make it easier to **reuse RegExp patterns**. This means that I should be able to create a pattern once and use it in multiple places. This boils down to creating all the necessary **building blocks** to make this possible and making sure they can be combined in all the ways that make sense for the end user.

```js title="spec/myDraft.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { digit, range, repeat, or } from '../src/myDraft.js';

describe('Reusability', () => {
  it('should be able to create reusable blocks', () => {
    // Reusable building block
    const hex = or(digit, range('a', 'f'));
    // I can reuse this block in multiple places
    const threeHexes = new RegExp(repeat(hex, 3));
    expect(threeHexes).toMatch('a1b');

    const sixHexes = new RegExp(repeat(hex, 6));
    expect(sixHexes).toMatch('a1b2c3');
  });
});
```

```js title="src/myDraft.js"
// Pseudocode approximation of what I imagine under the hood
const digit = '\\d';
const range = (start, end) => `[${start}-${end}]`;
const repeat = (pattern, times) => `${pattern}{${times}}`;
const or = (...patterns) => `(${patterns.join('|')})`;
```

### Readability & maintainability

Our **health metrics**, if you will, are how easy it is to read and maintain the code written with this library. The main hassle of RegExp is how much time is wasted trying to understand what the last person - or you from the past - did and how they arrived at the pattern before you. Then, an equal, if not greater, amount of time is spent trying to figure out how to change it without breaking anything.

```js
// This is the pattern for an octet (0-255)
// Hours wasted here: 42
// Increase the count by 1 if you are reading this
/(?:(?:0)*(?:(?:(?:[0-1])?(?:\d){1,2})|(?:2[0-4]\d)|(?:25[0-5])))/
```

Naturally, we want to avoid this kind of situation. Therefore, it's imperative that the code produced is as **easy to understand** regardless if you wrote it or it's the first time you laid eyes on it. Moreover, it should be **easy to make changes** and reason about them, reducing the barrier to entry for everyone involved.

```js title="spec/myDraft.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import {
  or, concat, zeroOrMore, zeroOrOne, range, repeat, digit
} from '../src/myDraft.js';

describe('Readability & maintainability', () => {
  it('should be easy to read and maintain', () => {
    // This is the pattern for an octet (0-255)
    // It's readable and if I need to change it, it's easy to do so
    const octet = concat(
      zeroOrMore(0),
      or(
        // 0-199
        concat(zeroOrOne(range(0, 1)), repeat(digit, { times: [1, 2] })),
        // 200-249
        concat(2, range(0, 4), digit),
        // 250-255
        concat(25, range(0, 5))
      )
    );
    expect(new RegExp(octet)).toMatch('255');
  });
});
```

```js title="src/myDraft.js"
// Pseudocode approximation of what I imagine under the hood
const or = (...patterns) => `(${patterns.join('|')})`;
const concat = (...patterns) => patterns.join('');
const zeroOrMore = pattern => `${pattern}*`;
const zeroOrOne = pattern => `${pattern}?`;
const range = (start, end) => `[${start}-${end}]`;
const repeat = (pattern, { times }) => `${pattern}{${times.join(',')}}`;
const digit = '\\d';
```

## API design

Having established the goals and the general direction, it's time to look closer upon the developer experience. The drafts I made with TDD so far, even if not fully functional, gave me a good idea of what the API should look like. They also made me aware of **potential issues** and headaches I could face as an end user.

### Naming

> There are only 2 hard things in Computer Science: cache invalidation & naming things.
>
> _— Phil Karlton_

Naming is hard, but it's also very important. Remember the original assumption that the end user is somewhat familiar with RegExp? This means we can **use well-established terms**, instead of trying to make it more accessible to someone who doesn't know what a character class or a quantifier is.

```js
// Good
const wordBoundary = '\\b';
// Bad
const wordSeparator = '\\b';

// Good
const whitespaceCharacter = '\\s';
// Bad
const space = '\\s';

// Good
const zeroOrOne = '?';
// Bad
const maybe = '?';

// Good
const oneOrMoreLazy = '+?';
// Bad
const oneOrMoreMatchingAsFewAsPossible = '+?';
```

Remember, we're not trying to reinvent the language here, just make it more accessible. By using already familiar terms, we make it **easier for users to learn the library's API**, instead of having to teach them an entirely new vocabulary.

### Function arguments

One of the make-or-break aspects of any API is the **arguments** of its functions. The amount of them, the ordering, the types, and the defaults all play a role in how easy it is to use the API. **Ambiguity** is the enemy here, but there are other aspects to consider.

```js
// Bad design - Wait, what's that second `true` again?
const result = myFunction(10, true, false, true);
```

As we look towards **extensibility**, it's only natural to think of [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) and [variadic functions](https://en.wikipedia.org/wiki/Variadic_function). This will make it easier to **add more patterns** at the start, end or in the middle of the pattern, without much friction.

```js
// Bad - Inconsistent arguments, high mental overhead
or('a', digit, concat([range({ start: 'a', end: 'z' }), wordBoundary]));

// Good - Consistent argument structure, low cognitive load
or('a', digit, concat(range('a', 'z'), wordBoundary));
```

Adhering to this design principle will **reduce the mental overhead of learning the API**, as everything will be **consistent and predictable**. But this brings us to the next point: _What about special arguments?_

### Special arguments

Naturally, there will be edge cases to any design, no matter how nice and elegant it is. In the case of this little library, some patterns, like `namedGroup` or `repeat`, will require some special arguments.

While initially I thought we can stick those arguments at the end of the function and call it a day, it creates a few problems. First, the user is not immediately aware if they've left out an important argument. Secondly, it makes the library code way more complex than it should be. Finally, it's not as readable when scanning complex code.

To keep everything consistent, these **special arguments should come first in the function signature**. Not only this makes it easier to spot them, but it also makes them more discoverable as part of the API and makes sure developers are aware that they're needed.

```js
// Supposing the `repeat` function expects:
// - A pattern ('a')
// - A number of repetitions (3)
// - A boolean for lazy matching (true)

// Bad - Special arguments at the end
const result = repeat('a', 3, true);

// Better - Special arguments at the beginning
const result = repeat(3, true, 'a');
```

Notice anything else problematic here? How about the fact that in both examples it's hard to decipher the amount of times the pattern repeats and what the boolean does? Let's take a stab at that next!

### Named arguments

One of the features I wish JavaScript had is something like [Ruby's keyword arguments](https://thoughtbot.com/upcase/videos/ruby-keyword-arguments). Luckily, for many years now, we've been using objects and, as early as ES6 was around, [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring#object_destructuring) for this purpose.

Given that we have the tools and we've already established where special arguments go, it seems easy to solve the problem of making them easy to spot. We'll use **objects** for special arguments, so that users have to explicitly state what they're passing in.

```js
// Supposing the `repeat` function expects:
// - A pattern ('a')
// - A number of repetitions (3)
// - A boolean for lazy matching (true)

// Bad - Special arguments have no context, hard to decipher
const result = repeat(3, true, 'a');

// Good - Special arguments are named, easy to understand
const result = repeat({ times: 3, lazy: true }, 'a');
```

### Edge cases

Even with all of these systems in place, there will most likely be **special cases** that don't fit the mold. We'll address these on a case-by-case basis, but having established a **general strategy** will help us make educated decisions that will make sense for users.

#### Backreferences

The first case I want to discuss are backreferences. They are a special kind of pattern that refers to a previously captured group. The difference with other patterns is that they are not patterns, but rather a reference to a pattern, either via name or index.

@[Quick refresher](/js/s/6-regexp-tricks#capturing-group-backreferences)

We could use the named argument approach here, but I feel like it creates friction for the user. After all, we need only pass the function **a single argument** and it's pretty clear what that argument is.

```js
// Not great - Named argument for a single argument
backreference({ name: 'group' });
backreference({ index: 1 });

// Maybe better - No named argument for a single argument
backreference('group');
backreference(1);
```

> [!NOTE]
>
> I don't feel extremely strongly for this one, I think it could have gone either way. I decided to go with the second option because it seemed simpler to me, but I recognize there may not be a right answer here.

#### Quantifiers

The `repeat` quantifier is the most common one in these examples and for good reason. It's a very common pattern that's also quite versatile. However, designing it in a way that makes sense is a bit tricky. We need to support three resulting syntaxes:

1. Exact match (exactly 3: `{3}`)
2. Range (between 3 and 5: `{3,5}`)
3. Open-ended (3 or more: `{3,}`)

A `{ min, max }` or `{ times }` approach is what first came to mind. After all, it's clear which one is which and there's not much ambiguity. Yet, I can't help but worry that **multiple syntax options** aren't the best way to go. I also don't love the idea of a lone `min` or `max` option when specifying open-ended ranges.

```js
// Not too bad - Clear what's what
repeat({ times: 3 }, pattern);         // {3}
repeat({ min: 3, max: 5 }, pattern);   // {3,5}
repeat({ min: 3 }, pattern);           // {3,}
repeat({ max: 5 }, pattern);           // {0,5}
```

It's a bit of a pickle, but I decided to go with a unified `{ times }` approach, instead. It ensures that the user has **only one way to do things**. If designed well, it can also feel more natural: a single number is an exact match, an array is a range, and we can use empty array values to specify open ends.

```js
// Maybe better - Unified approach
repeat({ times: 3 }, pattern);         // {3}
repeat({ times: [3,5] }, pattern);     // {3,5}
repeat({ times: [3, ] }, pattern);     // {3,}
repeat({ times: [, 5] }, pattern);     // {0,5}
```

I like to think that this resemblance of the original DSL hints back to the way one familiar with regular expressions would write them, thus making it **easier to remember** the syntax. It also seems to emerge naturally that anything that's not an exact match would use an array for the range. And, of course, the empty array values seem like a natural fit for open-ended ranges.

#### Character sets

Last but not last, character sets are a special case in and of themselves. A range has a start and an end, but what happens if we want to match any character in a set of characters that do not form a contiguous range?

```js
// Good - simple range
range('a', 'z'); // [a-z]

// Not great - multiple ranges
or(range('a', 'c'), range('x', 'z')); // (?:[a-c]|[x-z])

// Worse - character set
or('a', 'b', 'c', 'x', 'y', 'z'); // (?:a|b|c|x|y|z)
```

Naturally, we want this to be frictionless. To that effect it makes sense to do away with the `range` function and instead create an `anythingFrom` function. This one will be special as it will be able to handle regular arguments, but it also needs to handle ranges. This poses the question of how to **differentiate** between the two. Well, a range is just two ends, so an array of two elements should suffice.

```js
// Good - simple range
anythingFrom(['a', 'z']); // [a-z]

// Good - multiple ranges
anythingFrom(['a', 'c'], ['x', 'z']); // [a-cx-z]

// Good - character set
anythingFrom('a', 'b', 'c', 'x', 'y', 'z'); // [abcxyz]
```

Similarly, we can then create an `anythingBut` function that will use `[^]` instead of `[]` to match anything but the characters provided. I'm not completely sure this approach is perfect, but it makes sense when reading it and doesn't feel alien to write it, either.

> [!NOTE]
>
> I could also see a `range` and `or` approach working, but I think that these use cases are so common that providing a more direct way to express them is beneficial in the long term, even if it adds a bit of complexity to the API.

## Conclusion

That was quite a long journey, but I believe careful, **user-centric API design** is crucial to the success of any library or tool. A well-designed API can make a library a joy to use, while a poorly designed one can make it a nightmare. After all, developer experience is not that different from user experience - it's all about making the user's life easier!

