const expect = require('expect');
const getURLParameters = require('./getURLParameters.js');

test('getURLParameters is a Function', () => {
  expect(getURLParameters).toBeInstanceOf(Function);
});
test('Returns an object containing the parameters of the current URL', () => {
  expect(getURLParameters('http://url.com/page?name=Adam&surname=Smith')).toEqual({name: 'Adam', surname: 'Smith'});
});
