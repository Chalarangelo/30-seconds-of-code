const test = require('tape');
const removeNonASCII = require('./removeNonASCII.js');

test('Testing removeNonASCII', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof removeNonASCII === 'function', 'removeNonASCII is a Function');
  t.equal(removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'), 'lorem-ipsum', 'Removes non-ASCII characters');
  //t.deepEqual(removeNonASCII(args..), 'Expected');
  //t.equal(removeNonASCII(args..), 'Expected');
  //t.false(removeNonASCII(args..), 'Expected');
  //t.throws(removeNonASCII(args..), 'Expected');
  t.end();
});
