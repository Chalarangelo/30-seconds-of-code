const expect = require('expect');
const {defaultValue} = require('./_30s.js');
const user = {
  name: 'Davut',
  phone: '123456789',
  address: {
      country: 'Turkey'
  //  ,country_code: '+90'
  }
}

test('defaultValue is a Function', () => {
  expect(defaultValue).toBeInstanceOf(Function);
});

test('Return default value for undefined property.', () => {
  expect(defaultValue('+90',user,'address','country_code')).toBe('+90');
});

test('Return default value for undefined of undefined property.', () => {
  expect(defaultValue('06',user,'address','city','code')).toBe('06');
});

test('Return exist value for the defined property.', () => {
  expect(defaultValue('NoName',user,'name')).toBe('Davut');
});


