const expect = require('expect');
const getURLParameters = require('./getURLParameters.js');

test('Testing getURLParameters', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getURLParameters === 'function').toBeTruthy();
  expect(getURLParameters('http://url.com/page?name=Adam&surname=Smith')).toEqual({name: 'Adam', surname: 'Smith'});
});