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
test('Returns own methods', () => {
  expect(functions(new Foo())).toEqual( ['a', 'b']);
});
test('Returns own and inherited methods', () => {
  expect(functions(new Foo(), true)).toEqual(['a', 'b', 'c']);
});
