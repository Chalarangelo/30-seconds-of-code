/* eslint-env mocha */
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isNonInteractiveRole from '../../../src/util/isNonInteractiveRole';
import {
  genElementSymbol,
  genInteractiveRoleElements,
  genNonInteractiveRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isNonInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive role elements', () => {
      expect(isNonInteractiveRole(undefined, []))
        .toBe(false);
    });
  });
  describe('elements with a non-interactive role', () => {
    genNonInteractiveRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should identify \`${genElementSymbol(openingElement)}\` as non-interactive role element`, () => {
        expect(isNonInteractiveRole(
          elementType(openingElement),
          attributes,
        )).toBe(true);
      });
    });
  });
  describe('elements without a role', () => {
    it('should not identify them as non-interactive role elements', () => {
      expect(isNonInteractiveRole('div', [])).toBe(false);
    });
  });
  describe('elements with an interactive role', () => {
    genInteractiveRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should NOT identify \`${genElementSymbol(openingElement)}\` as a non-interactive role element`, () => {
        expect(isNonInteractiveRole(
          elementType(openingElement),
          attributes,
        )).toBe(false);
      });
    });
  });
});
