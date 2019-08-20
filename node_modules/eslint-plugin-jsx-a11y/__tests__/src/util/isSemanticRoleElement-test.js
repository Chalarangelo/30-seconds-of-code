/* eslint-env mocha */
import expect from 'expect';
import isSemanticRoleElement from '../../../src/util/isSemanticRoleElement';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

describe('isSemanticRoleElement', () => {
  it('should identify semantic role elements', () => {
    expect(isSemanticRoleElement('input', [
      JSXAttributeMock('type', 'checkbox'),
      JSXAttributeMock('role', 'switch'),
    ])).toBe(true);
  });
  it('should reject non-semantic role elements', () => {
    expect(isSemanticRoleElement('input', [
      JSXAttributeMock('type', 'radio'),
      JSXAttributeMock('role', 'switch'),
    ])).toBe(false);
    expect(isSemanticRoleElement('input', [
      JSXAttributeMock('type', 'text'),
      JSXAttributeMock('role', 'combobox'),
    ])).toBe(false);
    expect(isSemanticRoleElement('button', [
      JSXAttributeMock('role', 'switch'),
      JSXAttributeMock('aria-pressed', 'true'),
    ])).toBe(false);
    expect(isSemanticRoleElement('input', [
      JSXAttributeMock('role', 'switch'),
    ])).toBe(false);
  });
  it('should not throw on JSXSpreadAttribute', () => {
    expect(() => {
      isSemanticRoleElement('input', [
        JSXAttributeMock('type', 'checkbox'),
        JSXAttributeMock('role', 'checkbox'),
        JSXAttributeMock('aria-checked', 'false'),
        JSXAttributeMock('aria-labelledby', 'foo'),
        JSXAttributeMock('tabindex', '0'),
        {
          type: 'JSXSpreadAttribute',
          argument: {
            type: 'Identifier',
            name: 'props',
          },
        },
      ]);
    }).not.toThrow();
  });
});
