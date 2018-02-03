const test = require('tape');
const functions = require('./functions.js');

test('Testing functions', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof functions === 'function', 'functions is a Function');
  function Foo() {
    this.a = () => 1;
    this.b = () => 2;
  }
  Foo.prototype.c = () => 3;
  t.deepEqual(functions(new Foo()), ['a', 'b'], 'Returns own methods');
  t.deepEqual(functions(new Foo(), true), ['a', 'b', 'c'], 'Returns own and inherited methods');
  //t.deepEqual(functions(args..), 'Expected');
  //t.equal(functions(args..), 'Expected');
  //t.false(functions(args..), 'Expected');
  //t.throws(functions(args..), 'Expected');
  t.end();
});
