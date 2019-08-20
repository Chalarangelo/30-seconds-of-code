# ajv-errors
Custom error messages in JSON-Schema for Ajv validator

[![Build Status](https://travis-ci.org/epoberezkin/ajv-errors.svg?branch=master)](https://travis-ci.org/epoberezkin/ajv-errors)
[![npm version](https://badge.fury.io/js/ajv-errors.svg)](http://badge.fury.io/js/ajv-errors)
[![Coverage Status](https://coveralls.io/repos/github/epoberezkin/ajv-errors/badge.svg?branch=master)](https://coveralls.io/github/epoberezkin/ajv-errors?branch=master)
[![Gitter](https://img.shields.io/gitter/room/ajv-validator/ajv.svg)](https://gitter.im/ajv-validator/ajv)


## Contents

- [Install](#install)
- [Usage](#usage)
  - [Single message](#single-message)
  - [Messages for keywords](#messages-for-keywords)
  - [Messages for properties and items](#messages-for-properties-and-items)
  - [Default message](#default-message)
- [Templates](#templates)
- [Options](#options)
- [License](#license)


## Install

```
npm install ajv-errors
```


## Usage

Add the keyword `errorMessages` to Ajv instance:

```javascript
var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, jsonPointers: true});
// Ajv options allErrors and jsonPointers are required
require('ajv-errors')(ajv /*, {singleError: true} */);
```

See [Options](#options) below.


### Single message

Replace all errors in the current schema and subschemas with a single message:

```javascript
var schema = {
  type: 'object',
  required: ['foo'],
  properties: {
    foo: { type: 'integer' }
  },
  additionalProperties: false,
  errorMessage: 'should be an object with an integer property foo only'
};

var validate = ajv.compile(schema);
console.log(validate({foo: 'a', bar: 2})); // false
console.log(validate.errors); // processed errors
```

Processed errors:

```javascript
[
  {
    keyword: 'errorMessage',
    message: 'should be an object with an integer property foo only',
    // ...
    params: {
      errors: [
        { keyword: 'additionalProperties', dataPath: '' /* , ... */ },
        { keyword: 'type', dataPath: '.foo' /* , ... */ }
      ]
    }
  }
]
```


### Messages for keywords

Replace errors for certain keywords in the current schema only:

```javascript
var schema = {
  type: 'object',
  required: ['foo'],
  properties: {
    foo: { type: 'integer' }
  },
  additionalProperties: false,
  errorMessage: {
    type: 'should be an object', // will not replace internal "type" error for the property "foo"
    required: 'should have property foo',
    additionalProperties: 'should not have properties other than foo'
  }
};

var validate = ajv.compile(schema);
console.log(validate({foo: 'a', bar: 2})); // false
console.log(validate.errors); // processed errors
```

Processed errors:

```javascript
[
  {
    // original error
    keyword: type,
    dataPath: '/foo',
    // ...
    message: 'should be integer'
  },
  {
    // generated error
    keyword: 'errorMessage',
    message: 'should not have properties other than foo',
    // ...
    params: {
      errors: [
        { keyword: 'additionalProperties' /* , ... */ }
      ]
    },
  }
]
```

For keywords "required" and "dependencies" it is possible to specify different messages for different properties:

```javascript
var schema = {
  type: 'object',
  required: ['foo', 'bar'],
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' }
  },
  errorMessage: {
    type: 'should be an object', // will not replace internal "type" error for the property "foo"
    required: {
      foo: 'should have an integer property "foo"',
      bar: 'should have a string property "bar"'
    }
  }
};
```


### Messages for properties and items

Replace errors for properties / items (and deeper), regardless where in schema they were created:

```javascript
var schema = {
  type: 'object',
  required: ['foo', 'bar'],
  allOf: [{
    properties: {
      foo: { type: 'integer', minimum: 2 },
      bar: { type: 'string', minLength: 2 }
    },
    additionalProperties: false
  }],
  errorMessage: {
    properties: {
      foo: 'data.foo should be integer >= 2',
      bar: 'data.bar should be string with length >= 2'
    }
  }
};

var validate = ajv.compile(schema);
console.log(validate({foo: 1, bar: 'a'})); // false
console.log(validate.errors); // processed errors
```

Processed errors:

```javascript
[
  {
    keyword: 'errorMessage',
    message: 'data.foo should be integer >= 2',
    dataPath: '/foo',
    // ...
    params: {
      errors: [
        { keyword: 'minimum' /* , ... */ }
      ]
    },
  },
  {
    keyword: 'errorMessage',
    message: 'data.bar should be string with length >= 2',
    dataPath: '/bar',
    // ...
    params: {
      errors: [
        { keyword: 'minLength' /* , ... */ }
      ]
    },
  }
]
```


### Default message

When the value of keyword `errorMessage` is an object you can specify a message that will be used if any error appears that is not specified by keywords/properties/items:

```javascript
var schema = {
  type: 'object',
  required: ['foo', 'bar'],
  allOf: [{
    properties: {
      foo: { type: 'integer', minimum: 2 },
      bar: { type: 'string', minLength: 2 }
    },
    additionalProperties: false
  }],
  errorMessage: {
    type: 'data should be an object',
    properties: {
      foo: 'data.foo should be integer >= 2',
      bar: 'data.bar should be string with length >= 2'
    },
    _: 'data should have properties "foo" and "bar" only'
  }
};

var validate = ajv.compile(schema);
console.log(validate({})); // false
console.log(validate.errors); // processed errors
```

Processed errors:

```javascript
[
  {
    keyword: 'errorMessage',
    message: 'data should be an object with properties "foo" and "bar" only',
    dataPath: '',
    // ...
    params: {
      errors: [
        { keyword: 'required' /* , ... */ },
        { keyword: 'required' /* , ... */ }
      ]
    },
  }
]
```

The message in property `_` of `errorMessage` replaces the same errors that would have been replaced if `errorMessage` were a string.


## Templates

Custom error messages used in `errorMessage` keyword can be templates using [JSON-pointers](https://tools.ietf.org/html/rfc6901) or [relative JSON-pointers](http://tools.ietf.org/html/draft-luff-relative-json-pointer-00) to data being validated, in which case the value will be interpolated. Also see [examples](https://gist.github.com/geraintluff/5911303) of relative JSON-pointers.

The syntax to interpolate a value is `${<pointer>}`.

The values used in messages will be JSON-stringified:
- to differentiate between `false` and `"false"`, etc.
- to support structured values.

Example:

```json
{
  "type": "object",
  "properties": {
    "size": {
      "type": "number",
      "minimum": 4
    }
  },
  "errorMessage": {
    "properties": {
      "size": "size should be a number bigger or equal to 4, current value is ${/size}"
    }
  }
}
```


## Options

Defaults:

```javascript
{
  keepErrors: false,
  singleError: false
}
```

- _keepErrors_: keep original errors. Default is to remove matched errors (they will still be available in `params.errors` property of generated error). If an error was matched and included in the error generated by `errorMessage` keyword it will have property `emUsed: true`.
- _singleError_: create one error for all keywords used in `errorMessage` keyword (error messages defined for properties and items are not merged because they have different dataPaths). Multiple error messages are concatenated. Option values:
  - `false` (default): create multiple errors, one for each message
  - `true`: create single error, messages are concatenated using `"; "`
  - non-empty string: this string is used as a separator to concatenate messages


## Supporters

[<img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAwEAAAAJDg1YzBlYzFjLTA3YWYtNGEzOS1iMTdjLTQ0MTU1NWZjOGM0ZQ.jpg" width="48" height="48">](https://www.linkedin.com/in/rogerkepler/) [Roger Kepler](https://www.linkedin.com/in/rogerkepler/)


## License

[MIT](https://github.com/epoberezkin/ajv-errors/blob/master/LICENSE)
