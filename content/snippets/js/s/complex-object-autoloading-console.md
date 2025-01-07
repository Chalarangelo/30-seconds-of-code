---
title: Modeling complex JavaScript object autoloading and console
shortTitle: Complex object autoloading and console
language: javascript
tags: [object,class]
cover: digital-nomad-14
excerpt: In this installment, we'll create a custom object inspect utility to help us debug our complex objects in the console.
listed: true
dateModified: 2025-01-16
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
> This article is part of a [series](/js/complex-objects/p/1), following [Modeling complex JavaScript object field validation](/js/s/complex-object-field-validation). It's highly recommended to read the previous articles to get the full context. The whole series is more of a **show & tell** hoping to <strong class="sparkles">inspire</strong> you to start that advanced JavaScript project you've been thinking about.

So far in this series, we've developed **models**, **queries**, **scopes**, **serialization**, and **factories** for our ActiveRecord-inspired project. As the project grows larger, I want to address **autoloading** and a **console** environment to interact with our objects. In this installment, we'll create an inspect utility to help us work with objects in the console.

## Directory structure

This time, we're expanding the directory structure just a little. We'll add a new `config` directory for **settings** and a `scripts` directory for our **autoload** and **console** scripts.

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
    └── postFactory.js
```

> [!TIP]
>
> If you need a **refresher** of the entire implementation thus far, it's available in the [code summary](/js/s/complex-object-field-validation#addendum-code-summary) section at the end of the previous article.

## Autoloading modules

While developing the project up until this point, I've used Node.js and its [REPL](https://nodejs.org/api/repl.html) to interact with the objects. However, I've found it cumbersome to require all the modules manually. This concern will only get more significant as the project grows.

### Settings

Before we dive into the autoloader, let's create a `settings.js` file in the `config` directory. This file will hold the **settings** for our project. For the time being, we'll simply define a setting for which modules to autoload.

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

export default settings;
```

> [!NOTE]
>
> While the settings file might be a bit of an overkill for what appears to be a single setting, it's a good practice to have a **central place for all the settings**. This way, you can easily add more settings as your project grows.

### Autoloader

One of the features that I like a lot about ActiveRecord is the cleanliness of its modules. I never have to declare which modules I need, as they're all **automatically loaded**. Granted, this feels like magic and a bit of a black box, but it's a feature I want to replicate, at least to some extent.

After fiddling around with a few ideas, such as generating an index file for each directory, I settled on a fairly simple solution.

I'll first use the [`fs`](https://nodejs.org/api/fs.html) module to **read the directories** and **find all the files** in them. Then, I'll create a `Map` and use [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to **dynamically load each module**. Provided that naming conventions are followed, I'll be able to **deduce the module name from the file path**, much like Rails does. Then, I'll convert the `Map` to an object and export it.

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

> [!NOTE]
>
> As you'll notice, this implementation is pretty barebones, as it only handles **single-level directories** and **single-export modules**. However, it's a good starting point for a small project. You can take a stab at improving it by adding more features, such as nested directories or multiple exports, if you need them.

## Console environment

With the autoloader in place, we can now focus on creating a **console environment** to interact with our objects. We'll start by setting up the `console.js` script, then we'll create a custom object inspect utility.

### Console script

The `console.js` script will be the entry point for our console environment. It will **import the autoloaded modules** and **set up the REPL**. For that last part, we'll iterate over the modules and make them available in the REPL context.

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

We can now add a script to the `package.json` file to start the console environment.

```json [package.json]
{
  "scripts": {
    "console": "node src/scripts/console.js"
  }
}
```

Let's run it with `npm run console` and create an `Author` record to see how things work.

```js
Factory.build('Author');
// Author {
//   id: 0,
//   name: 'Author',
//   surname: 'Authorson',
//   email: 'author@authornet.io'
// }
```

## Object inspection

The previous output is alright, but when our models inevitably become huge, we might wish we had customized the **object inspection**. Luckily, Node.js provides a way to do just that, using the [`util.inspect.custom`](https://nodejs.org/api/util.html#util_util_inspect_custom) symbol.

### Custom object inspect utility

In order to **make our records stand out**, we'll start by adding a custom value to [`util.inspect.styles`](https://nodejs.org/api/util.html#customizing-utilinspect-colors), called `record` and set it to `blue` (as far as I can tell, nothing uses this style by default).

```js [src/core/model.js]
import RecordSet from '#src/core/recordSet.js';

import util from 'util';

util.inspect.styles.record = 'blue';
const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

// ...
```

> [!NOTE]
>
> Adding custom styles like this is **undocumented behavior**, thus it may be subject to change in future versions of Node.js. However, the underlying structure seems to be a simple object, so I don't see any real risk to making this benign change at the time of writing. Please **exercise caution**, regardless.

Then, we'll add the new method to our `Model` class. For starters, let's just make sure that we **wrap the model name with square brackets and add the record id**. The rest is going to be the same, except we'll color the square bracket part, its contents and the opening and closing curly braces blue.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  [customInspectSymbol](depth, options) {
    const modelName = this.constructor.name;
    const { id } = this;

    return `${options.stylize(`[${modelName} #${id}]: {`, 'record')}${util
      .inspect({ ...this }, { ...options, depth: depth - 1 })
      .slice(1, -1)}${options.stylize('}', 'record')}`;
  }
}
```

Now, when we run the console environment and create an `Author` record, we'll see the following output.

```js
Factory.build('Author');
// [Author #0]: {
//   id: 0,
//   name: 'Author',
//   surname: 'Authorson',
//   email: 'author@authornet.io'
// }
```

### Handling nesting

The output is already looking better, but we can still improve it. For instance, if we have an array of `Post` records, we might want to see the records compactly displayed.

You might have noticed the `depth` parameter from the previous method. We can use it to **control the depth of the inspection**. We'll update our inspect utility to **compact nested records**, depending on the `depth` parameter.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  [customInspectSymbol](depth, options) {
    const modelName = this.constructor.name;
    const { id } = this;

    if (depth <= 1) return options.stylize(`{ ${modelName} #${id} }`, 'record');

    return `${options.stylize(`[${modelName} #${id}]: {`, 'record')}${util
      .inspect({ ...this }, { ...options, depth: depth - 1 })
      .slice(1, -1)}${options.stylize('}', 'record')}`;
  }
}
```

```js
Factory.buildArray('Post', 3);
// [ [Post #0], [Post #1], [Post #2] ]
```

> [!NOTE]
>
> The `depth` parameter is set to `2` by default. For the requirements of this example, `1` does the trick, but **feel free to change the value** in the condition to `0`, if you find it's more suitable for your needs.

### Hexadecimal id string

One more thing we can do is **convert the id to a hexadecimal string**. This is more of a cosmetic change, but it can make the output look a little bit cleaner.

All this takes is the use of `Number.prototype.toString()` with a `16` radix and `String.prototype.padStart()` to ensure that the string is always `8` characters long.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  [customInspectSymbol](depth, options) {
    const modelName = this.constructor.name;
    const id = `0x${this.id.toString(16).slice(0, 8).padStart(8, '0')}`;

    if (depth <= 1) return options.stylize(`{ ${modelName} #${id} }`, 'record');

    return `${options.stylize(`[${modelName} #${id}]: {`, 'record')}${util
      .inspect({ ...this }, { ...options, depth: depth - 1 })
      .slice(1, -1)}${options.stylize('}', 'record')}`;
  }
}
```

```js
Factory.build('Author');
// [Author #0x00000000]: {
//   id: 0,
//   name: 'Author',
//   surname: 'Authorson',
//   email: 'author@authornet.io'
// }
```

> [!NOTE]
>
> _Why 8 characters long?_ Because, realistically, we're not going to have more than `2^32` records in memory at any given time. If you somehow end up with more than that, you can always increase the length. I'd advise you to take a long, hard look at your design decisions, though, as this implementation isn't meant to handle such large datasets.

### Inspectable fields

So far, all of the fields in our models have been inspectable, which is the default behavior. However, we might want to **hide some fields** from the inspection. Say, for instance, that we have a `password` field or some personal data that is sensitive and shouldn't be displayed in the console.

Luckily, our **field definition** implementation from last time can be easily tweaked to support an `inspectable` option. Let's update the `prepare` method in the `Model` class, as well as our inspect utility to respect this **new option**.

```js [src/core/model.js]
// ...

export default class Model {
  // ...

  static prepare(model, fields, validations) {
    // ...

    ['id', ...fields].forEach(field => {
      // ...

      let fieldOptions = {
        type: 'any',
        allowEmpty: true,
        defaultValue: null,
        unique: false,
        inspectable: true,
      };

      // ...

      const {
        type: dataType,
        allowEmpty,
        defaultValue,
        unique,
        inspectable,
      } = fieldOptions;

      // ...

      model.fields[fieldName] = { fieldChecker, defaultValue, inspectable };
    });

    // ...
  }

  // ...

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

This simple change ensures that only fields marked as `inspectable` (defaults to `true` for all fields) are displayed in the console. We can then go ahead and mark the `Author` model's `email` field as not inspectable.

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
        ['email', { type: 'string', unique: true, inspectable: false }],
      ],
      [record => record.email.includes('@')]
    );
  }

  // ...
}
```

```js
Factory.build('Author');
// [Author #0x00000000]: { id: 0, name: 'Author', surname: 'Authorson' }
```

## Conclusion

Our ActiveRecord-inspired project is starting to address the pains of scaling. We can finally easily **load all the modules** and interact with them in the **console**. We've also created a custom **object inspect utility** to help us debug our complex objects and hide sensitive data from the console.

I may have a couple of things to address before we wrap the series, but this article is already long enough. Don't forget to join the discussion on GitHub, using the link down below, or just drop a reaction to let me know if you're enjoying the series!

---

## Addendum: Code summary

The customary code summary of the entire implementation up until this point can be found below. Make sure to bookmark it, if you need a quick reference in the future.

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
        ['email', { type: 'string', unique: true, inspectable: false }],
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
