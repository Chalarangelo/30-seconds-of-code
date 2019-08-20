/* eslint-env jest */
import mayContainChildComponent from '../../../src/util/mayContainChildComponent';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

describe('mayContainChildComponent', () => {
  describe('no FancyComponent', () => {
    it('should return false', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
              JSXElementMock('span', [], [
                JSXElementMock('span', [], []),
              ]),
            ]),
          ]),
          JSXElementMock('span', [], []),
          JSXElementMock('img', [
            JSXAttributeMock('src', 'some/path'),
          ]),
        ]),
        'FancyComponent',
        5,
      )).toBe(false);
    });
  });
  describe('contains an indicated component', () => {
    it('should return true', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('input'),
        ]),
        'input',
      )).toBe(true);
    });
    it('should return true', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('FancyComponent'),
        ]),
        'FancyComponent',
      )).toBe(true);
    });
    it('FancyComponent is outside of default depth, should return false', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('FancyComponent'),
          ]),
        ]),
        'FancyComponent',
      )).toBe(false);
    });
    it('FancyComponent is inside of custom depth, should return true', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('FancyComponent'),
          ]),
        ]),
        'FancyComponent',
        2,
      )).toBe(true);
    });
    it('deep nesting, should return true', () => {
      expect(mayContainChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
              JSXElementMock('span', [], [
                JSXElementMock('span', [], [
                  JSXElementMock('span', [], [
                    JSXElementMock('FancyComponent'),
                  ]),
                ]),
              ]),
            ]),
          ]),
          JSXElementMock('span', [], []),
          JSXElementMock('img', [
            JSXAttributeMock('src', 'some/path'),
          ]),
        ]),
        'FancyComponent',
        6,
      )).toBe(true);
    });
  });
  describe('Intederminate situations', () => {
    describe('expression container children', () => {
      it('should return true', () => {
        expect(mayContainChildComponent(
          JSXElementMock('div', [], [
            JSXExpressionContainerMock('mysteryBox'),
          ]),
          'FancyComponent',
        )).toBe(true);
      });
    });
  });
});
