---
title: Modeling complex JavaScript object field validation
shortTitle: Complex object field validation
language: javascript
tags: [object,class]
cover: planning
excerpt: Returning to the models and records part of the implementation, this time around we'll explore how to add constraints to individual fields.
listed: true
dateModified: 2025-01-09
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
> This article is part of a [series](/js/complex-objects/p/1), picking up where [Modeling complex JavaScript object factories](/js/s/complex-object-factories) left off. If you haven't read the previous installments yet, I recommend taking a look at them first. This series is more of a **show & tell** hoping to <strong class="sparkles">inspire</strong> you to build your own JavaScript projects.

We previously explored how create robust object **models**, **records** and **collections**, however, we've not yet touched on how to validate the fields of these objects. This time around, we'll be focusing on **adding constraints to individual fields**, including type checking, empty and default values, and more.

## Directory structure

This time around, **we won't be making any changes to the existing directory structure**. We'll only make some changes to our `Model` class and update individual `models` to include field validation.

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
> You can find an implementation **refresher** in the [code summary](/js/s/complex-object-serialization#addendum-code-summary) of the previous article, if you need to catch up.

## Field validation

I find the semantics of **relational databases** and **ActiveRecord** to be quite nice for dictating object structure, so I'll loosely base my implementation on them. Thus, fields can have **types**, decide whether they can be **empty** or not, and define a **default value**.

> [!NOTE]
>
> Notice the _loosely_ part in my previous statement. The following setup is **not 100% compatible with any relational database**. It hinges on similar ideas and may transfer rather well in certain scenarios, however, it leaves a lot of wiggle room to the user, which may be easily abused, causing incompatible behavior.

### Type constraints

Relational databases have a small subset of **data types** that you can use. Instead of going down their specific implementation route, we'll adapt this concept to JavaScript. What we want is to be able to define a fields as a `string`, `number`, `boolean`, or `date`. We'll also throw in an `any` type for good measure, as there are scenarios where more complex data may need to be stored.

> [!NOTE]
>
> We'll focus solely on **scalar types**, skipping vector types entirely. The latter would require a few implementation tweaks, that are left up to the reader to explore. Notice, however, that if you find yourself defining field constraints to work with **JavaScript objects**, you're most likely doing something wrong and need to go design a model for that object, instead.

To make this work, we'll have to add our **field definitions** as an argument to the `prepare` method of our `Model` class. This will allow us to **define the fields and their constraints** when creating a new model. To make the code a little more readable, we'll follow the example `Serializer`, where each definition is either **a string or an array**.

_What exactly is this field definition going to be?_ you may be asking. Simply put, single strings will be **field names** that will not be type-checked (`any` type), whereas arrays will contain the field name as the first element and the **data type** as the second. We'll later see how the second value can be extended to include more constraints.

Let's start with the `prepare` method in the `Model` and make the necessary changes.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static prepare(model, fields) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      const dataType = isAlias
        ? field[1]
        : fieldName === 'id'
        ? 'number'
        : 'any';

      let fieldChecker;
      if (dataType === 'any') fieldChecker = value => value !== null;
      else if (['string', 'boolean', 'number'].includes(dataType))
        fieldChecker = value => typeof value === dataType;
      else if (dataType === 'date')
        fieldChecker = value => value instanceof Date;
      else
        throw new Error(`Invalid data type for ${fieldName} in ${name}`);

      model.fields[fieldName] = { fieldChecker };
    });

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

  // ...
}
```

> [!NOTE]
>
> Some **design decisions** in this code snippet will come to make sense in the next couple of sections, as we add more constraints to our fields. If they feel overengineered at this point, it's because I stripped down the final implementation to its individual steps.

This seems like a lot, but we've just added a loop to store the field definitions in the model. We've also added a `fieldChecker` to each field, which will be used to **validate the field** when creating a new record.

_Yes, but these definitions don't do anything yet._ Right. Let's go ahead and update the `Model` class one more time. This time around, we'll make sure to use our new `fields` definition in the `constructor`. We'l loop over this definition, find the fields we want to add to the record and **validate them**.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  constructor(data) {
    const modelName = this.constructor.name;

    Object.entries(this.constructor.fields).forEach(
      ([fieldName, { fieldChecker }]) => {
        this[fieldName] = data[fieldName] ?? null;

        if (!fieldChecker(this[fieldName])) {
          throw new Error(
            `Invalid value for field ${fieldName} in ${modelName}: ${this[fieldName]}`
          );
        }
      }
    );

    // Store the instance in the instances and indexedInstances
    Model.instances[modelName].push(this);
    Model.indexedInstances[modelName].set(data.id, this);
  }

  // ...
}
```

> [!TIP]
>
> If you're not familiar with the **nullish coalescing** (`??`) operator, I highly suggest reading up on the [previous article on the topic](/js/s/nullish-coalescing-optional-chaining/#nullish-coalescing). In this case, it's used instead of the logical OR (`||`) operator to **default to `null`** if the field is missing. This accounts for **falsy values**, such as `0`, which would be overridden by the logical OR operator.

Notice how we use `this.constructor` to access the `fields` definition. Again, we're using the fact that `this` resolves to the **calling subclass**, which is the model we're creating an instance of. We're also using the `data` object to **populate the fields of the record**. If a field is missing, we'll default to `null`. This will practically break the type-checking if any value is empty, which we'll deal with in a minute.

Let's update our `Post` and `Author` models to include some field definitions. We'll also need to remove almost all logic from our `constructor`s, as it's now handled in the `Model` class.

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, [
      ['name', 'string'],
      ['surname', 'string'],
      ['email', 'string'],
    ]);
  }

  constructor(data) {
    super(data);
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
    super.prepare(this, [
      ['title', 'string'],
      ['content', 'string'],
      ['publishedAt', 'date'],
      ['authorId', 'number'],
    ]);
  }

  constructor(data) {
    super(data);
  }

  // ...
}
```

### Emptiness constraints

Having set up type-checking, we need to address the elephant in the room: `null`. We need to **allow some fields to be empty**, but we want to control this on the field definition level. This begs the question: _how?_

First off, we need to decide the **default setup** for any field. We've already decided to default to an `any` type, but we need to decide if we should or shouldn't allow empty values. The path of least friction dictates that we should allow fields to be **empty by default**, while allowing the constraint to be explicitly defined.

To define said constraint, we'll make sure our field definition can handle **objects as the second argument**, thus allowing us to define more than just the data type. This object will consist of `type` and `allowEmpty` keys.

Let's update our `prepare` method to handle this.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static prepare(model, fields) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = { type: 'any', allowEmpty: true };
      if (fieldName === 'id')
        fieldOptions = { type: 'number', allowEmpty: false };

      if (isAlias) {
        if (typeof field[1] === 'object')
          fieldOptions = { ...fieldOptions, ...field[1] };
        else fieldOptions.type = field[1];
      }

      const { type: dataType, allowEmpty } = fieldOptions;

      let dataTypeChecker;
      if (dataType === 'any') dataTypeChecker = value => value !== null;
      else if (['string', 'boolean', 'number'].includes(dataType))
        dataTypeChecker = value => typeof value === dataType;
      else if (dataType === 'date')
        dataTypeChecker = value => value instanceof Date;
      else throw new Error(`Invalid data type for ${fieldName} in ${name}`);

      const fieldChecker = allowEmpty
        ? value => value === null || dataTypeChecker(value)
        : dataTypeChecker;

      model.fields[fieldName] = { fieldChecker };
    });

    // ...
  }

  // ...
}
```

That's literally all we need to do. On top of type checking, we now have a check for the `allowEmpty` constraint, slightly altering the `fieldChecker` function. This will allow us to define fields that can be empty, while still enforcing the type constraint.

Let's make a couple of updates to our model field definitions.

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, [
      ['name', { type: 'string', allowEmpty: false },
      ['surname', 'string'],
      ['email', 'string'],
    ]);
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
    super.prepare(this, [
      ['title', { type: 'string', allowEmpty: false }],
      ['content', 'string'],
      ['publishedAt', 'date'],
      ['authorId', 'number'],
    ]);
  }

  // ...
}
```

### Default values

Thus far, we've worked under the assumption of `null` being the empty value. However, we may want to **default to a different value**. This is especially useful for fields that are not allowed to be empty, but we still want to have a default value.

Same as before, we'll extend the definition to include a `defaultValue` key, allowing us to define a default value for each field, which will be used if the field is empty. This requires a small change in the `prepare` method and an update in the `constructor`.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model, fields) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
      };
      if (fieldName === 'id')
        fieldOptions = {
          type: 'number',
          allowEmpty: false,
          defaultValue: null,
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

      const { type: dataType, allowEmpty, defaultValue } = fieldOptions;

      let dataTypeChecker;
      if (dataType === 'any') dataTypeChecker = value => value !== null;
      else if (['string', 'boolean', 'number'].includes(dataType))
        dataTypeChecker = value => typeof value === dataType;
      else if (dataType === 'date')
        dataTypeChecker = value => value instanceof Date;
      else throw new Error(`Invalid data type for ${fieldName} in ${name}`);

      const fieldChecker = allowEmpty
        ? value => value === null || dataTypeChecker(value)
        : dataTypeChecker;

      model.fields[fieldName] = { fieldChecker, defaultValue };
    });

    // ...
  }

  constructor(data) {
    const modelName = this.constructor.name;

    Object.entries(this.constructor.fields).forEach(
      ([fieldName, { fieldChecker }]) => {
        this[fieldName] = data[fieldName] ?? defaultValue;

        if (!fieldChecker(this[fieldName])) {
          throw new Error(
            `Invalid value for field ${fieldName} in ${modelName}: ${this[fieldName]}`
          );
        }
      }
    );

    // Store the instance in the instances and indexedInstances
    Model.instances[modelName].push(this);
    Model.indexedInstances[modelName].set(data.id, this);
  }

  // ...
}
```

This time around, we'll update our `Post` with a default value for the `publishedAt` field.

```js [src/models/post.js]
import Model from '#src/core/model.js';
import Author from '#src/models/author.js';

export default class Post extends Model {
  static {
    // Prepare storage for the Post model
    super.prepare(this, [
      ['title', { type: 'string', allowEmpty: false }],
      ['content', 'string'],
      ['publishedAt', { type: 'date', defaultValue: new Date() }],
      ['authorId', 'number'],
    ]);
  }

  // ...
}
```

```js
const post = new Post({ id: 1, title: 'My post' });
// {
//   id: 1,
//   title: 'My post',
//   content: 'null,
//   publishedAt: 2025-01-09T00:00:00.000Z,
//   authorId: null
// }
```

## Field uniqueness

A more complex constraint that is often required is **field uniqueness**. This is especially useful for fields like `id`, which should be unique across all records of a model. This also opens up the potential for **multiple indices** on a model, which can be useful for searching records by different fields.

### Unique `id`

We'll start by constraining the `id` field to ensure that it's **unique across all records of a model**. This needs yet another small change in the `prepare` method of our `Model`.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static prepare(model, fields) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = new Map();
    }

    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
      };
      if (fieldName === 'id')
        fieldOptions = {
          type: 'number',
          allowEmpty: false,
          defaultValue: null,
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

      const { type: dataType, allowEmpty, defaultValue } = fieldOptions;

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
      if (fieldName === 'id') {
        const uniqueChecker = value =>
          !Model.indexedInstances[name].has(value);

        fieldChecker = value => fieldTypeChecker(value) && uniqueChecker(value);
      }

      model.fields[fieldName] = { fieldChecker, defaultValue };
    });

    // ...
  }

  // ...
}
```

Such a small change, yet it allows us to constrain the `id` field to be unique across all records of a model. Our `indexedInstances` storage is leveraged to check for uniqueness, taking advantage of the **performance** of the `Map` data structure. This will prevent us from creating multiple records with the same `id` with a minimal performance overhead at record creation.

### Multiple indices

Our current implementation only allows for a single index, which is the `id` field. We previously used this field to store the records in the `indexedInstances` map. We'll need to update this structure to allow for **multiple indices**.

While we're at it, let's add a `unique` constraint to the field definition, which will allow us to define fields that should be **unique across all records of a model**. Naturally, `id` will be unique by default, but we can now define other fields as unique as well.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static prepare(model, fields) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    model.indexes = [];
    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
        unique: false,
      };
      if (fieldName === 'id')
        fieldOptions = {
          type: 'number',
          allowEmpty: false,
          defaultValue: null,
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

      const { type: dataType, allowEmpty, defaultValue, unique } = fieldOptions;

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

      model.fields[fieldName] = { fieldChecker, defaultValue };
    });

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = model.indexes.reduce((acc, index) => {
        acc[index] = new Map();
        return acc;
      }, {});
    }

    // ...
  }

  // ...
}
```

> [!NOTE]
>
> We've only covered **single field indices** in this implementation. **Compound indices**, while possible, require significant work to implement. You can give this a go, if you feel up to the challenge, but it felt like diminishing returns for this already long article.

This change breaks our `Model` class, as `find` and the `constructor` need to account for the change in the underlying data structures. Let's make the necessary changes.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  constructor(data) {
    const modelName = this.constructor.name;

    Object.entries(this.constructor.fields).forEach(
      ([fieldName, { fieldChecker }]) => {
        this[fieldName] = data[fieldName] ?? null;

        if (!fieldChecker(this[fieldName])) {
          throw new Error(
            `Invalid value for field ${fieldName} in ${modelName}: ${this[fieldName]}`
          );
        }
      }
    );

    // Store the instance in the instances and indexedInstances
    Model.instances[modelName].push(this);
    this.constructor.indexes.forEach(index => {
      Model.indexedInstances[modelName][index].set(this[index], this);
    });
  }

  static find(id) {
    return Model.indexedInstances[this.name].id.get(id);
  }

  // ...
}
```

That's it! Same performance and logic, more flexibility and we can add uniqueness constraints. Let's update our `Author` model to make sure the `email` field is unique.

```js [src/models/author.js]
import Model from '#src/core/model.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(this, [
      ['name', { type: 'string', allowEmpty: false }],
      ['surname', 'string'],
      ['email', { type: 'string', unique: true }],
    ]);
  }

  // ...
}
```

> [!NOTE]
>
> The astute reader will notice that this specific setup will only allow for a single author to have an empty (`null`) email. This is a **side effect** of combining the `allowEmpty` and `unique` constraints. In most practical use cases, this is a **non-issue**, as we'd only want to enforce uniqueness on non-empty fields.

### Optimizing indexed queries

Our `find` method is perfect when querying records by their `id`. But, having multiple indices, we may as well add a `findBy` method to leverage these data structures. This will allow us to **query records by any field that has a unique constraint**.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static findBy(fieldAndValue) {
    const entries = Object.entries(fieldAndValue);
    if (entries.length !== 1)
      throw new Error('findBy method must receive a single field/value pair');

    const [fieldName, value] = entries[0];
    return this.indexedInstances[this.name][fieldName].get(value);
  }

  // ...
}
```

And let's see it in action for our `Author` model, querying using the `email` field.

```js
const author = new Author({ id: 1, name: 'John', email: 'john@authornet.io' });

Author.findBy({ email: 'john@authornet.io' });
// Author { id: 1, name: 'John', email: 'john@authornet.io' }
```

## Custom validators

We've covered the basics of individual field validation, but what if we want to apply **custom validation conditions**? This is hard to cover by the current setup, however, it's possible to implement a model-wide custom validation system.

After tinkering with different approaches, I settled on a third argument to the `prepare` method, which allows an **optional array of validator functions** to be passed. These, in turn, will be executed on the newly created record, in the `constructor`, to ensure it meets the custom validation criteria.

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  // ...

  static prepare(model, fields, validations) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    model.validations = validations || [];
    model.indexes = [];
    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
        unique: false,
      };
      if (fieldName === 'id')
        fieldOptions = {
          type: 'number',
          allowEmpty: false,
          defaultValue: null,
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

      const { type: dataType, allowEmpty, defaultValue, unique } = fieldOptions;

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

      model.fields[fieldName] = { fieldChecker, defaultValue };
    });

    // Create a map to speed up queries
    if (!Model.indexedInstances[name]) {
      Model.indexedInstances[name] = model.indexes.reduce((acc, index) => {
        acc[index] = new Map();
        return acc;
      }, {});
    }

    // ...
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

  // ...
}
```

We can then add a custom validation to our `Author` model, ensuring that the `email` field contains an `@` symbol as [proper email validation is hard](/js/s/email-validation).

```js [src/models/author.js]
import Model from '#src/core/model.js';
import Post from '#src/models/post.js';

export default class Author extends Model {
  static {
    // Prepare storage for the Author model
    super.prepare(
      this,
      [
        ['name', { type: 'string', allowEmpty: false }],
        ['surname', 'string'],
        ['email', { type: 'string', unique: true }],
      ],
      [record => record.email.includes('@')]
    );
  }

  // ...
}
```

## Conclusion

That's a wrap! Our models can finally be used to store structured data. We've covered **type** constraints, **emptiness** constraints, **default values**, field **uniqueness**, and **custom validators**. This is a great starting point for a more complex system, which can be extended in many ways, or used to interface with a relational database.

As the project grows towards its final form, I want to address a couple more topics before the series is over. Stay tuned for the next installment and, if you feel like it, drop a reaction or a comment in the GitHub discussion, linked below. Until next time!

---

## Addendum: Code summary

The complete implementation is summarized below, as is traditional by now. This includes all the changes we've made to the `Model` class, as well as the changes to the `Author` and `Post` models, and all previous implementations.

You can also [browse through the Code Reference on GitHub](https://github.com/Chalarangelo/mini-active-record/tree/b0870fd4674a183a40353088db686bc0ea3536c5).

<details>
<summary>View the complete implementation</summary>


```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

export default class Model {
  static instances = {};
  static indexedInstances = {};
  static getterCache = {};

  static prepare(model, fields, validations) {
    const name = model.name;

    // Create an array for each model to store instances
    if (!Model.instances[name]) Model.instances[name] = [];

    // Cache getters, using a WeakMap for each model/key pair
    if (!Model.getterCache[name]) Model.getterCache[name] = {};

    model.validations = validations || [];
    model.indexes = [];
    model.fields = {};

    ['id', ...fields].forEach(field => {
      const isAlias = Array.isArray(field);
      const fieldName = isAlias ? field[0] : field;

      if (!fieldName || model.fields[fieldName])
        throw new Error(`Invalid field name in ${name}`);

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
        unique: false,
      };
      if (fieldName === 'id')
        fieldOptions = {
          type: 'number',
          allowEmpty: false,
          defaultValue: null,
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

      const { type: dataType, allowEmpty, defaultValue, unique } = fieldOptions;

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

      model.fields[fieldName] = { fieldChecker, defaultValue };
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
    super.prepare(this, [
      ['title', { type: 'string', allowEmpty: false }],
      ['content', 'string'],
      ['publishedAt', { type: 'date', defaultValue: new Date() }],
      ['authorId', 'number'],
    ]);
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
    super.prepare(
      this,
      [
        ['name', { type: 'string', allowEmpty: false }],
        ['surname', 'string'],
        ['email', { type: 'string', unique: true }],
      ],
      [record => record.email.includes('@')]
    );
  }

  constructor(data) {
    super(data);
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
