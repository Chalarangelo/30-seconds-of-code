const test = require('tape');
const untildify = require('./untildify.js');

test('Testing untildify', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof untildify === 'function', 'untildify is a Function');
  //t.deepEqual(untildify(args..), 'Expected');
  //t.equal(untildify(args..), 'Expected');
  //t.false(untildify(args..), 'Expected');
  //t.throws(untildify(args..), 'Expected');
  t.end();
});