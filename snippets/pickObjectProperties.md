---
title: pickObjectProperties
tags: object,array,keys,advanced
---

Given an `Object`, and `Array` of matching keys, returns and `Object` with only those keys.

- Uses an `Object` with multiple keys.
- Uses an `Array.prototype` of strings which match keys in the above `Object`.
- Returns and empty object if:
  - No `Object` exists, or object contains no keys.
  - No `Array.prototype` of keys exists.
  - No `Array.prototype` of keys do not match any key values in `Object` provided.

```js
const pickObjectProperties = (object, keys) => {
  // Bail if no object or keys exist.
  if (
    (! object || 0 === Object.getOwnPropertyNames(object).length)
    && (! keys || 0 === keys.length)
  ) {
    return {};
  }

  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => Object.assign(obj, { [key]: object[key] }), {});
}
```

```js
// Returns slim object.
pickObjectProperties({
  id: 12345,
  date: '2019-08-12T06:50:36',
  slug: 'slug',
  status: 'publish',
  type: 'type',
  link: 'https://url.com/slug/',
  title: 'This is a title',
}, [ 'id', 'title' ]); // Returns { id: 123, title: 'This is a title' }.

// Returns empty object.
pickObjectProperties({}, [ 'id', 'title' ]); // Returns {}.
pickObjectProperties(); // Returns {}.
```
