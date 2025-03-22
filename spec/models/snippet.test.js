/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';

describe('Snippet', () => {
  Loader.loadModules();
  const { SnippetFactory, CollectionSnippetFactory, LanguageFactory } =
    Loader.buildFactories();

  const javascriptLanguage = LanguageFactory.create('js');

  const publishedSnippet = SnippetFactory.create('published');
  const scheduledSnippet = SnippetFactory.create('scheduled');
  const snippetWithDate = SnippetFactory.create({
    dateModified: new Date('2024-06-12'),
  });
  const listedSnippet = SnippetFactory.create('listed');
  const unlistedSnippet = SnippetFactory.create('unlisted');

  const collectionSnippet = CollectionSnippetFactory.create({
    snippetId: 'js/s/my-collection-snippet',
  });
  const snippetWithCollection = SnippetFactory.create({
    id: 'js/s/my-collection-snippet',
  });

  const jsSnippet = SnippetFactory.create({
    languageId: 'javascript',
    id: 'js/s/my-snippet',
    tags: 'array;object',
    recTokens: 'lorem ipsum',
    docTokens: 'lorem ipsum',
  });

  const nodeJsSnippet = SnippetFactory.create('taggedNodeJs', {
    languageId: 'javascript',
  });

  const snippetWithoutLanguage = SnippetFactory.create('withoutLanguage', {
    title: 'My Article',
    tags: 'array;object;html',
    languageId: null,
  });

  describe('tags', () => {
    it('returns tags', () => {
      expect(snippetWithoutLanguage.tags).toEqual(['array', 'object', 'html']);
    });
  });

  describe('hasLanguage', () => {
    it('returns false if no language', () => {
      expect(snippetWithoutLanguage.hasLanguage).toEqual(false);
    });

    it('returns true if language exists', () => {
      expect(jsSnippet.hasLanguage).toEqual(true);
    });
  });

  describe('seoTitle', () => {
    it('returns title if no language', () => {
      expect(snippetWithoutLanguage.seoTitle).toEqual(
        snippetWithoutLanguage.title
      );
    });

    it('returns title with language, if exists', () => {
      expect(jsSnippet.seoTitle).toEqual('JavaScript - My Snippet');
    });

    it('returns title with formatted primary tag if language is JavaScript and primary tag is Node', () => {
      expect(nodeJsSnippet.seoTitle).toEqual('Node.js - My Snippet');
    });
  });

  describe('primaryTag', () => {
    it('returns primary tag', () => {
      expect(jsSnippet.primaryTag).toEqual('array');
    });
  });

  describe('formattedPrimaryTag', () => {
    it('returns formatted primary tag', () => {
      expect(jsSnippet.formattedPrimaryTag).toEqual('Array');
    });

    it('returns formatted primary tag if special tag', () => {
      expect(nodeJsSnippet.formattedPrimaryTag).toEqual('Node.js');
    });
  });

  describe('formattedMiniPreviewTag', () => {
    it('returns article mini preview tag if no language', () => {
      expect(snippetWithoutLanguage.formattedMiniPreviewTag).toEqual('Article');
    });

    it('returns language name if language exists', () => {
      expect(jsSnippet.formattedMiniPreviewTag).toEqual('JavaScript');
    });
  });

  describe('formattedTags', () => {
    it('returns formatted tags', () => {
      expect(snippetWithoutLanguage.formattedTags).toEqual(
        'Array, Object, HTML'
      );
    });

    it('prep});s language name if language exists', () => {
      expect(jsSnippet.formattedTags).toEqual('JavaScript, Array, Object');
    });
  });

  describe('formattedPreviewTags', () => {
    it('returns formatted primary tag if no language', () => {
      expect(snippetWithoutLanguage.formattedPreviewTags).toEqual('Array');
    });

    it('returns language name if language exists', () => {
      expect(jsSnippet.formattedPreviewTags).toEqual('JavaScript');
    });
  });

  describe('githubUrl', () => {
    it('returns GitHub URL', () => {
      expect(jsSnippet.githubUrl).toEqual(
        `https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/${jsSnippet.id}.md`
      );
    });
  });

  describe('isScheduled', () => {
    it('returns false if not scheduled', () => {
      expect(publishedSnippet.isScheduled).toEqual(false);
    });

    it('returns true if scheduled', () => {
      expect(scheduledSnippet.isScheduled).toEqual(true);
    });
  });

  describe('isPublished', () => {
    it('returns true if published', () => {
      expect(publishedSnippet.isPublished).toEqual(true);
    });

    it('returns false if not published', () => {
      expect(scheduledSnippet.isPublished).toEqual(false);
    });
  });

  describe('isListed', () => {
    it('returns true if listed', () => {
      expect(listedSnippet.isListed).toEqual(true);
    });

    it('returns false if not listed', () => {
      expect(unlistedSnippet.isListed).toEqual(false);
    });
  });

  describe('dateFormatted', () => {
    it('returns formatted date', () => {
      expect(snippetWithDate.dateFormatted).toEqual('June 12, 2024');
    });
  });

  describe('dateMachineFormatted', () => {
    it('returns machine formatted date', () => {
      expect(snippetWithDate.dateMachineFormatted).toEqual('2024-06-12');
    });
  });

  describe('hasCollection', () => {
    it('returns false if snippet has no collection', () => {
      expect(snippetWithoutLanguage.hasCollection).toEqual(false);
    });

    it('returns true if snippet has collection', () => {
      expect(snippetWithCollection.hasCollection).toEqual(true);
    });
  });

  describe('page', () => {
    it('returns a page object with the correct snippet', () => {
      expect(jsSnippet.page.key).toEqual('js/s/my-snippet');
    });
  });
});
