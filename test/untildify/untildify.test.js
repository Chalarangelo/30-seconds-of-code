const test = require('tape');
const untildify = require('./untildify.js');

test('Testing untildify', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof untildify === 'function', 'untildify is a Function');
  t.true(untildify('~/test/dir/file.f').indexOf('~') === -1, 'Contains no tildes');
  t.equal(untildify('~/test/dir/file.f').slice(-16), '/test/dir/file.f', 'Does not alter the rest of the path');
  t.equal(untildify('test/dir/file.f'), 'test/dir/file.f', 'Does not alter paths without tildes');
  //t.deepEqual(untildify(args..), 'Expected');
  //t.equal(untildify(args..), 'Expected');
  //t.false(untildify(args..), 'Expected');
  //t.throws(untildify(args..), 'Expected');
  t.end();
});
