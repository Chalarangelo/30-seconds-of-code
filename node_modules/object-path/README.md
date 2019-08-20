

object-path
===========

Access deep properties using a path

[![NPM version](https://badge.fury.io/js/object-path.png)](http://badge.fury.io/js/object-path)
[![Build Status](https://travis-ci.org/mariocasciaro/object-path.png)](https://travis-ci.org/mariocasciaro/object-path)
[![Coverage Status](https://coveralls.io/repos/mariocasciaro/object-path/badge.png)](https://coveralls.io/r/mariocasciaro/object-path)
[![devDependency Status](https://david-dm.org/mariocasciaro/object-path/dev-status.svg)](https://david-dm.org/mariocasciaro/object-path#info=devDependencies)
![Downloads](http://img.shields.io/npm/dm/object-path.svg)


## Changelog

### 0.11.0

* Introduce ability to specify options and create new instances of `object-path`
* Introduce option to control the way `object-path` deals with inherited properties (`includeInheritedProps`)
* New default `object-path` instance already configured to handle not-own object properties (`withInheritedProps`)

### 0.10.0

* Improved performance of `get`, `set`, and `push` by 2x-3x
* Introduced a benchmarking test suite
* **BREAKING CHANGE**: `del`, `empty`, `set` will not affect not-own object's properties (made them consistent with the other methods)

## Install

### Node.js

```
npm install object-path --save
```

### Bower

```
bower install object-path --save
```

### Typescript typings

```
typings install --save dt~object-path
```

## Usage

```javascript

var obj = {
  a: {
    b: "d",
    c: ["e", "f"],
    '\u1200': 'unicode key',
    'dot.dot': 'key'
  }
};

var objectPath = require("object-path");

//get deep property
objectPath.get(obj, "a.b");  //returns "d"
objectPath.get(obj, ["a", "dot.dot"]);  //returns "key"
objectPath.get(obj, 'a.\u1200');  //returns "unicode key"

//get the first non-undefined value
objectPath.coalesce(obj, ['a.z', 'a.d', ['a','b']], 'default');

//empty a given path (but do not delete it) depending on their type,so it retains reference to objects and arrays.
//functions that are not inherited from prototype are set to null.
//object instances are considered objects and just own property names are deleted
objectPath.empty(obj, 'a.b'); // obj.a.b is now ''
objectPath.empty(obj, 'a.c'); // obj.a.c is now []
objectPath.empty(obj, 'a'); // obj.a is now {}

//works also with arrays
objectPath.get(obj, "a.c.1");  //returns "f"
objectPath.get(obj, ["a","c","1"]);  //returns "f"

//can return a default value with get
objectPath.get(obj, ["a.c.b"], "DEFAULT");  //returns "DEFAULT", since a.c.b path doesn't exists, if omitted, returns undefined

//set
objectPath.set(obj, "a.h", "m"); // or objectPath.set(obj, ["a","h"], "m");
objectPath.get(obj, "a.h");  //returns "m"

//set will create intermediate object/arrays
objectPath.set(obj, "a.j.0.f", "m");

//will insert values in array
objectPath.insert(obj, "a.c", "m", 1); // obj.a.c = ["e", "m", "f"]

//push into arrays (and create intermediate objects/arrays)
objectPath.push(obj, "a.k", "o");

//ensure a path exists (if it doesn't, set the default value you provide)
objectPath.ensureExists(obj, "a.k.1", "DEFAULT");
var oldVal = objectPath.ensureExists(obj, "a.b", "DEFAULT"); // oldval === "d"

//deletes a path
objectPath.del(obj, "a.b"); // obj.a.b is now undefined
objectPath.del(obj, ["a","c",0]); // obj.a.c is now ['f']

//tests path existence
objectPath.has(obj, "a.b"); // true
objectPath.has(obj, ["a","d"]); // false

//bind object
var model = objectPath({
  a: {
    b: "d",
    c: ["e", "f"]
  }
});

//now any method from above is supported directly w/o passing an object
model.get("a.b");  //returns "d"
model.get(["a.c.b"], "DEFAULT");  //returns "DEFAULT"
model.del("a.b"); // obj.a.b is now undefined
model.has("a.b"); // false

```
### How `object-path` deals with inherited properties

By default `object-path` will only access an object's own properties. Look at the following example:

```javascript
var proto = {
  notOwn: {prop: 'a'}
}
var obj = Object.create(proto);

//This will return undefined (or the default value you specified), because notOwn is
//an inherited property
objectPath.get(obj, 'notOwn.prop');

//This will set the property on the obj instance and not the prototype.
//In other words proto.notOwn.prop === 'a' and obj.notOwn.prop === 'b'
objectPath.set(obj, 'notOwn.prop', 'b');
```
To configure `object-path` to also deal with inherited properties, you need to create a new instance and specify
the `includeInheritedProps = true` in the options object:

```javascript
var objectPath = require("object-path");
var objectPathWithInheritedProps = objectPath.create({includeInheritedProps: true})
```

Alternatively, `object-path` exposes an instance already configured to handle inherited properties (`objectPath.withInheritedProps`):
```javascript
var objectPath = require("object-path");
var objectPathWithInheritedProps = objectPath.withInheritedProps
```

Once you have the new instance, you can access inherited properties as you access other properties:
```javascript
var proto = {
  notOwn: {prop: 'a'}
}
var obj = Object.create(proto);

//This will return 'a'
objectPath.withInheritedProps.get(obj, 'notOwn.prop');

//This will set proto.notOwn.prop to 'b'
objectPath.set(obj, 'notOwn.prop', 'b');
```

### Immutability

If you are looking for an *immutable* alternative of this library, you can take a look at: [object-path-immutable](https://github.com/mariocasciaro/object-path-immutable)


### Credits

* [Mario Casciaro](https://github.com/mariocasciaro) - Author
* [Paulo Cesar](https://github.com/pocesar) - Major contributor
