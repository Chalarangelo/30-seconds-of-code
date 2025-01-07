---
title: Modeling complex JavaScript object attributes & relationships
shortTitle: Complex object attributes & relationships
language: javascript
tags: [object,class]
cover: digital-nomad-15
excerpt: Continuing on the journey to implement an ActiveRecord-like pattern in JavaScript with object attributes and relationships.
listed: true
dateModified: 2024-12-12
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
> This is the second article in a [series](/js/complex-objects/p/1) about a recent project I implemented, inspired by Ruby on Rails' ActiveRecord pattern. It's more of an advanced **show & tell**, aiming to <strong class="sparkles">inspire</strong> readers to use more advanced JavaScript features and patterns. If you haven't read the first article, I recommend you start there: [Modeling complex JavaScript object collections in memory](/js/s/complex-object-collections-in-memory).

In the previous article, we explored the core of modeling complex object collections in memory, by setting up the basis for a `Model` and `RecordSet`, which can help us **manage and interact** with our data. In this article, we'll continue our journey, focusing on **attributes and relationships** between models. We'll also make some optimizations to our implementation to improve performance towards the end.

## Directory structure

As mentioned previously, the directory structure for our project is fairly simple. This time, we'll be adding a **new model** in our `models` directory, along with some code in the existing `core` directory files. Here's what the new structure looks like:

```plaintext
src/
├── core/
│   ├── model.js
│   └── recordSet.js
└── models/
    ├── author.js
    └── post.js
```

> [!TIP]
>
> If you need a **refresher** on the various implementations, you can check out the [code summary](/js/s/complex-object-collections-in-memory#addendum-code-summary) from the previous article.

## Model attributes

In the ActiveRecord pattern, models have attributes that represent the columns in the database. Models can also define methods which act very similarly to attributes, allowing us to retrieve data that may be the result of more complex operations on the model's data.

### Data attributes

Implementing this in JavaScript isn't particularly hard, but we may want to consider - yet again - the often underused [JavaScript **getter** functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) to seamlessly access object properties and methods alike. This decisions will also come in handy later.

Instead of modifying our `Post` model from before, let's create a brand new `Author` model. The model will contain information about an author, such as a name, surname, and email address. We'll also store an `id` for all our models (we've already done this for the `Post` model). We'll come back to that in a minute.

Here's what the `Author` model looks like:

```js [src/models/author.js]
import Model from '#src/core/model.js';

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
}
```

This simple model definition has given us access to the `id`, `name`, `surname`, and `email` attributes. We will call these _data attributes_ to differentiate them from _calculated attributes_, which we'll be defining next.

> [!NOTE]
>
> This is a semantics distinction rather than anything else. I only make this distinction to **help the reader understand** that some attributes are stored in the object itself (data attributes) while others are calculated from the object's data (calculated attributes).

### Calculated attributes

Now that we have a model with some data attributes, let's add a calculated attribute to our `Author` model. For this instance, we want a `fullName` attribute that concatenates the `name` and `surname` attributes.

To achieve this, we can use a getter function in the `Author` model:

```js [src/models/author.js]
import Model from '#src/core/model.js';

export default class Author extends Model {
  // ...
  get fullName() {
    return this.surname ? `${this.name} ${this.surname}` : this.name;
  }
}
```

Data attributes are quite versatile and allow us to **hide complexity** behind seemingly simple properties. In this example, we take care to handle the case where the `surname` is empty, as we consider it optional for this model.

#### Temporal attributes

Other cases may require comparison with external data or data that is **time-sensitive**. Let's look at our `Post` model for an example of a calculated attribute that depends on the current date. We'll first update its constructor to accept a `publishedAt` attribute.

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  // ...
  constructor(data) {
    super(data);
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.publishedAt = data.publishedAt;
  }
}
```

Then, we can create a calculated attribute to check if the post is published. To do this, we'll compare the `publishedAt` attribute with the current date and return a boolean value.

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  // ...
  get isPublished() {
    return this.publishedAt <= new Date();
  }
}
```

## Model relationships

In the ActiveRecord pattern, models can have relationships with other models. These relationships can be **one-to-one**, **one-to-many**, or **many-to-many**. One-to-one and one-to-many relationships are the most common and are relatively easy to implement, while many-to-many relationships are a little trickier to deal with.

We'll largely do away with these conventions and, instead simplify relationships to _single_ and _multiple_. A single relationship means that a model instance references a **single instance** of another model, while a multiple relationship means that a model instance references **multiple instances** of another model.

### Single relationships

Single relationships are simple to implement. In our case, we'll add a single relationship from the `Post` model to the `Author`, meaning that each post will have **exactly one** author.

To make single relationships easier, we'll use the `id` attribute we sneaked into our models earlier. We'll also update our `Model` class with a `static` `find` method, that can retrieve and return a model instance by its `id`.

```js [src/core/model.js]
export default class Model {
  // ...
  static find(id) {
    return this.all.find(model => model.id === id);
  }
}
```

> [!TIP]
>
> Remember, `this` in the context of this method refers to the **calling class**, which means that `Author.find(id)` will return an `Author` instance, while `Post.find(id)` will return a `Post` instance.

Next, we can update our `Post` model to include an `authorId` attribute:

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  // ...
  constructor(data) {
    super(data);
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.publishedAt = data.publishedAt;
    this.authorId = data.authorId;
  }
}
```

#### Related record retrieval

Ok, now we have an `authorId` attribute in our `Post` model. But how do we get the actual `Author` model from this `authorId`? We can create a getter function in the `Post` model to do this, using our `find` method from before.

```js [src/models/post.js]
import Model from '#src/core/model.js';
import Author from '#src/models/author.js';

export default class Post extends Model {
  // ...
  get author() {
    return Author.find(this.authorId);
  }
}
```

Technically, `author` is **yet another calculated attribute**, but it's special - a calculated attribute that returns another model instance. This is the basis of a single relationship!

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
  content: 'This is my first post.',
  publishedAt: new Date('2024-12-08'),
  authorId: author.id
});

post.author;
// Author { id: 1, name: 'John', surname: 'Doe', email: 'j.doe@authornet.io' }
post.author.fullName; // 'John Doe'
```

### Multiple relationships

As you may have noticed, I skipped adding the **other side of the relationship** in the previous section. This means that no `Author` instance can easily retrieve all the posts written by that author.

This, however, is a case of a multiple relationship, where a model instance references multiple instances of another model. `Author` instances also don't have any `id` references to `Post` instances. How can we solve this?

Thinking in a similar manner as before, a `posts` relationship would simply be a calculated attribute. Its job is to retrieve all posts by an author. But we know the author's `id`! And we also have a way to get all records that match specific criteria, via the `where` method in the `RecordSet` class!

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  // ...
  get posts() {
    return Post.where({ authorId: this.id });
  }
}
```

Pretty simple, huh? With barely any extra code, we've managed to create a relationship from the `Author` model to the `Post` model. Complex relationship chains can be built in a similar manner, by chaining calculated attributes together.

```js
const author = new Author({
  id: 1,
  name: 'John',
  surname: 'Doe',
  email: 'j.doe@authornet.io'
});

const post1 = new Post({
  id: 1,
  title: 'Hello, World!',
  content: 'This is my first post.',
  publishedAt: new Date('2024-12-08'),
  authorId: author.id
});
const post2 = new Post({
  id: 2,
  title: 'Goodbye, World!',
  content: 'This is my last post.',
  publishedAt: new Date('2024-12-12'),
  authorId: author.id
});

author.posts;
// [Post { id: 1}, Post { id: 2 }]

// Supposing the current date is 2024-12-10
author.posts.where(post => post.isPublished);
// [Post { id: 1 }]
```

> [!NOTE]
>
> I've carefully avoided **many-to-many relationships** here, mainly to keep things neat and simple. If you were to model them, you'd store an **array** of `id`s in a model instance, then use a `where` query to retrieve the related instances. The other side of the relationship would be pretty much the same as the `posts` attribute in the `Author` model, except you'd combine your `where` query with `pluck` to get the related `id`s.

## Advanced querying

One emergent behavior of this implementation is the ability to **query models based on all their attributes**, not just the data attributes. This can unlock a lot of potential for complex queries and relationships.

### Querying calculated attributes

Calculated attributes are implemented as getter functions, which means our `where` method can directly query them any way we like. Same goes for `pluck` and `select`, as well as built-in array methods, such as `Array.prototype.map()`.

```js
// Consider the posts from the previous sample and the same current date
const posts = Post.all;

posts.where(post => post.isPublished);
// [Post { id: 1 }]

posts.pluck('title');
// ['Hello, World!', 'Goodbye, World!']

posts.map(post => post.isPublished);
// [true, false]
```

### Querying relationships

Relationships can be used in queries, too. After all, they're simply calculated properties we've given a special meaning to. This means we can query relationships just like any other attribute.

```js
const authors = Author.all;

authors.where(author => author.posts.length > 1);
// Author { id: 1 }

authors.pluck('posts');
// [[Post { id: 1 }, Post { id: 2 }]

authors.map(author => author.posts.length);
// [2]
```

> [!TIP]
>
> The astute reader may have noticed by this point that mostly any attribute displays the same qualities in terms of querying. This observation paves the way for **relationships through intermediate models** (e.g. comments belonging to a post belonging to an author can be queried through the `Author` instance itself). ActiveRecord's `:through` associations may come to mind here.

### Optimizing `id` queries

One thing you may have noticed is that we query records by `id` quite a lot. In fact, it may be our **most common operation**. We've already made record retrieval use a central storage on the `Model` class, but what if we could do more?

What I've done in my implementation is quite simple - I've added a second, **indexed storage**, using `Map` objects. Apart from `instances`, I also have `indexedInstances`, where each model has its own `Map` and we can quickly retrieve a record by id.

For this to work, we also need to update the `prepare` method, along with the `constructor` of the `Model` class. And don't forget `find`! By changing its underlying implementation, we essentially **optimize the performance of all queries** that rely on the `id` attribute.

```js [src/core/model.js]
export default class Model {
  static instances = {};
  static indexedInstances = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }
  }

  constructor(data) {
    const modelName = this.constructor.name;

    Model.instances[modelName].push(this);
    Model.indexedInstances[modelName].set(data.id, this);
  }

  static find(id) {
    return Model.indexedInstances[this.name].get(id);
  }
}
```

This is a simple optimization that can greatly improve the performance of your application, especially if you're dealing with a large number of records.

> [!NOTE]
>
> In reality, in my project I didn't implement this _exactly_ like that. The main difference is that I made the `id` attribute a **configurable set of attributes** that each model can define for itself. This makes the code a little more complicated and doesn't depart a ton of value at this point, but you can easily figure it out for yourself.

## Conclusion

In this second installment of our journey to implement an ActiveRecord-like pattern in JavaScript, we've focused on modeling complex object attributes and relationships. While it may have sounded a little intimidating at first, it wasn't so bad, right? The power of JavaScript's object-oriented features and built-in methods can help you abstract complexity fairly easily.

There's a ton more to explore in this project, so stay tuned for the next installment where we'll dive into yet more advanced behavior, implementation details and optimizations. Until then, happy coding!

---

## Addendum: Code summary

Yet again, here's the complete implementation up until this point in the series. You may want to use it as a reference point or to test the code yourself.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/8011287839c3dba71140514f01a4f9c7ae4a36ad).

<details>
<summary>View the complete implementation</summary>

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  static instances = {};
  static indexedInstances = {};

  static prepare(model) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }
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
