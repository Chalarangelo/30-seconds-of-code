---
title: Kickstart a JavaScript project with Test-Driven Development
shortTitle: Test-Driven Development
language: javascript
tags: [webdev,testing]
cover: succulent-5
excerpt: I recently built a project using Test-Driven Development (TDD) and it was a great experience. Here's why I think you should try it, too.
listed: true
dateModified: 2025-03-17
journeyId: js/tdd-library-design
---

I recently decided to try out [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) for a small project. While I've had some experience with the methodology before, I've never tried bootstrapping a project with it from the start.

## What is TDD?

**Test-Driven Development**, often referred to as TDD, is a **software development methodology** that relies on writing tests before writing the actual code. The idea is to define the desired behavior of the code through tests and then write the code to achieve that behavior. This approach transforms the traditional development process, by making testing an integral part of the coding cycle rather than an afterthought.

In short, in TDD, we **test first, code later**. This is in contrast to the traditional approach of coding first and testing later, or not at all.

## Tooling

I decided to use [Vitest](https://vitest.dev/) for this project. It's the tool I've settled on, after trying the likes of Jest and Mocha. It feels faster and, in my experience, it's easier to set up and configure than its counterparts.

> [!TIP]
>
> I didn't really have to configure anything for this project, as I was using native **ES modules** and, later in the development cycle, [Vite](https://vite.dev/), which works great with Vitest out of the box.

As far as **syntax** is concerned, there's nothing particularly special about Vitest. In fact, it's practically the same as every other testing library, using the classic trinity of [`describe`](https://vitest.dev/api/#describe), [`test`](https://vitest.dev/api/#test) (aliased conveniently as `it`), and [`expect`](https://vitest.dev/api/expect.html) for **assertions**.

```js title="spec/myFunction.test.js"
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/myFunction.js';

describe('myFunction', () => {
  it('should return true when called', () => {
    expect(myFunction()).toBe(true);
  });
});
```

It also comes with a lot of very convenient [matchers](https://vitest.dev/api/expect.html), [mocking](https://vitest.dev/api/mock.html) and pretty much everything you'd expect from a modern testing library.

```js title="spec/fetchUser.test.js"
import { describe, it, expect } from 'vitest';
import { fetchUser } from '../src/fetchUser.js';

describe('fetchUser', () => {
  it('should return a user object', () => {
    const user = fetchUser('john_doe');
    expect(user).toMatchObject({ username: 'john_doe' });
    expect(user.age).toBeGreaterThan(18);
    expect(user).toHaveProperty('email');
    expect(user.name).not.toBeUndefined();
  });
});
```

I especially like the [`test.each()`](https://vitest.dev/api/#test-each) and [`describe.each()`](https://vitest.dev/api/#describe-each) functions, which allow you to **run the same test with different parameters**, sparing you the hassle of repeating the same assertions over and over again.

```js title="spec/isNil.test.js"
import { describe, it, expect } from 'vitest';
import { isNil } from '../src/isNil.js';

describe('isNil', () => {
  it.each(
    [null, undefined]
  )('should return true %s', (val) => {
    expect(isNil(val)).toBe(true)
  });

  it.each(
    [false, '', 0, {}, [], () => {}]
  )('should return false with %s', val => {
    expect(isNil(val)).toBe(false);
  });
});
```

### Custom matchers

One thing I want to mention is how easy it was to [roll up my own **custom matcher**](https://vitest.dev/guide/extending-matchers.html). As my project is centered around regular expressions, I wanted a matcher that would easily check if an expression matches a given string.

Surprisingly, this only took me about **10 lines of code**:

```js title="spec/matchers.js"
import { expect } from 'vitest';

expect.extend({
  toMatchString(regex, string) {
    const { isNot } = this;
    const pass = regex.test(string);
    return {
      pass,
      message: () =>
        `expected ${regex}${isNot ? ' not' : ''} to match "${string}"`,
    };
  },
});
```

The entire process is as simple as calling [`expect.extend()`](https://vitest.dev/api/expect.html#expect-extend) and defining the behavior. To use it in combination with `not`, I only had to check the `isNot` property of the context object. Now I can use it in my tests like this:

```js title="spec/hexDigit.test.js"
import { describe, it, expect } from 'vitest';
import './matchers.js';

import { hexDigit } from '../src/hexDigit.js';

describe('hexDigit', () => {
  it('should match hex digit', () => {
    expect(hexDigit).toMatchString('0');
    expect(hexDigit).toMatchString('9');
    expect(hexDigit).toMatchString('a');
    expect(hexDigit).toMatchString('f');
    expect(hexDigit).not.toMatchString('g');
    expect(hexDigit).not.toMatchString('-');
  });
});
```

> [!NOTE]
>
> There's a caveat to my unbridled enthusiasm for custom matchers and that is I haven't used them all that much just yet. Yet, they seem like a very easy, elegant and hassle-free solution in my **limited experience**.

## Why TDD?

At this point, you might be starting to wonder _why_ I chose TDD for this project. The truth is, I sort of already knew what I was going to make, but I had a few concerns about various aspects of the project and I thought that TDD could help me with them.

### Better API design

I'll dive deeper into this point in a future article, but one of the key concerns I was facing was the **developer experience**. Designing a user-friendly library API is no small task, one I've botched in the past.

By writing tests first, I was able to decide on how I want the library to behave, what methods to expose and what sorts of arguments they should take. I was also able to **focus on using the library before implementing it**. This naturally makes it easier to spot the rough edges early on and make the API easier to use.

```js title="spec/myFunction.test.js"
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/myFunction.js';

// Wait, what's that second `true` again? Maybe redesign this.
describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction(10, true, false, true);
    expect(result).toBe('expected result');
  });
});
```

It also puts you in the shoes of the user, instead of the library author – a perspective that can be hard to maintain otherwise. This means that you're **evaluating the tool from the perspective of usability**, instead of the traditional viewpoint of minimizing complexity when writing the code or working around limitations and building clever abstractions.

### Higher confidence

One of the things I noticed as I went through the process was that I was pretty confident about my code. I knew that if I broke something, the tests would catch it. This is a great feeling to have, especially when you're working on a project that you're not entirely sure about or that hasn't materialized fully yet.

```js title="spec/myFunction.test.js"
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/myFunction.js';

// I'm only done when all these tests pass
describe('myFunction', () => {
  it('should do this', () => {
    // ...
  });

  it('should also do that', () => {
    // ..
  });

  it('should absolutely not do this', () => {
    // ...
  });
});
```

The magic of TDD lies in exactly that. When a function, a module, anything is completed, it lets you know. All relevant tests pass, the behavior is as expected, and you can move on to the next thing. I was especially keen on this aspect, as I could only work on this in small bursts and I wanted to make sure that I was making progress every time I sat down to work on it.

### Easier refactoring

As I'll also explore in a future piece, I refactored the library a handful of times, changing the API in some cases. By **refactoring the tests** to match the result I was looking for, I was always able to know when the refactor was complete and functional. Without tests to back me up, I would have been much more hesitant to make some of these changes.

```js title="spec/myFunction.test.js"
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/myFunction.js';

// I've refactored this test to how I like the API, now let's fix the code
describe('myFunction', () => {
  it('should do something', () => {
    const result =
      myFunction(10, { test: true, value: false, repeat: true });
    expect(result).toBe('expected result');
  });
});
```

This was especially true when one small change in a file broke the entire library at its core and I wouldn't have realized, because it was a pretty subtle mistake relating to spreading arguments in a function call. Ouch!

## Takeaways

I've been skeptical of TDD for years now, but there's nothing like true hands-on experience to shape one's opinion. Having heard of the benefits before, I can tell you that they're as described on the tin.

_Would I use it again?_ Absolutely. In fact, I think that all my smaller weekend-turned-month projects would benefit from this methodology. It also seems like it forced me down a path of producing code focused on entirely different aspects than I usually do.

_Is it a silver bullet?_ No. I can see how it would be **difficult to implement in larger projects**, especially ones maintained by large teams. I think one of the main shortcomings is that it's hard to retrofit TDD into an existing codebase and, when there are too many moving parts, it can be hard to keep track of everything. But for new projects, especially smaller ones, I think it's a great way to write code.

## Conclusion

In conclusion, I found that TDD was a great way to write code. It helped me design what I wanted the library to do first, outline use-cases and the API, and gave me confidence in my code. It also made refactoring easier, as I could be sure that I hadn't broken anything.

At the end of the day, I give a **solid recommendation for using TDD for smaller projects**, especially when you're just starting out with a new idea or library. It's a great way to write code and it's a great way to make sure that your code is working as expected.
