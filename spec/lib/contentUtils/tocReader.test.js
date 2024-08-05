import { describe, it, expect } from 'vitest';
import TocReader from '#src/lib/contentUtils/tocReader.js';

describe('TocReader.readToC', () => {
  it('should read and build a table of contents from HTML', () => {
    const html = `
      <h2><a id="foo" href="#foo">Foo</a></h2>
      <h3><a id="bar" href="#bar">Bar</a></h3>
      <h4><a id="baz" href="#baz">Baz</a></h4>
    `;

    const toc = TocReader.readToC(html);

    expect(toc).toBe(
      '<ol><li><a href="#foo">Foo</a><ol><li><a href="#bar">Bar</a><ol><li><a href="#baz">Baz</a></li></ol></li></ol></li></ol>'
    );
  });

  it('should return undefined if no headings are found', () => {
    const html = '';

    const toc = TocReader.readToC(html);

    expect(toc).toBe(undefined);
  });
});
