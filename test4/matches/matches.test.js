const expect = require('expect');
const matches = require('./matches.js');

test('Testing matches', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof matches === 'function').toBeTruthy();
  expect(
    matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true })
  ).toBeTruthy();
  expect(
    matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true })
  ).toBeFalsy();
});
