/* eslint-env jest */
import assert from 'assert';
import { generateObjSchema, arraySchema, enumArraySchema } from '../../../src/util/schemas';

describe('schemas', () => {
  it('should generate an object schema with correct properties', () => {
    const schema = generateObjSchema({
      foo: 'bar',
      baz: arraySchema,
    });
    const properties = schema.properties || {};

    assert.deepEqual(properties.foo, 'bar');
    assert.deepEqual(properties.baz.type, 'array');
  });
  describe('enumArraySchema', () => {
    it('works with no arguments', () => {
      assert.deepEqual(enumArraySchema(), {
        additionalItems: false,
        items: {
          enum: [],
          type: 'string',
        },
        minItems: 0,
        type: 'array',
        uniqueItems: true,
      });
    });
  });
});
