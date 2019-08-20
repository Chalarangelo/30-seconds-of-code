'use strict';
var test = require('tape');
var noms = require('./');

function countObj(num) {
  var i = 20;
  return noms.obj(function(next) {
    if (++i < num) {
      this.push({
        num: i
      });
    } else {
      this.push(null);
    }
    process.nextTick(function () {
      next();
    });
  }, function (next){
    this.push({
      num: 0
    });
    i = 1;
    next(null, {num: 1});
  });
}
function countObjWithNext(num) {
  var i = -1;
  return noms.obj(function(next) {
    if (++i < num) {
       process.nextTick(function () {
        next(null, {
          num: i
        });
      });
    } else {
      process.nextTick(function () {
        next(null, null);
      });
    }
  });
}
function dripWordAsync(string, opts) {
  // from from2's tests
  return noms(opts||{}, function(size, next) {
    if (string.length <= 0) {
      return next(null, null);
    }
    var chunk = string.slice(0, size);
    string = string.slice(size);
    process.nextTick(function () {
      next(null, chunk);
    });
  });
}
function dripWord(string, opts) {
  // from from2's tests
  return noms(opts||{}, function(size, next) {
    if (string.length <= 0) {
      return next(null, null);
    }
    var chunk = string.slice(0, size);
    string = string.slice(size);
    next(null, chunk);
  });
}
test('works', function (t) {
  t.plan(10);
  countObj(10).on('data', function (d) {
    t.ok(true, d.num);
  });
});
test('works with next', function (t) {
  t.plan(10);
  countObjWithNext(10).on('data', function (d) {
    t.ok(true, d.num);
  });
});
test('works with size 1', function (t) {
  t.plan(3);
  var stream = dripWord('abc');

  t.equals(stream.read(1).toString(), 'a');
  t.equals(stream.read(1).toString(), 'b');
  t.equals(stream.read(1).toString(), 'c');

});
test('works with size 2', function (t) {
  t.plan(3);
  dripWord('abcde', {highWaterMark: 2}).on('data', function (d) {
    t.ok(true, d.toString());
  });
});
test('works with size async 1', function (t) {
  t.plan(3);
  var stream = dripWordAsync('abc');
  stream.on('readable', function () {
    t.equals(stream.read(1).toString(), 'a');
    t.equals(stream.read(1).toString(), 'b');
    t.equals(stream.read(1).toString(), 'c');
  });
});
test('works with size async 2', function (t) {
  t.plan(3);
  dripWordAsync('abcde', {highWaterMark: 2}).on('data', function (d) {
    t.ok(true, d.toString());
  });
});