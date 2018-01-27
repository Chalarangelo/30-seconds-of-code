### truthCheckCollection

Checks if the predicate (second argument) is truthy on all elements of a collection (first argument).

Use `Array.every()` to check if each passed object has the specified property and if it returns a truthy value.

```js
const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);
```

```js
truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'); // true
```
