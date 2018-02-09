const test = require('tape');
const promisify = require('./promisify.js');

test('Testing promisify', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof promisify === 'function', 'promisify is a Function');
  const x = promisify(Math.max);
  t.true(x() instanceof Promise, 'Returns a promise');
  const delay = promisify((d, cb) => setTimeout(cb, d));
  delay(200).then(() => t.pass('Runs the function provided'));
  //t.deepEqual(promisify(args..), 'Expected');
  //t.equal(promisify(args..), 'Expected');
  //t.false(promisify(args..), 'Expected');
  //t.throws(promisify(args..), 'Expected');
  t.end();
});
