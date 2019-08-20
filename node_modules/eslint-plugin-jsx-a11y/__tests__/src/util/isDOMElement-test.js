/* eslint-env mocha */
import { dom } from 'aria-query';
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isDOMElement from '../../../src/util/isDOMElement';
import JSXElementMock from '../../../__mocks__/JSXElementMock';

const domElements = [...dom.keys()];

describe('isDOMElement', () => {
  describe('DOM elements', () => {
    domElements.forEach((el) => {
      it(`should identify ${el} as a DOM element`, () => {
        const element = JSXElementMock(el);
        expect(isDOMElement(elementType(element.openingElement)))
          .toBe(true);
      });
    });
  });
  describe('Custom Element', () => {
    it('should not identify a custom element', () => {
      const element = JSXElementMock('CustomElement');
      expect(isDOMElement(element))
        .toBe(false);
    });
  });
});
