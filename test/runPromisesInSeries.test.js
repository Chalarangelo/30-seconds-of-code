const {runPromisesInSeries} = require('./_30s.js');

test('runPromisesInSeries is a Function', () => {
  expect(runPromisesInSeries).toBeInstanceOf(Function);
});
const delay = d => new Promise(r => setTimeout(r, d));
test('Runs promises in series', () => {
  return runPromisesInSeries([() => delay(100), () => delay(200)]).then(() =>
    expect(true).toBeTruthy()
  );
});
