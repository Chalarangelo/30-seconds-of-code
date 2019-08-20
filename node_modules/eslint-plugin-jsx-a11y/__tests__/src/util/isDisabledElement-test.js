/* eslint-env mocha */
import expect from 'expect';
import isDisabledElement from '../../../src/util/isDisabledElement';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

describe('isDisabledElement', () => {
  describe('HTML5', () => {
    describe('disabled', () => {
      it('should identify HTML5 disabled elements', () => {
        const attributes = [
          JSXAttributeMock('disabled', 'disabled'),
        ];
        expect(isDisabledElement(attributes))
          .toBe(true);
      });
    });
    describe('not disabled', () => {
      it('should identify HTML5 disabled elements with null as the value', () => {
        const attributes = [
          JSXAttributeMock('disabled', null),
        ];
        expect(isDisabledElement(attributes))
          .toBe(true);
      });
      it('should not identify HTML5 disabled elements with undefined as the value', () => {
        const attributes = [
          JSXAttributeMock('disabled', undefined),
        ];
        expect(isDisabledElement(attributes))
          .toBe(false);
      });
    });
  });
  describe('ARIA', () => {
    describe('disabled', () => {
      it('should not identify ARIA disabled elements', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', 'true'),
        ];
        expect(isDisabledElement(attributes))
          .toBe(true);
      });
      it('should not identify ARIA disabled elements', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', true),
        ];
        expect(isDisabledElement(attributes))
          .toBe(true);
      });
    });
    describe('not disabled', () => {
      it('should not identify ARIA disabled elements', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', 'false'),
        ];
        expect(isDisabledElement(attributes))
          .toBe(false);
      });
      it('should not identify ARIA disabled elements', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', false),
        ];
        expect(isDisabledElement(attributes))
          .toBe(false);
      });
      it('should not identify ARIA disabled elements with null as the value', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', null),
        ];
        expect(isDisabledElement(attributes))
          .toBe(false);
      });
      it('should not identify ARIA disabled elements with undefined as the value', () => {
        const attributes = [
          JSXAttributeMock('aria-disabled', undefined),
        ];
        expect(isDisabledElement(attributes))
          .toBe(false);
      });
    });
  });
});
