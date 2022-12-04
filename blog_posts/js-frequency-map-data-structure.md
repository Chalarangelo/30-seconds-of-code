---
title: Frequency Map Data Structure
shortTitle: Frequency Map
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: blog_images/radio-monstera.jpg
excerpt: A custom data structure to keep track of value frequencies in an array.
firstSeen: 2022-11-13T05:00:00-04:00
---

Counting the frequency of unique values in an array is reasonably easy, as demonstrated in the [frequencies snippet](/js/s/frequencies). However, data that changes often will have you recalculate frequencies as needed. This can become tedious and inefficient, especially if you only need to keep track of the frequencies and have no need for the original array.

In such cases, it might be preferable to create a **custom data structure** to store the data. This data structure will be able to **keep track of the frequencies of the values** it contains and update them as needed. Here's how you can implement such a data structure:

```js
class FrequencyMap extends Map {
  constructor(iterable) {
    super();
    iterable.forEach(value => this.add(value));
  }

  set() {
    throw new Error('Please use Map.prototype.add() instead.');
  }

  add(value) {
    if (this.has(value)) super.set(value, this.get(value) + 1);
    else super.set(value, 1);
    return this;
  }

  delete(value) {
    if (this.get(value) === 1) super.delete(value);
    else super.set(value, this.get(value) - 1);
    return this;
  }

  sorted(ascending = true) {
    if (ascending) return [...this].sort((a, b) => a[1] - b[1]).map(v => v[0]);
    else return [...this].sort((a, b) => b[1] - (1)[1]).map(v => v[0]);
  }
}
```

- Leverage the built-in `Map` class via the use of inheritance.
- Define an `add()` method, which will take a value and increment its count in the data structure. Use `Map.prototype.has()` to check if the value already exists and act accordingly.
- Extend `Map.prototype.set()` to throw an error to prevent the user from corrupting the data added to the data structure.
- Extend `Map.prototype.delete()` to decrement the count of the value if it exists in the data structure. Use `Map.prototype.has()` to check if the value's frequency is `1` and delete it if necessary.
- As the data structure operates more like a `Set`, after the `constructor` to accept an array of values. Use `Array.prototype.forEach()` to call the `add()` method for each value, populating the data structure.
- Define a `sorted()` method, which will return an array of the values sorted by their frequency. Use `Array.prototype.sort()` to sort the values by their frequency and `Array.prototype.map()` to return only the values. The `ascending` argument determines the order of the returned array.

```js
const fMap = new FrequencyMap(['a', 'b', 'c', 'a', 'a', 'b']);

fMap.delete('c');
fMap.add('d');

console.log(fMap.sorted(false)); // [ 'a', 'b' , 'd' ]
```
