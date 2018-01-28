const test = require('tape');
const bind = require('./bind.js');

test('Testing bind', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bind === 'function', 'bind is a Function');
  function greet(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
  const freddy = { user: 'fred' };
  const freddyBound = bind(greet, freddy);
  t.equals(freddyBound('hi', '!'),'hi fred!', 'Binds to an object context');
  //t.deepEqual(bind(args..), 'Expected');
  //t.equal(bind(args..), 'Expected');
  //t.false(bind(args..), 'Expected');
  //t.throws(bind(args..), 'Expected');
  t.end();
});
