const expect = require('expect');
const reducedFilter = require('./reducedFilter.js');

test('Testing reducedFilter', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof reducedFilter === 'function').toBeTruthy();
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
  expect(reducedFilter(data, ['id', 'name'], item => item.age > 24)).toEqual([{ id: 2, name: 'mike'}]);
});