const expect = require('expect');
const collatz = require('./collatz.js');


  test('collatz is a Function', () => {
  expect(collatz).toBeInstanceOf(Function);
});
  test('When n is even, divide by 2', () => {
  expect(collatz(8), 4).toBe()
});
  test('When n is odd, times by 3 and add 1', () => {
  expect(collatz(9), 28).toBe()
});

  let n = 9;
  while(true){
    if (n === 1){
      
      break;
    }
    n = collatz(n);
  }
  

