// Slightly misleading name, this is a test for the schema and its models

// Import and mute logger before doing anything else
import { Logger } from './utilities/logger';
Logger.muteGlbobal = true;

import { Application } from './application';
import { content } from 'test/fixtures/content';

// Keep this outside of test scope, somehow it gets reset even in beforeAll
Application.initialize(content);

describe('Application/Schema', () => {
  it('dataset has the correct models', () => {
    expect(Application.modelNames.sort()).toEqual([
      'Author',
      'Collection',
      'Language',
      'Listing',
      'Page',
      'Repository',
      'Snippet',
      'Tag',
    ]);
  });

  // No tests for Author, the model doesn't have any logic whatsoever

  describe('Repository', () => {
    const Repository = Application.dataset.getModel('Repository');

    describe('property: sourceDir', () => {
      it('returns the correct value', () => {
        const repo = Repository.records.get('30css');
        expect(repo.sourceDir).toEqual('30css/snippets');
      });
    });

    describe('property: slugPrefix', () => {
      it('returns the correct value', () => {
        const repo = Repository.records.get('30css');
        expect(repo.slugPrefix).toEqual('css/s');
      });
    });

    describe('property: repoUrlPrefix', () => {
      it('returns the correct value', () => {
        const repo = Repository.records.get('30css');
        expect(repo.repoUrlPrefix).toEqual(
          'https://github.com/30-seconds/30-seconds-of-css/blob/master/snippets'
        );
      });
    });

    describe('property: vscodeUrlPrefix', () => {
      it('returns the correct value', () => {
        const repo = Repository.records.get('30css');
        expect(repo.vscodeUrlPrefix).toEqual('content/sources/30css/snippets');
      });
    });

    describe('property: isCSS', () => {
      it('returns true for css repositories', () => {
        const repo = Repository.records.get('30css');
        expect(repo.isCSS).toEqual(true);
      });

      it('returns false for non-css repositories', () => {
        const repo = Repository.records.get('30react');
        expect(repo.isCSS).toEqual(false);
      });
    });

    describe('property: isReact', () => {
      it('returns true for react repositories', () => {
        const repo = Repository.records.get('30react');
        expect(repo.isReact).toEqual(true);
      });

      it('returns false for non-react repositories', () => {
        const repo = Repository.records.get('30css');
        expect(repo.isReact).toEqual(false);
      });
    });

    describe('property: listing', () => {
      const repo = Repository.records.get('30css');
      expect(repo.listing.id).toEqual('language/css');
    });

    describe('scope: css', () => {
      it('returns only css repositories', () => {
        const cssRepos = Repository.records.css;
        expect(cssRepos.length).toEqual(1);
        expect(cssRepos.has('30css')).toBe(true);
      });
    });

    describe('scope: react', () => {
      it('returns only react repositories', () => {
        const reactRepos = Repository.records.react;
        expect(reactRepos.length).toEqual(1);
        expect(reactRepos.has('30react')).toBe(true);
      });
    });

    describe('scope: blog', () => {
      it('returns only blog repositories', () => {
        const blogRepos = Repository.records.blog;
        expect(blogRepos.length).toEqual(1);
        expect(blogRepos.has('30blog')).toBe(true);
      });
    });

    describe('scope: withImages', () => {
      it('returns only repositories with images', () => {
        const reposWithImages = Repository.records.withImages;
        expect(reposWithImages.length).toEqual(1);
        expect(reposWithImages.has('30blog')).toBe(true);
      });
    });
  });

  describe('Collection', () => {
    const Collection = Application.dataset.getModel('Collection');

    describe('property: listing', () => {
      it('returns the listing', () => {
        const collection = Collection.records.get('react-rendering');
        expect(collection.listing.id).toEqual('collection/c/react-rendering');
      });
    });
  });

  describe('Language', () => {
    const Language = Application.dataset.getModel('Language');

    describe('scope: full', () => {
      it('returns all languages except HTML', () => {
        const fullLanguages = Language.records.full;
        expect(fullLanguages.length).toBe(content.languages.length - 1);
        expect(fullLanguages.get('html')).toBeUndefined();
      });
    });
  });

  describe('Tag', () => {
    const Tag = Application.dataset.getModel('Tag');

    describe('property: shortId', () => {
      it('returns the short id', () => {
        const tag = Tag.records.get('30react_hooks');
        expect(tag.shortId).toEqual('hooks');
      });
    });

    describe('property: isBlogTag', () => {
      it('returns true for blog tags', () => {
        const tag = Tag.records.get('30blog_css');
        expect(tag.isBlogTag).toBe(true);
      });

      it('returns false for non-blog tags', () => {
        const tag = Tag.records.get('30react_hooks');
        expect(tag.isBlogTag).toBe(false);
      });
    });

    describe('property: language', () => {
      it('returns the language', () => {
        const Language = Application.dataset.getModel('Language');
        const tag = Tag.records.get('30react_hooks');
        expect(tag.language).toEqual(Language.records.get('react'));
      });
    });

    describe('property: featured', () => {
      it('returns the featured value of the repository', () => {
        const tag = Tag.records.get('30react_hooks');
        expect(tag.featured).toBe(true);
      });
    });

    describe('property: listing', () => {
      it('returns the listing', () => {
        const tag = Tag.records.get('30react_hooks');
        expect(tag.listing.id).toEqual('tag/react/t/hooks');
      });
    });
  });

  describe('Snippet', () => {
    const Snippet = Application.dataset.getModel('Snippet');

    describe('property: cardTemplate', () => {
      it('returns the card template from the repository', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.cardTemplate).toEqual('StandardSnippetCard');

        const cssSnippet = Snippet.records.get('css/s/triangle');
        expect(cssSnippet.cardTemplate).toEqual('CssSnippetCard');

        const blogSnippet = Snippet.records.get('articles/s/js-callbacks');
        expect(blogSnippet.cardTemplate).toEqual('BlogSnippetCard');
      });
    });

    describe('property: primaryTag', () => {
      it('returns the primary tag', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        const blogSnippet = Snippet.records.get('articles/s/js-callbacks');

        expect(snippet.primaryTag).toEqual('date');
        expect(blogSnippet.primaryTag).toEqual('javascript');
      });
    });

    describe('property: truePrimaryTag', () => {
      it('returns the true primary tag', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        const blogSnippet = Snippet.records.get('articles/s/js-callbacks');

        expect(snippet.truePrimaryTag).toEqual('date');
        expect(blogSnippet.truePrimaryTag).toEqual('function');
      });
    });

    describe('property: formattedPrimaryTag', () => {
      it('returns the formatted primary tag', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.formattedPrimaryTag).toEqual('Date');
      });
    });

    describe('property: formattedMiniPreviewTag', () => {
      it('returns the formatted language for regular snippets', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.formattedMiniPreviewTag).toEqual('JavaScript');
      });

      it('returns "Article" for blog snippets without language', () => {
        const snippet = Snippet.records.get(
          'articles/s/10-vs-code-extensions-for-js-developers'
        );
        expect(snippet.formattedMiniPreviewTag).toEqual('Article');
      });
    });

    describe('property: formattedTags', () => {
      it('returns the formatted tags', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.formattedTags).toEqual(
          ['JavaScript', 'Date', 'Math', 'String'].join(', ')
        );
      });
    });

    describe('property: formattedPreviewTags', () => {
      it('returns the formatted preview tags', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.formattedPreviewTags).toEqual(
          ['JavaScript', 'Date'].join(', ')
        );
      });
    });

    describe('property: hasOtherLanguages', () => {
      it('returns true if the snippet has other languages', () => {
        const snippet = Snippet.records.get('css/s/triangle');
        expect(snippet.hasOtherLanguages).toBe(true);
      });

      it('returns false if the snippet has only one language', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.hasOtherLanguages).toBe(false);
      });
    });

    describe('property: isBlog', () => {
      it('returns true if the snippet is a blog snippet', () => {
        const snippet = Snippet.records.get('articles/s/js-callbacks');
        expect(snippet.isBlog).toBe(true);
      });

      it('returns false if the snippet is not a blog snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isBlog).toBe(false);
      });
    });

    describe('property: isCSS', () => {
      it('returns true if the snippet is a CSS snippet', () => {
        const snippet = Snippet.records.get('css/s/triangle');
        expect(snippet.isCSS).toBe(true);
      });

      it('returns false if the snippet is not a CSS snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isCSS).toBe(false);
      });
    });

    describe('property: isReact', () => {
      it('returns true if the snippet is a React snippet', () => {
        const snippet = Snippet.records.get('react/s/use-interval');
        expect(snippet.isReact).toBe(true);
      });

      it('returns false if the snippet is not a React snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isReact).toBe(false);
      });
    });

    describe('property: isReactHook', () => {
      it('returns true if the snippet is a React snippet', () => {
        const snippet = Snippet.records.get('react/s/use-interval');
        expect(snippet.isReactHook).toBe(true);
      });

      it('returns false if the snippet is not a React snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isReactHook).toBe(false);
      });
    });

    describe('property: slug', () => {
      it('returns the slug', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.slug).toEqual('/js/s/format-duration');
      });
    });

    describe('property: titleSlug', () => {
      it('returns the title slug', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.titleSlug).toEqual('/format-duration');
      });
    });

    describe('property: url', () => {
      it('returns the url', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.url).toEqual(
          'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/formatDuration.md'
        );
      });
    });

    describe('property: vscodeUrl', () => {
      it('returns the vscode url', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.vscodeUrl).toContain('vscode://file/');
        expect(snippet.vscodeUrl).toContain(
          'content/sources/30code/snippets/formatDuration.md'
        );
      });
    });

    describe('property: actionType', () => {
      it('returns the action type', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        const cssSnippet = Snippet.records.get('css/s/triangle');
        const blogSnippet = Snippet.records.get('articles/s/js-callbacks');
        const reactSnippet = Snippet.records.get('react/s/use-interval');
        expect(snippet.actionType).toEqual('copy');
        expect(cssSnippet.actionType).toEqual('cssCodepen');
        expect(blogSnippet.actionType).toBeUndefined();
        expect(reactSnippet.actionType).toEqual('codepen');
      });
    });

    describe('property: expertise', () => {
      it('returns the expertise', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        const blogSnippet = Snippet.records.get('articles/s/js-callbacks');
        expect(snippet.expertise).toEqual('intermediate');
        expect(blogSnippet.expertise).toEqual('article');
      });
    });

    describe('property: isScheduled', () => {
      it('returns true if the snippet is scheduled', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isScheduled).toBe(false);
      });
    });

    describe('property: isPublished', () => {
      it('returns true if the snippet is published', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isPublished).toBe(true);
      });
    });

    describe('property: isListed', () => {
      it('returns true if the snippet is listed', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.isListed).toBe(true);
      });
    });

    describe('property: ranking', () => {
      it('returns a value between 0 and 1', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.ranking).toBeGreaterThanOrEqual(0);
        expect(snippet.ranking).toBeLessThanOrEqual(1);
      });
    });

    describe('property: searchTokensArray', () => {
      it('returns an array of search tokens', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.searchTokensArray).toEqual([
          'formatduration',
          'js',
          'javascript',
          'date',
          'math',
          'string',
          'human-read',
          'format',
          'given',
          'number',
          'millisecond',
        ]);
      });
    });

    describe('property: searchTokens', () => {
      it('returns a string of search tokens', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.searchTokens).toEqual(
          'formatduration js javascript date math string human-read format given number millisecond'
        );
      });
    });

    describe('property: breadcrumbs', () => {
      it('returns the breadcrumbs for regular snippets', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.breadcrumbs).toEqual([
          {
            url: '/',
            name: 'Home',
          },
          {
            url: '/js/p/1',
            name: 'JavaScript',
          },
          {
            url: '/js/t/date/p/1',
            name: 'Date',
          },
          {
            url: '/js/s/format-duration',
            name: 'formatDuration',
          },
        ]);
      });

      it('returns the breadcrumbs for blog snippets', () => {
        const snippet = Snippet.records.get('articles/s/js-callbacks');
        expect(snippet.breadcrumbs).toEqual([
          {
            url: '/',
            name: 'Home',
          },
          {
            url: '/articles/p/1',
            name: 'Articles',
          },
          {
            url: '/articles/s/js-callbacks',
            name: 'What is a callback function?',
          },
        ]);
      });
    });

    describe('property: hasCollection', () => {
      it('returns true if the snippet has a collection', () => {
        const snippet = Snippet.records.get(
          'articles/s/react-rendering-basics'
        );
        expect(snippet.hasCollection).toBe(true);
      });

      it('returns false if the snippet does not have a collection', () => {
        const snippet = Snippet.records.get('css/s/triangle');
        expect(snippet.hasCollection).toBe(false);
      });
    });

    describe('property: recommendedCollection', () => {
      it('returns the recommended collection if it exists', () => {
        const snippet = Snippet.records.get(
          'articles/s/react-rendering-basics'
        );
        expect(snippet.recommendedCollection.id).toEqual('react-rendering');
      });

      it('returns null if there is no recommended collection', () => {
        const snippet = Snippet.records.get('css/s/triangle');
        expect(snippet.recommendedCollection).toBeNull();
      });
    });

    describe('property: icon', () => {
      it('returns the correct icon for a regular snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.icon).toEqual('js');
      });

      it('returns the correct icon for a snippet in a special tag', () => {
        const snippet = Snippet.records.get('js/s/hash-node');
        expect(snippet.icon).toEqual('node');
      });

      it('returns the correct icon for a regular blog', () => {
        const snippet = Snippet.records.get(
          'articles/s/10-vs-code-extensions-for-js-developers'
        );
        expect(snippet.icon).toEqual('blog');
      });

      it('returns the correct icon for a blog with a language', () => {
        const snippet = Snippet.records.get(
          'articles/s/react-rendering-basics'
        );
        expect(snippet.icon).toEqual('react');
      });

      it('returns the correct icon for a blog with a special tag', () => {
        const snippet = Snippet.records.get(
          'articles/s/nodejs-chrome-debugging'
        );
        expect(snippet.icon).toEqual('node');
      });
    });

    describe('property: language', () => {
      it('returns the correct language for a regular snippet', () => {
        const snippet = Snippet.records.get('js/s/format-duration');
        expect(snippet.language.id).toEqual('javascript');
      });

      it('returns null for a regular blog', () => {
        const snippet = Snippet.records.get(
          'articles/s/10-vs-code-extensions-for-js-developers'
        );
        expect(snippet.language).toBe(null);
      });

      it('returns the correct language for a blog with a language', () => {
        const snippet = Snippet.records.get(
          'articles/s/react-rendering-basics'
        );
        expect(snippet.language.id).toEqual('react');
      });
    });

    describe('property: recommendedSnippets', () => {
      it('returns a set of recommended snippets', () => {
        const snippet = Snippet.records.get('css/s/triangle');
        expect(snippet.recommendedSnippets.length).not.toEqual(0);
      });
    });

    describe('scope: snippets', () => {
      it('returns a set of snippets', () => {
        const snippets = Snippet.records.snippets;
        expect(snippets.length).toEqual(8);
      });
    });

    describe('scope: blogs', () => {
      it('returns a set of blogs', () => {
        const snippets = Snippet.records.blogs;
        expect(snippets.length).toEqual(7);
      });
    });

    describe('scope: listed', () => {
      it('returns a set of listed snippets', () => {
        const snippets = Snippet.records.listed;
        expect(snippets.length).toEqual(15);
      });
    });

    describe('scope: listedByPopularity', () => {
      it('returns a set of listed snippets', () => {
        const snippets = Snippet.records.listedByPopularity;
        expect(snippets.length).toEqual(15);
      });
    });

    describe('scope: listedByNew', () => {
      it('returns a set of listed snippets', () => {
        const snippets = Snippet.records.listedByNew;
        expect(snippets.length).toEqual(15);
      });
    });

    describe('scope: unlisted', () => {
      it('returns a set of unlisted snippets', () => {
        const snippets = Snippet.records.unlisted;
        expect(snippets.length).toEqual(0);
      });
    });

    describe('scope: scheduled', () => {
      it('returns a set of scheduled snippets', () => {
        const snippets = Snippet.records.scheduled;
        expect(snippets.length).toEqual(0);
      });
    });

    describe('scope: published', () => {
      it('returns a set of published snippets', () => {
        const snippets = Snippet.records.published;
        expect(snippets.length).toEqual(15);
      });
    });
  });

  describe('Listing', () => {
    const Listing = Application.dataset.getModel('Listing');

    describe('property: isMain', () => {
      it('returns true if the listing is the main listing', () => {
        const listing = Listing.records.get('main');
        expect(listing.isMain).toBe(true);
      });

      it('returns false if the listing is not the main listing', () => {
        const listing = Listing.records.get('blog/articles');
        expect(listing.isMain).toBe(false);
      });
    });

    describe('property: isBlog', () => {
      it('returns true if the listing is the main listing', () => {
        const listing = Listing.records.get('blog/articles');
        expect(listing.isBlog).toBe(true);
      });

      it('returns false if the listing is not the main listing', () => {
        const listing = Listing.records.get('main');
        expect(listing.isBlog).toBe(false);
      });
    });

    describe('property: isBlogTag', () => {
      it('returns true if the listing is a blog tag', () => {
        const listing = Listing.records.get('tag/articles/t/javascript');
        expect(listing.isBlogTag).toBe(true);
      });

      it('returns false if the listing is not a blog tag', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.isBlogTag).toBe(false);
      });
    });

    describe('property: isLanguage', () => {
      it('returns true if the listing is a language', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isLanguage).toBe(true);
      });

      it('returns false if the listing is not a language', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.isLanguage).toBe(false);
      });
    });

    describe('property: isTopLevel', () => {
      it('returns true if the listing is top level', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isTopLevel).toBe(true);
      });

      it('returns false if the listing is not top level', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.isTopLevel).toBe(false);
      });
    });

    describe('property: isTag', () => {
      it('returns true if the listing is a tag', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.isTag).toBe(true);
      });

      it('returns false if the listing is not a tag', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isTag).toBe(false);
      });
    });

    describe('property: isCollection', () => {
      it('returns true if the listing is a collection', () => {
        const listing = Listing.records.get('collection/c/tips');
        expect(listing.isCollection).toBe(true);
      });

      it('returns false if the listing is not a collection', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isCollection).toBe(false);
      });
    });

    describe('property: isParent', () => {
      it('returns true if the listing is a parent', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isParent).toBe(true);
      });

      it('returns false if the listing is not a parent', () => {
        const listing = Listing.records.get('collection/c/tips');
        expect(listing.isParent).toBe(false);
      });
    });

    describe('property: isLeaf', () => {
      it('returns true if the listing is a leaf', () => {
        const listing = Listing.records.get('collection/c/tips');
        expect(listing.isLeaf).toBe(true);
      });

      it('returns false if the listing is not a leaf', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isLeaf).toBe(false);
      });
    });

    describe('property: isRoot', () => {
      it('returns true if the listing is a root', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.isRoot).toBe(true);
      });

      it('returns false if the listing is not a root', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.isRoot).toBe(false);
      });
    });

    describe('property: rootUrl', () => {
      it('returns the root url for a root', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.rootUrl).toEqual('/js');
      });

      it('returns the root url for a leaf', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.rootUrl).toEqual('/js');
      });
    });

    describe('property: siblings', () => {
      it('returns the siblings for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.siblings.length).toEqual(3);
      });
    });

    describe('property: siblingsExceptSelf', () => {
      it('returns the siblings for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.siblingsExceptSelf.length).toEqual(2);
      });
    });

    describe('property: sublinks', () => {
      it('returns the sublinks for a parent listing', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.sublinks).toEqual([
          {
            name: 'All',
            url: '/js/p/1',
            selected: true,
          },
          {
            name: 'Date',
            url: '/js/t/date/p/1',
            selected: false,
          },
          {
            name: 'Node',
            url: '/js/t/node/p/1',
            selected: false,
          },
          {
            name: 'String',
            url: '/js/t/string/p/1',
            selected: false,
          },
        ]);
      });
      it('returns the sublinks for a child listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.sublinks).toEqual([
          {
            name: 'All',
            url: '/js/p/1',
            selected: false,
          },
          {
            name: 'Date',
            url: '/js/t/date/p/1',
            selected: false,
          },
          {
            name: 'Node',
            url: '/js/t/node/p/1',
            selected: false,
          },
          {
            name: 'String',
            url: '/js/t/string/p/1',
            selected: true,
          },
        ]);
      });
    });

    describe('property: ranking', () => {
      it('returns the ranking for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.ranking).toBeGreaterThanOrEqual(0);
        expect(listing.ranking).toBeLessThanOrEqual(1);
      });
    });

    describe('property: name', () => {
      it('returns the name for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.name).toEqual('JavaScript String Snippets');
      });
    });

    describe('property: shortName', () => {
      it('returns the short name for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.shortName).toEqual('JavaScript String');
      });
    });

    describe('property: description', () => {
      it('returns the description for a listing', () => {
        const Tag = Application.dataset.getModel('Tag');
        const tag = Tag.records.get('30code_string');
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.description).toEqual(tag.description);
      });
    });

    describe('property: shortDescription', () => {
      it('returns the description for a listing', () => {
        const Tag = Application.dataset.getModel('Tag');
        const tag = Tag.records.get('30code_string');
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.shortDescription).toEqual(
          `<p>${tag.shortDescription}</p>`
        );
      });
    });

    describe('property: splash', () => {
      it('returns the splash for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.splash).toEqual('laptop-plant.png');
      });
    });

    describe('property: seoDescription', () => {
      it('returns the SEO description for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.seoDescription).toEqual(
          'Browse 3 JavaScript String code snippets for all your development needs on 30 seconds of code.'
        );
      });
    });

    describe('property: featured', () => {
      it('returns the featured for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.featured).not.toEqual(false);
      });
    });

    describe('property: icon', () => {
      it('returns the icon for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.icon).toEqual('js');
      });
    });

    describe('property: isListed', () => {
      it('returns true for listed listings', () => {
        const mainListing = Listing.records.get('main');
        const blogListing = Listing.records.get('blog/articles');
        const languageListing = Listing.records.get('language/js');
        const tagListing = Listing.records.get('tag/js/t/string');
        expect(mainListing.isListed).toEqual(true);
        expect(blogListing.isListed).toEqual(true);
        expect(languageListing.isListed).toEqual(true);
        expect(tagListing.isListed).toEqual(true);
      });
    });

    describe('property: isSearchable', () => {
      it('returns true for searchable listings', () => {
        const mainListing = Listing.records.get('main');
        const blogListing = Listing.records.get('blog/articles');
        const languageListing = Listing.records.get('language/js');
        const tagListing = Listing.records.get('tag/js/t/string');
        expect(mainListing.isSearchable).toEqual(false);
        expect(blogListing.isSearchable).toEqual(true);
        expect(languageListing.isSearchable).toEqual(true);
        expect(tagListing.isSearchable).toEqual(true);
      });
    });

    describe('property: searchTokens', () => {
      it('returns a string of string tokens for the listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.searchTokens).toEqual(
          'brows wide varieti es6 helper function includ arrai oper dom manipul algorithm node js util javascript string snippet'
        );
      });
    });

    describe('property: pageCount', () => {
      it('returns the page count for a listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.pageCount).toEqual(1);
      });
    });

    describe('property: defaultOrdering', () => {
      it('returns "popularity" for a regular listing', () => {
        const listing = Listing.records.get('tag/js/t/string');
        expect(listing.defaultOrdering).toEqual('popularity');
      });

      it('returns "new" for a blog listing', () => {
        const listing = Listing.records.get('blog/articles');
        expect(listing.defaultOrdering).toEqual('new');
      });

      it('returns "custom" for collection listings', () => {
        const listing = Listing.records.get('collection/c/react-rendering');
        expect(listing.defaultOrdering).toEqual('custom');
      });
    });

    describe('property: listedSnippets', () => {
      it('returns a set of snippets for a listing', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.listedSnippets.length).toBe(6);
      });
    });

    // No reason testing property: data, as it's already tested via the other
    // properties.

    describe('property: snippets', () => {
      it('returns a set of snippets for a listing', () => {
        const listing = Listing.records.get('language/js');
        expect(listing.snippets.length).toBe(6);
      });
    });

    describe('method: pageRanking', () => {
      it("returns the page ranking for a listing's pages", () => {
        const listing = Listing.records.get('tag/js/t/string');
        const firstPageRanking = listing.pageRanking(1);
        const secondPageRanking = listing.pageRanking(2);
        expect(firstPageRanking).toBeGreaterThanOrEqual(0);
        expect(firstPageRanking).toBeLessThanOrEqual(1);
        expect(secondPageRanking).toBeGreaterThanOrEqual(0);
        expect(secondPageRanking).toBeLessThanOrEqual(1);
        expect(secondPageRanking).toBeLessThan(firstPageRanking);
      });
    });

    describe('scope: main', () => {
      it('returns the main listing', () => {
        const mainListing = Listing.records.main.first;
        expect(mainListing.id).toEqual('main');
      });
    });

    describe('scope: blog', () => {
      it('returns the blog listing', () => {
        const blogListing = Listing.records.blog.first;
        expect(blogListing.id).toEqual('blog/articles');
      });
    });

    describe('scope: language', () => {
      it('returns the language listings', () => {
        const languageListings = Listing.records.language;
        expect(languageListings.length).toBe(3);
      });
    });

    describe('scope: tag', () => {
      it('returns the tag listings', () => {
        const tagListings = Listing.records.tag;
        expect(tagListings.length).toEqual(9);
      });
    });

    describe('scope: collection', () => {
      it('returns the collection listings', () => {
        const collectionListings = Listing.records.collection;
        expect(collectionListings.length).toEqual(2);
      });
    });

    describe('scope: listed', () => {
      it('returns the listed listings', () => {
        const listedListings = Listing.records.listed;
        expect(listedListings.length).toEqual(16);
      });
    });

    describe('scope: searchable', () => {
      it('returns the searchable listings', () => {
        const searchableListings = Listing.records.searchable;
        expect(searchableListings.length).toEqual(15);
      });
    });

    describe('scope: featured', () => {
      it('returns the featured listings', () => {
        const featuredListings = Listing.records.featured;
        expect(featuredListings.length).toEqual(8);
      });
    });
  });

  describe('Page', () => {
    const Page = Application.dataset.getModel('Page');

    describe('property: isStatic', () => {
      it('returns true for static pages', () => {
        const page = Page.records.get('static_about');
        expect(page.isStatic).toEqual(true);
      });

      it('returns false for all other pages', () => {
        const page = Page.records.get('home');
        expect(page.isStatic).toEqual(false);
      });
    });

    describe('property: isCollectionsListing', () => {
      it('returns true for the collections listing pages', () => {
        const page = Page.records.get('listing_collections_1');
        expect(page.isCollectionsListing).toEqual(true);
      });

      it('returns false for all other pages', () => {
        const page = Page.records.get('listing_language/js_1');
        expect(page.isCollectionsListing).toEqual(false);
      });
    });

    describe('property: isSnippet', () => {
      it('returns true for snippet pages', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.isSnippet).toEqual(true);
      });

      it('returns false for al other pages', () => {
        const page = Page.records.get('home');
        expect(page.isSnippet).toEqual(false);
      });
    });

    describe('property: isListing', () => {
      it('returns true for regular listing pages', () => {
        const page = Page.records.get('listing_language/js_1');
        expect(page.isListing).toEqual(true);
      });

      it('returns false for all other pages', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.isListing).toEqual(false);
      });
    });

    describe('property: isHome', () => {
      it('returns true for the home page', () => {
        const page = Page.records.get('home');
        expect(page.isHome).toEqual(true);
      });

      it('returns false for al other pages', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.isHome).toEqual(false);
      });
    });

    describe('property: isUnlisted', () => {
      it('returns the correct value', () => {
        const page = Page.records.get('home');
        expect(page.isUnlisted).toEqual(false);
      });
    });

    describe('property: isPublished', () => {
      it('returns the correct value', () => {
        const page = Page.records.get('home');
        expect(page.isPublished).toEqual(true);
      });
    });

    describe('property: isIndexable', () => {
      it('returns true for regular pages', () => {
        const page = Page.records.get('home');
        expect(page.isIndexable).toEqual(true);
      });

      it('returns false for the 404 page', () => {
        const page = Page.records.get('static_404');
        expect(page.isIndexable).toEqual(false);
      });
    });

    describe('property: priority', () => {
      it('returns the correct value', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.priority).toBeGreaterThanOrEqual(0);
        expect(page.priority).toBeLessThanOrEqual(1);
      });
    });

    describe('property: relRoute', () => {
      it('returns the correct value', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.relRoute).toEqual('/css/s/triangle');
      });
    });

    describe('property: fullRoute', () => {
      it('returns the correct value', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        expect(page.fullRoute).toEqual(
          'https://www.30secondsofcode.org/css/s/triangle'
        );
      });
    });

    // No reason testing property: data, as it's already tested via the other
    // properties.

    describe('property: context', () => {
      it('returns the correct value for the home page', () => {
        const page = Page.records.get('home');
        const pageContext = page.context;
        expect(pageContext.shelves.length).toBe(2);
        expect(pageContext.pageDescription).toEqual(
          'Browse 15 short code snippets for all your development needs on 30 seconds of code.'
        );
      });

      it('returns the correct value for the collections page', () => {
        const page = Page.records.get('listing_collections_1');
        const pageContext = page.context;
        expect(pageContext.listingName).toEqual('Snippet Collections');
        expect(pageContext.pageDescription).toEqual(
          'Browse 8 snippet collections on 30 seconds of code.'
        );
        expect(pageContext.slug).toEqual('/collections/p/1');
        expect(pageContext.snippetList.length).toEqual(8);
      });

      it('returns the correct value for the search page', () => {
        const page = Page.records.get('static_search');
        const pageContext = page.context;
        expect(pageContext.searchIndex.length).toBe(30);
        expect(pageContext.recommendations.items.length).toBe(3);
        expect(pageContext.pageDescription).toEqual(
          'Search for answers to your development problems among 15 code snippets on 30 seconds of code.'
        );
      });

      it('returns the correct value for a static page', () => {
        const page = Page.records.get('static_about');
        const pageContext = page.context;
        expect(pageContext.stringLiterals).not.toBeUndefined();
      });

      it('returns the correct value for a listing page', () => {
        const page = Page.records.get('listing_blog/articles_1');
        const pageContext = page.context;
        expect(pageContext.listingName).toEqual('Articles');
        expect(pageContext.paginator).toEqual({
          pageNumber: 1,
          totalPages: 1,
          baseUrl: '/articles',
        });
        expect(pageContext.snippetList.length).toEqual(7);
        expect(pageContext.pageDescription).toEqual(
          'Browse 7 code articles for all your development needs on 30 seconds of code.'
        );
      });

      it('returns the correct value for a snippet page', () => {
        const page = Page.records.get('snippet_css/s/triangle');
        const pageContext = page.context;
        expect(pageContext.cardTemplate).toBe('CssSnippetCard');
        expect(pageContext.breadcrumbs.length).toBe(4);
        expect(pageContext.pageDescription).toEqual(
          'Creates a triangular shape with pure CSS.'
        );
        expect(pageContext.recommendations.items.length).toBe(3);
      });
    });
  });
});
