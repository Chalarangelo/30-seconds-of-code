const test = require('tape');
const httpsRedirect = require('./httpsRedirect.js');

test('Testing httpsRedirect', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof httpsRedirect === 'function', 'httpsRedirect is a Function');
  //t.deepEqual(httpsRedirect(args..), 'Expected');
  //t.equal(httpsRedirect(args..), 'Expected');
  //t.false(httpsRedirect(args..), 'Expected');
  //t.throws(httpsRedirect(args..), 'Expected');
  t.end();
});