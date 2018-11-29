const expect = require('expect');
const { deepMapKeys, toCamelCase } = require('./_30s.js');

test('deepMapKeys is a Function', () => {
  expect(deepMapKeys).toBeInstanceOf(Function);
});

test('Deep maps object keys', () => {
  const obj = {
    'foo_bar': 'hello',
    'deep_child': {
      'child_array': ['hello'],
      'child_object_array': [
        { 'hola_hello': 'Gamarjoba' }
      ]
    }
  };
  const expected = {
    fooBar: 'hello',
    deepChild: {
      childArray: ['hello'],
      childObjectArray: [
        {
          holaHello: 'Gamarjoba'
        }
      ]
    }
  };
  const camleCaseKeys = k => toCamelCase(k);
  expect(deepMapKeys(obj, camleCaseKeys)).toEqual(expected);
});

