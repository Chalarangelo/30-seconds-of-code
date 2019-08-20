/* eslint-env jest */
import getTabIndex from '../../../src/util/getTabIndex';
import IdentifierMock from '../../../__mocks__/IdentifierMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

describe('getTabIndex', () => {
  describe('tabIndex is defined', () => {
    describe('as a number ', () => {
      describe('zero', () => {
        it('should return zero', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', 0))).toBe(0);
        });
      });
      describe('positive integer', () => {
        it('should return the integer', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', 1))).toBe(1);
        });
      });
      describe('negative integer', () => {
        it('should return the integer', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', -1))).toBe(-1);
        });
      });
      describe('float', () => {
        it('should return undefined', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', 9.1))).toBeUndefined();
        });
      });
    });
    describe('as a string', () => {
      describe('empty', () => {
        it('should return undefined', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', ''))).toBeUndefined();
        });
      });
      describe('which converts to a number', () => {
        it('should return an integer', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', '0'))).toBe(0);
        });
      });
      describe('which is NaN', () => {
        it('should return undefined', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', '0a'))).toBeUndefined();
        });
      });
    });
    describe('as a boolean', () => {
      describe('true', () => {
        it('should return undefined', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', true))).toBeUndefined();
        });
      });
      describe('false', () => {
        it('should return undefined', () => {
          expect(getTabIndex(JSXAttributeMock('tabIndex', false))).toBeUndefined();
        });
      });
    });
    describe('as an expression', () => {
      describe('function expression', () => {
        it('should return the correct type', () => {
          const attr = function mockFn() { return 0; };
          expect(typeof getTabIndex(JSXAttributeMock('tabIndex', attr))).toEqual('function');
        });
      });
      describe('variable expression', () => {
        it('should return the Identifier name', () => {
          const name = 'identName';
          expect(getTabIndex(JSXAttributeMock(
            'tabIndex',
            IdentifierMock(name),
            true,
          ))).toEqual(name);
        });
      });
    });
  });
  describe('tabIndex is not defined', () => {
    it('should return undefined', () => {
      expect(getTabIndex(JSXAttributeMock('tabIndex', undefined))).toBeUndefined();
    });
  });
});
