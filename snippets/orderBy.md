### orderBy

Returns a sorted array of objects ordered by properties and orders.

Uses a custom implementation of sort, that reduces the props array argument with a default value of 0, it uses destructuring to swap the properties position depending on the order passed.
If no orders array is passed it sort by 'asc' by default.

```js
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
```

```js
const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
orderBy(users, ['name', 'age'], ['asc', 'desc']); // [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']); // [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
```
