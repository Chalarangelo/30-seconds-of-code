const expect = require('expect');
const runPromisesInSeries = require('./runPromisesInSeries.js');

test('Testing runPromisesInSeries', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof runPromisesInSeries === 'function').toBeTruthy();
  const delay = d => new Promise(r => setTimeout(r, d));
  runPromisesInSeries([() => delay(100), () => delay(200).then(() => )]);
});
