# LokiJS

[LokiJS.org web site](http://lokijs.org) | 
[LokiJS GitHub page](https://github.com/techfort/LokiJS) | 
[Sandbox / Playground](https://rawgit.com/techfort/LokiJS/master/examples/sandbox/LokiSandbox.htm)

## Documentation Overview

This is an early effort to provide a more accurate and up-to-date version of LokiJS documentation by using jsdoc.  Since modifications arise from various contributors, this should allow distributed effort toward 
maintaining this documentation.  

## Getting Started

Creating a database :

```javascript
var db = new loki('example.db');
```

Add a collection :

```javascript
var users = db.addCollection('users');
```

Insert documents :

```javascript
users.insert({
	name: 'Odin',
	age: 50,
	address: 'Asgard'
});

// alternatively, insert array of documents
users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);
```

Simple find query :

```javascript
var results = users.find({ age: {'$gte': 35} });

var odin = users.findOne({ name:'Odin' });
```

Simple where query :

```javascript
var results = users.where(function(obj) {
	return (obj.age >= 35);
});
```

Simple Chaining :

```javascript
var results = users.chain().find({ age: {'$gte': 35} }).simplesort('name').data();
```

Simple named transform :

```javascript
users.addTransform('progeny', [
  {
    type: 'find',
    value: {
      'age': {'$lte': 40}
    }
  }
]);

var results = users.chain('progeny').data();
```

Simple Dynamic View :

```javascript
var pview = users.addDynamicView('progeny');

pview.applyFind({
	'age': {'$lte': 40}
});

pview.applySimpleSort('name');

var results = pview.data();
```