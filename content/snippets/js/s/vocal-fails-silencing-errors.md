---
title: Vocal fails are better than silent fails
shortTitle: Vocal vs silent fails
language: javascript
tags: [webdev,debugging]
cover: interior-17
excerpt: Learn why vocal errors are better than silent ones, how to handle them effectively, and improve debugging and collaboration in JavaScript.
listed: true
dateModified: 2025-06-04
---

Errors are not your enemy, they're **a powerful developer tool**. When something goes wrong in your code, an error is your program's way of saying _Hey, something's broken, and here's where to look._ Ignoring or silencing these messages is like turning off a fire alarm because it's too loud. Sure, it's quiet now, but the fire is still raging.

In JavaScript, errors are often thrown when something unexpected happens. Let's look at a very simple example:

```js
const data = JSON.parse('invalid JSON'); // Throws a SyntaxError
```

This error tells you exactly what went wrong and where. Without it, you'd be left guessing why your program isn't working.

## The danger of silent fails

**Silent fails** occur when errors are caught, but not properly handled or communicated. This can happen in several ways. Let's look at a couple of examples:

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .catch(() => {}); // Silently ignores the error
```

In this example, we can see a case of **catching a promise and doing nothing**. The `catch` block is empty, meaning if the `fetch` fails, the error is swallowed, leaving no trace of what went wrong. Down the line, you can end up with unexpected data or behavior, trying to guess what happened.

```js
try {
  const result = riskyOperation();
} catch (error) {
  // No action taken
}
```

Similarly, in this synchronous example, the error is caught, but nothing is done with it, as **the `catch` block is ignored**. The program continues running as if nothing happened, and it may lead to further issues. This approach hides the problem, making debugging nearly impossible.

Do you see **why this is bad**? Silent errors make it hard to pinpoint, debug, and fix issues. This is especially problematic in collaborative projects where team members may not be familiar with every part of the codebase. A silent fail in one module could cascade into unexpected behavior elsewhere, leaving everyone scratching their heads.

## Failing vocally

Instead of silencing errors, make them **vocal and expressive**. This doesn't mean you should crash your program at every opportunity, but you should ensure errors are logged, communicated, or handled in a way that provides clarity.

One solution is to **throw meaningful errors**, by providing a meaningful message that describes the problem. This can be done using `throw` statements or by logging errors to the console.

```js
const riskyOperation = () => {
  throw new Error('A very specific explanation of what went wrong');
}
```

A descriptive error message helps others understand the problem without diving into the code. Furthermore, if the error originates elsewhere, you can **catch it and rethrow it** with more context.

```js
try {
  riskyOperation();
} catch (error) {
  throw new Error(`Failed to perform risky operation: ${error.message}`);
}
```

Or, perhaps, if you're in a development environment, you can use `console.error()` to **log the error** and let the developer know something went wrong.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .catch(error => {
    console.error('Failed to fetch data:', error);
  });
```

Another approach is to **handle expected errors gracefully**. For example, if you're working with user input, you can validate the input and provide feedback without crashing the program. Or, when working with `fetch`, you can check the response status and retry, if anything goes wrong.

```js
const fetchWithRetry = (url, retries = 3) => {
  return fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .catch(error => {
      if (retries > 0)  return fetchWithRetry(url, retries - 1);
      throw error;
    });
}
```

Here, the error is expected, so we handle it by retrying the fetch operation. If all retries fail, we throw the error again, making it vocal, so that our code can handle it elsewhere.

## Errors for humans

Errors should be **expressive and helpful**. They're meant to be consumed by humans, not just computers. A good error message communicates **what went wrong** and how to fix it. For machine consumption, differentiating **error classes** (e.g., `TypeError`, `SyntaxError`) is often sufficient. These two techniques can be combined to provide a better development experience and easier handling of unexpected situations.

```js
const riskyOperation = () => {
  throw new TypeError('Expected a string, but received a number');
};

const anotherRiskyOperation = () => {
  throw new SyntaxError('Unexpected token in JSON');
};

const oneMoreRiskyOperation = () => {
  throw new RangeError('Index out of bounds');
};
```

JavaScript itself does this well in many cases. For example, a `TypeError` tells you that you're using a value in an unexpected way, while a `ReferenceError` indicates you're trying to access something that doesn't exist. If you're unsure of the error type to use, check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) or, if they don't suit your needs, subclass `Error` and create your own.

```js
class BrokenPipelineError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BrokenPipelineError';
  }
}

const riskyOperation = () => {
  throw new BrokenPipelineError('The pipeline is broken');
};
```

## Conclusion

Errors are an essential part of the development process. **Vocal errors** — those that are logged, thrown, or otherwise communicated — make debugging easier, improve collaboration, and lead to better code quality. While there are cases where silencing an error is appropriate, these should be the exception, not the rule. Remember, errors are your allies in building robust, maintainable software.
