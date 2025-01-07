---
title: Modeling complex JavaScript object serialization
shortTitle: Complex object serialization
language: javascript
tags: [object,class]
cover: coffee-phone-tray
excerpt: In the fourth part of the series, we will look at how to serialize complex JavaScript objects.
listed: true
dateModified: 2024-12-26
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
> This article is part of a [series](/js/complex-objects/p/1), picking up where [Modeling complex JavaScript object scopes](/js/s/complex-object-scopes) left off. Make sure to read previous articles in the series before continuing. The entire series is more of a **show & tell**, aiming to <strong class="sparkles">inspire</strong> you to use more advanced JavaScript features and patterns in your projects.

In the last installment, we covered a lot of ground towards making our **model queries reusable**. Our `Model` and `RecordSet` classes are now capable of handling complex queries, and we can even compose them in a way. Our two models, `Post` and `Author` are now fully functional and our code is **well-optimized**. However, we still have one problem to solve - **serialization**.

## Directory structure

As usual, before diving into the code, let's check the directory structure of our project. This time around, we're adding a **new class**, `Serializer`, as well as a **new directory**, called `serializers`.

```plaintext
src/
├── core/
│   ├── model.js
│   ├── recordSet.js
│   └── serializer.js
├── models/
│   ├── author.js
│   └── post.js
└── serializers/
    ├── postSerializer.js
    └── postPreviewSerializer.js
```

> [!TIP]
>
> If you need a code **refresher** without going into all the details, check out the [code summary](/js/s/complex-object-scopes#addendum-code-summary) from the previous article.

## Serialization

If you're not familiar, **serialization** is the conversion of an object into a format that can be stored or transmitted. In our case, we want to convert our `Post` and `Author` objects into a format that can be sent to the client. This format is usually **JSON**.

### Flexible serialization

I'm not exactly sure how common my mileage is in this matter, but I'm quite used to serializers being somewhat **separate from models**. Oftentimes, a serializer will be akin to a view into the model, rather than a one-to-one representation. This is especially true, when design patterns such as decorators or presenters come into play, completely transforming the data.

To that effect, my approach to serialization is a very flexible one. A serializer should only be given a **subject** to serialize and an **options** object. Then, given some standard rules and configuration of attributes, it should be able to produce the desired result without a lot of fuss or poking around too much in the underlying structure.

> [!NOTE]
>
> I'm pretty sure the **original inspiration** for this approach comes from the [`active_model_serializers` Ruby gem](https://github.com/rails-api/active_model_serializers) for Rails. Notice that I'm simply drawing inspiration from it, not trying to replicate it exactly in JavaScript.

In this particular example, we'll be working with two serializers essentially for the same model, `Post`. The first one, `PostSerializer`, will be used to serialize a full post, while the second one, `PostPreviewSerializer`, will be used to serialize a preview of a post, for example as part of a list of posts.

```js
const author = new Author({
  id: 1,
  name: 'John',
  surname: 'Doe',
  email: 'j.doe@authornet.io'
});

const post = new Post({
  id: 1,
  title: 'Hello, World!',
  content: 'Lorem ipsum dolor sit amet.',
  publishedAt: new Date('2024-12-01') ,
  authorId: 1
});

// Sample of a serialized post (PostSerializer)
// {
//   title: 'Hello, World!',
//   content: '<p>Lorem ipsum dolor sit amet.</p>',
//   date: 'Sun, Dec 01, 2024',
//   author: {
//     name: 'John Doe',
//     email: 'j.doe@authornet.io'
//   }
// }

// Sample of a serialized post preview (PostPreviewSerializer)
// {
//   title: 'Hello, World!',
//   date: 'Dec 01, 2024',
//   author: 'John Doe',
//   url: '/posts/1'
// }
```

## Attribute serialization

Each model has its own **attributes**, which, if you remember, are [getter functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). As these attributes are easily accessible and often cached in memory, we can outline which ones we want to serialize.

### Serializing attributes

To create our `Serializer` class, we'll start by defining a simple `constructor`. It will accept a `subject` to serialize and an `options` object. Via the options object, we can pass additional configuration, which can be used later down the line. For now, we'll just store the subject and options in the **class instance**.

```js [src/core/serializer.js]
export default class Serializer {
  constructor(subject, options = {}) {
    this.subject = subject;
    this.options = options;
  }
}
```

Before we can do anything meaningful with this class, we'll need to define a way to dictate the **serializable attributes**. Drawing inspiration from previous implementations, we can utilize our old friend, the [**static initialization block**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks). Using this trick, we can define a `prepare` function, much like we did with the `Model` class.

_But what will this function do?_ you may be asking. Simply put, it will accept the serializer subclass and an **array of attribute names**. Then, it will store these attributes in a static property of the subclass. This way, we can easily access them later on.

```js [src/core/serializer.js]
export default class Serializer {
  static prepare(serializer, attributes) {
    serializer.serializableAttributes = attributes;
  }

  // ...
}
```

Looks simple, right? Let's go ahead and define a `serialize` method, which will return an **object with the serialized attributes**. We'll use the `serializableAttributes` property to filter out the attributes we want to serialize.

```js [src/core/serializer.js]
export default class Serializer {
  // ...

  serialize() {
    return this.constructor.serializableAttributes.reduce(
      (acc, attribute) => {
        acc[attribute] = this.subject[attribute];
        return acc;
      },
      {},
    );
  }
}
```

> [!NOTE]
>
> In this post, I **won't be covering the conversion to a JSON string**, as it's a trivial task, using `JSON.stringify()`. Instead, I'll focus on the **structure** of the serialized object.

Notice the use of `this.constructor` instead of `Serializer`. This is because we want to access the **static property of the subclass**, not the core serializer class. We then retrieve the attribute value from the subject and store it in the accumulator object.

With all of this boilerplate out of the way, we can finally define our `PostSerializer`. For starters, we'll have it return the `title`, `content` and `publishedAt` attributes of a post.

```js [src/serializers/postSerializer.js]
import Serializer from '#src/core/serializer.js';

export default class PostSerializer extends Serializer {
  static {
    super.prepare(this, ['title', 'content', 'publishedAt']);
  }
}
```

Putting it to the test, we can now serialize a post. Sure, it's not much, but it's a start. Notice how the specified attributes are serialized **exactly as defined** in the `Post` model.

```js
// Considering the post object from the previous example

new PostSerializer(post).serialize();
// {
//   title: 'Hello, World!',
//   content: 'Lorem ipsum dolor sit amet.',
//   publishedAt: '2024-12-01T00:00:00.000Z'
// }
```

### Renaming attributes

Sometimes, it's necessary to **rename attributes** when serializing them. One could argue that you can simply add more attribute getters to your models and that would work to an extent, but it would make the models unwieldy and harder to maintain.

Instead, we can introduce the concept of **aliases**. Aliases will be provided as a **two-element array**, where the first element is the name of the serialized attribute and the second element is the name of the attribute getter.

Let's modify the `Serializer`'s `prepare` method to account for that.

```js [src/core/serializer.js]
export default class Serializer {
  static prepare(serializer, attributes) {
    serializer.serializableAttributes = [];

    attributes.forEach(attribute => {
      const isAlias = Array.isArray(attribute);
      const attributeName = isAlias ? attribute[0] : attribute;

      if (!attributeName) return;

      const alias = isAlias ? attribute[1] : null;

      serializer.serializableAttributes.push(attributeName);

      Object.defineProperty(serializer.prototype, attributeName, {
        get() {
          if (!isAlias) return this.subject[attributeName];
          return this.subject[alias];
        },
      });
    });
  }

  // ...
}
```

There are a few things to unpack here. The `prepare` method can accept a **mix of strings and arrays**. If an array is detected, the first element is used as the serialized attribute name, while the second element is used as the attribute getter name. If no second element is provided, the serialized attribute name is used as the getter name.

But the fun part comes later in the function, where `Object.defineProperty()` is used to **define a getter** for the attribute. If an alias is detected, the getter will return the value of the alias attribute, otherwise it will return the value of the attribute itself.

As you may have noticed, this change doesn't really affect the `seralize` method just yet. We'll have to make an adjustment there, too. Instead of relying on the `subject`, we now have each of the `serializableAttributes` as a getter on the serializer instance.

```js [src/core/serializer.js]
export default class Serializer {
  // ...

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

Finally, we can go ahead and update `PostSerializer` with the new alias feature. We'll rename the `publishedAt` attribute to `date`.

```js [src/serializers/postSerializer.js]
import Serializer from '#src/core/serializer.js';

export default class PostSerializer extends Serializer {
  static {
    super.prepare(this, [
      'title',
      'content',
      ['date', 'publishedAt']
    ]);
  }
}
```

```js
// Considering the post object from the previous examples

new PostSerializer(post).serialize();
// {
//   title: 'Hello, World!',
//   content: 'Lorem ipsum dolor sit amet.',
//   date: '2024-12-01T00:00:00.000Z'
// }
```

### Custom attributes

Expanding upon the alias system, one could easily imagine a scenario where you'd want to serialize an **attribute that doesn't exist on the model**. This could be a calculated attribute, a combination of other attributes, or even a completely unrelated value. It may also be a value that requires some additional processing before being serialized, or even be dependent on the options passed to the serializer.

Same as before, let's update our `prepare` method to handle a second argument that is a **function**. This function will be called with the serializer's subject and options, and should return the value to be serialized.

```js [src/core/serializer.js]
export default class Serializer {
  static prepare(serializer, attributes) {
    serializer.serializableAttributes = [];

    attributes.forEach(attribute => {
      const isAlias = Array.isArray(attribute);
      const attributeName = isAlias ? attribute[0] : attribute;

      if (!attributeName) return;

      const alias = isAlias ? attribute[1] : null;

      serializer.serializableAttributes.push(attributeName);

      Object.defineProperty(serializer.prototype, attributeName, {
        get() {
          if (!isAlias)
            return this.subject[attributeName];
          if (typeof alias === 'string')
            return this.subject[alias];
          if (typeof alias === 'function')
            return alias(this.subject, this.options);
          return undefined;
        },
      });
    });
  }

  // ...
}
```

Luckily, this time around, our `serialize` method doesn't need any changes. We can now define a custom attribute in our `PostSerializer`. Let's do that for our `date` attribute, which will format the `publishedAt` attribute into a human-readable date. While we're at it, let's wrap our `content` in a `<p>` tag, too.

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
      }]
    ]);
  }
}
```

```js
// Considering the post object from the previous examples

new PostSerializer(post).serialize();
// {
//   title: 'Hello, World!',
//   content: '<p>Lorem ipsum dolor sit amet.</p>',
//   date: 'Sun, Dec 1, 2024'
// }
```

Alright, cool, but we also want to include the author's information in there, too. As you may remember, the `Author` is a separate model, and the `author` attribute of the `Post` model is a **relationship**. We shouldn't have any trouble using it to serialize the author's name and email. But wait! The `Author` has a `fullName` attribute, which we'd like to use instead of `name` and `surname` separately.

Let's spice it up even more, by making sure that the email depends on the **options** passed to the serializer. If the `showEmail` option is set to `true`, we'll include the email in the serialized object, otherwise we'll just include the name.

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

Looks cool, right? Let's see it put to action in an example.

```js
// Considering the post object from the previous examples

new PostSerializer(post).serialize();
// {
//   title: 'Hello, World!',
//   content: '<p>Lorem ipsum dolor sit amet.</p>',
//   date: 'Sun, Dec 1, 2024',
//   author: {
//     name: 'John Doe'
//   }
// }

new PostSerializer(post, { showEmail: true }).serialize();
// {
//   title: 'Hello, World!',
//   content: '<p>Lorem ipsum dolor sit amet.</p>',
//   date: 'Sun, Dec 1, 2024',
//   author: {
//     name: 'John Doe',
//     email: 'j.doe@authornet.io'
//   }
// }
```

> [!TIP]
>
> **Serializers don't have a cache**, as you may be aware. Be sure to move as much of the heavy lifting to your model's attribute getters as possible. This way, you can avoid repeating costly calculations and  keep your **performance** in check.

## Adding more serializers

As we've already seen, the serializer itself is not tied to the model. This means we can create another serializer with similar attributes, but different underlying implementations. Let's create a `PostPreviewSerializer` that will serialize a post preview, as shown in the example at the beginning of the article.

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

```js
// Considering the post object from the previous examples

new PostPreviewSerializer(post).serialize();
// {
//   title: 'Hello, World!',
//   date: 'Dec 1, 2024',
//   author: 'John Doe'
//   url: '/posts/1'
// }
```

Wow, that really was fast! All of this setup really paid off. Notice how we couldn't have had the two serializers spit out these results without all the hard work that went into aliases and custom attributes. If we hadn't set these up, we would only have been able to have one `date` format or a single `author` structure via the model's calculated attributes. Oh, and forget customization via options!

> [!NOTE]
>
> Yes, _technically_, we could have hacked together a solution with different calculated attributes and just used the simple aliases or transformed the result afterwards, but all of this is far too much hassle. Besides, it's not very **DRY** or maintainable.

## Convenience methods

You're probably used to it by now, but I really love me some **convenience methods**. This time around, we'll keep it simple, adding two static methods to the `Serializer` class, `serialize` and `serializeArray`. The former will create a new instance of the serializer and call the `serialize` method, while the latter will do so for an array of subjects.

```js [src/core/serializer.js]
export default class Serializer {
  // ...

  static serialize(subject, options) {
    return new this(subject, options).serialize();
  }

  static serializeArray(subjects, options) {
    return subjects.map(subject => this.serialize(subject, options));
  }
}
```

I don't suppose it's necessary to show you how to use these methods, as they're pretty straightforward. All they do is provide us with some **syntactic sugar**, so we don't have to create a new instance of the serializer every time we want to serialize something.

## Conclusion

This entry of the series was a little bit _off the Rails_ (get it? because it's not so much about Ruby on Rails... never mind). While it may not seem like much, we've made a huge leap in terms of **reusability** and **flexibility**. Our serializers are capable of handling complex attribute serialization, aliases, custom attributes, and even options. They can also hide a lot of complexity under the hood, so we don't need to dive into details.

As the codebase of this series is starting to get larger and more complex, we might need to address topics such as loading everything and testing the code. The next installments in the series will focus on these topics, so stay tuned!

---

## Addendum: Code summary

You didn't think I'd leave you without a code reference for this article, did you? Make sure to bookmark this for future reference, as we'll need it in the next installment.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/dcde0efb5e973de4b05af6ad9c36a2693292ef43).


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

</details>
