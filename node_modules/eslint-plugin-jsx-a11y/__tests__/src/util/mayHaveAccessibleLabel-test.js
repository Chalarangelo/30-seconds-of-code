/* eslint-env jest */
import mayHaveAccessibleLabel from '../../../src/util/mayHaveAccessibleLabel';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';
import JSXSpreadAttributeMock from '../../../__mocks__/JSXSpreadAttributeMock';
import JSXTextMock from '../../../__mocks__/JSXTextMock';
import LiteralMock from '../../../__mocks__/LiteralMock';

describe('mayHaveAccessibleLabel', () => {
  describe('no label', () => {
    it('should return false', () => {
      expect(mayHaveAccessibleLabel(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
              JSXElementMock('span', [], [
                JSXElementMock('span', [], []),
              ]),
            ]),
          ]),
          JSXElementMock('span', [], []),
          JSXElementMock('img', [
            JSXAttributeMock('src', 'some/path'),
          ]),
        ]),
        5,
      )).toBe(false);
    });
  });
  describe('label via attributes', () => {
    it('aria-label, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [
        JSXAttributeMock('aria-label', 'A delicate label'),
      ], []))).toBe(true);
    });
    it('aria-label without content, should return false', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [
        JSXAttributeMock('aria-label', ''),
      ], []))).toBe(false);
    });
    it('aria-labelledby, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [
        JSXAttributeMock('aria-labelledby', 'elementId'),
      ], []))).toBe(true);
    });
    it('aria-labelledby without content, should return false', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [
        JSXAttributeMock('aria-labelledby', ''),
      ], []))).toBe(false);
    });
    it('aria-labelledby with an expression container, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [
        JSXAttributeMock('aria-labelledby', 'elementId', true),
      ], []))).toBe(true);
    });
  });
  describe('label via custom label attribute', () => {
    let customLabelProp;
    beforeEach(() => {
      customLabelProp = 'cowbell';
    });
    it('aria-label, should return true', () => {
      expect(mayHaveAccessibleLabel(
        JSXElementMock('div', [
          JSXAttributeMock(customLabelProp, 'A delicate label'),
        ], []),
        1,
        [customLabelProp],
      )).toBe(true);
    });
  });
  describe('text label', () => {
    it('Literal text, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        LiteralMock('A fancy label'),
      ]))).toBe(true);
    });
    it('JSXText, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        JSXTextMock('A fancy label'),
      ]))).toBe(true);
    });
    it('label is outside of default depth, should return false', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        JSXElementMock('div', [], [
          JSXTextMock('A fancy label'),
        ]),
      ]))).toBe(false);
    });
    it('label is inside of custom depth, should return true', () => {
      expect(mayHaveAccessibleLabel(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXTextMock('A fancy label'),
          ]),
        ]),
        2,
      )).toBe(true);
    });
    it('deep nesting, should return true', () => {
      expect(mayHaveAccessibleLabel(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
              JSXElementMock('span', [], [
                JSXElementMock('span', [], [
                  JSXElementMock('span', [], [
                    JSXTextMock('A fancy label'),
                  ]),
                ]),
              ]),
            ]),
          ]),
          JSXElementMock('span', [], []),
          JSXElementMock('img', [
            JSXAttributeMock('src', 'some/path'),
          ]),
        ]),
        6,
      )).toBe(true);
    });
  });
  describe('image content', () => {
    it('without alt, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        JSXElementMock('img', [
          JSXAttributeMock('src', 'some/path'),
        ]),
      ]))).toBe(false);
    });
    it('with alt, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        JSXElementMock('img', [
          JSXAttributeMock('src', 'some/path'),
          JSXAttributeMock('alt', 'A sensible label'),
        ]),
      ]))).toBe(true);
    });
    it('with aria-label, should return true', () => {
      expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
        JSXElementMock('img', [
          JSXAttributeMock('src', 'some/path'),
          JSXAttributeMock('aria-label', 'A sensible label'),
        ]),
      ]))).toBe(true);
    });
  });
  describe('Intederminate situations', () => {
    describe('expression container children', () => {
      it('should return true', () => {
        expect(mayHaveAccessibleLabel(JSXElementMock('div', [], [
          JSXExpressionContainerMock('mysteryBox'),
        ]))).toBe(true);
      });
    });
    describe('spread operator in attributes', () => {
      it('should return true', () => {
        expect(mayHaveAccessibleLabel(JSXElementMock('div', [
          JSXAttributeMock('style', 'some-junk'),
          JSXSpreadAttributeMock('props'),
        ], []))).toBe(true);
      });
    });
  });
});
