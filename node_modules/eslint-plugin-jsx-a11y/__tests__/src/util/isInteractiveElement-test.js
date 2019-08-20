/* eslint-env mocha */
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isInteractiveElement from '../../../src/util/isInteractiveElement';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import {
  genElementSymbol,
  genIndeterminantInteractiveElements,
  genInteractiveElements,
  genInteractiveRoleElements,
  genNonInteractiveElements,
  genNonInteractiveRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isInteractiveElement', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isInteractiveElement(undefined, []))
        .toBe(false);
    });
  });
  describe('interactive elements', () => {
    genInteractiveElements().forEach(({ openingElement }) => {
      it(`should identify \`${genElementSymbol(openingElement)}\` as an interactive element`, () => {
        expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(true);
      });
    });
  });
  describe('interactive role elements', () => {
    genInteractiveRoleElements().forEach(({ openingElement }) => {
      it(`should NOT identify \`${genElementSymbol(openingElement)}\` as an interactive element`, () => {
        expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false);
      });
    });
  });
  describe('non-interactive elements', () => {
    genNonInteractiveElements().forEach(({ openingElement }) => {
      it(`should NOT identify \`${genElementSymbol(openingElement)}\` as an interactive element`, () => {
        expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false);
      });
    });
  });
  describe('non-interactive role elements', () => {
    genNonInteractiveRoleElements().forEach(({ openingElement }) => {
      it(`should NOT identify \`${genElementSymbol(openingElement)}\` as an interactive element`, () => {
        expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false);
      });
    });
  });
  describe('indeterminate elements', () => {
    genIndeterminantInteractiveElements().forEach(({ openingElement }) => {
      it(`should NOT identify \`${openingElement.name.name}\` as an interactive element`, () => {
        expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false);
      });
    });
  });
  describe('JSX elements', () => {
    it('is not interactive', () => {
      expect(isInteractiveElement('CustomComponent', JSXElementMock())).toBe(false);
    });
  });
});
