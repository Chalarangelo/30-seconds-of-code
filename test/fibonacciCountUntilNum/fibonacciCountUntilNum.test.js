const test = require('tape');
const fibonacciCountUntilNum = require('./fibonacciCountUntilNum.js');

test('Testing fibonacciCountUntilNum', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof fibonacciCountUntilNum === 'function', 'fibonacciCountUntilNum is a Function');
  //t.deepEqual(fibonacciCountUntilNum(args..), 'Expected');
  //t.equal(fibonacciCountUntilNum(args..), 'Expected');
  //t.false(fibonacciCountUntilNum(args..), 'Expected');
  //t.throws(fibonacciCountUntilNum(args..), 'Expected');
  t.end();
});