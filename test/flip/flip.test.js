const test = require('tape');
const flip = require('./flip.js');

test('Testing flip', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof flip === 'function', 'flip is a Function');
  let a = { name: 'John Smith' };
  let b = {};
  const mergeFrom = flip(Object.assign);
  let mergePerson = mergeFrom.bind(null, a);
  t.deepEqual(mergePerson(b), a, 'Flips argument order');
  //t.deepEqual(flip(args..), 'Expected');
  //t.equal(flip(args..), 'Expected');
  //t.false(flip(args..), 'Expected');
  //t.throws(flip(args..), 'Expected');
  t.end();
});
