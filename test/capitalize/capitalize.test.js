const expect = require('expect');
const capitalize = require('./capitalize.js');


  test('capitalize is a Function', () => {
  expect(capitalize).toBeInstanceOf(Function);
});
  t.equal(capitalize('fooBar'), 'FooBar', "Capitalizes the first letter of a string");
  t.equal(capitalize('fooBar', true), 'Foobar', "Capitalizes the first letter of a string");
  t.equal(capitalize('#!#', true), '#!#', "Works with characters");
  t.equal(capitalize('a', true), 'A', "Works with single character words");
  
