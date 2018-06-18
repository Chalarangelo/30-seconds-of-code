const expect = require('expect');
const similarity = require('./similarity.js');

test('Testing similarity', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof similarity === 'function').toBeTruthy();
  expect(similarity([1, 2, 3], [1, 2, 4])).toEqual([1, 2]);  //t.equal(similarity(args..), 'Expected');
});