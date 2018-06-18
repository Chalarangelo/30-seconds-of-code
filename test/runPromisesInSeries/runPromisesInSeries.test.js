const expect = require('expect');
const runPromisesInSeries = require('./runPromisesInSeries.js');


  test('runPromisesInSeries is a Function', () => {
  expect(runPromisesInSeries).toBeInstanceOf(Function);
});
  const delay = d => new Promise(r => setTimeout(r, d));
  runPromisesInSeries([() => delay(100), () => delay(200).then(() => t.pass('Runs promises in series'))]);
  

