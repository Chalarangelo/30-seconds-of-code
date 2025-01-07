---
title: Modeling complex JavaScript object advanced relationships
shortTitle: Complex object advanced relationships
language: javascript
tags: [object,class]
cover: digital-nomad
excerpt: In this installment of the ActiveRecord-like JavaScript implementation, we will revisit modeling relationships between objects.
listed: true
dateModified: 2025-01-23
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
> This article is part of a [series](/js/complex-objects/p/1), picking up where [Modeling complex JavaScript object autoloading and console](/js/s/complex-object-autoloading-console) left off. If you haven't read the previous installments yet, I strongly advise you to do so to get the full context. This series is more of a **show & tell** hoping to <strong class="sparkles">inspire</strong> you to build your own advanced JavaScript projects.

We've already come a long way implementing an ActiveRecord-like JavaScript object system. While we've already covered **models**, **records** and **queries** extensively, I want to revisit the **relationships** between objects. The current implementation is fairly basic and I believe we can do plenty more to make it more powerful.

## Directory structure

This time, we'll simply add a **new model** under our `models` directory. We'll also implement the relevant **factory** for it to match the rest of the implementation. And we'll make a few updates in the `Model` class and our models to support the new features.

```plaintext
src/
├── config/
│   └── settings.js
├── core/
│   ├── model.js
│   ├── recordSet.js
│   ├── serializer.js
│   └── factory.js
├── models/
│   ├── author.js
│   ├── category.js
│   └── post.js
├── scripts/
│   ├── autoload.js
│   └── console.js
└── serializers/
    ├── postSerializer.js
    └── postPreviewSerializer.js
spec/
└── factories/
    ├── authorFactory.js
    ├── categoryFactory.js
    └── postFactory.js
```

> [!TIP]
>
> You may need a code **refresher** before you begin and I've got you covered. The entire implementation thus far is available in the [code summary](/js/s/complex-object-autoloading-console#addendum-code-summary) of the previous article.

## Housekeeping

Before we begin, I want to address a couple of things to make the rest of the implementation easier. Firstly, some cleaning up in the `Model` class's `prepare` method. Then, we'll add our new `Category` model and factory, and finally, we'll add a relationships to our `Post` model.

### Refactoring `prepare`

In the past, we've heavily relied on the `prepare` method of the `Model` class to set up our models. As we're going to add even more logic to it, the arguments will start becoming a little hard to manage. Let's **switch from a list of arguments to an object**.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, { fields, validations = [], relationships = [] }) {
    // ...
  }

  // ...
}
```

This small change will break everything, so we need to **update the models** accordingly.

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, {
      fields: [
        ['name', { type: 'string', allowEmpty: false }],
        ['surname', 'string'],
        ['email', { type: 'string', unique: true, inspectable: false }],
      ],
      validations: [record => record.email.includes('@')],
    });
  }

  // ...
}
```

```js [src/models/post.js]
import Model from '#src/core/model.js';
import Author from '#src/models/author.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this, {
      fields: [
        ['title', { type: 'string', allowEmpty: false }],
        ['content', 'string'],
        ['publishedAt', { type: 'date', defaultValue: new Date() }],
        ['authorId', 'number'],
      ],
    });
  }

  // ...
}
```

### Adding the `Category` model

We'll now create a `Category` model and a relevant `CategoryFactory` to match the rest of the implementation. We'll use this model as the main example for some of our relationships later in the article.

```js [src/models/category.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
    });
  }

  constructor(data) {
    super(data);
  }

  get posts() {
    return Post.where({ categoryId: this.id });
  }
}
```

```js [spec/factories/categoryFactory.js]
import Factory from '#src/core/factory.js';
import Category from '#src/models/category.js';

const idSequence = Factory.sequence();
const titleSequence = Factory.sequence(n => `Category #${n}`);

const base = {
  id: idSequence,
  title: titleSequence,
};

export default class CategoryFactory extends Factory {
  static {
    super.prepare(this, Category, base);
  }
}
```

But wait! _Posts don't have a `categoryId` field!_, I hear you say. Let's add it, then!

```js [src/models/post.js]
import Model from '#src/core/model.js';
import Author from '#src/models/author.js';
import Category from '#src/models/category.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this, {
      fields: [
        ['title', { type: 'string', allowEmpty: false }],
        ['content', 'string'],
        ['publishedAt', { type: 'date', defaultValue: new Date() }],
        ['authorId', 'number'],
        ['categoryId', 'number'],
      ],
    });
  }

  // ...

  get category() {
    return Category.find(this.categoryId);
  }
}
```

Now all of our posts are related to categories, much like they would in a real-world blogging setup. The relationship is **one-to-many**, where a post can belong to only one category, but a category can have many posts, same as it is with authors.

## Relationship definitions

We've previously defined relationships via the use of a **field** that is then used by an **attribute method** to fetch the related records. This works alright, but **scaling** the project will become a bit of a hassle. We'll now introduce a new way to define relationships, which will make the implementation more scalable.

In order to create relationship definitions, we'll lean on the `prepare` method once more. We will be adding a `relationships` array as part of our options object. The first element of the array will be the type of relationship, whereas the second one will be the related model.

### Belongs to

Again, drawing inspiration from ActiveRecord, we'll start with the `belongsTo` relationship. This relationship is used when a record belongs to another record. In this case, the record that _belongs to_ the other record is the one defining the **foreign key**.

In our case, this is the `Post` model, which belongs to an `Author` via the `authorId` field. The same applies to the relationship from `Post` to `Category` via the `categoryId` field.

Let's start by adding the logic for the `belongsTo` relationship in the `Model` class.


```js [src/core/model.js]
// ...

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const decapitalize = str => str.charAt(0).toLowerCase() + str.slice(1);
const toSingular = str => str.replace(/s$/, '');

export default class Model {
  static models = {};
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model, { fields, validations = [], relationships = [] }) {
    const name = model.name;

    if (Model.models[name])
      throw new Error(`Model ${name} has already been prepared`);
    else Model.models[name] = model;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    model.validations = validations || [];
    model.indexes = [];
    model.fields = {};

    let relationshipFields = [];

    relationships.forEach(relationship => {
      let [relationshipType, target] = relationship;

      if (relationshipType === 'belongsTo') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    ['id', ...fields, ...relationshipFields].forEach(field => {
      // ...
    });

    // ...
  }

  // ...
}
```

As you can see, we've added a new `models` static variable to the `Model` class. This serves as a **storage for all initialized models**. We then ensure that relationships are stored as **field definitions** in `relationshipFields`, which will then be used to create the individual fields automatically.

Finally, we arrive at the **getter definition**. If you remember from previous articles, we use `Object.defineProperty` towards the end of the `prepare` method to **redefine getters**, so that they can utilize the `getterCache` for performance reasons. In order to retain this **performance enhancement**, we need to create our new getter as `configurable`, so that it can be then redefined later down the line.

Additionally, you may notice the `targetModel` declaration is inside the `get` method. This is a crucial point to take note of, as it ensures that the target model is fetched only **when the getter is accessed**. This is important, as models can be initialized in any order and, if we move it outside of the getter, it may not be available at definition time.

Having done all this, we can now update our `Post` model to include the `belongsTo` relationships. We'll have to **delete** the `authorId`, `categoryId`, `author` and `category` fields and methods, as they are no longer needed. And, this way, we can drop the imports for `Author` and `Category` as well.

```js [src/models/post.js]
import Model from '#src/core/model.js';
// Delete the imports for Author and Category

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this, {
      fields: [
        ['title', { type: 'string', allowEmpty: false }],
        ['content', 'string'],
        ['publishedAt', { type: 'date', defaultValue: new Date() }],
        // Delete the authorId and categoryId fields
      ],
      relationships: [
        ['belongsTo', 'author'],
        ['belongsTo', 'category'],
      ],
    });
  }

  // ...

  // Delete the author and category methods
}
```

### Has one

The previous code looks a lot tidier now and we can easily add more relationships in the future without having to worry about the implementation details. While we do not have any `hasOne` relationships in our current setup, we'll go ahead an implement the logic regardless.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, { fields, validations = [], relationships = [] }) {
    // ...

    relationships.forEach(relationship => {
      let [relationshipType, target] = relationship;

      if (relationshipType === 'belongsTo') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasOne') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(target)];
            return targetModel.where({ [foreignKey]: this.id }).first;
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    // ...
  }

  // ...
}
```

As you can see, very little has changed from the previous setup. Instead of using the `find` method on the other model, we use `where` with a **query** that utilizes the `foreignKey` to find the related record. This is a very simple implementation, but it should be enough for most use cases.

As the `hasOne` relationships expects the `foreignKey` to be on the other model, we **don't need to add any additional fields** to the current model, unlike `belongsTo` relationships.

> [!NOTE]
>
> _But why not `findBy`?_ I hear you asking. Well, there is **no guarantee that the target field is unique**, thus it may not have an index. If you have implemented indexes that are not tied to uniqueness constraints or have tweaked `findBy` to handle non-indexed fields, then you can use it instead.

### Has many

Similar to the `hasOne` relationship, we can implement a `hasMany` relationship. To be honest, this is almost the exact same piece of code, except we'll remove the `first` method call at the end of the getter.


```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, { fields, validations = [], relationships = [] }) {
    // ...

    relationships.forEach(relationship => {
      let [relationshipType, target] = relationship;

      if (relationshipType === 'belongsTo') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasOne') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(target)];
            return targetModel.where({ [foreignKey]: this.id }).first;
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasMany') {
        const propertyName = decapitalize(target);
        const foreignKey = `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel =
              Model.models[capitalize(toSingular(target))];
            return targetModel.where({ [foreignKey]: this.id });
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    // ...
  }

  // ...
}
```

Ok, apart from that little detail, you may have noticed that we also **ensure the model name is singular**. This is on purpose, so we can declare the relationship in a more human-readable way. For example, in the `Author` model, we can declare a `hasMany` relationship to `Post` as `posts` instead of `post`.

> [!NOTE]
>
> I know that my `toSingular` method is very simplistic and will only work for some English words. Implementing a more robust solution is **outside the scope of this article**, however, we'll take a look at aliases and foreign keys in the next section, which should solve the problem even better.

Let's go ahead and add a `hasMany` relationship to the `Author` model. We'll also delete the `posts` method, as it is no longer needed, as well as the import for the `Post` model. While we're at it, let's do the exact same for the `Category` model.

```js [src/models/author.js]
import Model from '#src/core/model.js';
// Delete the import for Post

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, {
      fields: [
        ['name', { type: 'string', allowEmpty: false }],
        ['surname', 'string'],
        ['email', { type: 'string', unique: true, inspectable: false }],
      ],
      validations: [record => record.email.includes('@')],
      relationships: [['hasMany', 'posts']],
    });
  }

  // ...

  // Delete the posts method
}
```

```js [src/models/category.js]
import Model from '#src/core/model.js';
// Delete the import for Post

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
      relationships: [['hasMany', 'posts']],
    });
  }

  // ...

  // Delete the posts method
}
```

> [!NOTE]
>
> Same as last time, I haven't implemented **many-to-many relationships** to minimize complexity. They're left as a task for the reader, if you want to get your hands dirty and you feel like you truly need them for your use case.

## Relationship customization

So far so good, but **customization** is definitely going to be an issue in the long run. I want to create a taxonomy of categories, too. This will require categories that have a parent category, which is a category itself. This is a **self-referential relationship** and we'll need to add a little bit of logic to handle it. And we need to address naming conventions, too.

### Foreign keys

Up until this point, **foreign keys** have been dictated by the target model's name. This is a good **default**, but it's not always going to work. We may want to go down the field definition route and allow our second array element to be an **object**. If it is, we can let it define a `target` (the model name) and a `foreignKey` (the field name). This will allow us to effectively decouple the two.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, { fields, validations = [], relationships = [] }) {
    // ...

    relationships.forEach(relationship => {
      let [relationshipType, options] = relationship;
      if (typeof options === 'string') options = { target: options };

      if (relationshipType === 'belongsTo') {
        const propertyName = decapitalize(options.target);
        const foreignKey =
          options.foreignKey || `${decapitalize(options.target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasOne') {
        const propertyName = decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.where({ [foreignKey]: this.id }).first;
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasMany') {
        const propertyName = decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel =
              Model.models[capitalize(toSingular(options.target))];
            return targetModel.where({ [foreignKey]: this.id });
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    // ...
  }

  // ...
}
```

Great! Let's apply this to create a parent category relationship in the `Category` model.

```js [src/models/category.js]
import Model from '#src/core/model.js';

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
      relationships: [
        [
          'belongsTo',
          { target: 'category', foreignKey: 'parentId' },
        ],
      ],
    });
  }

  constructor(data) {
    super(data);
  }

  static root(records) {
    return records.where({ parentId: null }).first;
  }
}
```

```js
const rootCategory = new Category({ title: 'Root', parentId: null });
const subCategory = new Category({ title: 'Sub', parentId: rootCategory.id });

subCategory.category;
// [Category #0x00000000]: { id: 0, title: 'Root', parentId: null }
```

Not quite what we were looking for. While the foreign key has the correct name and the relationship is applied, the relationship attribute is still called `category`. We can fix this!

### Aliases

If you were guessing we're going to implement **aliases** via the `as` property, you're absolutely right! This will allow us to define a **custom name** for the relationship attribute. Let's go ahead and modify the `prepare` method one last time.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, { fields, validations = [], relationships = [] }) {
    // ...

    relationships.forEach(relationship => {
      let [relationshipType, options] = relationship;
      if (typeof options === 'string')
        options = { target: options, as: decapitalize(options) };

      if (relationshipType === 'belongsTo') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey =
          options.foreignKey || `${decapitalize(options.target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasOne') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.where({ [foreignKey]: this.id }).first;
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasMany') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel =
              Model.models[capitalize(toSingular(options.target))];
            return targetModel.where({ [foreignKey]: this.id });
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    // ...
  }

  // ...
}
```

Now, we can make update the `Category` model to reflect the new `as` property.

```js [src/models/category.js]
import Model from '#src/core/model.js';

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
      relationships: [
        [
          'belongsTo',
          { target: 'category', foreignKey: 'parentId', as: 'parent' },
        ],
      ],
    });
  }

  constructor(data) {
    super(data);
  }

  static root(records) {
    return records.where({ parentId: null }).first;
  }
}
```

```js
const rootCategory = new Category({ title: 'Root', parentId: null });
const subCategory = new Category({ title: 'Sub', parentId: rootCategory.id });

subCategory.parent;
// [Category #0x00000000]: { id: 0, title: 'Root', parentId: null }
```

### Self-referential relationships

What we did with the `parent` relationship is what one would call a **self-referential relationship**. This is a relationship where a record can be related to another record of the **same model**. This concept can come in handy in various scenarios.

Another way to use this, for example, is to create the inverse relationship, where a category can have many subcategories. There's nothing stopping us from defining it in the `Category` model, same as before.

```js [src/models/category.js]
import Model from '#src/core/model.js';

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
      relationships: [
        [
          'belongsTo',
          { target: 'category', foreignKey: 'parentId', as: 'parent' },
        ],
        [
          'hasMany',
          { target: 'category', foreignKey: 'parentId', as: 'children' },
        ],
      ],
    });
  }

  constructor(data) {
    super(data);
  }

  static root(records) {
    return records.where({ parentId: null }).first;
  }
}
```

```js
const rootCategory = new Category({ title: 'Root', parentId: null });
const subCategory = new Category({ title: 'Sub', parentId: rootCategory.id });

rootCategory.children;
// [Category #0x00000001]: { id: 1, title: 'Sub', parentId: 0 }
```

And there you have it! We've successfully implemented self-referential relationships in our model, both in the form of a parent category and a category with subcategories.

## Conclusion

After a long and winding road, we've finally implemented a very powerful **relationship system** for our models. We can now **define** relationships quickly and easily, **customize** them and even **implement self-referential relationships**. This is a very powerful setup and can help us scale our project to new heights.

I hope you found this deep dive interesting and that you've discovered a new way to think about complexity. This is going to be the last article of the series, at least for now. If you've made it this far, thank you for sticking with me. Join the GitHub discussion via the link below, and let me know if you liked the series or if you have any questions.

## Addendum: Code summary

Before I leave you, here's the entire implementation of this series. You can use this as a reference or as a starting point for your own projects. Enjoy!

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/c5f23659fc06baea671c834609be4546cfc6c980).

<details>
<summary>View the complete implementation</summary>

```js [src/config/settings.js]
const settings = {
  loader: {
    modules: [
      '#src/core',
      '#src/models',
      '#src/serializers',
      '#spec/factories',
    ],
  },
};
```

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

import util from 'util';

util.inspect.styles.record = 'blue';
const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const decapitalize = str => str.charAt(0).toLowerCase() + str.slice(1);
const toSingular = str => str.replace(/s$/, '');

export default class Model {
  static models = {};
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model, { fields, validations = [], relationships = [] }) {
    const name = model.name;

    if (Model.models[name])
      throw new Error(`Model ${name} has already been prepared`);
    else Model.models[name] = model;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    model.validations = validations || [];
    model.indexes = [];
    model.fields = {};

    let relationshipFields = [];

    relationships.forEach(relationship => {
      let [relationshipType, options] = relationship;
      if (typeof options === 'string')
        options = { target: options, as: decapitalize(options) };

      if (relationshipType === 'belongsTo') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey =
          options.foreignKey || `${decapitalize(options.target)}Id`;
        relationshipFields.push([foreignKey, 'number']);

        // Note: targetModel MUST be evaluated inside the getter, as it could
        // be defined after the current model
        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.find(this[foreignKey]);
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasOne') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel = Model.models[capitalize(options.target)];
            return targetModel.where({ [foreignKey]: this.id }).first;
          },
          configurable: true,
        });
      } else if (relationshipType === 'hasMany') {
        const propertyName = options.as || decapitalize(options.target);
        const foreignKey = options.foreignKey || `${decapitalize(name)}Id`;

        Object.defineProperty(model.prototype, propertyName, {
          get() {
            const targetModel =
              Model.models[capitalize(toSingular(options.target))];
            return targetModel.where({ [foreignKey]: this.id });
          },
          configurable: true,
        });
      } else {
        throw new Error(`Invalid relationship type: ${relationshipType}`);
      }
    });

    ['id', ...fields, ...relationshipFields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
        unique: false,
        inspectable: true,
      };
      if (fieldName === 'id')
        fieldOptions = {
          ...fieldOptions,
          type: 'number',
          allowEmpty: false,
          unique: true,
        };

      if (isAlias) {
        if (typeof field[1] === 'string') fieldOptions.type = field[1];
        else if (typeof field[1] === 'object')
          fieldOptions = { ...fieldOptions, ...field[1] };
        else
          throw new Error(
            `Invalid field definition for ${fieldName} in ${name}`
          );
      }

      const {
        type: dataType,
        allowEmpty,
        defaultValue,
        unique,
        inspectable,
      } = fieldOptions;

      let dataTypeChecker;
      if (dataType === 'any') dataTypeChecker = value => value !== null;
      else if (['string', 'boolean', 'number'].includes(dataType))
        dataTypeChecker = value => typeof value === dataType;
      else if (dataType === 'date')
        dataTypeChecker = value => value instanceof Date;
      else throw new Error(`Invalid data type for ${fieldName} in ${name}`);

      const fieldTypeChecker = allowEmpty
        ? value => value === null || dataTypeChecker(value)
        : dataTypeChecker;

      let fieldChecker = fieldTypeChecker;
      if (unique) {
        model.indexes.push(fieldName);

        const uniqueChecker = value =>
          !Model.indexedInstances[name][fieldName].has(value);

        fieldChecker = value => fieldTypeChecker(value) && uniqueChecker(value);
      }

      model.fields[fieldName] = { fieldChecker, defaultValue, inspectable };
    });

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = model.indexes.reduce((acc, index) => {
        acc[index] = new Map();
        return acc;
      }, {});
    }

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

  constructor(data) {
    const modelName = this.constructor.name;

    Object.entries(this.constructor.fields).forEach(
      ([fieldName, { fieldChecker, defaultValue }]) => {
        this[fieldName] = data[fieldName] ?? defaultValue;

        if (!fieldChecker(this[fieldName])) {
          throw new Error(
            `Invalid value for field ${fieldName} in ${modelName}: ${this[fieldName]}`
          );
        }
      }
    );

    this.constructor.validations?.forEach(validation => {
      if (!validation(this, Model.instances[modelName])) {
        throw new Error(
          `Invalid data for ${modelName} model: ${JSON.stringify(this)}`
        );
      }
    });

    // Store the instance in the instances and indexedInstances
    Model.instances[modelName].push(this);
    this.constructor.indexes.forEach(index => {
      Model.indexedInstances[modelName][index].set(this[index], this);
    });
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
    return Model.indexedInstances[this.name].id.get(id);
  }

  static findBy(fieldAndValue) {
    const entries = Object.entries(fieldAndValue);
    if (entries.length !== 1)
      throw new Error('findBy method must receive a single field/value pair');

    const [fieldName, value] = entries[0];
    return this.indexedInstances[this.name][fieldName].get(value);
  }

  [customInspectSymbol](depth, options) {
    const modelName = this.constructor.name;
    const id = `0x${this.id.toString(16).slice(0, 8).padStart(8, '0')}`;
    const inspectable = Object.entries(this.constructor.fields).reduce(
      (obj, [fieldName, { inspectable }]) => {
        if (inspectable) obj[fieldName] = this[fieldName];
        return obj;
      },
      {}
    );

    if (depth <= 1) return options.stylize(`{ ${modelName} #${id} }`, 'record');

    return `${options.stylize(`[${modelName} #${id}]: {`, 'record')}${util
      .inspect({ ...inspectable }, { ...options, depth: depth - 1 })
      .slice(1, -1)}${options.stylize('}', 'record')}`;
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

```js [src/scripts/autoload.js]
import { readdir } from 'node:fs/promises';

import settings from '#src/config/settings.js';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const autoload = async () => {
  const moduleMap = new Map();

  for (const path of settings.loader.modules) {
    // Read each directory (this requires a path relative to the project root)
    const moduleFiles = await readdir(path.replace(/^#/, './'));

    for (const moduleFile of moduleFiles) {
      // Convert the file name to a module name (e.g., post.js -> Post)
      const moduleName = capitalize(moduleFile.split('.')[0]);

      if (!moduleMap.has(moduleName)) {
        // Dynamically import the module and add it to the map
        const module = await import(`${path}/${moduleFile}`);
        moduleMap.set(moduleName, module.default);
      } else throw new Error(`Duplicate class name: ${moduleName}`);
    }
  }

  // Convert the map to an object and return it, so that it can be exported
  return Object.fromEntries(moduleMap.entries());
};

const modules = await autoload();

export default { ...modules, settings };
```

```js [src/scripts/console.js]
import repl from 'node:repl';
import modules from '#src/scripts/autoload.js';

// Start the REPL server
const replServer = repl.start();
// Set up a history file for the REPL
replServer.setupHistory('repl.log', () => {});

// Add the autoloaded modules to the REPL context
Object.entries(modules).forEach(([moduleName, module]) => {
  replServer.context[moduleName] = module;
});
```

```js [src/models/post.js]
import Model from '#src/core/model.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this, {
      fields: [
        ['title', { type: 'string', allowEmpty: false }],
        ['content', 'string'],
        ['publishedAt', { type: 'date', defaultValue: new Date() }],
      ],
      relationships: [
        ['belongsTo', 'author'],
        ['belongsTo', 'category'],
      ],
    });
  }

  constructor(data) {
    super(data);
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
}
```

```js [src/models/author.js]
import Model from '#src/core/model.js';
// Delete: import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, {
      fields: [
        ['name', { type: 'string', allowEmpty: false }],
        ['surname', 'string'],
        ['email', { type: 'string', unique: true, inspectable: false }],
      ],
      validations: [record => record.email.includes('@')],
      relationships: [['hasMany', 'posts']],
    });
  }

  constructor(data) {
    super(data);
  }

  get fullName() {
    return this.surname ? `${this.name} ${this.surname}` : this.name;
  }
}
```

```js [src/models/category.js]
import Model from '#src/core/model.js';

export default class Category extends Model {
  static {
    // Prepare storage for the Category model
    super.prepare(this, {
      fields: [['title', { type: 'string', allowEmpty: false }]],
      relationships: [
        ['hasMany', 'posts'],
        [
          'belongsTo',
          { target: 'category', foreignKey: 'parentId', as: 'parent' },
        ],
        [
          'hasMany',
          { target: 'category', foreignKey: 'parentId', as: 'children' },
        ],
      ],
    });
  }

  constructor(data) {
    super(data);
  }

  static root(records) {
    return records.where({ parentId: null }).first;
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

```js [spec/factories/categoryFactory.js]
import Factory from '#src/core/factory.js';
import Category from '#src/models/category.js';

const idSequence = Factory.sequence();
const titleSequence = Factory.sequence(n => `Category #${n}`);

const base = {
  id: idSequence,
  title: titleSequence,
  parentId: null,
};

export default class CategoryFactory extends Factory {
  static {
    super.prepare(this, Category, base);
  }
}
```

</details>
