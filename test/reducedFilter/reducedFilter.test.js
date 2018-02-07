const test = require('tape');
const reducedFilter = require('./reducedFilter.js');

test('Testing reducedFilter', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof reducedFilter === 'function', 'reducedFilter is a Function');
  const data = [
    {
      id: 1,
      name: 'john',
      age: 24
    },
    {
      id: 2,
      name: 'mike',
      age: 50
    }
    ];
    t.deepEqual(reducedFilter(data, ['id', 'name'], item => item.age > 24), [{ id: 2, name: 'mike'}], "Filter an array of objects based on a condition while also filtering out unspecified keys.");
  //t.deepEqual(reducedFilter(args..), 'Expected');
  //t.equal(reducedFilter(args..), 'Expected');
  //t.false(reducedFilter(args..), 'Expected');
  //t.throws(reducedFilter(args..), 'Expected');
  t.end();
});