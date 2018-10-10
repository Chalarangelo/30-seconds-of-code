const expect = require('expect');
const {bindKey} = require('./_30s.js');

test('bindKey is a Function', () => {
  expect(bindKey).toBeInstanceOf(Function);
});
const freddy = {
  user: 'fred',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
const freddyBound = bindKey(freddy, 'greet');
test('Binds function to an object context', () => {
  expect(freddyBound('hi', '!')).toBe('hi fred!');
});
