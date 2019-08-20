/* eslint-env mocha */
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isAbstractRole from '../../../src/util/isAbstractRole';
import {
  genElementSymbol,
  genAbstractRoleElements,
  genNonAbstractRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isAbstractRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should NOT identify them as abstract role elements', () => {
      expect(isAbstractRole(undefined, []))
        .toBe(false);
    });
  });
  describe('elements with an abstract role', () => {
    genAbstractRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should identify \`${genElementSymbol(openingElement)}\` as an abstract role element`, () => {
        expect(isAbstractRole(
          elementType(openingElement),
          attributes,
        )).toBe(true);
      });
    });
  });
  describe('elements with a non-abstract role', () => {
    genNonAbstractRoleElements().forEach(({ openingElement }) => {
      const { attributes } = openingElement;
      it(`should NOT identify \`${genElementSymbol(openingElement)}\` as an abstract role element`, () => {
        expect(isAbstractRole(
          elementType(openingElement),
          attributes,
        )).toBe(false);
      });
    });
  });
});
