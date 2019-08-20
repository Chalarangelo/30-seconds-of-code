# Cyclist

Cyclist is an efficient [cyclic list](http://en.wikipedia.org/wiki/Circular_buffer) implemention for Javascript.
It is available through npm

	npm install cyclist

## What?

Cyclist allows you to create a list of fixed size that is cyclic.
In a cyclist list the element following the last one is the first one.
This property can be really useful when for example trying to order data
packets that can arrive out of order over a network stream.

## Usage

``` js
var cyclist = require('cyclist');
var list = cyclist(4); // if size (4) is not a power of 2 it will be the follwing power of 2
                       // this buffer can now hold 4 elements in total

list.put(42, 'hello 42'); // store something and index 42
list.put(43, 'hello 43'); // store something and index 43

console.log(list.get(42)); // prints hello 42
console.log(list.get(46)); // prints hello 42 again since 46 - 42 == list.size
```

## API

* `cyclist(size)` creates a new buffer
* `cyclist#get(index)` get an object stored in the buffer
* `cyclist#put(index,value)` insert an object into the buffer
* `cyclist#del(index)` delete an object from an index
* `cyclist#size` property containing current size of buffer

## License

MIT
