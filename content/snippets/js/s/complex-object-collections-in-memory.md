---
title: Modeling complex JavaScript object collections in memory
shortTitle: Complex object collections modeling
language: javascript
tags: [object,class]
cover: digital-nomad-4
excerpt: A deep dive into a fairly flexible implementation, inspired by Rails' ActiveRecord, for modeling JavaScript object collections in memory.
listed: true
dateModified: 2024-12-05
discussion: 2094
journeyId: js/complex-objects
---

<script>
  document.addEventListener('DOMContentLoaded', () => {
    if (location.hash === '#addendum-code-summary')
      document.querySelector('main > article > details').open = true;
  });
</script>

I've been working with [Ruby on Rails](https://rubyonrails.org/) quite a lot lately. What I've come to like about it the most may be its [ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html#what-is-active-record-questionmark) ORM (Object-Relational Mapping). I won't go into detail about here, but I wanted to share a similar sort of concept I put together for this very website using JavaScript.

> [!IMPORTANT]
>
> This article is part of a [series](/js/complex-objects/p/1). It is more of a **show & tell**, rather than a tutorial. It's fairly complex and quite advanced, so I won't be explaining every single detail. The hope is to <strong class="sparkles">inspire</strong> you to think about using more advanced JavaScript features and building some interesting things with them.

## The idea

What I wanted to accomplish with this project is to have a way to load a fairly large amount of plain objects, which are related to each other. Instead of JavaScript's nesting, referencing and moving around things, I wanted something simple and elegant.

ActiveRecord was my initial inspiration, but the implementation has delved a little bit away from it. Instead of relying on a database, my need was to do this on the fly, using **memory**. I also didn't have a need to update the data in the objects. What I was essentially after was a way to load a **snapshot of data** into memory, populate a bunch of models and then query them.

## Setting up the codebase

Before we move any further, I think it's wise to set up the directory structure, as well as some conventions for how files are loaded. I'm using [**ESM** (ECMAScript Modules)](https://nodejs.org/api/esm.html) for this project, so I can use `import` and `export` statements. ESM also comes with the ability to define an `imports` field in `package.json`, which allows me to define aliases for my imports.

### Directory structure

The overall directory structure looks like this:

```plaintext
src/
├── core/
│   ├── model.js
│   └── recordSet.js
└── models/
    └── post.js
```

We'll come to expand upon this setup in future posts, but for now, this is all we need. The `core` directory contains the core classes, while the `models` directory contains the model classes.

### Import aliases

I've also set up the `imports` field in `package.json` to **alias** the `src` directory. This way, files can be imported using the `#src` alias, instead of having to use **relative paths**.

```json
// package.json
{
  "imports": {
    "#src/*": [
      "./src/*"
    ]
  }
}
```

## The core classes

At the core of this project are two main classes: `Model`, `RecordSet`. In future articles, we'll explore some more of the features that can be added to these classes, but for now, let's focus on the basics.

The `Model` is the **base class** for all models. Its job is to provide a way to define attributes and relationships. Model instances (or **records**) are, for the intents of this implementation, considered immutable. The `RecordSet` is a **collection of records**, which can be queried and filtered.

> [!NOTE]
>
> In this article, I use the terms _instance_ and _record_ **interchangeably**. They both refer to a single model instance in memory. Do not confuse the term "record" with a database record, the JavaScript `Record` type or the class of the same name implemented by various libraries.

## Models & instances

As we've already mentioned, all model records are **immutable** and loaded into memory. This means that each model's records are known ahead of time, so each model class can have a `static` property to store all of its instances.

Unfortunately, if we are to create a core `Model` class and define a `static` property on it, it would be **shared across all subclasses**. This isn't what we want.

After rummaging through various websites, I came across [**static initialization blocks**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks), a relatively new addition to JavaScript. It allows us to run some code when the class is defined, but before any instances are created.

You may be thinking _but how does this help us?_ If we had a global storage for all model instances, we could use a static initialization block to create an array for each subclass. This way, each model class would have its own array of instances.

### Preparing the storage

But how and where will we create such a storage? Well, in the `Model` class, obviously! And, while we're at it, we can create a static method to prepare the storage for each model class. We'll later explore what other useful things we can bundle into this method in the future.

```js [src/core/model.js]
export default class Model {
  static instances = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];
  }
}
```

### Model initialization

Having defined the `Model` class and its `prepare` method, we can now create a subclass of `Model` and call the `prepare` method on it inside a static initialization block. This will create an array for the subclass to store its instances.

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this);
  }
}
```

As you can see, we pass the **model class** itself to the `prepare` method. This way, we can access the class name and create an array for it in the `instances` object. After the new model is defined, the `Model` class's `instances` property will look like this:

```js
Model.instaces; // { Post: [] }
```

## Record querying

Querying records is the most crucial part of this implementation. After all, it's the main reason we're doing this. We can create a `RecordSet` as a **subclass** of `Array` class to handle this responsibility. It provides a way to query records based on their attributes.

> [!NOTE]
>
> While the name may suggest that the `RecordSet` is a subclass of `Set`, I've found that arrays are much simpler to work with. Thus, I decided to subclass `Array` instead, but the original name stuck, reminding me of its `Set` origins.

Leveraging the power of array methods, we need only implement a handful of alias methods to make querying records a breeze. Fan favorites such as `Array.prototype.filter()`, `Array.prototype.find()`, `Array.prototype.map()`, `Array.prototype.reduce()`, and `Array.prototype.sort()` are already available to us!

### The `where` method

The single most useful piece of functionality we need to implement is the `where` method. This method will allow us to **query records based on their attributes**. Again, drawing inspiration from ActiveRecord, I chose to give it a great degree of flexibility, which is reflected in its arguments.

```js [src/core/recordSet.js]
export default class RecordSet extends Array {
  where(query) {
    return RecordSet.from(
      this.filter(record => {
        return Object.keys(query).every(key => {
          // If function use it to determine matches
          if (typeof query[key] === 'function')
            return query[key](record[key]);

          // If array, use it to determine matches
          if (Array.isArray(query[key]))
            return query[key].includes(record[key]);

          // If single value, use strict equality
          return record[key] === query[key];
        });
      })
    );
  }
}
```

This implementation allows us to query records based on their attributes. It expects a query object, where **each key is an attribute name** and **each value is the expected value**. The expectation can then vary quite a lot, namely:

- Given a **comparator function**, it will be called with the attribute value as an argument.
- Given an **array of values**, the attribute value must be included in the array.
- Given anything else (e.g. a **single value**), strict equality is used (i.e., `===`).

We'll come back to use this method in just a moment, but first we need to populate the model instances!

## Storing instances

We've defined the basics of the core classes, but we also need to **load some data** into memory. The `Model` is the best place to do this, via the use of its `constructor`. This way, we can load the data into `instances` when a new model instance is created.

```js [src/core/model.js]
export default class Model {
  // ...
  constructor() {
    const modelName = this.constructor.name;

    // Store the instance in the instances array
    Model.instances[modelName].push(this);
  }
}
```

Now, when we create a new instance of a model, it will be stored in the `instances` array. Each class can simply call the `super` constructor, then load its data into the instance.

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  // ...
  constructor(data) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
  }
}
```

## More record querying

Having set up the two core classes and loaded some data into memory, we should finally be able to query the records. Except, we don't have any way to query them yet.

This is yet another responsibility for the `Model` class. Leveraging the resolution of `this` in the context of `static` methods, we can essentially create query methods on all subclasses, referencing themselves.

Ok, that last bit was somewhat confusing. Let me explain. If we define a `static` method on `Model` and it references `this`, it will resolve to the **subclass that called the method**. Neat, right? This way, we can find the right set of instances in the `instances` array.

> [!TIP]
>
> Confused? Don't worry, the `this` keyword is a tricky thing to master. I suggest reading [this article](/js/s/this) to get a better understanding of it.

### Querying all records

Given that a `RecordSet` is just an array on steroids, we can create a new `RecordSet` from it, using `Array.from()`, or rather, `RecordSet.from()`. Putting the pieces together, we can then define a **static getter method**, `all`, on the `Model` class, which will return a `RecordSet` of all its instances.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...
  static get all() {
    return RecordSet.from(Model.instances[this.name] || []);
  }
}
```

> [!TIP]
>
> Why a **getter method** instead of a regular one? Well, it's a matter of preference. I like how parenthesis are optional in Ruby, so I wanted to mimic that behavior. This way, I can call `Post.all` instead of `Post.all()`. Feel free to tailor this to your own taste!

So, what can we do with this? Filter, sort, use `where` and other methods on the `RecordSet`! Let's see how we can use the `where` method to query the records.

```js
const posts = [
  new Post({ id: 1, title: 'A post', content: '...' }),
  new Post({ id: 2, title: 'Other post', content: '...' }),
  new Post({ id: 3, title: 'A draft', content: '...' }),
];

Post.all.where({ title: 'First post' });
// [Post { id: 1, title: 'First post', content: '...' }]

Post.all.where({ title: title => title.startsWith('A') });
// [
//  Post { id: 1, title: 'A post', content: '...' },
//  Post { id: 3, title: 'A draft', content: '...' }
// ]

Post.all.where({ id: [2, 3] });
// [
//  Post { id: 1, title: 'A post', content: '...' },
//  Post { id: 2, title: 'Other post', content: '...' }
// ]

Post.all.where({ id: id => id % 2 === 1, title: 'A post' });
// [Post { id: 1, title: 'A post', content: '...' }]
```

### Leveraging array methods

Querying is relatively simple using `where`, but we can also use other array methods. For example, we can map over the records or even reduce them!

```js
Post.all.map(post => post.title);
// ['A post', 'Other post', 'A draft']

Post.all.reduce((acc, post) =>
  post.title.includes('post') ? acc + 1 : acc, 0);
// 2
```

## Finishing touches

Before we wrap up, let's add some finishing touches, at least for the time being.

### Querying in the model

First off, I want to make `where` available to the models themselves. Calling `all` seems a little to verbose, after all.

```js [src/core/model.js]
export default class Model {
  // ...
  static where(query) {
    return this.all.where(query);
  }
}
```

See how we're using `this` in the `where` method again? Which will in turn call `all` with the same `this` context, ultimately resolving to the calling subclass. Eloquently simple, isn't it?

### Index methods

Apart from ActiveRecord, Ruby and Rails provide an absolute treasure trove of convenience methods. I especially like `first` and `last` on enumerable objects, making **indexing** in other languages seem so cumbersome. Let's add these to our `RecordSet` as well.

```js [src/core/recordSet.js]
export default class RecordSet extends Array {
  // ...
  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }
}
```

### Partial records

Finally, I'd like a way to quickly **pull some attributes** from the records or create a set of **partial records**. This is where we can leverage the array-like behavior of the `RecordSet` and combine it with the power of `Array.prototype.map()`.

A `pluck` method will allow us to pull a single attribute from each record, while a `select` method will allow us to pull multiple attributes from each record.

```js [src/core/recordSet.js]
export default class RecordSet extends Array {
  // ...
  pluck(attribute) {
    return RecordSet.from(super.map(record => record[attribute]))
  }

  select(...attributes) {
    return RecordSet.from(super.map(record =>
      attributes.reduce((acc, attribute) => {
        acc[attribute] = record[attribute];
        return acc;
      }, {})
    ));
  }
}
```

If you're asking how are these different from `Array.prototype.map()`, they're merely a convenience wrapper around it. We intentionally return a `RecordSet` from these methods, so we can chain them with other `RecordSet` methods. Remember `RecordSet` instances are also arrays, so they can be used as such, too, which makes them very flexible.

One finer detail here is that we use `super` to call the `Array.prototype.map()` method. This is because we're extending `Array` and we want to **call the original method**, in case we ever decide to override it in our class (spoiler: I've done this in my original implementation).

## Conclusion

I hope you've enjoyed this deep dive into this particular implementation. While it may seem esoteric at first, it's a great opportunity to learn about more complex topics and modern JavaScript features. I've found the implementation to be quite capable, and I've already put it to good use. I'm sure you can find some use for it, too!

Wow, that was a lot! And here I was thinking I'd explain the rest of the codebase in this article. I guess I'll have to save that for another time, so stay tuned for that!

---

## Addendum: Code summary

If you're looking for the complete implementation, you can find it below. More code will be added in subsequent articles, so it may come in handy as a reference point.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/8d3a5b7171111ceb63fb2e849860858eba2880a8).

<details>
<summary>View the complete implementation</summary>

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  static instances = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];
  }

  constructor(data) {
    const modelName = this.constructor.name;

    // Store the instance in the instances array
    Model.instances[modelName].push(this);
  }

  static get all() {
    return RecordSet.from(Model.instances[this.name] || []);
  }

  static where(query) {
    return this.all.where(query);
  }
}
```

```js [src/core/recordSet.js]
export default class RecordSet extends Array {
  where(query) {
    return RecordSet.from(
      this.filter(record => {
        return Object.keys(query).every(key => {
          // If function use it to determine matches
          if (typeof query[key] === 'function')
            return query[key](record[key]);

          // If array, use it to determine matches
          if (Array.isArray(query[key]))
            return query[key].includes(record[key]);

          // If single value, use strict equality
          return record[key] === query[key];
        });
      })
    );
  }

  pluck(attribute) {
    return RecordSet.from(super.map(record => record[attribute]))
  }

  select(...attributes) {
    return RecordSet.from(super.map(record =>
      attributes.reduce((acc, attribute) => {
        acc[attribute] = record[attribute];
        return acc;
      }, {})
    ));
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }
}
```

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this);
  }

  constructor(data) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
  }
}
```

</details>
