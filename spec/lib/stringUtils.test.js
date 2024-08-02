import { describe, it, expect } from 'vitest';
import StringUtils from '../../lib/stringUtils.js';

describe('StringUtils', () => {
  describe('toKebabCase', () => {
    it('should convert a string to kebab case', () => {
      expect(StringUtils.toKebabCase('Hello World')).toBe('hello-world');
    });
  });

  describe('convertToSeoSlug', () => {
    it('should convert a string to a SEO slug', () => {
      expect(StringUtils.convertToSeoSlug('Hello World')).toBe('/hello-world');
    });
  });

  describe('stripHtmlParagraphsAndLinks', () => {
    it('should strip HTML paragraphs and links', () => {
      expect(
        StringUtils.stripHtmlParagraphsAndLinks(
          '<p><a href="http://example.com">Hello</a></p>'
        )
      ).toBe('Hello');
    });
  });

  describe('stripHtml', () => {
    it('should strip HTML', () => {
      expect(StringUtils.stripHtml('<p>Hello&nbsp;&amp; hi!</p>')).toBe(
        'Hello & hi!'
      );
    });
  });

  describe('normalizedTokens', () => {
    it('should normalize tokens', () => {
      expect(StringUtils.normalizedTokens('Hello a World!')).toEqual([
        'hello',
        'world',
      ]);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML', () => {
      expect(StringUtils.escapeHtml('Hello & "world"')).toBe(
        'Hello &amp; &quot;world&quot;'
      );
    });
  });

  describe('formatTag', () => {
    it('should format a tag', () => {
      expect(StringUtils.formatTag('hello')).toBe('Hello');
    });
  });
});
