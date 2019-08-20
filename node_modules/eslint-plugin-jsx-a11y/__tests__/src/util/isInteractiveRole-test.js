/* eslint-env mocha */
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isInteractiveRole from '../../../src/util/isInteractiveRole';
import {
  genElementSymbol,
  genInteractiveRoleElements,
  genNonInteractiveRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive role elements', () => {
      expect(isInteractiveRole(undefined, []))
        .toBe(false);
    });
  });
  describe('elements with a non-interactive role', () => {
    genNonInteractiveRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should not identify \`${genElementSymbol(openingElement)}\` as an interactive role element`, () => {
        expect(isInteractiveRole(
          elementType(openingElement),
          attributes,
        )).toBe(false);
      });
    });
  });
  describe('elements without a role', () => {
    it('should not identify them as interactive role elements', () => {
      expect(isInteractiveRole('div', [])).toBe(false);
    });
  });
  describe('elements with an interactive role', () => {
    genInteractiveRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should identify \`${genElementSymbol(openingElement)}\` as an interactive role element`, () => {
        expect(isInteractiveRole(
          elementType(openingElement),
          attributes,
        )).toBe(true);
      });
    });
  });
});
