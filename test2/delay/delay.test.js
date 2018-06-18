const expect = require('expect');
const delay = require('./delay.js');

test('Testing delay', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof delay === 'function').toBeTruthy();
  delay(
    function(text) {
      expect(text).toBe('test');
    },
    1000,
    'test'
  );
});
