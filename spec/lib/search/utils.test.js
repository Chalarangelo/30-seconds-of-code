import { describe, it, expect } from 'vitest';
import {
  splitTokens,
  cleanTokenPunctuation,
  deserializeTokens,
} from '#src/lib/search/utils.js';

describe('splitTokens', () => {
  it.each([
    ['a b c', ['a', 'b', 'c']],
    ['a-z0-9', ['a-z0-9']],
    ['a.b.c', ['a', 'b', 'c']],
    ['a.b - c d3', ['a', 'b', '-', 'c', 'd3']],
  ])('produces the excpected resutls "%s" -> %s)', (str, expected) => {
    expect(splitTokens(str)).toEqual(expected);
  });
});

describe('cleanTokenPunctuation', () => {
  it.each([
    ['a', 'a'],
    ['-a', 'a'],
    ['a-', 'a'],
    ['-a-', 'a'],
    ["'a", 'a'],
    ["a'", 'a'],
    ["'a'", 'a'],
    ["-a'", 'a'],
    ["'a-", 'a'],
  ])('produces the excpected resutls "%s" -> %s)', (str, expected) => {
    expect(cleanTokenPunctuation(str)).toEqual(expected);
  });
});

describe('deserializeTokens', () => {
  it('produces the excpected resutls', () => {
    expect(deserializeTokens('a:2 b c:3')).toEqual(
      new Map([
        ['a', 2],
        ['b', 1],
        ['c', 3],
      ])
    );
  });
});
