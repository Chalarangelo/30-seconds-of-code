---
title: Exploring indexes and cardinality with JavaScript
shortTitle: Indexes and cardinality
language: javascript
tags: [object]
cover: home-office-2
excerpt: Using indexes can speed up querying object collections significantly, but it seems like a black box for many. Let's dive in!
listed: true
dateModified: 2025-06-28
---

Recently, I had to work a little bit with MongoDB's databases, collections, and indexes. Part of the things I had to learn or, rather, relearn, was how **indexes** work and how **cardinality** makes a significant difference in performance. Naturally, as soon as I finished my work, I wanted to create a mental model to understand these concepts better. Hence, I hacked together a little learning aid that we're exploring today.

> [!IMPORTANT]
>
> As far as I know, MongoDB and SQL databases use B-Trees to store data. This implementation is a **simplified approximation to help you understand** how indexes work and where cardinality comes into play. It is by no means a representative implementation of how such complex systems work in real life.

## Indexes

Imagine you have a large **collection of objects** that you need to search through. You can think of this collection as a large **array of objects**, where each object has a **unique identifier** (`id`) and some properties. Naturally, you want to be able to search through this collection quickly and efficiently. This is where indexes come into play.

Instead of **searching through the entire collection** with methods like `Array.prototype.filter()` or `Array.prototype.find()`, you can create indexes on properties of the collection. That way, you can quickly find the objects you're looking for without having to iterate through the entire collection. Let's look at a simple example, using a `Map` to store each object via its `id`.

```js
const collection = {
  objects: [],
  index: new Map(),
  add(...objects) {
    objects.forEach((obj) => {
      if (obj.id === object.id)
        throw new Error(`Object with ID ${object.id} already exists`);

      this.objects.push(object);
      this.index.set(object.id, object);
    });
  },
  get(id) {
    return this.index.get(id);
  },
  remove(id) {
    const object = this.index.get(id);
    if (object) {
      this.objects.splice(this.objects.indexOf(object), 1);
      this.index.delete(id);
    }
  },
};

collection.add(
  { id: 400, name: 'Apple' }, { id: 840, name: 'Banana' },
  { id: 243, name: 'Cherry' }, { id: 123, name: 'Apple' },
  { id: 456, name: 'Banana' }
);

// collection.index:
//    400 => { id: 400, name: 'Apple' }
//    840 => { id: 840, name: 'Banana' }
//    243 => { id: 243, name: 'Cherry' }
//    123 => { id: 123, name: 'Apple' }
//    456 => { id: 456, name: 'Banana' }

collection.get(243); // { id: 243, name: 'Cherry' }
collection.get(400); // { id: 400, name: 'Apple' }
collection.get(840); // { id: 840, name: 'Banana' }
```

In this example, we have a collection of objects, each with a unique `id` field. We use a `Map` to create an index on the `id` property. When we **add an object** to the collection, we also **add it to the index**. When we want to retrieve an object by `id`, we can **look it up in the index**, which is much faster than searching through the entire collection.

## Cardinality

Cardinality refers to the **uniqueness of values** in a field/column. In the context of databases, it is a measure of how many distinct values exist in a given field/column. High cardinality means that there are many unique values, while low cardinality means that there are few unique values.

In the previous example, the `id` property has high cardinality because each object has a unique identifier. However, if we were to create an index on a property with low cardinality, such as `name`, we would not see the same performance benefits.

```js collapse={12-21}
const collection = {
  objects: [],
  index: new Map(),
  add(...objects) {
    objects.forEach((obj) => {
      this.objects.push(object);
      if (!this.index.has(object.name)) this.index.set(object.name, []);

      this.index.get(object.name).push(object);
    });
  },
  get(name) {
    return this.index.get(name);
  },
  remove(name) {
    const object = this.index.get(name);
    if (object) {
      this.objects.splice(this.objects.indexOf(object), 1);
      this.index.delete(name);
    }
  },
};

// Assuming the same collection of objects as before
// collection.index:
//    Apple => [{ id: 400, name: 'Apple' }, { id: 123, name: 'Apple' }]
//    Banana => [{ id: 840, name: 'Banana' }, { id: 456, name: 'Banana' }]
//    Cherry => [{ id: 243, name: 'Cherry' }]

collection.get('Apple');
// [{ id: 400, name: 'Apple' }, { id: 123, name: 'Apple' }]

const id123 = collection.get('Apple').find((obj) => obj.id === 123);
```

While this example isn't perfect, it goes to show you how cardinality works. When we create an index, we essentially **group objects by a property**. The higher the cardinality of the property, the more groups we have. More groups means that, when we search for a specific object, we have to look through fewer items. In the case of low cardinality, we have fewer groups, which means that we have to look through more items to find the one we're looking for.

> [!TIP]
>
> Both examples are pretty basic. The astute reader will notice that both of these indexes may have valid use cases, depending on the nature of the data and the queries you want to perform. For example, if you want to retrieve all objects with a specific `name`, the second index is more efficient. However, if you want to retrieve an object by its `id`, the first index is more efficient. The key takeaway here is that **indexes are not one-size-fits-all**; they should be tailored to the specific use cases of your application.

## Multi-key indexes

In many cases, indexes contain **two or more keys**, what we call **compound indexes**. In such scenarios, **the order of keys matters** a lot. Imagine we want to retrieve a specific object by its `name` and `id`. In this case, we can create a compound index on both properties. Let's extract the indexing creation logic into a function to make it reusable.

```js collapse={29-38}
const createIndex = (keyA, keyB) => {
  const index = new Map();

  const add = (object) => {
    if (!index.has(object[keyA])) index.set(object[keyA], new Map());
    if (!index.get(object[keyA]).has(object[keyB]))
      index.get(object[keyA]).set(object[keyB], []);
  };

  const get = (keyA, keyB) => index?.get(keyA)?.get(keyB) || [];

  const remove = (keyA, keyB) => {
    if (!index.has(keyA) || !index.get(keyA).has(keyB)) return;
    index.get(keyA).delete(keyB);
  };

  return { add, get, delete: remove };
};

const collection = {
  objects: [],
  index: createIndex('name', 'id'),
  add(...objects) {
    objects.forEach((obj) => {
      this.objects.push(object);
      this.index.add(object);
    });
  },
  get(name, id) {
    return this.index.get(name, id);
  },
  remove(name, id) {
    const object = this.index.get(name, id);
    if (object) {
      this.objects.splice(this.objects.indexOf(object), 1);
      this.index.delete(name, id);
    }
  },
};

// Assuming the same collection of objects as before
// collection.index:
//    Apple => {
//      400 => [{ id: 400, name: 'Apple' }],
//      123 => [{ id: 123, name: 'Apple' }]
//    }
//    Banana => {
//      840 => [{ id: 840, name: 'Banana' }],
//      456 => [{ id: 456, name: 'Banana' }]
//    }
//    Cherry => {
//      243 => [{ id: 243, name: 'Cherry' }]
//    }
```

In this example, we create a compound index on the `name` and `id` properties. When we add an object to the collection, we also add it to the compound index. When we want to retrieve an object by its `name` and `id`, we can simply look it up in the compound index. If we want to retrieve the object with `name` equal to `Apple` and `id` equal to `123`, we'll have to retrieve the `Apple` group and then look for the object with `id` equal to `123`. But, let's look at the reverse order of the keys.

```js
// collection.index:
//    400 => { Apple => [{ id: 400, name: 'Apple' }] }
//    840 => { Banana => [{ id: 840, name: 'Banana' }] }
//    243 => { Cherry => [{ id: 243, name: 'Cherry' }] }
//    123 => { Apple => [{ id: 123, name: 'Apple' }] }
//    456 => { Banana => [{ id: 456, name: 'Banana' }] }
```

In this case, we'll simply look up the `id` and there's a single object in the group, meaning fewer comparisons. But, this is inefficient if we want to retrieve all objects with the same `name`, as we can't really use this index at all. Same would go for the `id` property in the last example.

## A full implementation

Having explored the nuances of indexes and cardinality, let's look at an extensive example of an implementation of indexes object collections, allowing you to create an **arbitrary number of indexes with any number of keys**. These indexes can be marked as `unique` (single value per key) or multiple (default).

In this setup, our `ObjectIndex` class is responsible for managing the indexes, while the `ObjectCollection` class provides a higher-level interface for working with the collection of objects. We then add some items to the collection and perform various queries to demonstrate how the indexes work.

> [!TIP]
>
> Feel free to delve into the code and explore how it works. The gist of it is that we've done away with the object array here, as well as the need to manually create and query indexes. We use `structuredClone()` to make sure that objects can only be modified through the collection methods, ensuring that the indexes remain consistent.  We also auto-generate a unique `_id` for each object, if it doesn't already have one. This allows us to create a default index on the `_id` property, which is always unique.

<code-tabs full-width="true" data-selected-tab=2>

```js title="objectIndex.js"
class ObjectIndex {
  constructor(objectKeys, { unique = false } = {}) {
    this.objectKeys = objectKeys;
    this.objectKeyLength = objectKeys.length;
    this.unique = unique;
    this.values = new Map();
  }

  get objects() {
    if (this.objectKeyLength === 1) return [...this.values.values()];

    return [...this.values.values()].flatMap(value =>
      Array.isArray(value) ? value : value.objects
    );
  }

  get(key) {
    return this.values.get(key);
  }

  add(object) {
    if (object === null || object === undefined) return;
    const key = object[this.objectKeys[0]];

    if (this.objectKeyLength === 1) {
      if (this.unique) {
        if (this.values.has(key)) throw new Error(`Duplicate key: ${key}`);
        this.values.set(key, object);
      } else {
        if (!this.values.has(key)) this.values.set(key, []);
        this.values.get(key).push(object);
      }
    } else {
      if (!this.values.has(key))
        this.values.set(
          key,
          new ObjectIndex(this.objectKeys.slice(1), { unique: this.unique })
        );
      this.values.get(key).add(object);
    }
  }

  delete(object) {
    if (object === null || object === undefined) return;
    const key = object[this.objectKeys[0]];

    if (this.objectKeyLength === 1) {
      if (this.unique) this.values.delete(key);
      else {
        const objects = this.values.get(key);
        for (let i in objects)
          if (objects[i] === object) {
            objects.splice(i, 1);
            return;
          }
      }
    } else {
      if (this.values.has(key)) {
        const index = this.values.get(key);
        index.delete(object);

        if (index.values.size === 0) this.values.delete(key);
      }
    }
  }

  find(objectMatcher) {
    if (objectMatcher === null || objectMatcher === undefined) return [];
    const key = objectMatcher[this.objectKeys[0]];

    if (this.objectKeyLength === 1) {
      if (this.values.has(key)) {
        const value = this.values.get(key);
        return Array.isArray(value) ? value : [value];
      } else if (key === undefined) {
        return [...this.values.values()].flatMap(value =>
          Array.isArray(value) ? value : [value]
        );
      }
    } else {
      if (this.values.has(key)) return this.values.get(key).find(objectMatcher);
      else if (key === undefined)
        return [...this.values.values()].flatMap(value =>
          Array.isArray(value) ? value : value.find(objectMatcher)
        );
    }
    return [];
  }
}

export default ObjectIndex;
```

```js title="objectCollection.js"
import ObjectIndex from './objectIndex.js';
import { randomUUID } from 'crypto';

class ObjectCollection {
  #indexes = new Map();

  constructor() {
    this.createIndex(['_id'], { unique: true, name: '_id_' });
  }

  get indexes() {
    return [...this.#indexes.entries()].map(([name, index]) => ({
      name,
      keys: index.objectKeys,
      unique: index.unique,
    }));
  }

  get objects() {
    return this.#objects.map(obj => structuredClone(obj));
  }

  get #objects() {
    return this.#indexes.get('_id_').objects;
  }

  createIndex(objectKeys, { unique = false, name } = {}) {
    const indexKey = name ?? objectKeys.join('_');

    if (this.#indexes.has(indexKey))
      throw new Error(`Index '${indexKey}' already exists`);
    if (objectKeys.length === 0) throw new Error('Index keys cannot be empty');

    const index = new ObjectIndex(objectKeys, { unique });
    this.#indexes.set(indexKey, index);
    this.objects.forEach(object => index.add(object));
  }

  add(...objects) {
    objects.forEach(object => {
      if (!Object.hasOwn(object, '_id')) object._id = randomUUID();

      this.#indexes.forEach(index => index.add(object));
    });
  }

  update(objectMatcher, objectUpdater) {
    const matchedObjects = this.find(objectMatcher);
    if (matchedObjects.length === 0) return;

    const updateObject = object => {
      const updatedObject = { ...object, ...objectUpdater };
      this.#indexes.forEach(index => {
        index.delete(object);
        index.add(updatedObject);
      });
    };

    matchedObjects.forEach(updateObject);
  }

  delete(objectMatcher) {
    const matchedObjects = this.#findRaw(objectMatcher);
    if (matchedObjects.length === 0) return;

    matchedObjects.forEach(object => {
      this.#indexes.forEach(index => index.delete(object));
    });
  }

  find(objectMatcher) {
    return this.#findRaw(objectMatcher).map(obj => structuredClone(obj));
  }

  get(id) {
    return this.#indexes.get('_id_').get(id);
  }

  #findRaw(objectMatcher) {
    const objectMatcherKeys = Object.keys(objectMatcher);
    const matchingIndex = this.#findMatchingIndex(objectMatcher);

    return matchingIndex
      ? this.#findFromIndex(matchingIndex, objectMatcher, objectMatcherKeys)
      : this.#findFromObjects(objectMatcher, objectMatcherKeys);
  }

  #findFromObjects(objectMatcher, objectMatcherKeys) {
    console.log('No matching index found, performing full scan');

    return this.#objects.filter(obj =>
      objectMatcherKeys.every(key => obj[key] === objectMatcher[key])
    );
  }

  #findFromIndex(matchingIndex, objectMatcher, objectMatcherKeys) {
    console.log(
      `Using index '${matchingIndex.name}' [${matchingIndex.keys.join(', ')}] (${matchingIndex.match})`
    );

    const indexMatcher = matchingIndex.keys.reduce((acc, key) => {
      acc[key] = objectMatcher[key];
      return acc;
    }, {});

    const { index } = matchingIndex;
    const indexResults = index.find(indexMatcher);
    if (indexResults.length === 0) return [];

    const restKeys = objectMatcherKeys.filter(
      key => !matchingIndex.keys.includes(key)
    );
    if (!restKeys.length) return indexResults;

    console.log(
      `Filtering ${indexResults.length} results with remaining keys: ${restKeys.join(', ')}`
    );

    const restMatcher = restKeys.reduce((acc, key) => {
      acc[key] = objectMatcher[key];
      return acc;
    }, {});
    return indexResults.filter(obj =>
      restKeys.every(key => obj[key] === restMatcher[key])
    );
  }

  #findMatchingIndex(objectMatcher) {
    const objectMatcherKeys = Object.keys(objectMatcher);
    const matchedIndexes = [...this.#indexes.entries()]
      .map(([name, index]) => {
        // No matching index keys, exclude this index
        if (objectMatcherKeys.every(key => !index.objectKeys.includes(key)))
          return null;

        // Find the first non-matching key
        const firstNonMatchingKeyIndex = index.objectKeys.findIndex(
          key => !objectMatcherKeys.includes(key)
        );

        // No matching keys, exclude this index
        if (firstNonMatchingKeyIndex === 0) return null;

        // No non-matching keys, this index is a full match
        if (firstNonMatchingKeyIndex === -1)
          return { match: 'full', index, name, keys: index.objectKeys };

        // Partial match, return the index and the matched keys
        return {
          match: 'partial',
          index,
          name,
          keys: index.objectKeys.slice(0, firstNonMatchingKeyIndex),
        };
      })
      .filter(Boolean);

    if (matchedIndexes.length === 0) return null;

    console.log(
      `Found matching indexes:\n${matchedIndexes.map(i => `- ${i.name} [${i.keys.join(', ')}] (${i.match})`).join('\n')}`
    );

    // Sort by match type (full match first) and then by number of keys
    matchedIndexes.sort((a, b) => {
      if (a.match === 'full' && b.match === 'partial') return -1;
      if (a.match === 'partial' && b.match === 'full') return 1;
      return b.keys.length - a.keys.length;
    });

    return matchedIndexes[0];
  }
}

export default ObjectCollection;
```

```js title="example.js" {"1":83}{"2":99}{"3":114-115}{"4":137-138}{"5":150} {49,69} collapse={7-36,70-78,84-93,100-108,116-130,139-147,151-160}
import ObjectCollection from './objectCollection.js';
import ObjectIndex from './objectIndex.js';

const collection = new ObjectCollection();

// Add objects to the collection
const fruits = [
  'Grape', 'Pear', 'Peach', 'Plum', 'Kiwi', 'Mango', 'Pineapple', 'Cherry',
  'Strawberry', 'Blueberry', 'Watermelon', 'Melon', 'Papaya', 'Lemon', 'Lime'
];

collection.add({ name: 'Banana', status: 'fresh', origin: 'Ecuador' });
collection.add({ name: 'Apple', status: 'fresh', origin: 'USA', price: 2.0 });
collection.add({ name: 'Orange', status: 'fresh', origin: 'Brazil' });

const origin = ['Greece', 'Italy', 'Spain', 'France'];

for (const fruit of fruits) {
  const roll = Math.random();
  const statuses =
    roll < 0.33 ? ['fresh'] : roll < 0.66 ? ['rotten'] : ['fresh', 'rotten'];

  statuses.forEach(status => {
    const originIndex = Math.floor(Math.random() * origin.length);
    collection.add({ name: fruit, status, origin: origin[originIndex] });
  });

  if (Math.random() > 0.5) {
    const originIndex = Math.floor(Math.random() * origin.length);
    collection.add({
      name: fruit,
      status: 'ripe',
      origin: origin[originIndex],
    });
  }
}

collection.createIndex(['name', 'status'], {
  unique: true,
  name: 'name_status',
});

collection.createIndex(['status'], { unique: false, name: 'status' });
collection.createIndex(['origin'], { unique: false, name: 'origin' });

collection.find({ name: 'Lime' });
// Found matching indexes:
// - name_status [name] (partial)
// Using index 'name_status' [name] (partial)
//
// [
//   {
//     name: 'Lime',
//     status: 'fresh',
//     origin: 'Spain',
//     _id: 'b381f341-6975-487a-af8a-83d18d67d30e'
//   },
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1' });
// Found matching indexes:
// - _id_ [_id] (full)
// Using index '_id_' [_id] (full)
//
// [
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ status: 'ripe' });
// Found matching indexes:
// - status [status] (full)
// Using index 'status' [status] (full)
//
// [
//   ...,
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ status: 'ripe', name: 'Lime' });
// Found matching indexes:
// - name_status [name, status] (full)
// - status [status] (full)
// Using index 'name_status' [name, status] (full)
//
// [
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ origin: 'Spain', name: 'Lime' });
// Found matching indexes:
// - name_status [name] (partial)
// - origin [origin] (full)
// Using index 'origin' [origin] (full)
// Filtering 12 results with remaining keys: name
//
// [
//   {
//     name: 'Lime',
//     status: 'fresh',
//     origin: 'Spain',
//     _id: 'b381f341-6975-487a-af8a-83d18d67d30e'
//   },
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ origin: 'Spain', name: 'Lime', status: 'ripe' });
// Found matching indexes:
// - name_status [name, status] (full)
// - status [status] (full)
// - origin [origin] (full)
// Using index 'name_status' [name, status] (full)
// Filtering 1 results with remaining keys: origin
//
// [
//   {
//     name: 'Lime',
//     status: 'ripe',
//     origin: 'Spain',
//     _id: 'f357ce74-8932-47f0-a87d-da7ea06cbed1'
//   }
// ]

collection.find({ price: 2.0 });
// No matching index found, performing full scan
//
// [
//   {
//     name: 'Apple',
//     status: 'fresh',
//     origin: 'USA',
//     price: 2,
//     _id: '43221e2f-1aff-496f-82ef-b215c677d9f2'
//   }
// ]
```

</code-tabs>

This implementation serves as an **approximation** of how indexes work in real world databases. Querying is done by trying to find the **best matching index** for the given object matcher.

If no index is found, a **full scan** of the objects is performed (5). If an **index is found**, it is used to filter the results based on the keys in the object matcher (1). If **multiple indexes** are found, **full matches** are prioritized over **partial matches** (3), and the index with the **most keys** is used (2). If there are **leftover keys** in the query matcher, the results are filtered further based on those keys (4). You can check the examples above to see how this works in practice or test the code yourself.

## Conclusion

Indexes are a very powerful tool that often feels like a black box. However, understanding how they work and how cardinality affects performance can help you make better decisions when designing your data structures. The implementation we explored today is a simplified version of how indexes work in databases, but it should provide a solid foundation for understanding the concepts behind them.
