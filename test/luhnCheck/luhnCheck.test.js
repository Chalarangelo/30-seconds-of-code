const test = require('tape');
const luhnCheck = require('./luhnCheck.js');

test('Testing luhnCheck', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof luhnCheck === 'function', 'luhnCheck is a Function');
  t.equal(luhnCheck(6011329933655299), false, "validates identification number");
  t.equal(luhnCheck('4485275742308327'), true, "validates identification number");
  t.equal(luhnCheck(123456789), false, "validates identification number");
  //t.deepEqual(luhnCheck(args..), 'Expected');
  //t.equal(luhnCheck(args..), 'Expected');
  //t.false(luhnCheck(args..), 'Expected');
  //t.throws(luhnCheck(args..), 'Expected');
  t.end();
});