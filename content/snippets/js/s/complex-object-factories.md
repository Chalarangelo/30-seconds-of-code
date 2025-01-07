---
title: Modeling complex JavaScript object factories
shortTitle: Complex object factories
language: javascript
tags: [object,class]
cover: tranquil-desktop
excerpt: Expanding even further upon our ActiveRecord-inspired project, we'll figure out how to create factories that produce complex objects.
listed: true
dateModified: 2025-01-02
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
> This article is part of a [series](/js/complex-objects/p/1), following [Modeling complex JavaScript object serialization](/js/s/complex-object-serialization). It may still make sense on its own, but it's highly recommended to read the previous articles first. This series is more of a **show & tell** with the aim to <strong class="sparkles">inspire</strong> you to build more advanced JavaScript projects.

In the past four installments, we've created **models**, **queries**, **scopes** and **serialization** for our ActiveRecord-inspired project. As the project grows larger, we might find a need to **test our code**. However, mocking things is hard, especially the more complex our objects get. This is where **factories** come in.

## Directory structure

On top of what we previously built, we'll add a **new class** in the `core` directory, called `Factory`. We'll also start populating the `spec` directory with `factories` for our models.

```plaintext
src/
├── core/
│   ├── model.js
│   ├── recordSet.js
│   ├── serializer.js
│   └── factory.js
├── models/
│   ├── author.js
│   └── post.js
└── serializers/
    ├── postSerializer.js
    └── postPreviewSerializer.js
spec/
└── factories/
    ├── authorFactory.js
    └── postFactory.js
```

> [!TIP]
>
> As usual, you can find a **refresher** of the entire implementation so far in the [code summary](/js/s/complex-object-serialization#addendum-code-summary) from the previous article.

## Fixtures & Factories

In the world of testing, we often need to create **mock data** to test our code. This is often done with **fixtures**, static pieces of data that we can use to test our code. However, fixtures can be cumbersome to maintain, especially as our objects grow complex. They also often break or get outdated, making seemingly unrelated tests fail.

This is where **factories** come in. Factories are **dynamic** pieces of code that can generate **mock data** for our tests. They can be as simple or as complex as we need them to be, and they can be updated easily when our objects change. As far as I can tell, they are based on the **Factory pattern** from the [Gang of Four book](https://en.wikipedia.org/wiki/Design_Patterns).

For this particular implementation, I'm going to loosely base my factories on the [Factory Bot](https://thoughtbot.github.io/factory_bot/) gem for Ruby. The reason is that I'm rather familiar with this library and I like using it, so that's where I'm drawing my inspiration from.

## The Factory class

To create our factories, we'll start by creating a `Factory` class in the `core` directory. As we usually do, we'll start simple and build from there.

### Preparing the factory

First off, we will follow the by-now familiar pattern of using [**static initialization blocks**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks) to create a **registry** of factories. This will allow us to easily access our factories from anywhere in our code.

_But what will the registry hold?_ I hear you asking. If we look to our models, each model needs some initial `data` to pass to its `constructor`. That's what we'll call the **base** of the factory. Then, to allow for more complex objects, we'll also add **traits** to our factories. Traits are essentially modifiers that can be applied to the base data to create customized objects.

Finishing up the setup, we'll also need to pass the **model** to the factory, so it knows what kind of object it's supposed to create. Putting everything together, we arrive at our first draft of the `prepare` static method.

```js [src/core/factory.js]
export default class Factory {
  static factoryMap = new Map();

  static prepare(factory, model, base = {}, traits = {}) {
    const factoryName = factory.name;

    // Store the factory in the factory map
    if (!Factory.factoryMap[factoryName])
      Factory.factoryMap.set(factoryName, {
        model,
        base,
        traits,
      });
  }
}
```

> [!NOTE]
>
> In some cases, you may want **customizable traits** with parameters. For example, you might want a few interdependent fields combined in a trait, but you may want to pass some parameter to create them. While this isn't exactly covered in this article, the next few sections cover a similar pattern, via the use of functions.

### Creating a factory

Given our setup, we can create factories for our models. They won't do much yet, but let's get them set up anyway.

```js [spec/factories/authorFactory.js]
import Factory from '#src/core/factory.js';
import Author from '#src/models/author.js';

const base = {
  id: 1,
  name: 'Author',
  surname: 'Authorson',
  email: 'author@authornet.io',
};

export default class AuthorFactory extends Factory {
  static {
    super.prepare(this, Author, base);
  }
}
```

```js [spec/factories/postFactory.js]
import Factory from '#src/core/factory.js';
import Post from '#src/models/post.js';

const base = {
  id: 1,
  title: 'Post title',
  content: 'Post content',
};

const traits = {
  published: {
    publishedAt: new Date(),
  },
  unpublished: {
    publishedAt: null,
  },
};

export default class PostFactory extends Factory {
  static {
    super.prepare(this, Post, base, traits);
  }
}
```

Notice how we're using the `prepare` method to set up our factories. We're passing the factory itself, the model it's supposed to create, the base data for the model, and any traits we want to apply to the base data. As `Author` is a little simpler for the time being, we only need to pass the base data, skipping the traits entirely.

### Building objects

Now that we have our factories set up, we can start building objects with them. We'll add a static `build` method to our `Factory` class that will take any number of traits and apply them to the base data.

```js [src/core/factory.js]
export default class Factory {
  // ...

  static build(...desiredTraits) {
    const factoryName = this.name;
    const { model, base, traits } = Factory.factoryMap.get(factoryName);

    // Merge the base and traits
    const data = Object.assign(
      {},
      base,
      ...desiredTraits.map((trait) => traits[trait])
    );

    return new model(data);
  }
}
```

What we've done is fairly simple, as you can probably tell. As the `this` context of the function refers to the factory subclass, we can use `this.name` to get the factory name, look up the factory in the registry, and merge the base data with any desired traits. We then pass the resulting data to the model's constructor and return the new object.

```js
const post = PostFactory.build();
// Post { id: 1, title: 'Post title', content: 'Post content' }

const publishedPost = PostFactory.build('published');
// Post {
//   id: 1,
//   title: 'Post title',
//   content: 'Post content',
//   publishedAt: 2025-01-02T00:00:00.000Z
//}
```

### Customizing objects

Our traits are nice and all, but it's inefficient to have to define a trait for every special case in our codebase. While they provide the benefit of **composition**, they can still end up becoming a bit unwieldy.

To solve this, we can allow the `build` method to accept **objects and functions**. Given an object, the method will merge it with the base data. Given a function, it will call the function with the base data and return the result.

```js [src/core/factory.js]
export default class Factory {
  // ...

  static build(...desiredTraits) {
    const factoryName = this.name;
    const { model, base, traits } = Factory.factoryMap.get(factoryName);

    const data = { ...base };

    // Merge the base and traits
    desiredTraits.forEach(trait => {
      if (typeof trait === 'string')
        Object.assign(data, traits[trait]);
      else if (typeof trait === 'object')
        Object.assign(data, trait);
      else if (typeof trait === 'function')
        Object.assign(data, trait(data));
    });

    return new model(data);
  }
}
```

_What can we do with it?_ Well, we can create very specific objects, as needed. For example, let's pass a custom title to our post and a function to generate a random email for our author.

```js
const post = PostFactory.build('unpublished', { title: 'Custom title' });
// Post {
//  id: 1,
//  title: 'Custom title',
//  content: 'Post content',
//  publishedAt: null
// }

const author = AuthorFactory.build(
  { name: 'John' },
  data => ({ email: `${data.name.toLowerCase()}@authornet.io` }
);
// Author {
//  id: 1,
//  name: 'John',
//  surname: 'Authorson',
//  email: 'john@authornet.io'
// }
```

> [!NOTE]
>
> Some of you might be wondering why I didn't choose to make the customized object contain functions, so that `email` can be specified as a function, instead of passing two parameters. This is a **design choice** I stand by, as the cost of calling a function for each property can easily pile up. Instead, most of the time, we can get away with passing a function that generates multiple properties at once. At most, we'll end up with an object and a function for each factory call.

### Clearing objects

In some cases, we might want to **clear out objects**, to make sure they don't interfere with our tests. This is especially useful when we're counting records or checking relationships, for example.

We can add two new methods, `clear` and `clearAll`, to our `Factory` class to handle this. These methods will simply access the **static variables** (`instances`, `indexedInstances` and `getterCache`) of the `Model` class and reset them.

```js [src/core/factory.js]
import Model from '#src/core/model.js';

export default class Factory {
  // ...

  static clear(model) {
    Model.instances[model] = [];
    Model.indexedInstances[model] = new Map();
    Model.getterCache[model] = {};
  }

  static clearAll() {
    Model.instances = {};
    Model.indexedInstances = {};
    Model.getterCache = {};
  }
}
```

And here they are in action, clearing instances created by the `PostFactory`.

```js
PostFactory.build();
Post.all.length; // 1
Factory.clear('Post');
Post.all.length; // 0
```

### Convenience methods

As you're well aware by this point, convenience methods are a staple of my coding style. I definitely dislike having to find the appropriate factory to call every time I need to create an object. I'd much rather call a method on the `Factory` class itself, specifying the model I want to create.

This requires a little bit of setup first. We'll have to add a `modelMap` to our `Factory` class, which will allow us to look up the factory for a given model. And, instead of having a static `build` method on the Factory class, we'll make sure to define it per factory subclass.

```js [src/core/factory.js]
export default class Factory {
  static modelMap = new Map();

  static prepare(factory, model, base = {}, traits = {}) {
    const modelName = model.name;

    // Store the factory in the model map
    if (!Factory.modelMap.has(modelName))
      Factory.modelMap.set(modelName, factory);

    Object.defineProperty(factory, 'build', {
      value: function (...desiredTraits) {
        const data = { ...base };

        // Merge the base and traits
        desiredTraits.forEach(trait => {
          if (typeof trait === 'string')
            Object.assign(data, traits[trait]);
          else if (typeof trait === 'object')
            Object.assign(data, trait);
          else if (typeof trait === 'function')
            Object.assign(data, trait(data));
        });

        return new model(data);
      }
    });
  }

  // Remove the static `build` method
}
```

So far, we've ended up exactly where we were before. Only difference is that we've moved the `build` method to the factory subclass, using `Object.defineProperty()`, which allows us to define a property on the factory subclass. Notice how we can use the `factory` variable to pass the subclass and the `value` descriptor to define the method (in contrast with the `get` descriptor we used before).

Let's go ahead and add our convenience methods now. We'll add a `build` method to the `Factory` class that will look up the appropriate factory for the model and call the `build` method on it. And, while we're at it, let's add a `buildArray` method that will allow us to create an array of objects.

```js [src/core/factory.js]
export default class Factory {
  // ...

  static build(modelName, ...desiredTraits) {
    return Factory.modelMap.get(model).build(...desiredTraits);
  }

  static buildArray(modelName, count, ...desiredTraits) {
    return Array.from({ length: count }, () =>
      Factory.build(model, ...desiredTraits)
    );
  }
}
```

With these methods in place, we can now create multiple objects at once, and all from the `Factory` class itself.

```js
const author = Factory.build('Author', { email: '' });
// Author { id: 1, name: 'Author', surname: 'Authorson', email: '' }

const posts = Factory.buildArray('Post', 3, { content: null }, 'unpublished');
// [
//   Post { id: 1, title: 'Post title', content: null, publishedAt: null },
//   Post { id: 1, title: 'Post title', content: null, publishedAt: null },
//   Post { id: 1, title: 'Post title', content: null, publishedAt: null }
// ]
```

## Sequences

As you may have noticed in the previous example, we're always creating objects with the same `id`. This is fine for most cases, but it can become a problem when we need to test objects with unique identifiers. This is where **sequences** come in. Sequences are a way to generate unique values for our objects.

### Sequence setup

Ok, we're going in the deep end now. We need a way to easily define a sequence inside a factory subclass and assign it to the base data. The sequence must generate a **new value each time**, yet it must be passed into the `base` definition. This is a bit tricky, but we can do it, using some advanced JavaScript features.

After trying a few different approaches, I've settled on hiding the complexity behind the `prepare` method, while exposing a static `sequence` method on the factory subclass. This method will return _something_, which can then be picked up by the `prepare` method and set up an appropriate `build` method for the subclass.

_What sort of something should it return?_ is the million dollar question. I've landed yet again on using the `Symbol` built-in object. This is because `Symbol` is **unique and immutable**, and it can be used as a key in an object. This allows us to return an object with a unique characteristic that we can then easily look up in the `prepare` method.

```js [src/core/factory.js]
const sequenceSymbol = Symbol('sequence');

// ...
```

Notice how we keep the `Symbol` outside of the class and we **don't expose it** in any way. This means that this is an immutable, unique value that can only ever be known to the `Factory` class. This way, we ensure no one can mess with our sequences.

Let's go ahead and define the `sequence` method on our factory subclass now.

```js [src/core/factory.js]
// ...

const isSequence = value =>
  value && typeof value[sequenceSymbol] === 'function';

export default class Factory {
  // ...

  static sequence = (fn = n => n) => {
    let i = 0;
    const sequence = () => fn(i++);
    return { [sequenceSymbol]: sequence };
  };
}
```

A simple **closure** does the trick here. We'll allow the caller to pass a function to transform the sequence value, and we'll return an object with a `[sequenceSymbol]` key that contains the sequence function. This way, we can easily look up the sequence function in the `prepare` method, using our new `isSequence` helper function.

> [!TIP]
>
> If you're unfamiliar with JavaScript's **closures** or simply need a refresher, I highly recommend reading [this article on the subject](/js/s/closures).

Finally, we can update the `prepare` method to look for sequences in the base data and apply them to the object.

```js [src/core/factory.js]
export default class Factory {
  // ...

  static prepare(factory, model, base = {}, traits = {}) {
    const modelName = model.name;

    const factoryBase = {};

    Object.keys(base).forEach(key => {
      const value = base[key];
      const getter = isSequence(value) ? value[sequenceSymbol] : () => value;
      Object.defineProperty(factoryBase, key, {
        get: getter,
        enumerable: true,
      });
    });

    if (!Factory.modelMap.has(modelName))
      Factory.modelMap.set(modelName, factory);

    Object.defineProperty(factory, 'build', {
      value: function (...desiredTraits) {
        const data = { ...factoryBase };

        // Merge the base and traits
        desiredTraits.forEach(trait => {
          if (typeof trait === 'string')
            Object.assign(data, traits[trait]);
          else if (typeof trait === 'object')
            Object.assign(data, trait);
          else if (typeof trait === 'function')
            Object.assign(data, trait(data));
        });

        return new model(data);
      },
    });
  }
}
```

That looks fairly complex at this point. Let's unpack the changes we've made. Using the `isSequence` helper function, we can check if a key in the `base` is a sequence. In that case, we'll use the function returned by the sequence to generate the value. Otherwise, we'll use the value as is.

In order to make this work, we'll have to build a new base from the `base`. However, using `Object.defineProperty()` will normally return **non-enumerable values**, which will break our spread operation (`...`) later down the line. to fix that, we'll have to use `enumerable: true` to make sure the properties are **enumerable**.

> [!NOTE]
>
> I understand that there may be a need to use **sequences in traits**, too. However, I've decided to keep things simple for now. If you need sequences in your traits, it's relatively easy to implement this functionality yourself. Give it a go, I'm sure you'll find it's a fun challenge!

### Using sequences

Finally, we can go ahead and use our sequences in our factories. Let's update our `PostFactory` to include a sequence for the `id`. While we're at it, we can also add a sequence for the `title` field, too. We'll also update `AuthorFactory` to include a sequence for the `id`, too.

```js [spec/factories/postFactory.js]
import Factory from '#src/core/factory.js';
import Post from '#src/models/post.js';

const idSequence = Factory.sequence();
const titleSequence = Factory.sequence(n => `Post #${n}`);

const base = {
  id: idSequence,
  title: titleSequence,
  content: 'Post content',
};

const traits = {
  published: {
    publishedAt: new Date(),
  },
  unpublished: {
    publishedAt: null,
  },
};

export default class PostFactory extends Factory {
  static {
    super.prepare(this, Post, base, traits);
  }
}
```

```js [spec/factories/authorFactory.js]
import Factory from '#src/core/factory.js';
import Author from '#src/models/author.js';

const idSequence = Factory.sequence();

const base = {
  id: idSequence,
  name: 'Author',
  surname: 'Authorson',
  email: 'author@authornet.io',
};

export default class AuthorFactory extends Factory {
  static {
    super.prepare(this, Author, base);
  }
}
```

With these changes in place, we can now create objects with unique attribute values.

```js
const author = Factory.build('Author');
const posts = Factory.buildArray(
  'Post', 3, 'unpublished', { authorId: author.id }
);
// [
//   Post { id: 0, title: 'Post #0', authorId: 0 },
//   Post { id: 1, title: 'Post #1', authorId: 0 },
//   Post { id: 2, title: 'Post #2', authorId: 0 }
// ]
```

Notice how all of our posts have unique identifiers and titles, as they use the sequence we've defined in the factory. Oh, and I've snuck in a **relationship** in this example, too. This last bit worked all along, but we never cared to check, as we were too busy building our factories!

## Conclusion

We've come a long way in this series. We've built **models**, **queries**, **scopes**, **serialization**, and now **factories**. This latest system allows us to easily create complex objects for our tests, and we've even added sequences to generate unique values for our objects. Oh, and customization is a breeze, too!

There are a few bits and pieces that I've implemented or have left out in previous implementation, as well as some problems you may face in the real world using such a setup. Stay tuned for future installments, where I'll cover these topics in more detail!

---

## Addendum: Code summary

Last but not least, here's a summary of the complete implementation. This includes all new classes, as well as previous one, so you can pick up where you left off next time.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/6d1d139e2dd0592d6b2e3d1333616e6d5a005c03).

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

```js [src/core/serializer.js]
export default class Serializer {
  static prepare(serializer, serializableAttributes) {
    serializer.serializableAttributes = [];

    serializableAttributes.forEach((attribute) => {
      const isAlias = Array.isArray(attribute);
      const attributeName = isAlias ? attribute[0] : attribute;

      if (!attributeName) return;

      const alias = isAlias ? attribute[1] : null;

      serializer.serializableAttributes.push(attributeName);

      Object.defineProperty(serializer.prototype, attributeName, {
        get() {
          if (!isAlias) return this.subject[attributeName];
          if (typeof alias === "string") return this.subject[alias];
          if (typeof alias === "function")
            return alias(this.subject, this.options);
          return undefined;
        },
      });
    });
  }

  constructor(subject, options = {}) {
    this.subject = subject;
    this.options = options;
  }

  static serialize(subject, options) {
    return new this(subject, options).serialize();
  }

  static serializeArray(subjects, options) {
    return subjects.map((subject) => this.serialize(subject, options));
  }

  serialize() {
    return this.constructor.serializableAttributes.reduce(
      (acc, attribute) => {
        acc[attribute] = this[attribute];
        return acc;
      },
      {},
    );
  }
}
```

```js [src/core/factory.js]
import Model from '#src/core/model.js';

const sequenceSymbol = Symbol('sequence');

const isSequence = value =>
  value && typeof value[sequenceSymbol] === 'function';

export default class Factory {
  static factoryMap = new Map();
  static modelMap = new Map();

  static prepare(factory, model, base = {}, traits = {}) {
    const modelName = model.name;

    const factoryBase = {};

    Object.keys(base).forEach(key => {
      const value = base[key];
      const getter = isSequence(value) ? value[sequenceSymbol] : () => value;
      Object.defineProperty(factoryBase, key, {
        get: getter,
        enumerable: true,
      });
    });

    if (!Factory.modelMap.has(modelName))
      Factory.modelMap.set(modelName, factory);

    Object.defineProperty(factory, 'build', {
      value: function (...desiredTraits) {
        const data = { ...factoryBase };

        desiredTraits.forEach(trait => {
          if (typeof trait === 'string')
            Object.assign(data, traits[trait]);
          else if (typeof trait === 'object')
            Object.assign(data, trait);
          else if (typeof trait === 'function')
            Object.assign(data, trait(data));
        });

        return new model(data);
      },
    });
  }

  static sequence = (fn = n => n) => {
    let i = 0;
    const sequence = () => fn(i++);
    return { [sequenceSymbol]: sequence };
  };

  static build(model, ...desiredTraits) {
    return Factory.modelMap.get(model).build(...desiredTraits);
  }

  static buildArray(model, count, ...desiredTraits) {
    return Array.from({ length: count }, () =>
      Factory.build(model, ...desiredTraits)
    );
  }

  static clear(model) {
    Model.instances[model] = [];
    Model.indexedInstances[model] = new Map();
    Model.getterCache[model] = {};
  }

  static clearAll() {
    Model.instances = {};
    Model.indexedInstances = {};
    Model.getterCache = {};
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

```js [src/serializers/postSerializer.js]
import Serializer from '#src/core/serializer.js';

export default class PostSerializer extends Serializer {
  static {
    super.prepare(this, [
      'title',
      ['content', post => `<p>${post.content}</p>`],
      ['date', post => {
        const date = new Date(post.publishedAt);
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }],
      ['author', (post, options) => {
        const author = post.author;
        const result = { name: author.fullName };
        if (options.showEmail)  result.email = author.email;
        return result;
      }]
    ]);
  }
}
```

```js [src/serializers/postPreviewSerializer.js]
import Serializer from '#src/core/serializer.js';

export default class PostPreviewSerializer extends Serializer {
  static {
    super.prepare(this, [
      'title',
      ['date', post => {
        const date = new Date(post.publishedAt);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }],
      ['author', post => post.author.fullName],
      ['url', post => `/posts/${post.id}`]
    ]);
  }
}
```

```js [spec/factories/authorFactory.js]
import Factory from '#src/core/factory.js';
import Author from '#src/models/author.js';

const idSequence = Factory.sequence();

const base = {
  id: idSequence,
  name: 'Author',
  surname: 'Authorson',
  email: 'author@authornet.io',
};

export default class AuthorFactory extends Factory {
  static {
    super.prepare(this, Author, base);
  }
}
```

```js [spec/factories/postFactory.js]
import Factory from '#src/core/factory.js';
import Post from '#src/models/post.js';

const idSequence = Factory.sequence();
const titleSequence = Factory.sequence(n => `Post #${n}`);

const base = {
  id: idSequence,
  title: titleSequence,
  content: 'Post content',
};

const traits = {
  published: {
    publishedAt: new Date(),
  },
  unpublished: {
    publishedAt: null,
  },
};

export default class PostFactory extends Factory {
  static {
    super.prepare(this, Post, base, traits);
  }
}
```

</details>
