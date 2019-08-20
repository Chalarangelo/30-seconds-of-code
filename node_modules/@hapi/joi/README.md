<a href="http://hapijs.com"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/family.png" width="180px" align="right" /></a>

# joi

Object schema description language and validator for JavaScript objects.

[![Build Status](https://travis-ci.org/hapijs/joi.svg?branch=master)](https://travis-ci.org/hapijs/joi)

## Introduction

Imagine you run facebook and you want visitors to sign up on the website with real names and not something like `l337_p@nda` in the first name field. How would you define the limitations of what can be inputted and validate it against the set rules?

This is joi, joi allows you to create *blueprints* or *schemas* for JavaScript objects (an object that stores information) to ensure *validation* of key information.

# Installation

```cli 
 npm install --save @hapi/joi
 ```

## API
See the detailed [API Reference](https://github.com/hapijs/joi/blob/v15.1.0/API.md).

## Example

```javascript
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 })
}).with('username', 'birthyear').without('password', 'access_token');

// Return result.
const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid

```

The above schema defines the following constraints:
* `username`
    * a required string
    * must contain only alphanumeric characters
    * at least 3 characters long but no more than 30
    * must be accompanied by `birthyear`
* `password`
    * an optional string
    * must satisfy the custom regex
    * cannot appear together with `access_token`
* `access_token`
    * an optional, unconstrained string or number
* `birthyear`
    * an integer between 1900 and 2013
* `email`
    * a valid email address string
    * must have two domain parts e.g. `example.com`

## Usage

Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```javascript
const schema = {
    a: Joi.string()
};
```

Note that **joi** schema objects are immutable which means every additional rule added (e.g. `.min(5)`) will return a
new schema object.

Second, the value is validated against the defined schema:

```javascript
const {error, value} = Joi.validate({ a: 'a string' }, schema);

// or

Joi.validate({ a: 'a string' }, schema, function (error, value) { });
```

If the input is valid, then the `error` will be `null`, otherwise it will be an `Error` object providing more information.

The schema can be a plain JavaScript object where every key is assigned a **joi** type, or it can be a **joi** type directly:

```javascript
const schema = Joi.string().min(10);
```

If the schema is a **joi** type, the `schema.validate(value, callback)` can be called directly on the type. When passing a non-type schema object,
the module converts it internally to an object() type equivalent to:

```javascript
const schema = Joi.object().keys({
    a: Joi.string()
});
```

When validating a schema:

* Values (or keys in case of objects) are optional by default.

    ```javascript
    Joi.validate(undefined, Joi.string()); // validates fine
    ```

    To disallow this behavior, you can either set the schema as `required()`, or set `presence` to `"required"` when passing `options`:

    ```javascript
    Joi.validate(undefined, Joi.string().required());
    // or
    Joi.validate(undefined, Joi.string(), /* options */ { presence: "required" });
    ```

* Strings are utf-8 encoded by default.
* Rules are defined in an additive fashion and evaluated in order, first the inclusive rules, then the exclusive rules.

## Browsers

Joi doesn't directly support browsers, but you could use [joi-browser](https://github.com/jeffbski/joi-browser) for an ES5 build of Joi that works in browsers, or as a source of inspiration for your own builds.
