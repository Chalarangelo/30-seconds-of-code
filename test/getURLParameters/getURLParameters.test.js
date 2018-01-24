const test = require('tape');
const getURLParameters = require('./getURLParameters.js');

test('Testing getURLParameters', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof getURLParameters === 'function', 'getURLParameters is a Function');
  t.deepEqual(getURLParameters('http://url.com/page?name=Adam&surname=Smith'), {name: 'Adam', surname: 'Smith'}, "Returns an object containing the parameters of the current URL");
  //t.deepEqual(getURLParameters(args..), 'Expected');
  //t.equal(getURLParameters(args..), 'Expected');
  //t.false(getURLParameters(args..), 'Expected');
  //t.throws(getURLParameters(args..), 'Expected');
  t.end();
});