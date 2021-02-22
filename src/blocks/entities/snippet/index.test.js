import { Snippet } from '.';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('Snippet', () => {
  let configs = {};
  let snippet,
    blogSnippet,
    unfeaturedSnippet,
    cssSnippet,
    unlistedSnippet,
    futureSnippet;

  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
  });

  describe('constructor', () => {
    it('throws an error if called without any of the required keys', () => {
      expect(() => new Snippet({}, configs.react)).toThrow(ArgsError);
    });

    it('throws an error if called without a correct config.', () => {
      expect(() => new Snippet(rawSnippets.normal, {})).toThrow(ArgsError);
    });
  });

  describe('constructed with normal snippet data', () => {
    beforeAll(() => {
      snippet = new Snippet(rawSnippets.normal, configs.react);
      blogSnippet = new Snippet(rawSnippets.blog, configs.blog);
      unfeaturedSnippet = new Snippet(rawSnippets.normal, configs.dart);
      unlistedSnippet = new Snippet(rawSnippets.unlisted, configs.react);
      futureSnippet = new Snippet(rawSnippets.future, configs.react);
      cssSnippet = new Snippet(rawSnippets.css, configs.css);
    });

    it('should contain the config data', () => {
      expect(snippet.config).toBe(configs.react);
    });

    it('should have the correct tag data', () => {
      const { all, primary } = snippet.tags;
      const rawTags = rawSnippets.normal.tags.split(',');
      expect(all).toEqual(rawTags);
      expect(primary).toBe(rawTags[0]);
    });

    it('should contain the config commonData', () => {
      expect(snippet.language).toBe(configs.react.language);
    });

    it('produces a valid id', () => {
      expect(snippet.id).toBe(
        `${snippet.config.slugPrefix}/${snippet.fileName.slice(0, -3)}`
      );
    });

    it('passes the correct data from constructor', () => {
      expect(snippet.title).toBe(rawSnippets.normal.title);
      expect(snippet.fileName).toBe(rawSnippets.normal.fileName);
      expect(snippet.firstSeen).toBe(rawSnippets.normal.firstSeen);
      expect(snippet.lastUpdated).toBe(rawSnippets.normal.lastUpdated);
    });

    it('has the correct type', () => {
      expect(snippet.type).toBe('snippet');
      expect(blogSnippet.type).toBe(`blog.${rawSnippets.blog.type}`);
    });

    it('has the correct code structure', () => {
      expect(Object.keys(snippet.code)).toEqual(['style', 'src', 'example']);
      expect(Object.keys(cssSnippet.code)).toEqual([
        'html',
        'css',
        'scopedCss',
      ]);
      expect(Object.keys(cssSnippet.blog)).toEqual([]);
    });

    it('stores the snippet in the instance cache', () => {
      expect(Snippet.instances[snippet.id]).toBe(snippet);
    });

    it('has a valid slug', () => {
      expect(snippet.slug.startsWith(`/${snippet.config.slugPrefix}`)).toBe(
        true
      );
      expect(snippet.slug.endsWith(snippet.fileName.slice(0, -3))).toBe(true);
    });

    it('has a valid title slug', () => {
      expect(snippet.titleSlug).toBe(`/${snippet.title}`);
    });

    it('has a valid url', () => {
      expect(snippet.url.startsWith(`${snippet.config.repoUrlPrefix}`)).toBe(
        true
      );
      expect(snippet.url.endsWith(snippet.fileName)).toBe(true);
    });

    it('has a valid vscodeUrl', () => {
      expect(snippet.vscodeUrl.startsWith('vscode://file/')).toBe(true);
      expect(snippet.vscodeUrl.endsWith(snippet.fileName)).toBe(true);
    });

    it('has the correct expertise', () => {
      expect(snippet.tags.all.includes(snippet.expertise)).toBe(true);
      expect(blogSnippet.expertise).toBe('article');
    });

    it('has the correct listed status', () => {
      expect(snippet.isListed).toBe(true);
      expect(unfeaturedSnippet.isListed).toBe(false);
      expect(unlistedSnippet.isListed).toBe(false);
      expect(futureSnippet.isListed).toBe(false);
    });

    it('has the correct scheduled status', () => {
      expect(snippet.isScheduled).toBe(false);
      expect(unfeaturedSnippet.isScheduled).toBe(false);
      expect(unlistedSnippet.isScheduled).toBe(false);
      expect(futureSnippet.isScheduled).toBe(true);
    });

    it('has the correct icon', () => {
      expect(snippet.icon).toBe(snippet.config.icon);
      expect(blogSnippet.icon).toBe('react');
    });

    it('calculates the ranking correctly', () => {
      expect(snippet.ranking).toBeLessThanOrEqual(1.0);
      expect(snippet.ranking).toBeGreaterThanOrEqual(0.0);
      expect(blogSnippet.ranking).toBeLessThanOrEqual(1.0);
      expect(blogSnippet.ranking).toBeGreaterThanOrEqual(0.0);
      expect(unfeaturedSnippet.ranking).toBeLessThanOrEqual(1.0);
      expect(unfeaturedSnippet.ranking).toBeGreaterThanOrEqual(0.0);
    });

    it('calculates searchTokens', () => {
      expect(typeof snippet.searchTokens).toBe('string');
      expect(snippet.searchTokens.length).not.toBe(0);
    });

    it('calculates the HTML content', () => {
      expect(Object.keys(snippet.html)).toEqual([
        'fullDescription',
        'description',
        'code',
        'example',
      ]);
      expect(Object.keys(blogSnippet.html)).toEqual([
        'fullDescription',
        'description',
      ]);
    });

    it('calculates the correct description', () => {
      expect(snippet.text.short).toBe(rawSnippets.normal.body.split('\n\n')[0]);
      expect(blogSnippet.text.short).toBe(rawSnippets.blog.excerpt);
      expect(cssSnippet.text.short).toBe(rawSnippets.css.excerpt);
    });

    it('calculates breadcrumbs correctly', () => {
      expect(snippet.breadcrumbs.length).toBe(4);
      expect(blogSnippet.breadcrumbs.length).toBe(3);
    });
  });
});
