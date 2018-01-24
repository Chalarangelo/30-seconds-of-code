### partialRight

Creates a function that invokes `fn` with `partials` appended to the arguments it receives.

Use the spread operator (`...`) to append `partials` to the list of arguments of `fn`.

```js
const partialRight = (fn, ...partials) => (...args) => fn( ...args, ...partials);
```

```js
function greet(greeting, name) {
  return greeting + ' ' + name + '!';
}
const greetJohn = partialRight(greet, 'John');
greetJohn('Hello'); // 'Hello John!'
```
