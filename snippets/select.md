### select

Retrieve a set of properties indicated by the given selectors from an object.

Use `Array.map()` for each selector, `String.split('.')` to split each selector and `Array.reduce()` to get the value indicated by it.

```js
const select = (from, ...selectors) =>
  [...selectors].map(s => s.split('.').reduce((prev, cur) => prev && prev[cur], from));
```

```js
const obj = { selector: { to: { val: 'val to select' } } };
select(obj, 'selector.to.val'); // ['val to select']
select(obj, 'selector.to.val', 'selector.to'); // ['val to select', { val: 'val to select' }]
```
