---
title: Sort an array of objects in JavaScript
shortTitle: Sort array of objects
language: javascript
tags: [object,array]
cover: volcano-sunset
excerpt: Ever wanted to sort an array of objects, but felt like it was too complex? Here's a robust solution for just that.
listed: true
dateModified: 2024-01-15
---

Ever wanted to sort an array of objects, but felt like it was too complex? After all, `Array.prototype.sort()` can be customized to your needs, but comparing multiple properties and orders can be a bit of a hassle. Let's tackle this problem and create a robust, reusable solution.

## Sort an array of objects alphabetically based on a property

The simplest use-case is to sort an array of objects **alphabetically** based on a given property. This is a common requirement, and it's a good starting point for our solution.

Using `Array.prototype.sort()`, we can sort the array based on the given property. We use `String.prototype.localeCompare()` to compare the values for the given property. The `order` parameter is optional and defaults to `'asc'`.

```js
const alphabetical = (arr, getter, order = 'asc') =>
  arr.sort(
    order === 'desc'
      ? (a, b) => getter(b).localeCompare(getter(a))
      : (a, b) => getter(a).localeCompare(getter(b))
  );

const people = [ { name: 'John' }, { name: 'Adam' }, { name: 'Mary' } ];
alphabetical(people, g => g.name);
// [ { name: 'Adam' }, { name: 'John' }, { name: 'Mary' } ]
alphabetical(people, g => g.name, 'desc');
// [ { name: 'Mary' }, { name: 'John' }, { name: 'Adam' } ]
```

## Sort an array of objects, ordered by properties and orders

Another classic scenario hints back at SQL queries, where you can order by multiple columns and specify the order for each column. This requirement defines the function signature for us.

The function should accept an array of objects, an array of properties and an array of orders. The latter two should match in length and order of elements. The **orders array** should be an optional **array of integers** (positive for ascending order, negative for descending order). If no orders array is supplied, the **default order** should be ascending.

Having decided on the function signature, we can start implementing the function. The first step is to **create a copy of the array** using the spread operator (`...`). This avoids mutating the original array.

After that, we use `Array.prototype.sort()` to sort the array, which is where we do the heavy lifting. Using `Array.prototype.reduce()`. we iterate over the properties array and compare the values of the current property.

The default value of the accumulator is `0`, which means that the current property is equal for both objects. If the accumulator is `0`, we compare the values of the current property. If the accumulator is not equal to `0`, we return it, meaning we can skip the rest of the properties as the objects are already sorted.

```js
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] <= 0
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 },
  { name: 'fred', age: 40 },
];

orderBy(users, ['name', 'age'], [1, -1]);
/*
[
  { name: 'barney', age: 36 },
  { name: 'fred', age: 48 },
  { name: 'fred', age: 40 },
];
*/

orderBy(users, ['name', 'age']);
/*
[
  { name: 'barney', age: 36 },
  { name: 'fred', age: 40 },
  { name: 'fred', age: 48 },
];
*/
```

> [!NOTE]
>
> A minor caveat is that the orders array check treats `0` as ascending order. Regardless, you shouldn't be passing `0` as an order anyway.

## Sort an array of objects, ordered by a property order

Another use-case for an object sorting algorithm is to sort an array of objects based on a **property order**. This could be a priority order, where a value is not lexically or numerically greater, but has a higher priority.

Unlike the previous snippet, the function should expect an array of objects, the name of the property as a string and an array of values, in order. If the latter doesn't contain all possible values, then they will be treated as having the **lowest priority**.

Before starting to sort the array, we create an object from the order array, where the values are the keys and the indices are the values. This allows us to quickly check the order of a value. After that, we use `Array.prototype.sort()` and compare the values of the property based on our order object.

```js
const orderWith = (arr, prop, order) => {
  const orderValues = order.reduce((acc, v, i) => {
    acc[v] = i;
    return acc;
  }, {});
  return [...arr].sort((a, b) => {
    if (orderValues[a[prop]] === undefined) return 1;
    if (orderValues[b[prop]] === undefined) return -1;
    return orderValues[a[prop]] - orderValues[b[prop]];
  });
};

const users = [
  { name: 'fred', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' },
];

orderWith(users, 'language', ['Javascript', 'TypeScript', 'Java']);
/*
[
  { name: 'fred', language: 'Javascript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' }
]
*/
```
