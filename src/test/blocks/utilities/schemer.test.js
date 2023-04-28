import { Schemer } from 'blocks/utilities/schemer';

describe('Schemer', () => {
  describe('generateSnippetData', () => {
    const result = Schemer.generateSnippetData({
      title: 'A snippet',
      slug: '/s/a-snippet',
      description: 'A snippet description.',
      dateModified: new Date(),
    });

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('TechArticle');
    });
  });

  describe('generateListingData', () => {
    const result = Schemer.generateListingData({
      title: 'A listing',
      slug: '/a-listing/p/1',
      items: [],
    });

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('ItemList');
    });
  });

  describe('generateHomeData', () => {
    const result = Schemer.generateHomeData();

    it('result has correct attributes', () => {
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('WebSite');
    });
  });
});
