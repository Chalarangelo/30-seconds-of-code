import { generateStructuredData } from './object';

import {
  listingStructuredData,
  snippetStructuredData,
} from 'test/fixtures/metadata';

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

  describe('with home', () => {
    let result;

    beforeAll(() => {
      result = generateStructuredData(
        { type: 'home' },
        { websiteUrl: 'https://30secondsofcode.org', orgName: '30 seconds' }
      );
    });

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('WebSite');
    });
  });
});
