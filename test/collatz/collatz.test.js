const expect = require('expect');
const collatz = require('./collatz.js');

test('Testing collatz', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof collatz === 'function').toBeTruthy();
  //t.deepEqual(collatz(args..), 'Expected');
  expect(collatz(8)).toBe(4);
  expect(collatz(9)).toBe(28);

  let n = 9;
  while(true){
    if (n === 1){
      break;
    }
    n = collatz(n);
  }
});
