
/**
 * Module dependencies.
 */

var object = require('..');

describe('.keys(obj)', function(){
  it('should return the keys of an object', function(){
    var obj = { name: 'tobi', age: 1 };
    object.keys(obj).should.eql(['name', 'age']);
  })
})

describe('.values(obj)', function(){
  it('should return the values of an object', function(){
    var obj = { name: 'tobi', age: 1 };
    object.values(obj).should.eql(['tobi', 1]);
  })
})

describe('.length(obj)', function(){
  it('should return key count', function(){
    var obj = { name: 'tobi', age: 1 };
    object.length(obj).should.equal(2);
  })
})

describe('.merge(a, b)', function(){
  it('should merge two objects', function(){
    var a = { foo: 'bar' };
    var b = { bar: 'baz' };
    object.merge(a, b).should.eql({ foo: 'bar', bar: 'baz' });
  })

  it('should give precedence to b', function(){
    var a = { foo: 'bar' };
    var b = { foo: 'baz' };
    object.merge(a, b).should.eql({ foo: 'baz' });
  })
})

describe('.isEmpty()', function(){
  it('should check if the object is empty', function(){
    object.isEmpty({}).should.be.true;
    object.isEmpty({ foo: 'bar' }).should.be.false;
  })
})