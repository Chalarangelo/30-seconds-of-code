const test = require('tape');
const bindKey = require('./bindKey.js');

test('Testing bindKey', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bindKey === 'function', 'bindKey is a Function');
  const freddy = {
    user: 'fred',
    greet: function(greeting, punctuation) {
      return greeting + ' ' + this.user + punctuation;
    }
  };
  const freddyBound = bindKey(freddy, 'greet');
  t.equal(freddyBound('hi', '!'), 'hi fred!', 'Binds function to an object context');
  //t.deepEqual(bindKey(args..), 'Expected');
  //t.equal(bindKey(args..), 'Expected');
  //t.false(bindKey(args..), 'Expected');
  //t.throws(bindKey(args..), 'Expected');
  t.end();
});
