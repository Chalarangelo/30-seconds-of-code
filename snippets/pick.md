### Pick

Use `Objexts.keys()` to convert given object to an iterable arr of keys.
Use `.filter()` to filter the given arr of keys to the expected arr of picked keys.
Use `.reduce()` to convert the filtered/picked keys back to a object with the corresponding key:value pair.

```js
const pick = (obj, arr) =>
  Object
    .keys(obj)
    .filter((v, i) => arr.indexOf(v) !== -1 )
    .reduce((acc, cur, i) => {
      acc[cur] = obj[cur];
      return acc;
    }, {});

// const object = { 'a': 1, 'b': '2', 'c': 3 };
// pick(object, ['a', 'c']) -> { 'a': 1, 'c': 3 }

// pick(object, ['a', 'c'])['a'] -> 1
// pick(object, ['a', 'c'])['c'] -> 3

```