import { Tag } from '.';

describe('Tag', () => {
  describe('format', () => {
    it('returns the capitalized version for a normal tag', () => {
      expect(Tag.format('foobar')).toBe('Foobar');
    });
    it('returns the correct version for a special tag', () => {
      expect(Tag.format('javascript')).toBe('JavaScript');
    });
    it('returns an empty string for an empty tag', () => {
      expect(Tag.format('')).toBe('');
    });
  });

  describe('determineExpertise', () => {
    it('determines expertise from tags', () => {
      expect(Tag.determineExpertise(['array', 'advanced'])).toBe('advanced');
    });
    it('returns default expertise if none is found', () => {
      expect(Tag.determineExpertise(['array'])).toBe('Intermediate');
    });
  });

  describe('determineLanguage', () => {
    it('determines language from tags', () => {
      expect(
        Tag.determineLanguage(['javascript', 'array', 'advanced'])
      ).toEqual({
        short: 'js',
        long: 'javascript',
      });
    });
    it('returns empty language if none is found', () => {
      expect(Tag.determineLanguage(['array'])).toEqual({
        short: '',
        long: '',
      });
    });
  });

  describe('stripExpertise', () => {
    it('strips expertise from tags', () => {
      expect(Tag.stripExpertise(['array', 'advanced'])).toEqual(['array']);
    });
  });

  describe('stripLanguage', () => {
    it('strips language from tags', () => {
      expect(Tag.stripLanguage(['array', 'javascript'])).toEqual(['array']);
    });
  });
});
