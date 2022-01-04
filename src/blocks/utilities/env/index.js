import jsiqle from '@jsiqle/core';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { Importer } from 'blocks/utilities/importer';
import literals from 'lang/en';
import pathSettings from 'settings/paths';

/**
 * Environment setup utility.
 */
export class Env {
  static webData = {};
  static schema = null;

  /**
   * Sets up the global environment variables, so that they are available everywhere.
   * Make sure this is the first thing your code runs before executing anything requiring
   * global variables.
   * If this is the first time you are setting up, use `init` instead.
   */
  static init = data => {
    const boundLog = Logger.bind('utilities.env.init');
    boundLog(
      `Setting up environment in "${process.env.NODE_ENV}" mode.`,
      'info'
    );
    Env.schema = Env.setupSchema();
    Env.webData = data ? data : Env.fetchData();
    Env.populateSchema();
    boundLog('Finished setting up environment.', 'success');
    return Env.schema;
  };

  static setupSchema() {
    const boundLog = Logger.bind('utilities.env.setupSchema');
    boundLog('Setting up schema...', 'info');
    const Schema = jsiqle.create(Importer.schema);
    boundLog('Setting up schema complete.', 'success');
    return Schema;
  }

  static fetchData() {
    const boundLog = Logger.bind('utilities.env.fetchData');
    boundLog('Fetching data from the exported JSON file...', 'info');
    const data = JSONHandler.fromFile(
      `${pathSettings.contentPath}/content.json`
    );
    boundLog('Fetching data complete', 'success');
    return data;
  }

  static populateSchema() {
    const boundLog = Logger.bind('utilities.env.populateSchema');
    boundLog('Populating schema with data...', 'info');
    const data = Env.webData;
    const Schema = Env.schema;
    const {
      Snippet,
      Repository,
      Collection,
      Listing,
      Language,
      Tag,
      Author,
      Page,
    } = Importer.modelNames.reduce((models, modelName) => {
      models[modelName] = Schema.getModel(modelName);
      return models;
    }, {});
    const {
      snippets,
      repositories,
      collections,
      tags,
      languages,
      authors,
      featuredListings,
    } = data;

    // Populate repos, languages, tags, authors, snippets
    repositories.forEach(repo => Repository.createRecord(repo));
    languages.forEach(language => Language.createRecord(language));
    tags.forEach(tag => Tag.createRecord(tag));
    authors.forEach(author => Author.createRecord(author));
    snippets.forEach(snippet => {
      const { firstSeen, lastUpdated, ...rest } = snippet;
      Snippet.createRecord({
        ...rest,
        firstSeen: new Date(firstSeen),
        lastUpdated: new Date(lastUpdated),
      });
    });
    // Populate collections and link to snippets
    collections.forEach(collection => {
      const { snippetIds, typeMatcher, ...rest } = collection;
      const collectionRec = Collection.createRecord(rest);
      if (snippetIds && snippetIds.length) collectionRec.snippets = snippetIds;
      if (typeMatcher)
        collectionRec.snippets = Snippet.records
          .where(snippet => snippet.type === typeMatcher)
          .flatPluck('id');
    });
    // Populate listings and create relationships
    Repository.records.forEach(repo => {
      const type = repo.isBlog ? 'blog' : 'language';
      const slugPrefix = `/${repo.slug}`;
      const repoListingId = `${type}${slugPrefix}`;
      const repoListing = Listing.createRecord({
        id: repoListingId,
        relatedRecordId: repo.id,
        type,
        slugPrefix,
        featuredIndex: featuredListings.indexOf(repoListingId),
      });
      // Populate tag listings from repositories
      const tagListingIds = repo.tags.flatMap(tag => {
        const tagSlugPrefix = tag.slugPrefix;
        const tagId = `tag${tagSlugPrefix}`;
        Listing.createRecord({
          id: tagId,
          relatedRecordId: `${tag.id}`,
          type: 'tag',
          slugPrefix: tagSlugPrefix,
          featuredIndex: featuredListings.indexOf(tagId),
        });
        return tagId;
      });
      repoListing.children = tagListingIds;
    });
    // Populate the main listing
    Listing.createRecord({
      id: 'main',
      type: 'main',
      slugPrefix: '/list',
      featuredIndex: -1,
    });
    // Populate listings for custom collections
    Collection.records.forEach(collection => {
      const slugPrefix = `/${collection.slug}`;
      const listingId = `collection${slugPrefix}`;
      Listing.createRecord({
        id: listingId,
        relatedRecordId: collection.id,
        type: 'collection',
        slugPrefix,
        featuredIndex: featuredListings.indexOf(listingId),
      });
    });
    // Populate snipet pages
    Snippet.records.forEach(snippet => {
      const { id } = snippet;
      Page.createRecord({
        id: `snippet_${id}`,
        template: 'SnippetPage',
        relatedRecordId: id,
      });
    });
    // Populate listing pages
    Listing.records.forEach(listing => {
      const { id } = listing;
      // TODO: Move this to settings and update listing!
      const CARDS_PER_PAGE = 15;
      let pageCounter = 1;
      const snippetIterator = listing.listedSnippets.batchIterator(
        CARDS_PER_PAGE
      );
      for (let pageSnippets of snippetIterator) {
        Page.createRecord({
          id: `listing_${id}_${pageCounter}`,
          template: 'ListingPage',
          relatedRecordId: id,
          snippets: pageSnippets.flatPluck('id'),
          pageNumber: pageCounter,
        });
        pageCounter++;
      }
    });
    // Populate static pages
    Page.createRecord({
      id: 'static_404',
      template: 'NotFoundPage',
      slug: '/404',
      staticPriority: 0,
    });
    Page.createRecord({
      id: 'static_about',
      template: 'StaticPage',
      slug: '/about',
      staticPriority: 0.25,
      staticContext: {
        stringLiterals: literals.about,
      },
    });
    Page.createRecord({
      id: 'static_cookies',
      template: 'StaticPage',
      slug: '/cookies',
      staticPriority: 0.25,
      staticContext: {
        stringLiterals: literals.cookies,
      },
    });
    Page.createRecord({
      id: 'static_search',
      template: 'SearchPage',
      slug: '/search',
      staticPriority: 0.25,
    });
    // Populate collections and home page
    Page.createRecord({ id: 'collections', template: 'ListingPage' });
    Page.createRecord({ id: 'home', template: 'HomePage' });
    boundLog('Populating schema complete', 'success');
  }
}
