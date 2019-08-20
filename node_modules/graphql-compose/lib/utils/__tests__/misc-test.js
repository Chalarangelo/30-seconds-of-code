"use strict";

var _misc = require("../misc");

describe('util/misc', () => {
  it('resolveMaybeThunk', () => {
    expect((0, _misc.resolveMaybeThunk)('hey')).toBe('hey');
    expect((0, _misc.resolveMaybeThunk)({
      a: 1
    })).toEqual({
      a: 1
    });
    expect((0, _misc.resolveMaybeThunk)(() => 'wow')).toBe('wow');
  });
  it('camelCase', () => {
    expect((0, _misc.camelCase)('Hello how are you')).toBe('helloHowAreYou');
  });
  it('getPluralName', () => {
    expect((0, _misc.getPluralName)('author')).toBe('authors');
    expect((0, _misc.getPluralName)('child')).toBe('children');
    expect((0, _misc.getPluralName)('person')).toBe('people');
    expect((0, _misc.getPluralName)('ox')).toBe('oxen');
    expect((0, _misc.getPluralName)('my field')).toBe('myFields');
  });
  it('upperFirst', () => {
    expect((0, _misc.upperFirst)('author')).toBe('Author');
    expect((0, _misc.upperFirst)('my type')).toBe('My type');
    expect((0, _misc.upperFirst)('my_type')).toBe('My_type');
  });
  it('clearName', () => {
    expect((0, _misc.clearName)('author')).toBe('author');
    expect((0, _misc.clearName)('my type')).toBe('mytype');
    expect((0, _misc.clearName)('my_type#2048@!')).toBe('my_type2048');
  });
  it('omit', () => {
    expect((0, _misc.omit)({
      a: 1,
      b: 2,
      c: 3
    }, ['a', 'd'])).toEqual({
      b: 2,
      c: 3
    });
    expect((0, _misc.omit)({
      a: 1,
      b: 2,
      c: 3
    }, 'c')).toEqual({
      a: 1,
      b: 2
    });
  });
  it('only', () => {
    expect((0, _misc.only)({
      a: 1,
      b: 2,
      c: 3
    }, ['a', 'd'])).toEqual({
      a: 1
    });
    expect((0, _misc.only)({
      a: 1,
      b: 2,
      c: 3
    }, 'c')).toEqual({
      c: 3
    });
  });
});