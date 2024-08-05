/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';
import RecommendationPresenter from '#src/presenters/recommendationPresenter.js';

describe('RecommendationPresenter', () => {
  Loader.loadModules();
  const { CollectionFactory, SnippetFactory, CollectionSnippetFactory } =
    Loader.buildFactories();

  const snippet = SnippetFactory.create({
    languageId: 'javascript',
    id: 'js/s/my-snippet',
    shortTitle: 'My snippet',
    tags: 'array;object',
  });

  const sameSnippetOtherLanguage = SnippetFactory.create({
    languageId: 'python',
    id: 'py/s/my-snippet',
    shortTitle: 'My snippet',
    tags: 'array;object',
  });

  const unlistedSnippet = SnippetFactory.create('unlisted', {
    languageId: 'javascript',
    id: 'js/s/unrecommendable-snippet',
    shortTitle: 'Unrecommendable snippet',
    tags: 'array;object',
  });

  const highlyRecommendableSnippet = SnippetFactory.create({
    languageId: 'javascript',
    id: 'js/s/highly-recommendable-snippet',
    shortTitle: 'Highly recommendable snippet',
    tags: 'array;object',
  });

  const somewhatRecommendableSnippet = SnippetFactory.create({
    languageId: 'javascript',
    id: 'js/s/somewhat-recommendable-snippet',
    shortTitle: 'Somewhat recommendable snippet',
    tags: 'browser',
  });

  const presenter = new RecommendationPresenter(snippet);

  describe('#recommend_snippets', () => {
    const subject = presenter.recommendSnippets();

    it('returns snippets that are not the current snippet', () => {
      expect(subject).not.toContainEqual(snippet);
    });

    it('does not return the same snippet in another language', () => {
      expect(subject).not.toContainEqual(sameSnippetOtherLanguage);
    });

    it('does not return unlisted snippets', () => {
      expect(subject).not.toContainEqual(unlistedSnippet);
    });

    it('returns snippets in the same language with the same tags', () => {
      expect(subject).toContainEqual(highlyRecommendableSnippet);
    });

    it('returns snippets in the same language with similar tags', () => {
      expect(subject).toContainEqual(somewhatRecommendableSnippet);
    });
  });
});
