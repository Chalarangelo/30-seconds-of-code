const expect = require('expect');
const bind = require('./bind.js');


  test('bind is a Function', () => {
  expect(bind).toBeInstanceOf(Function);
});
  function greet(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
  const freddy = { user: 'fred' };
  const freddyBound = bind(greet, freddy);
  test('Binds to an object context', () => {
  expect(freddyBound('hi', '!'),'hi fred!').toBe()
});
  

