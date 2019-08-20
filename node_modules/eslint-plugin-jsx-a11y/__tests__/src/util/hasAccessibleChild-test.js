/* eslint-env jest */
import hasAccessibleChild from '../../../src/util/hasAccessibleChild';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

describe('hasAccessibleChild', () => {
  describe('has no children and does not set dangerouslySetInnerHTML', () => {
    it('returns false', () => {
      expect(hasAccessibleChild(JSXElementMock('div', []))).toBe(false);
    });
  });


  describe('has no children and sets dangerouslySetInnerHTML', () => {
    it('Returns true', () => {
      const prop = JSXAttributeMock('dangerouslySetInnerHTML', true);
      const element = JSXElementMock('div', [prop], []);
      expect(hasAccessibleChild(element)).toBe(true);
    });
  });

  describe('has children', () => {
    it('Returns true for a Literal child', () => {
      const child = {
        type: 'Literal',
        value: 'foo',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(true);
    });

    it('Returns true for visible child JSXElement', () => {
      const child = JSXElementMock('div', []);
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(true);
    });

    it('Returns true for JSXText Element', () => {
      const child = {
        type: 'JSXText',
        value: 'foo',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(true);
    });

    it('Returns false for hidden child JSXElement', () => {
      const ariaHiddenAttr = JSXAttributeMock('aria-hidden', true);
      const child = JSXElementMock('div', [ariaHiddenAttr]);
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(false);
    });

    it('Returns true for defined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'foo',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(true);
    });

    it('Returns false for undefined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'undefined',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(false);
    });

    it('Returns false for unknown child type', () => {
      const child = {
        type: 'Unknown',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasAccessibleChild(element)).toBe(false);
    });

    it('Returns true with children passed as a prop', () => {
      const children = JSXAttributeMock('children', true);
      const element = JSXElementMock('div', [children], []);
      expect(hasAccessibleChild(element)).toBe(true);
    });
  });
});
