const expect = require('expect');
const matchesWith = require('./matchesWith.js');

test('Testing matchesWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof matchesWith === 'function').toBeTruthy();
  const isGreeting = val => /^h(?:i|ello)$/.test(val);
  expect(matchesWith(
    { greeting: 'hello' },
    { greeting: 'hi' },
    (oV, sV) => isGreeting(oV) && isGreeting(sV)
  )).toBeTruthy();
});
