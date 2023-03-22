---
title: Introduction to the Node.js test module
shortTitle: Node.js test module introduction
type: story
tags: javascript,node,testing
author: chalarangelo
cover: contemporary-desk
excerpt: The Node.js test module is a new testing tool that's still in its early stages. Learn more about it in this short introduction.
firstSeen: 2023-04-30T05:00:00-04:00
---

A little while back, I stumbled upon the [Node.js test module](https://nodejs.org/docs/latest-v18.x/api/test.html). Having tried various JavaScript testing tools in recent years, I decided to set some time aside to test it and see how it works.

_Before you read any further, note that at the time of writing (April, 2023), this module is still **experimental** and is likely to change in future releases. While **not recommended for production use**, it's still worth learning about as it might come in handy later down the line._

So, how does the Node.js test module compare to the likes of Jest and Vitest? As expected, it's less feature-rich than other tools, which is understandable given that it's still in its early stages. However, the core functionality is there and it's very easy to use and set up as it **doesn't require third-party dependencies**.

Before you can use the module, you'll have to **import** it. You'll most likely have to import the **assertion module** as well. Here's how to import both:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
```

Additionally, if you want to use methods such as `describe` or `it` from the test module, you'll have to import them as well. For example:

```js
import { describe, it } from 'node:test';
```

Now that you have the module imported, you can **start writing tests**. The test module provides a `test` function that takes two arguments in its simplest form:

- `name`: a string describing the test
- `fn`: a function containing the test logic

Let's look at an example:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

test('my test', () => {
  assert.strictEqual(1, 1);
});
```

This is pretty simple, but how does one **run the tests from the command line**? Contrary to most other tools, you don't need to create a new entry under your `package.json`'s `scripts` object. Instead, you can simply run the `node --test` command:

```shell
node --test
```

Running this command will match certain **file patterns**, such as files ending in `.test.js` and files under the `test` directory. You can read more about this in the [documentation](https://nodejs.org/docs/latest-v18.x/api/test.html#test-runner-execution-model). Additionally, you can manually specify one or more space-separated file patterns to run tests from:

```shell
node --test my-example.test.js
```

These basic instructions might cover some simple tests, but no testing tool is complete without more advanced features. Two important testing staples are **setup and teardown functions**. The test module provides `beforeEach` and `afterEach` functions that run before and after each test, respectively.

Note that you can import these functions and use them, but there's also another way. By making the test **asynchronous** and passing an argument to the test function, you can use the `beforeEach` and `afterEach` functions as methods of the test object. I've found this to be a bit more convenient, so I'll be using this method in the examples below. Here's what that looks like:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

test('my test', async t => {
  let a;

  t.beforeEach(() => {
    a = 1;
  });

  t.afterEach(() => {
    a = 0;
  });

  await t.test('my subtest', () => {
    assert.strictEqual(a, 1);
  });
});
```

While all of this sounds pretty good, you might be wondering what a **real-world example** looks like. I cooked up a little function that mutates an array of numbers and returns a value just to demonstrate. The logic is not particularly complex or interesting, but it's enough to take the module for a spin. Let's have a look:

```js
import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

const doubleAndSum = (arr, mod = 0) => {
  let sum = 0;
  Object.entries(arr).forEach(([i, v]) => {
    if (v % 2 === mod) arr[i] = v * 2;
    else sum += v;
  });
  return sum;
};

describe('doubleAndSum', () => {
  let arr, sum;

  test('when mod is 0', async t => {
    t.beforeEach(() => {
      arr = [1, 2, 3];
      sum = doubleAndSum(arr, 0);
    });

    await t.test('sums the even values', () => {
      assert.equal(sum, 4);
    });

    await t.test('doubles the even values', () => {
      assert.equal(arr[1], 4);
    });
  });

  test('when mod is 1', async t => {
    t.beforeEach(() => {
      arr = [1, 2, 3];
      sum = doubleAndSum(arr, 1);
    });

    await t.test('sums the even values', () => {
      assert.equal(sum, 2);
    });

    await t.test('doubles the odd values', () => {
      assert.equal(arr[0], 2);
      assert.equal(arr[2], 6);
    });
  });
});
```

And there you have it! Hopefully, by now you have a pretty good idea of what the Node.js test module is all about. There's a lot more to it, such as **coverage** reporting, **watch mode** and **mocking**, if you feel like digging deeper. You can find more information in the [documentation](https://nodejs.org/docs/latest-v18.x/api/test.html).
