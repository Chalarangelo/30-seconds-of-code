---
title: How does JavaScript's structuredClone() differ from other cloning methods?
shortTitle: Deep clone with structuredClone()
language: javascript
tags: [object]
cover: cherry-blossom-boats
excerpt: Learn how to deep clone objects in JavaScript using structuredClone, and how it compares to other cloning methods.
listed: true
dateModified: 2025-08-14
---

Cloning objects in JavaScript is a minefield of edge cases. Shallow copies break with nested data. `JSON.stringify()` drops functions and special types. Even custom deep clone functions may occasionally miss some details.

@[Quick refresher](/js/s/shallow-deep-clone-object)

Luckily, `structuredClone()`, a rather new addition to JavaScript, provides a **robust solution for deep cloning objects**. Yet, the structured clone algorithm has its own quirks and limitations. In this article, we'll explore how it works, how it compares to other cloning methods, and when to use it.

<baseline-support featureId="structured-clone">
</baseline-support>

## Cloning methods overview

Let's start by comparing the available cloning methods. For simplicity, we'll look at **four common approaches**, as shown below:

```js collapse={4-15}
const shallowClone = obj => ({ ...obj });

const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const jsonClone = obj => JSON.parse(JSON.stringify(obj));
```

- `shallowClone` creates a **shallow copy** of the object, meaning nested objects are still references to the original.
- `deepClone` **recursively clones the object**, handling nested objects and arrays.
- `jsonClone` uses **`JSON.stringify()` and `JSON.parse()`** to create a deep clone, but it has limitations with various data types.
- `structuredClone()` is the **new built-in method** that uses the [structured clone algorithm](https://html.spec.whatwg.org/multipage/infrastructure.html#safe-passing-of-structured-data), which handles many edge cases that the other methods do not.

> [!NOTE]
>
> For a **detailed explanation of cloning methods**, see [the previous article on the topic](/js/s/shallow-deep-clone-object).

### Comparison table

<figure>

| Feature | shallowClone | deepClone | JSON | structuredClone |
|---|---|---|---|---|
| Nested objects/arrays | ⚠️ | ✅ | ✅ | ✅ |
| [Functions](#functions) | ⚠️ | ⚠️ | ❌  | ❌ <small>Error</small> |
| [Built-in types](#built-in-types) | ⚠️ | ❌<sup>[1]</sup> | ❌ | ✅ |
| [DOM nodes](#dom-nodes) | ⚠️ | ❌<sup>[2]</sup> | ❌ | ❌ <small>Error</small> |
| [Circular references](#circular-references) | ⚠️ | ❌<sup>[3]</sup> | ❌ <small>Error</small> | ✅ |
| [Prototype chain](#prototype-chain) | ❌ | ❌<sup>[4]</sup> | ❌ | ❌ |
| [Getters/Setters](#getters-and-setters) | ❌ | ❌<sup>[5]</sup> | ❌ | ❌ |
| [Symbol properties](#symbol-properties) | ✅ | ✅ | ❌ | ❌ |
| [Private fields](#private-fields) | ❌ | ❌ | ❌ | ❌ |

<figcaption>
Legend: ✅ = supported, ❌ = not supported, ⚠️ = shallow copy of reference, Error = throws an error<br/>
[1] Built-in types are often not cloned correctly, unless specifically handled</br>
[2] Cloning DOM nodes is inconsistent and can vary by implementation</br>
[3] Circular references will throw an error, unless specifically handled</br>
[4] The prototype chain could be preserved, depending on the implementation</br>
[5] Property descriptors can be preserved, if handled explicitly</br>
</figcaption>
</figure>

## Special cases

Given the previous table, let's explore each of the special cases in more detail, focusing on how `structuredClone()` differs from the other methods. We'll skip the nested object and arrays, as they are handled similarly by all methods except shallow cloning.

### Functions

Neither `structuredClone()` nor `JSON.stringify()` clone functions. Shallow and custom deep clones copy function **references**, without cloning the function itself. This means that the cloned object will still reference the original function, which can lead to unexpected behavior, especially combined with closures or `this` context.

@[You might also like](/js/s/closures)

```js
const obj = { fn: () => 1 };

shallowClone(obj).fn === obj.fn; // true
deepClone(obj).fn === obj.fn; // true
jsonClone(obj).fn; // null
structuredClone(obj); // throws DataCloneError
```

### Built-in types

Built-in objects, like `Date`, `Map`, `Set`, and `RegExp`, are not cloned correctly by `JSON.stringify()`. They are either converted to strings or empty objects. Shallow clones copy **references**, while custom deep clones may fail unless specifically handled. But, `structuredClone()` handles these types correctly, preserving their structure and properties when cloning them.

> [!WARNING]
>
> The structured clone algorithm handles `Error` types a little differently. You may want to check out [the official MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#error_types).

```js
const obj = {
  date: new Date('2025-06-07'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  regexp: /abc/g,
};

shallowClone(obj).date === obj.date; // true (Date object, same for others)
deepClone(obj).date; // Empty object (same for others)
jsonClone(obj).date; // String representation (the rest are empty objects)
structuredClone(obj).date === obj.date; // true (Date object, same for others)
```

> [!IMPORTANT]
>
> **Almost all native types have straightforward constructor-based solutions you can use for cloning them**, if you can't use `structuredClone()`. You can add special handling for them in your custom deep clone function, if needed.

### DOM nodes

**DOM nodes cannot be cloned** with `structuredClone()`. Attempting to do so throws a `DataCloneError`. This makes sense when you consider what it means to clone a DOM node: it would require creating a new node in the document. Other options don't handle this gracefully either, but they don't throw errors, [which might actually be worse](/js/s/vocal-fails-silencing-errors).

```js
const obj = { node: document.querySelector('body') };

shallowClone(obj).node === obj.node; // true
deepClone(obj).node; // Empty DOM node
jsonClone(obj).node; // Empty object
structuredClone(obj); // throws DataCloneError
```

### Circular references

`structuredClone()` **handles circular references out of the box**. `JSON.stringify()` throws and error, and most custom deep clones fail unless specifically designed for handling circular references.

```js
const obj = {};
obj.self = obj;

shallowClone(obj).self === obj; // true
deepClone(obj).self; // throws RangeError: Maximum call stack size exceeded
JSON.stringify(obj); // throws TypeError: Converting circular structure to JSON
structuredClone(obj).self === obj; // false
```

@[Further reading](/js/s/stringify-circular-json)

### Prototype chain

The most surprising letdown of `structuredClone()` is that it **does not preserve the prototype chain**. The cloned object always has `Object.prototype` as its prototype, regardless of the original object's prototype. Yet, none of the other methods preserve the prototype chain either, except if handled explicitly in a custom deep clone function.

```js
const proto = { x: 1 };
const obj = Object.create(proto);

shallowClone(obj).x; // undefined
deepClone(obj).x; // undefined
jsonClone(obj).x; // undefined
structuredClone(obj).x; // undefined
```

@[You might also like](/js/s/classical-vs-prototypal-inheritance)


### Getters and setters

Another shortcoming shared among all options, including `structuredClone()`, is that **getters and setters are not preserved**. Instead, only the current value is cloned, which means that the cloned object does not have the same accessors as the original. In general, **no property descriptors or similar metadata-like features are preserved** by any of the methods, unless explicitly handled in a custom deep clone function.

```js
const obj = {
  valueField: 42,
  get value() {
    return this.valueField;
  },
  set value(val) {
    this.valueField = val;
  },
};
typeof obj.value; // object (getter/setter)

typeof shallowClone(obj).value; // number (independent values)
typeof deepClone(obj).value; // number (independent values)
typeof jsonClone(obj).value; // number (independent values)
typeof structuredClone(obj).value; // number (independent values)
```

@[Further reading](/js/s/add-key-value-pair-to-object#object-define-property)

### Symbol properties

`structuredClone()` **does not clone properties keyed by Symbols**. Instead, it ignores them, just like `JSON.stringify()`. Shallow and custom deep clones copy Symbol properties as references.

```js
const sym = Symbol('key');
const obj = { [sym]: 'value' };

shallowClone(obj)[sym] === obj[sym]; // true
deepClone(obj)[sym] === obj[sym]; // true
jsonClone(obj)[sym]; // undefined
structuredClone(obj)[sym]; // undefined
```

### Private fields

**Private class fields and methods are also not cloned** by `structuredClone()`. Only public, enumerable properties are included in the clone. This is consistent with how other methods handle private properties, as they are not part of the object's enumerable properties.

```js
class Secret {
  #hidden = 42;
  value = 7;
  get hidden() {
    return this.#hidden;
  }
};
const obj = new Secret();

shallowClone(obj); // #hidden is not cloned
deepClone(obj); // #hidden is not cloned
jsonClone(obj); // #hidden is not cloned
structuredClone(obj); // #hidden is not cloned
```

## Performance considerations

Given the fact that `structuredClone()` is a built-in method, it is generally **optimized for performance**. It is faster than custom deep clone functions and `JSON.stringify()`, especially for complex objects with circular references or built-in types.

As a rule of thumb, if `structuredClone()` can handle your use case, **its performance is likely better than any custom solution you could write**. Add on top the fact that it may improve over time as JavaScript engines optimize it, and you have a solid choice for deep cloning.

## When to use `structuredClone()`

As mentioned already, `structuredClone()` is a **powerful tool for deep cloning objects in JavaScript**, natively, without hassle and headaches. That being said, if you don't explicitly need to handle some special edge case that a custom deep clone function would handle, **you should prefer using `structuredClone()` over other methods**. It is fast, safe, and handles many edge cases that break other methods.

You may **consider favoring a custom deep clone function** if you need to:

- Preserve the prototype chain of the original object.
- Clone functions or DOM nodes.
- Preserve property descriptors, getters, or setters.
- Preserve symbol properties.

Even in such scenarios, you can often **write a thin wrapper** around `structuredClone()` to handle any cases you need, while still benefiting from its performance and reliability.

> [!WARNING]
>
> The structured clone algorithm may throw a `DataCloneError` in scenarios not covered here, especially platform-specific objects or types. **Always test your use case** to ensure it works as expected. For a full list of supported types, see [MDN's page on the Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types).

## Conclusion

In conclusion, `structuredClone()` is a **powerful and versatile method for deep cloning objects in JavaScript**. It handles many edge cases that other methods struggle with, such as circular references, built-in types, and complex data structures. While it has some limitations, such as not preserving the prototype chain or cloning functions, **it is still a great choice for most everyday use cases**.
