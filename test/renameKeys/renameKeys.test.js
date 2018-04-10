const test = require('tape');
const renameKeys = require('./renameKeys.js');

test('Testing renameKeys', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof renameKeys === 'function', 'renameKeys is a Function');

	const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
	const renamedObj = renameKeys({ name: 'firstName', job: 'passion' }, obj);

	t.deepEqual(renamedObj, { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 });

  t.end();
});
