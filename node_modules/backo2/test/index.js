
var Backoff = require('..');
var assert = require('assert');

describe('.duration()', function(){
  it('should increase the backoff', function(){
    var b = new Backoff;

    assert(100 == b.duration());
    assert(200 == b.duration());
    assert(400 == b.duration());
    assert(800 == b.duration());

    b.reset();
    assert(100 == b.duration());
    assert(200 == b.duration());
  })
})