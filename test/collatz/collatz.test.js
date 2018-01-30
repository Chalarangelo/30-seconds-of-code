const test = require('tape');
const collatz = require('./collatz.js');

test('Testing collatz', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof collatz === 'function', 'collatz is a Function');
  //t.deepEqual(collatz(args..), 'Expected');
  t.equal(collatz(8), 4, 'When n is even, divide by 2');
  t.equal(collatz(9), 28, 'When n is odd, times by 3 and add 1');

  let n = 9;
  while(true){
    if (n == 1){
      t.pass('Eventually reaches 1');
      break;
    }
    n = collatz(n);
  }
  
  //t.false(collatz(args..), 'Expected');
  //t.throws(collatz(args..), 'Expected');
  t.end();
});