import {
  generateStructuredData,
  hasKey,
  hasKeys,
  get
} from './object';

import { listingStructuredData, snippetStructuredData } from 'fixtures/metadata';

describe('hasKey', () => {
  it('returns the correct result for a regular key', () => {
    expect(hasKey({ a: 'yes' }, ['a'])).toEqual(true);
  });
  it('returns the correct result for a regular key', () => {
    expect(hasKey({ a: 'yes' }, ['b'])).toEqual(false);
  });

  it('returns the correct result for nested keys', () => {
    expect(hasKey({ a: { b: { c: 'yes'} } }, ['a', 'b', 'c'])).toEqual(true);
  });

  it('returns the correct result for non-objects', () => {
    expect(hasKey('nope', ['a'])).toEqual(false);
  });
});

describe('hasKeys', () => {
  it('returns the correct result for the given keys', () => {
    expect(hasKeys(
      { a: { b: { c: 'yes'}, d: 1 }, e: true },
      ['e', ['a', 'b'], 'a']
    )).toEqual(true);
  });
});

describe('get', () => {
  it('returns the correct result for the given keys', () => {
    expect(get(
      { a: { b: { c: 'yes'}, d: 1 }, e: true },
      ['e', ['a', 'b', 'c'], ['a', 'd']]
    )).toEqual([true, 'yes', 1]);
  });
});

describe('generateStructuredData', () => {
  describe('with a snippet', () => {
    let result;

    beforeAll(() => {
      result = generateStructuredData(
        snippetStructuredData,
        { websiteUrl: 'https://30secondsofcode.org', orgName: '30 seconds' },
        '/assets/logo.png'
      );
    });

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('TechArticle');
    });
  });

  describe('with a listing', () => {
    let result;

    beforeAll(() => {
      result = generateStructuredData(
        listingStructuredData,
        { websiteUrl: 'https://30secondsofcode.org', orgName: '30 seconds' },
        '/assets/logo.png'
      );
    });

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('ItemList');
    });
  });
});
