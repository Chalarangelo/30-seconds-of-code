/* eslint-env mocha */
import expect from 'expect';
import attributesComparator from '../../../src/util/attributesComparator';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXElementMock from '../../../__mocks__/JSXElementMock';

describe('attributesComparator', () => {
  describe('base attributes', () => {
    let baseAttributes;
    let attributes;
    describe('are undefined', () => {
      describe('and attributes are undefined', () => {
        it('should return true', () => {
          expect(attributesComparator()).toBe(true);
        });
      });
    });
    describe('are empty', () => {
      beforeEach(() => {
        baseAttributes = [];
      });
      describe('and attributes', () => {
        describe('are empty', () => {
          attributes = [];
          it('should return true', () => {
            expect(attributesComparator(baseAttributes, attributes))
              .toBe(true);
          });
        });
        describe('have values', () => {
          attributes = [
            JSXAttributeMock('foo', 0),
            JSXAttributeMock('bar', 'baz'),
          ];
          it('should return true', () => {
            expect(attributesComparator(baseAttributes, attributes))
              .toBe(true);
          });
        });
      });
    });
    describe('have values', () => {
      beforeEach(() => {
        baseAttributes = [
          {
            name: 'biz',
            value: 1,
          }, {
            name: 'fizz',
            value: 'pop',
          }, {
            name: 'fuzz',
            value: 'lolz',
          },
        ];
      });
      describe('and attributes', () => {
        describe('are empty', () => {
          attributes = [];
          it('should return false', () => {
            expect(attributesComparator(baseAttributes, attributes))
              .toBe(false);
          });
        });
        describe('have values', () => {
          describe('and the values are the different', () => {
            it('should return false', () => {
              attributes = [
                JSXElementMock(),
                JSXAttributeMock('biz', 2),
                JSXAttributeMock('ziff', 'opo'),
                JSXAttributeMock('far', 'lolz'),
              ];
              expect(attributesComparator(baseAttributes, attributes))
                .toBe(false);
            });
          });
          describe('and the values are a subset', () => {
            it('should return true', () => {
              attributes = [
                JSXAttributeMock('biz', 1),
                JSXAttributeMock('fizz', 'pop'),
                JSXAttributeMock('goo', 'gazz'),
              ];
              expect(attributesComparator(baseAttributes, attributes))
                .toBe(false);
            });
          });
          describe('and the values are the same', () => {
            it('should return true', () => {
              attributes = [
                JSXAttributeMock('biz', 1),
                JSXAttributeMock('fizz', 'pop'),
                JSXAttributeMock('fuzz', 'lolz'),
              ];
              expect(attributesComparator(baseAttributes, attributes))
                .toBe(true);
            });
          });
          describe('and the values are a superset', () => {
            it('should return true', () => {
              attributes = [
                JSXAttributeMock('biz', 1),
                JSXAttributeMock('fizz', 'pop'),
                JSXAttributeMock('fuzz', 'lolz'),
                JSXAttributeMock('dar', 'tee'),
              ];
              expect(attributesComparator(baseAttributes, attributes))
                .toBe(true);
            });
          });
        });
      });
    });
  });
});
