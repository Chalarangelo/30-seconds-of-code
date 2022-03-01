---
title: JavaScript console.log() tips & tricks
type: story
tags: javascript,browser,cheatsheet
expertise: intermediate
author: chalarangelo
cover: blog_images/terminal.jpg
excerpt: Level up your JavaScript logging with these `console.log()` tips and tricks.
firstSeen: 2021-02-25T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Everyone uses the JavaScript console for logging or debugging every once in a while. But there is a lot more to the [console](https://developer.mozilla.org/en-US/docs/Web/API/Console) object than `console.log()`.

### Computed property names

ES6 computed property names are particularly useful, as they can help you identify logged variables by adding a pair of curly braces around them.

```js
const x = 1, y = 2, z = 3;

console.log({x, y, z}); // {x: 1, y: 2, z: 3}
```

### console.trace()

[`console.trace()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace) works the exact same as `console.log()`, but it also outputs the entire stack trace so you know exactly what's going on.

```js
const outer = () => {
  const inner = () => console.trace('Hello');
  inner();
};

outer();
/*
  Hello
  inner @ VM207:3
  outer @ VM207:5
  (anonymous) @ VM228:1
*/
```

### console.group()

[`console.group()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/group) allows you to group logs into collapsable structures and is particularly useful when you have multiple logs.

```js
console.group('Outer');           // Create a group labelled 'Outer'
console.log('Hello');             // Log inside 'Outer'
console.groupCollapsed('Inner');  // Create a group labelled 'Inner', collapsed
console.log('Hellooooo');         // Log inside 'Inner'
console.groupEnd();               // End of current group, 'Inner'
console.groupEnd();               // End of current group, 'Outer'
console.log('Hi');                // Log outside of any groups
```

### Logging levels

There are a few more logging levels apart from `console.log()`, such as [`console.debug()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/debug), [`console.info()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/info), [`console.warn()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn) and [`console.error()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error).

```js
console.debug('Debug message');
console.info('Useful information');
console.warn('This is a warning');
console.error('Something went wrong!');
```

### console.assert()

[`console.assert()`](https://developer.mozilla.org/en-US/docs/Web/API/console/assert) provides a handy way to only log something as an error when an assertion fails (i.e. when the first argument is `false`), otherwise skip the log entirely.

```js
const value = 10;

console.assert(value === 10, 'Value is not 10!'); // Nothing is logged
console.assert(value === 20, 'Value is not 20!'); // Logs "Value is not 20!"
```

### console.count()

You can use [`console.count()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/count) to count how many times a piece of code has executed.

```js
Array.from({ length: 4 }).forEach(
  () => console.count('items')  // Call the counter labelled 'items'
);
/*
  items: 1
  items: 2
  items: 3
  items: 4
*/
console.countReset('items');  // Reset the counter labelled 'items'
```

### console.time()

[`console.time()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/time) gives you a quick way to check the performance of your code, but should not be used for real benchmarking due to its low accuracy.

```js
console.time('slow comp');    // Start the 'slow comp' timer
console.timeLog('slow comp'); // Log the value of the 'slow comp' timer
console.timeEnd('slow comp'); // Stop and log the 'slow comp' timer
```

### CSS

Last but not least, you can use the `%c` string substitution expression in `console.log()` to apply CSS to parts of a log.

```js
console.log(
  'CSS can make %cyour console logs%c %cawesome%c!',  // String to format
  // Each string is the CSS to apply for each consecutive %c
  'color: #fff; background: #1e90ff; padding: 4px',   // Apply styles
  '',                                                 // Clear any styles
  'color: #f00; font-weight: bold',                   // Apply styles
  ''                                                  // Clear any styles
);
```
