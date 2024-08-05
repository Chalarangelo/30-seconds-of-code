import { describe, it, expect } from 'vitest';
import {
  capitalize,
  stripMarkdownFormat,
  stripHTMLTags,
  toKebabCase,
  convertToValidId,
} from '../../../src/lib/parsley/utils.js';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should capitalize the first letter and lowercase the rest of a string', () => {
    expect(capitalize('hello', true)).toBe('Hello');
  });
});

describe('stripMarkdownFormat', () => {
  const markdownString =
    'This is `code` and this is **bold** and this is [a link](https://example.com) and this is _italic_.';
  const strippedString =
    'This is code and this is bold and this is a link and this is italic.';

  it('should strip markdown format from a string', () => {
    expect(stripMarkdownFormat(markdownString)).toBe(strippedString);
  });
});

describe('stripHTMLTags', () => {
  const htmlString = '<p>This is a <strong>paragraph</strong>.</p>';
  const strippedString = 'This is a paragraph.';

  it('should strip HTML tags from a string', () => {
    expect(stripHTMLTags(htmlString)).toBe(strippedString);
  });
});

describe('toKebabCase', () => {
  it('should convert a string to kebab-case', () => {
    expect(toKebabCase('Hello World')).toBe('hello-world');
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('hello-world')).toBe('hello-world');
    expect(toKebabCase('hello_world')).toBe('hello-world');
  });
});

describe('convertToValidId', () => {
  it('should convert a string to a valid id name', () => {
    const htmlString = '<p>This is a <strong>paragraph</strong>.</p>';
    const validId = 'this-is-a-paragraph';

    expect(convertToValidId(htmlString)).toBe(validId);
  });
});
