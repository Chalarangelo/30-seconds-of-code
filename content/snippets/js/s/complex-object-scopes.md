---
title: Modeling complex JavaScript object scopes
shortTitle: Complex object scopes
language: javascript
tags: [object,class]
cover: digital-nomad-13
excerpt: In the third installment of implementing an ActiveRecord-like pattern in JavaScript, we'll model and optimize object scoping.
listed: true
dateModified: 2024-12-19
discussion: 2094
journeyId: js/complex-objects
---

<script>
  document.addEventListener('DOMContentLoaded', () => {
    if (location.hash === '#addendum-code-summary')
      document.querySelector('main > article > details').open = true;
  });
</script>

> [!IMPORTANT]
>
> This article is part of a [series](/js/complex-objects/p/1) and picks up where the previous article, [Modeling complex JavaScript object attributes & relationships](/js/s/complex-object-attributes-relationships), left off. If you haven't read it yet, I recommend you do so before continuing. The entire series is more of a **show & tell**, aiming to <strong class="sparkles">inspire</strong> you to use more advanced JavaScript features and patterns.

In the previous two installments, we've covered the core of our implementation, with a `Model` and `RecordSet` class, as well as two models, `Author` and `Post`. We've also implemented **basic querying, attributes and relationships**. This time around, we'll focus on **object scoping**, a way to quickly retrieve a subset of objects from a collection.

## Directory structure

Before we dive into the code, let's take a look at the current directory structure:

```plaintext
src/
├── core/
│   ├── model.js
│   └── recordSet.js
└── models/
    ├── author.js
    └── post.js
```

This time around, we won't be making any changes to the structure, but rather to the existing files. Let's get started!

> [!TIP]
>
> Again, you can find an implementation **refresher** in the [code summary](/js/s/complex-object-attributes-relationships#addendum-code-summary) of the previous article. We'll be building on top of that codebase in this article.

## Scope definitions

ActiveRecord has a concept called **scopes**, which are **predefined queries** that can be reused. These are usually defined in a model and can be chained together to create more complex queries. They provide convenient ways to make your code DRY (Don't Repeat Yourself) and more reusable.

### Filtering scopes

Due to the way, we've implemented our querying system, scopes can be easily defined, yet the **syntax** won't be too similar to that of ActiveRecord. I honestly don't mind this too much, due to the fact that it may make searching for scope usage a little easier.

First things first, however, let's define a scope for our `Post` model. The obvious use case here is to find posts that are published. If you recall, this can be done by checking the `publishedAt` attribute.

```js [src/models/post.js]
import Model from '#src/core/model.js';
import Author from '#src/models/author.js';

export default class Post extends Model {
  // ...
  static published(records) {
    const now = new Date();
    return records.where({ publishedAt: d => d < now });
  }
}
```

> [!NOTE]
>
> You may have noticed that I'm not relying on the `this` keyword, nor am I using the model to retrieve the records, which may strike you as strange. I'll come back round to explain this **design choice** in due time.

If you were to explain what this scope does, you'd definitely use the word **filtering**. While the distinction isn't necessarily an important one, it's better to build step-by-step understanding. Let's see this filter in action:

```js
const posts = [
  new Post({ id: 1, publishedAt: new Date('2024-12-01') }),
  new Post({ id: 2, publishedAt: new Date('2024-12-15') }),
  new Post({ id: 3, publishedAt: new Date('2024-12-20') }),
];

// Supposing the current date is 2024-12-19
const publishedPosts = Post.published(Post.all);
// [ Post { id: 1 }, Post { id: 2 } ]
```

### Sorting scopes

Apart from filtering records, we may also want to sort them. Before we do that, however, I'd like to add an `order` method to our `RecordSet` class. It's not much more than an alias for `Array.prototype.sort()`, but I prefer naming things explicitly. This way we can search for record set operations more easily in larger codebases, instead of deciphering the type of the caller.

```js [src/core/recordSet.js]
export default class RecordSet extends Array {
  // ...
  order(comparator) {
    return RecordSet.from(this.sort(comparator));
  }
}
```

Notice that this `order` method can subtly handle **plain arrays** and `RecordSet`s. This subtlety may come in handy when combined with `pluck` or `Array.prototype.map()` and can save us from a few headaches. We can also expose this method in the `Model` class, same as we did with `where`.

```js [src/core/model.js]
export default class Model {
  // ...
  static order(comparator) {
    return this.all.order(comparator);
  }
}
```

Now that we have defined the `order` method, let's define a scope for our `Post` model that sorts posts by their `publishedAt` attribute, newest first.

```js [src/models/post.js]
export default class Post extends Model {
  // ...
  static byNew(records) {
    return records.order((a, b) => b.publishedAt - a.publishedAt);
  }
}
```

This scope isn't a filtering scope, but rather a **sorting** one. We expect the same amount of records back, but in a different order. Let's see this scope in action:

```js
// Consider the posts from the previous sample and the same current date
const newestPosts = Post.byNew(Post.all);
// [ Post { id: 3 }, Post { id: 2 }, Post { id: 1 } ]
```

## Scope chaining

Now that we have some scopes defined, we can try **chaining** them together. This will allow us to create more complex queries by combining multiple scopes. As scopes are named functions, complex logic can be collapsed into a few keywords, helping future maintainers understand the code more easily.

### Basic chaining

Chaining two scopes is relatively simple. We need only call the first scope and pass the result to the second scope. Let's chain the `published` and `byNew` scopes together:

```js
// Consider the posts from the previous samples and the same current date
const publishedPosts = Post.published(Post.all);
// [ Post { id: 1 }, Post { id: 2 } ]
const newestPublishedPosts = Post.byNew(publishedPosts);
// [ Post { id: 2 }, Post { id: 1 } ]
```

Ok, this is all well and good, but it's not particularly sustainable. Suppose we had half a dozen scopes, readability would quickly deteriorate, dragging maintainability down with it. We can do better!

### Model-level scopes

If you noticed that the strange decisions to pass a `records` argument to the scopes, you're about to find out why. This decision allows us to create a simpler chaining system in the `Model` class itself. All we'll need is a `scope` method that takes a list of **scope names** and applies them in order.

```js [src/core/model.js]
export default class Model {
  // ...
  static scope(...scopes) {
    return scopes.reduce((acc, scope) => this[scope](acc), this.all);
  }
}
```

Finally, `this` comes into play. Remember that in the context of a `static` method in the model, it refers to the **calling class**, i.e. the model itself. This way, all scopes can start with `all` records and build up from there.

Let's see how this new `scope` method can make the previous example less verbose:

```js
// Consider the posts from the previous samples and the same current date
const newestPublishedPosts = Post.scope('published', 'byNew');
// [ Post { id: 2 }, Post { id: 1 } ]
```

Under the hood, the exact same code is executed, but we've made it easier to read and search for. This is a good example of how a small change can make a big difference in the long run.

> [!TIP]
>
> There may be advanced cases, where you'd want to specify the records the scope is applied on, instead of the entire collection. Implementing a **default scope** to replace `all` is a relatively easy customization you can make yourself to handle such cases. Additionally, models can redefine `all` themselves, if you feel like this is a better approach for your use case.

## Attribute caching

Before we wrap this up, I'd like to make some minor adjustments around the codebase. In the `published` scope, we didn't use the `isPublished` calculated attribute, but relied on the `publishedAt` data attribute.

This might be prudent in some cases, as the current date may be slightly different for different records. However, in most cases, we'd use the calculated attribute, as it's less work and milliseconds rarely matter. Let's adjust the `published` scope accordingly:

```js [src/models/post.js]
export default class Post extends Model {
  // ...
  static published(records) {
    return records.where({ isPublished: true });
  }
}
```

This change is minor and seems like we're optimizing the code, but we're rather making it a little slower, if anything. Why is that? If you remember from the previous article, the `isPublished` attribute is **calculated** from some data that exists on the model. The data attribute is essentially **persisted in memory**, while the calculated one isn't. This can come to bite us for more complex operations, larger datasets, or more frequent calls. Let's fix it!

### Caching calculated attributes

We can **cache calculated attributes**, same as we've done for model instances before. The `Model` class can hold this cache, seamlessly populate and use it as needed. Remember that all of our data is considered **immutable**, so a cache will be safe to use.

```js [src/core/model.js]
export default class Model {
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    Object.entries(Object.getOwnPropertyDescriptors(model.prototype)).forEach(
      ([key, descriptor]) => {
        // Find getter functions, create the WeakMap, redefine the getter
        if (typeof descriptor.get === 'function') {
          Model.getterCache[name][key] = new WeakMap();
          Object.defineProperty(model.prototype, key, {
            get() {
              if (!Model.getterCache[name][key].has(this)) {
                // This calls the getter function and caches the result
                Model.getterCache[name][key].set(
                  this,
                  descriptor.get.call(this)
                );
              }
              return Model.getterCache[name][key].get(this);
            },
          });
        }
      }
    );
  }
  // ...
}
```

This code looks intimidating even to me, not gonna lie. But it's the only change we'll have to make. In the `prepare` method, we now create a `WeakMap` for **each getter function on the model**. This map will cache the calculated attribute for each instance, making subsequent calls faster.

_But how?_ you may be asking. We use `Object.getOwnPropertyDescriptors()` to find all the getters on the model, by checking each descriptor's `get` property. If it is a function, we first create a `WeakMap`. If you're not familiar with this data structure, it's a map that doesn't prevent garbage collection of its keys. This is perfect for our use case, as we don't want to keep instances alive just because they have a calculated attribute and we may need to conserve memory.

Then, we **redefine the getter function** itself. This new getter function will first check if the instance has a cached value for the attribute. If it doesn't, it will use the descriptor's `get` property to call the original getter function, calculate the value and cache it, using the **record as the key**.

Quite the elaborate party trick, right? Despite the complexity, this change allows us to calculate attributes only **once per instance**, which can be a huge performance boost for larger datasets or more complex calculations. And the best part is, we don't need to change anything on any of our models, as this works automatically!

> [!NOTE]
>
> I use the term **once per instance** a little liberally here. In fact, due to garbage collection, we have little control over how long the cache will be kept alive. However, for most data-intensive and repeatable operations, this cache will be a huge performance boost.

## Conclusion

As per previous installments, we continue our journey to implement an ActiveRecord-like pattern in JavaScript. This time around, we've focused on making repeated queries more efficient and easier to read. We've implemented scopes, which are predefined queries that can be chained together to create more complex queries. We've also optimized our code by caching calculated attributes, which can be a huge performance boost for larger datasets or more complex calculations.

While the core of the project is starting to take shape, we've yet to address some more advanced features, which we'll cover in future installments. Stay tuned for more and keep on coding!

---

## Addendum: Code summary

As per tradition, the complete implementation up until this point can be found below. This is a good place to pick up from in future installments.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/1b8b3a2193da88801ed9aa8c87879d851e2e14b3).

<details>
<summary>View the complete implementation</summary>

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    Object.entries(
      Object.getOwnPropertyDescriptors(model.prototype),
    ).forEach(([key, descriptor]) => {
      // Find getter functions, create the WeakMap, redefine the getter
      if (typeof descriptor.get === 'function') {
        Model.getterCache[name][key] = new WeakMap();
        Object.defineProperty(model.prototype, key, {
          get() {
            if (!Model.getterCache[name][key].has(this)) {
              // This calls the getter function and caches the result
              Model.getterCache[name][key].set(
                this,
                descriptor.get.call(this)
              );
            }
            return Model.getterCache[name][key].get(this);
          },
        });
      }
    });
  }

  constructor(data) {
    const modelName = this.constructor.name;

    // Store the instance in the instances and indexedInstances
    Model.instances[modelName].push(this);
    Model.indexedInstances[modelName].set(data.id, this);
  }

  static get all() {
    return RecordSet.from(Model.instances[this.name] || []);
  }

  static where(query) {
    return this.all.where(query);
  }

  static order(comparator) {
    return this.all.order(comparator);
  }

  static scope(...scopes) {
    return scopes.reduce((acc, scope) => this[scope](acc), this.all);
  }

  static find(id) {
    return Model.indexedInstances[this.name].get(id);
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

  order(comparator) {
    return RecordSet.from(this.sort(comparator));
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
import Author from '#src/models/author.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this);
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.publishedAt = data.publishedAt;
    this.authorId = data.authorId;
  }

  static published(records) {
    return records.where({ isPublished: true });
  }

  static byNew(records) {
    return records.order((a, b) => b.publishedAt - a.publishedAt);
  }

  get isPublished() {
    return this.publishedAt <= new Date();
  }

  get author() {
    return Author.find(this.authorId);
  }
}
```

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this);
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
  }

  get fullName() {
    return this.surname ? `${this.name} ${this.surname}` : this.name;
  }

  get posts() {
    return Post.where({ authorId: this.id });
  }
}
```

</details>
