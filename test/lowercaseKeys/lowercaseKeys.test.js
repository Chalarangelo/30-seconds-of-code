const test = require('tape');
const lowercaseKeys = require('./lowercaseKeys.js');

test('Testing lowercaseKeys', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof lowercaseKeys === 'function', 'lowercaseKeys is a Function');
  const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
  const myObjLower = lowercaseKeys(myObj);
  t.deepEqual(myObjLower, {name: 'Adam', surname: 'Smith'}, 'Lowercases object keys');
  t.deepEqual(myObj, { Name: 'Adam', sUrnAME: 'Smith' }, 'Does not mutate original object');
  //t.deepEqual(lowercaseKeys(args..), 'Expected');
  //t.equal(lowercaseKeys(args..), 'Expected');
  //t.false(lowercaseKeys(args..), 'Expected');
  //t.throws(lowercaseKeys(args..), 'Expected');
  t.end();
});
