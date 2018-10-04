const expect = require('expect');
const getQueryString = require('./getQueryString.js');

test('getQueryString is a Function', () => {
  expect(getQueryString).toBeInstanceOf(Function);
});

test('getQueryString returns an object', () => {
  expect(getQueryString('a=1&b=&c')).toEqual({
    a: '1',
    b: '',
    c: '',
  });
});

test('getQueryString ignores `?` at the start of the string', () => {
  expect(getQueryString('a=1&b=&c')).toEqual(getQueryString('?a=1&b=&c'));
});

test('getQueryString ignores `#` at the start of the string', () => {
  expect(getQueryString('a=1&b=&c')).toEqual(getQueryString('#a=1&b=&c'));
});

test('getQueryString handles `+` symbol in values', () => {
  expect(
    getQueryString(
      '?q=unicorn+overflow&hl=en&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiVyKSDzOvdAhWDDJAKHaHhDrgQ_AUIDigB&biw=1858&bih=1009',
    ),
  ).toEqual({
    q: 'unicorn overflow',
    hl: 'en',
    source: 'lnms',
    tbm: 'isch',
    sa: 'X',
    ved: '0ahUKEwiVyKSDzOvdAhWDDJAKHaHhDrgQ_AUIDigB',
    biw: '1858',
    bih: '1009',
  });
});
