const expect = require('expect');
const partial = require('./partial.js');


  test('partial is a Function', () => {
  expect(partial).toBeInstanceOf(Function);
});
  function greet(greeting, name) {
    return greeting + ' ' + name + '!';
  }
  const greetHello = partial(greet, 'Hello');
  t.equal(greetHello('John'), 'Hello John!', 'Prepends arguments');
  

