# bind

  Function binding utility.

## Installation

```
$ component install component/bind
```

## API

   - [bind(obj, fn)](#bindobj-fn)
   - [bind(obj, fn, ...)](#bindobj-fn-)
   - [bind(obj, name)](#bindobj-name)
<a name=""></a>
 
<a name="bindobj-fn"></a>
### bind(obj, fn)
should bind the function to the given object.

```js
var tobi = { name: 'tobi' };

function name() {
  return this.name;
}

var fn = bind(tobi, name);
fn().should.equal('tobi');
```

<a name="bindobj-fn-"></a>
### bind(obj, fn, ...)
should curry the remaining arguments.

```js
function add(a, b) {
  return a + b;
}

bind(null, add)(1, 2).should.equal(3);
bind(null, add, 1)(2).should.equal(3);
bind(null, add, 1, 2)().should.equal(3);
```

<a name="bindobj-name"></a>
### bind(obj, name)
should bind the method of the given name.

```js
var tobi = { name: 'tobi' };

tobi.getName = function() {
  return this.name;
};

var fn = bind(tobi, 'getName');
fn().should.equal('tobi');
```

## License 

  MIT