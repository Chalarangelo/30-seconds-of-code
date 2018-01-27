const test = require('tape');
const speechSynthesis = require('./speechSynthesis.js');

test('Testing speechSynthesis', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof speechSynthesis === 'function', 'speechSynthesis is a Function');
  //t.deepEqual(speechSynthesis(args..), 'Expected');
  //t.equal(speechSynthesis(args..), 'Expected');
  //t.false(speechSynthesis(args..), 'Expected');
  //t.throws(speechSynthesis(args..), 'Expected');
  t.end();
});