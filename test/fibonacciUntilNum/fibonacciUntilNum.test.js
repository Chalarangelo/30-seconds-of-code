const test = require('tape');
const fibonacciUntilNum = require('./fibonacciUntilNum.js');

test('Testing fibonacciUntilNum', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof fibonacciUntilNum === 'function', 'fibonacciUntilNum is a Function');
  //t.deepEqual(fibonacciUntilNum(args..), 'Expected');
  //t.equal(fibonacciUntilNum(args..), 'Expected');
  //t.false(fibonacciUntilNum(args..), 'Expected');
  //t.throws(fibonacciUntilNum(args..), 'Expected');
  t.end();
});