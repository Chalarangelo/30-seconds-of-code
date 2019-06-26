const {chainAsync} = require('./_30s.js');

test('chainAsync is a Function', () => {
  expect(chainAsync).toBeInstanceOf(Function);
});

let incrementer = 0;
test('Calls all functions in an array', done => {
  chainAsync([
    next => {
      incrementer += 1;
      next();
    },
    next => {
      incrementer += 1;
      next();
    },
    next => {
      expect(incrementer).toEqual(2);
      done();
    }
  ]);
});

test('Last function does not receive "next" argument', done => {
  chainAsync([
    next => {
      next();
    },
    next => {
      expect(next).toBe(undefined);
      done();
    }
  ]);
});
