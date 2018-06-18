const expect = require('expect');
const functions = require('./functions.js');


  test('functions is a Function', () => {
  expect(functions).toBeInstanceOf(Function);
});
  function Foo() {
    this.a = () => 1;
    this.b = () => 2;
  }
  Foo.prototype.c = () => 3;
  t.deepEqual(functions(new Foo()), ['a', 'b'], 'Returns own methods');
  t.deepEqual(functions(new Foo(), true), ['a', 'b', 'c'], 'Returns own and inherited methods');
  

