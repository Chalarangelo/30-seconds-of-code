const {objectToQueryString} = require('./_30s.js');

test('objectToQueryString is a Function', () => {
  expect(objectToQueryString).toBeInstanceOf(Function);
});

test("{page: '1', size: '2kg', key: '21'} to give '?page=1&size=2kg&key=21'", () => {
  expect(
    objectToQueryString({page: '1', size: '2kg', key: '21'})
  ).toEqual('?page=1&size=2kg&key=21');
});

test("{page: '1', size: '2kg', key: undefined} to give '?page=1&size=2kg'", () => {
  expect(
    objectToQueryString({page: '1', size: '2kg', key: undefined})
  ).toEqual('?page=1&size=2kg');
});

test("{} to give ''", () => {
  expect(
    objectToQueryString({})
  ).toEqual('');
});

test("{page: 1, size: null, key: undefined} to give ''", () => {
  expect(
    objectToQueryString({page: 1, size: null, key: undefined})
  ).toEqual('');
});
