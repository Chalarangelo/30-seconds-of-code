import { describe, it, expect } from 'vitest';
import StringUtils from '#src/lib/stringUtils.js';

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should capitalize the first letter and lowercase the rest of a string', () => {
      expect(StringUtils.capitalize('hello', true)).toBe('Hello');
    });
  });

  describe('toKebabCase', () => {
    it('should convert a string to kebab case', () => {
      expect(StringUtils.toKebabCase('Hello World')).toBe('hello-world');
    });
  });

  describe('convertToValidId', () => {
    it('should convert a string to a valid id name', () => {
      const htmlString = '<p>This is a <strong>paragraph</strong>.</p>';
      const validId = 'this-is-a-paragraph';

      expect(StringUtils.convertToValidId(htmlString)).toBe(validId);
    });
  });

  describe('convertToSeoSlug', () => {
    it('should convert a string to a SEO slug', () => {
      expect(StringUtils.convertToSeoSlug('Hello World')).toBe('/hello-world');
    });
  });

  describe('stripMarkdownFormat', () => {
    const markdownString =
      'This is `code` and this is **bold** and this is [a link](https://example.com) and this is _italic_.';
    const strippedString =
      'This is code and this is bold and this is a link and this is italic.';

    it('should strip markdown format from a string', () => {
      expect(StringUtils.stripMarkdown(markdownString)).toBe(strippedString);
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

  describe('stripHtmlTags', () => {
    const htmlString = '<p>This is a <strong>paragraph</strong>.</p>';
    const strippedString = 'This is a paragraph.';

    it('should strip HTML tags from a string', () => {
      expect(StringUtils.stripHtmlTags(htmlString)).toBe(strippedString);
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
