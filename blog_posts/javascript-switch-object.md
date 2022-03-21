---
title: Replacing JavaScript switch statement with object literals
shortTitle: Switch with object literals
type: story
tags: javascript,object
expertise: intermediate
author: chalarangelo
cover: blog_images/rocky-lake.jpg
excerpt: JavaScript's `switch` statement often feels hard to remember and a little bit out of place. Maybe it's time to use object literals, instead.
firstSeen: 2021-04-01T12:00:00+03:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

JavaScript's `switch` statement is one of the few things I find hard to remember the syntax for (so glad VS Code has autocomplete). It also feels a little bit out of place syntactically, as it's the only thing that doesn't use curly braces and you need to remember to `break` for every `case`. Moreover, its performance is less than stellar as its control flow is procedural.

Luckily, JavaScript's object literals are a pretty good alternative for most `switch` statement use-cases I can think of. The idea is to define an object with a key for each `case` you would have in a `switch` statement. Then you can access its value directly using the expression you would pass to the `switch` statement.

```js
let fruit = 'oranges';

switch (fruit) {
  case 'apples':
    console.log('Apples');
    break;
  case 'oranges':
    console.log('Oranges');
    break;
}
// Logs: 'Oranges'

const logFruit = {
  'apples': () => console.log('Apples'),
  'oranges': () => console.log('Oranges')
};

logFruit[fruit](); // Logs: 'Oranges'
```

While this is infinitely more readable and less verbose, it's also significantly faster. However, we haven't yet addressed the elephant in the room: the `default` case. To handle it, we can just add a `'default'` key and check if the expression's value exists in our object.

```js
let fruit = 'strawberries';

switch (fruit) {
  case 'apples':
    console.log('Apples');
    break;
  case 'oranges':
    console.log('Oranges');
    break;
  default:
    console.log('Unknown fruit');
}
// Logs: 'Unknown fruit'

const logFruit = {
  'apples': () => console.log('Apples'),
  'oranges': () => console.log('Oranges'),
  'default': () => console.log('Unknown fruit')
};

(logFruit[fruit] || logFruit['default'])(); // Logs: 'Unknown fruit'
```

Finally, our object literal replacement should be able to handle falling through cases, similar to what happens when there's no `break` statement. This is a matter of simply extracting and reusing logic in the object literal.

```js
let fruit = 'oranges';

switch (fruit) {
  case 'apples':
  case 'oranges':
    console.log('Known fruit');
    break;
  default:
    console.log('Unknown fruit');
}
// Logs: 'Known fruit'

const knownFruit = () => console.log('Known fruit');
const unknownFruit = () => console.log('Unknown fruit');

const logFruit = {
  'apples': knownFruit,
  'oranges': knownFruit,
  'default': unknownFruit
};

(logFruit[fruit] || logFruit['default'])(); // Logs: 'Known fruit'
```

To wrap this all up, we can generalize and extract this logic into a simple reusable function. We will supply it with the lookup object and an optional name for the default case (we'll default to `_default` to avoid any conflicts). This function will in turn return a function with the appropriate lookup logic and we can use it to replace any `switch` statement.

```js
const switchFn = (lookupObject, defaultCase = '_default') =>
  expression => (lookupObject[expression] || lookupObject[defaultCase])();

const knownFruit = () => console.log('Known fruit');
const unknownFruit = () => console.log('Unknown fruit');

const logFruit = {
  'apples': knownFruit,
  'oranges': knownFruit,
  'default': unknownFruit
};

const fruitSwitch = switchFn(logFruit, 'default');

fruitSwitch('apples'); // Logs: 'Known fruit'
fruitSwitch('pineapples'); // Logs: 'Unknown fruit'
```
