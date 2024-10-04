---
title: How can I group and count values in a JavaScript array?
shortTitle: Group and count values
language: javascript
tags: [array,object]
cover: tropical-waterfall
excerpt: Learn how to group and count the values of a JavaScript array using simple array methods.
listed: true
dateModified: 2024-08-19
---

Finding the **count of each value** in an array can come in handy in a lot of situations. It's also fairly straightforward to implement, both for primitive and complex values, using JavaScript's `Array` methods.

## Count the occurrences of each value in an array

You can use `Array.prototype.reduce()` to create an object with the unique values of an array as keys and their **frequencies** as the values. Use the nullish coalescing operator (`??`) to initialize the value of each key to `0` if it doesn't exist and increment it by `1` every time the same value is encountered.

```js
const frequencies = arr =>
  arr.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']);
// { a: 4, b: 2, c: 1 }
frequencies([...'ball']);
// { b: 1, a: 1, l: 2 }
```

## Group the elements of an array based on a function

You can also **group the elements** of an array based on a given function and return the count of elements in each group. This can be useful when you want to group elements based on a specific property or a function.

To do so, you can use `Array.prototype.map()` to **map the values** of an array to a function or property name, and then use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

countBy([6.1, 4.2, 6.3], Math.floor);
// {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length');
// {3: 2, 5: 1}
countBy([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count);
// {5: 2, 10: 1}
```

## Using a `Map` instead of an object

Both of the previous examples use **objects** to store the frequencies of the values. However, you can also use a `Map` to store the frequencies. This can be useful if you need to **keep the insertion order** of the keys or if you need to **iterate over the keys** in the order they were inserted. It's also more efficient when you need to **delete keys** or **check for the existence** of a key.

```js
const frequenciesMap = arr =>
  arr.reduce((a, v) => a.set(v, (a.get(v) ?? 0) + 1), new Map());

frequenciesMap(['a', 'b', 'a', 'c', 'a', 'a', 'b']);
// Map(3) { 'a' => 4, 'b' => 2, 'c' => 1 }

const countByMap = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => {
      acc.set(val, (acc.get(val) || 0) + 1);
      return acc;
    }, new Map());

countByMap([6.1, 4.2, 6.3], Math.floor);
// Map(2) { 6 => 2, 4 => 1 }
countByMap(['one', 'two', 'three'], 'length');
// Map(2) { 3 => 2, 5 => 1 }
countByMap([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count);
// Map(2) { 5 => 2, 10 => 1 }
```

## Implement a frequency map data structure

When dealing with **data that changes often**, you may need to recalculate frequencies as needed. This can become tedious and inefficient, especially if you only need to keep track of the frequencies and have no need for the original array.

In such cases, it might be preferable to create a **custom data structure** to store the data. This data structure will be able to **keep track of the frequencies of the values** it contains and update them as needed.

Moreover, you may want to be able to **check the frequency of any value**, even if it doesn't exist in the data structure.  This also comes in handy if you want to easily **increment** or **decrement** the frequency of a value. Let's take a look at how you can implement such a data structure:

```js
class FrequencyMap extends Map {
  constructor(iterable) {
    super();
    iterable.forEach(value => this.increment(value));
  }

  get(value) {
    return super.get(value) ?? 0;
  }

  has(value) {
    return super.get(value) > 0;
  }

  increment(value) {
    super.set(value, this.get(value) + 1);
    return this;
  }

  decrement(value) {
    super.set(value, Math.max(this.get(value) - 1, 0));
    return this;
  }

  toSortedArray(ascending = true) {
    if (ascending)
      return [...this].sort((a, b) => a[1] - b[1]).map(v => v[0]);
    else return [...this].sort((a, b) => b[1] - (1)[1]).map(v => v[0]);
  }
}

const fMap = new FrequencyMap(['a', 'b', 'c', 'a', 'a', 'b']);

fMap.decrement('c');
fMap.increment('d');

console.log(fMap.toSortedArray(false)); // [ 'a', 'b' , 'd' ]
```

Leveraging the built-in `Map` class via the use of **inheritance**, we implement `get()` in such a way that **non-existent values** will return `0`. Similarly, we implement `has()` to check if the frequency of a value is greater than `0`. We also implement `increment()` and `decrement()` to **increase or decrease the frequency of a value**, respectively. Finally, we implement `toSortedArray()` to return an **array of the values sorted by their frequency**.

As the data structure operates more like a `Set`, the `constructor` is allowed to accept an array of values. We then call the `Map()` constructor without any arguments, and use `Array.prototype.forEach()` to call the `increment()` method for each value, populating the data structure.
