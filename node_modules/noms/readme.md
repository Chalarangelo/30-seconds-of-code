noms
====

create super easy readable-streams filled with yummy data to nom on, inspired by [from2](https://github.com/hughsk/from2) (and a test based on one from there).

```bash
npm install noms
```

```js
var noms = require('noms');
```

Create a quick readable stream

```js
nom([options], read, [before]);
```

options is optional and passed to readable stream just like in from2 or through2

read is the main read function, it is similar to the original node streams but size is optional and a callback is passed.  It will NOT be called again until the callback is called.

before is called right before the first call to read in order to do setup, it is passed a callback and read will not be called until the callback is called.

like through2 and from2 noms also features

```js
nom.obj([options], read, [before]);
```

which is shorthand for creating an object stream and like from2 noms has

```js
noms.ctor(read, [before]);
```

which returns a constructor function for use if you're creating a large number of copies of the stream.

example (based on one from from2):

```js
function fromString(string) {
  return noms(function(size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) {
      return this.push(null);
    }

    // Pull in a new chunk of text,
    // removing it from the string.
    var chunk = string.slice(0, size);
    string = string.slice(size);

    // Emit "chunk" from the stream.
    next(null, chunk);
  })
}
```

you can use `this.push(foo)` and `next(null, foo)` interchangeably, just remember to call next at the end.

```js
function fromString(string) {
  return noms(function(size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) {
      return next(null, null);
    }

    // Pull in a new chunk of text,
    // removing it from the string.
    var chunk = string.slice(0, size);
    string = string.slice(size);

    // Emit "chunk" from the stream.
    this.push(chunk);
    // finish up
    next();
  })
}
```

If you don't care about size you can omit it

```js
function fromString(sentence) {
  var strings = sentence.trim().split(/\s+/);
  var i = -1;
  var len = strings.length;
  return noms(function(next) {
    // if there's no more content
    // left in the string, close the stream.
    if (++i < len) {
      return this.push(strings[i]);
    } else {
     return this.push(null);
    }
    next();
}
```

You don't have to worry about the response from this.push, as noms will call the function again after you call next until the cache is full.

```js
var fs = require('fs');
var path = require('path');
function getFiles(dir) {
  var stack = [path.resolve(dir)];
  return noms(function(next) {
    if (!stack.length) {
      //we are done
      return next(null, null);
    }
    var self = this;
    var current = stack.pop();
    fs.readdir(current, function (err, paths) {
      if (err) {
        return next(err);
      }
      if (!paths.length) {
        // this directory is empty
        return next();
      }
     var todo = paths.length;
     paths.forEach(function (file) {
        var fullPath = path.join(current, file);
        fs.stat(fullPath, function (err, stats) {
          todo--;
          if (err) {
            return next(err);
          }
          if (stats.isFile()) {
            //found a file
            // emit it as data
            self.push(fullPath);
          } else if (stats.isDirectory()) {
            // found another directory
            // put it into the stack
            // is depth first, switch this to
            // a shift to make it breadth first
            stack.push(fullPath);
          }
          if (!todo) {
            // we've done all the files
            // would be a lot simpler if I used promises
            // would that help or hurt the example?
            next();
          }
        });
      });
    });

}
```