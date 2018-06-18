const expect = require('expect');
const functions = require('./functions.js');

test('Testing functions', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof functions === 'function').toBeTruthy();
  function Foo() {
    this.a = () => 1;
    this.b = () => 2;
  }
  Foo.prototype.c = () => 3;
  expect(functions(new Foo())).toEqual(['a', 'b']);
  expect(functions(new Foo(), true)).toEqual(['a', 'b', 'c']);
});
