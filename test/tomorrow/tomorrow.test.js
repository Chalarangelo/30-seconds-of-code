const test = require('tape');
const tomorrow = require('./tomorrow.js');

test('Testing tomorrow', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof tomorrow === 'function', 'tomorrow is a Function');
  const t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  const t2 = new Date(tomorrow());
  t.equal(t1.getFullYear(), t2.getFullYear(), 'Returns the correct year');
  t.equal(t1.getMonth(), t2.getMonth(), 'Returns the correct month');
  t.equal(t1.getDate(), t2.getDate(), 'Returns the correct date');
  //t.deepEqual(tomorrow(args..), 'Expected');
  //t.equal(tomorrow(args..), 'Expected');
  //t.false(tomorrow(args..), 'Expected');
  //t.throws(tomorrow(args..), 'Expected');
  t.end();
});
