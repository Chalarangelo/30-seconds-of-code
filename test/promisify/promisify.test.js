const expect = require('expect');
const promisify = require('./promisify.js');


  test('promisify is a Function', () => {
  expect(promisify).toBeInstanceOf(Function);
});
  const x = promisify(Math.max);
  test('Returns a promise', () => {
  expect(x() instanceof Promise).toBeTruthy();
});
  const delay = promisify((d, cb) => setTimeout(cb, d));
  delay(200).then(() => t.pass('Runs the function provided'));
  

