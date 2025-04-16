import { parseMeta } from '#src/lib/contentUtils/markdownParser/codeHighlighters/utils/metaParser.js';

import { describe, it, expect } from 'vitest';

describe('parseMeta', () => {
  describe('parses simple delimited strings', () => {
    it.each([
      [
        'a title="my title" b',
        [{ key: 'title', value: 'my title', type: 'string' }],
      ],
      [
        "a title='my title' b",
        [{ key: 'title', value: 'my title', type: 'string' }],
      ],
      [
        `a title="my title" b label='a label' c`,
        [
          { key: 'title', value: 'my title', type: 'string' },
          { key: 'label', value: 'a label', type: 'string' },
        ],
      ],
      [
        `a "my title" b label='a label' c`,
        [
          { key: null, value: 'my title', type: 'string' },
          { key: 'label', value: 'a label', type: 'string' },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses delimited strings with escapes', () => {
    it.each([
      [
        'a title="\\"cool" b',
        [{ key: 'title', value: '"cool', type: 'string' }],
      ],
      [
        'a title="cool\\"" b',
        [{ key: 'title', value: 'cool"', type: 'string' }],
      ],
      [
        'a title="cool\\" and more" b',
        [{ key: 'title', value: 'cool" and more', type: 'string' }],
      ],
      [
        'a title="cool\\\\\\" and more" b',
        [{ key: 'title', value: 'cool\\" and more', type: 'string' }],
      ],
      [
        'a title="cool\\\\" and more" b',
        [{ key: 'title', value: 'cool\\', type: 'string' }],
      ],
      [
        'a title="cool\\\\" "and more" b',
        [{ key: 'title', value: 'cool\\', type: 'string' }],
        [{ key: null, value: 'cool\\', type: 'string' }],
      ],
      [
        'a title="C:\\\\App\\\\Data" b',
        [{ key: 'title', value: 'C:\\App\\Data', type: 'string' }],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses delimited strings with delimiters and separators', () => {
    it.each([
      [
        `a title='= "wow!' b`,
        [{ key: 'title', value: '= "wow!', type: 'string' }],
      ],
      [
        'a title="= \\"wow!\\"" b',
        [{ key: 'title', value: '= "wow!"', type: 'string' }],
      ],
      [
        `a title="= \\"wow!\\"" label='= "cool!' b`,
        [
          { key: 'title', value: '= "wow!"', type: 'string' },
          { key: 'label', value: '= "cool!', type: 'string' },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses undelimited key-value pairs', () => {
    it.each([
      [
        `a b=wow c=cool d`,
        [
          { key: 'b', value: 'wow', type: 'string' },
          { key: 'c', value: 'cool', type: 'string' },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses undelimited booleans', () => {
    it.each([
      [
        `a b c`,
        [
          { key: 'a', value: true, type: 'boolean' },
          { key: 'b', value: true, type: 'boolean' },
          { key: 'c', value: true, type: 'boolean' },
        ],
      ],
      [
        `a b=true c=false d=TRUE e=fAlSe f`,
        [
          { key: 'a', value: true, type: 'boolean' },
          { key: 'b', value: true, type: 'boolean' },
          { key: 'c', value: false, type: 'boolean' },
          { key: 'd', value: true, type: 'boolean' },
          { key: 'e', value: false, type: 'boolean' },
          { key: 'f', value: true, type: 'boolean' },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses simple ranges', () => {
    it.each([
      [
        `a b={1-4} c={3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range' },
          { key: 'c', value: [3], type: 'range' },
        ],
      ],
      [
        `a b={1-4} c={3} {2-4} {3,5-7} {2,5,8,12} {7 -8, 3,10- 11}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range' },
          { key: 'c', value: [3], type: 'range' },
          { key: null, value: [2, 3, 4], type: 'range' },
          { key: null, value: [3, 5, 6, 7], type: 'range' },
          { key: null, value: [2, 5, 8, 12], type: 'range' },
          { key: null, value: [7, 8, 3, 10, 11], type: 'range' },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses labelled ranges', () => {
    it.each([
      [
        `a b={c:1-4} c={d: 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: 'c' },
          { key: 'c', value: [3], type: 'range', label: 'd' },
        ],
      ],
      [
        `a b={"c":1-4} c={'d': 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: 'c' },
          { key: 'c', value: [3], type: 'range', label: 'd' },
        ],
      ],
      [
        `a b={"c:d":1-4} c={'d:e': 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: 'c:d' },
          { key: 'c', value: [3], type: 'range', label: 'd:e' },
        ],
      ],
      [
        `a b={"\\"c":1-4} c={'d\\'': 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: '"c' },
          { key: 'c', value: [3], type: 'range', label: "d'" },
        ],
      ],
      [
        `a b={"c{d}":1-4} c={'d{e}': 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: 'c{d}' },
          { key: 'c', value: [3], type: 'range', label: 'd{e}' },
        ],
      ],
      [
        `a b={"c\\"{d}":1-4} c={'d{e\\'}': 3}`,
        [
          { key: 'b', value: [1, 2, 3, 4], type: 'range', label: 'c"{d}' },
          { key: 'c', value: [3], type: 'range', label: "d{e'}" },
        ],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });

  describe('parses regex', () => {
    it.each([
      [
        `a /^d{1,2}[a-z]+/ b`,
        [{ key: null, value: /^d{1,2}[a-z]+/, type: 'regexp' }],
      ],
      [
        `a b=/^d{1,2}\\/[a-z]+/ b`,
        [{ key: 'b', value: /^d{1,2}\/[a-z]+/, type: 'regexp' }],
      ],
    ])('"%s" to %o', (input, expected) => {
      const result = parseMeta(input);
      expected.forEach(item => {
        expect(result).toContainEqual(item);
      });
    });
  });
});
