/* eslint-env jest */
import getComputedRole from '../../../src/util/getComputedRole';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

describe('getComputedRole', () => {
  describe('explicit role', () => {
    describe('valid role', () => {
      it('should return the role', () => {
        expect(getComputedRole(
          'div',
          [JSXAttributeMock('role', 'button')],
        )).toBe('button');
      });
    });
    describe('invalid role', () => {
      describe('has implicit', () => {
        it('should return the implicit role', () => {
          expect(getComputedRole(
            'li',
            [JSXAttributeMock('role', 'beeswax')],
          )).toBe('listitem');
        });
      });
      describe('lacks implicit', () => {
        it('should return null', () => {
          expect(getComputedRole(
            'div',
            [JSXAttributeMock('role', 'beeswax')],
          )).toBeNull();
        });
      });
    });

    describe('no role', () => {
      describe('has implicit', () => {
        it('should return the implicit role', () => {
          expect(getComputedRole(
            'li',
            [],
          )).toBe('listitem');
        });
      });
      describe('lacks implicit', () => {
        it('should return null', () => {
          expect(getComputedRole(
            'div',
            [],
          )).toBeNull();
        });
      });
    });
  });
  describe('implicit role', () => {
    describe('has implicit', () => {
      it('should return the implicit role', () => {
        expect(getComputedRole(
          'li',
          [JSXAttributeMock('role', 'beeswax')],
        )).toBe('listitem');
      });
    });
    describe('lacks implicit', () => {
      it('should return null', () => {
        expect(getComputedRole(
          'div',
          [],
        )).toBeNull();
      });
    });
  });
});
