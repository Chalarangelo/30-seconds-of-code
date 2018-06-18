const expect = require('expect');
const bindKey = require('./bindKey.js');

test('Testing bindKey', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof bindKey === 'function').toBeTruthy();
  const freddy = {
    user: 'fred',
    greet: function(greeting, punctuation) {
      return greeting + ' ' + this.user + punctuation;
    }
  };
  const freddyBound = bindKey(freddy, 'greet');
  expect(freddyBound('hi', '!')).toBe('hi fred!');
});
