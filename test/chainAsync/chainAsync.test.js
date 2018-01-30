const test = require('tape');
const chainAsync = require('./chainAsync.js');

test('Testing chainAsync', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof chainAsync === 'function', 'chainAsync is a Function');
  //t.deepEqual(chainAsync(args..), 'Expected');
  chainAsync([
    next => {
      next();
    },
    next => {
      (() =>{
        next()
      })();
    },
    next => {
      t.pass("Calls all functions in an array");
      next();
    }
  ]);
  
  // Ensure we wait for the 2nd assertion to be made
  t.plan(2);

  //t.false(chainAsync(args..), 'Expected');
  //t.throws(chainAsync(args..), 'Expected');
  t.end();
});