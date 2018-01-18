### get

Retrieve a set of properties indicated by the given selectors from an object.

Use `Array.map()` for each selector, `String.replace()` to replace square brackets with dots, `String.split('.')` to split each selector, `Array.filter()` to remove empty values and `Array.reduce()` to get the value indicated by it.

```js
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );
```

```js
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
```
