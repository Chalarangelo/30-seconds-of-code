const expect = require('expect');
const bindKey = require('./bindKey.js');


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
  t.equal(freddyBound('hi', '!'), 'hi fred!', 'Binds function to an object context');
  

