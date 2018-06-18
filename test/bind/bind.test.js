const expect = require('expect');
const bind = require('./bind.js');

test('Testing bind', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof bind === 'function').toBeTruthy();
  function greet(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
  const freddy = { user: 'fred' };
  const freddyBound = bind(greet, freddy);
  expect(freddyBound('hi', '!')).toBe('hi fred!');
});
