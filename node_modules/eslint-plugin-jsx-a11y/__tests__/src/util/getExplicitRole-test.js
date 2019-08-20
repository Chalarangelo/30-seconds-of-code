/* eslint-env jest */
import getExplicitRole from '../../../src/util/getExplicitRole';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

describe('getExplicitRole', () => {
  describe('valid role', () => {
    it('should return the role', () => {
      expect(getExplicitRole(
        'div',
        [JSXAttributeMock('role', 'button')],
      )).toBe('button');
    });
  });
  describe('invalid role', () => {
    it('should return null', () => {
      expect(getExplicitRole(
        'div',
        [JSXAttributeMock('role', 'beeswax')],
      )).toBeNull();
    });
  });
  describe('no role', () => {
    it('should return null', () => {
      expect(getExplicitRole(
        'div',
        [],
      )).toBeNull();
    });
  });
});
