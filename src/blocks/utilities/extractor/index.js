import fs from 'fs-extra';
import { Logger } from 'blocks/utilities/logger';
import { Chunk } from 'blocks/utilities/chunk';
import { TextParser } from 'blocks/parsers/text';
import { JSONParser } from 'blocks/parsers/json';
import { CollectionConfig } from 'blocks/entities/collectionConfig';
import { Snippet } from 'blocks/entities/snippet';
import { SnippetPreview } from 'blocks/adapters/snippetPreview';
import { SnippetCollectionChip } from 'blocks/adapters/snippetCollectionChip';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { withRecommendations } from 'blocks/decorations/withRecommendations';
import { SnippetSerializer } from 'blocks/serializers/snippet';
import { ListingSerializer } from 'blocks/serializers/listing';
import { HubSerializer } from 'blocks/serializers/hub';
import { JSONSerializer } from 'blocks/serializers/json';
import literals from 'lang/en';

export class Extractor {
  static extract = async () => {
    const boundLog = Logger.bind('utilities.extractor.extract');
    const { contentPath: outPath } = global.settings.paths;
    fs.ensureDirSync(outPath);
    boundLog('Extracting snippet data', 'info');
    return await this.extractSnippets();
  };

  static extractSnippets = async (configs = global.settings.configs) => {
    const boundLog = Logger.bind('utilities.extractor.extractSnippets');
    const { rawContentPath: contentDir } = global.settings.paths;

    return await Promise.all(
      configs.map(cfg => {
        const snippetsPath = `${contentDir}/sources/${cfg.dirName}/${cfg.snippetPath}`;
        boundLog(`Reading snippets from ${snippetsPath}`, 'info');

        return new Promise((resolve, reject) => {
          this.readSnippets(snippetsPath, cfg)
            .then(snippets => {
              boundLog(`Finished reading ${snippetsPath}`, 'success');
              resolve(
                new SnippetCollection(
                  {
                    type: cfg.isBlog ? 'blog' : 'language',
                    slugPrefix: `/${cfg.slug}`,
                    config: cfg,
                  },
                  snippets
                )
              );
            })
            .catch(err => {
              boundLog(
                `Encountered an error while reading ${snippetsPath}`,
                'error'
              );
              boundLog(`${err}`, 'error');
              reject(err);
            });
        });
      })
    ).then(async allData => {
      const blogCollection = allData.find(c => c.type === 'blog');
      const allSnippetData = new SnippetCollection(
        {
          type: 'main',
          slugPrefix: '/list',
        },
        allData
          .reduce((acc, r) => [...acc, ...r.snippets], [])
          .sort((a, b) => b.ranking - a.ranking)
      );
      const collections = [allSnippetData];
      allData.forEach(c => {
        if (['language', 'blog'].includes(c.type)) {
          // Inject blog snippets into languages
          if (c.type === 'language')
            c.addSnippets(
              blogCollection.snippets.filter(snippet =>
                snippet.tags.all.find(
                  t => t.toLowerCase() === c.config.language.long.toLowerCase()
                )
              )
            );
          // Create tag collections
          collections.push(
            ...c.tags.map(
              tag =>
                new SnippetCollection(
                  {
                    type: 'tag',
                    parentCollection: c,
                    slugPrefix: `${c.slugPrefix}/t/${tag}`,
                    config: c.config,
                    tag,
                  },
                  c.snippets.filter(s =>
                    s.tags.all.find(t => t.toLowerCase() === tag.toLowerCase())
                  )
                )
            )
          );
        }
        // Add to collections
        collections.push(c);
      });
      collections.push(
        ...JSONParser.fromGlob(`${contentDir}/configs/collections/*.json`).map(
          cfg => {
            const collectionConfig = new CollectionConfig(cfg);
            return new SnippetCollection(
              {
                type: 'collection',
                config: collectionConfig,
                slugPrefix: `/${collectionConfig.slug}`,
              },
              collectionConfig.snippetIds.map(id => Snippet.instances[id])
            );
          }
        )
      );
      const featuredCollections = JSONParser.fromFile(
        `${contentDir}/configs/featured.json`
      ).featuredCollections;

      boundLog(`Writing snippets to directories`, 'info');
      await this.writeSnippets(allSnippetData.snippets, featuredCollections);
      boundLog(`Finished writing snippets`, 'success');

      boundLog(`Writing listings to directories`, 'info');
      await this.writeListings(collections);
      boundLog(`Finished writing listings`, 'success');

      boundLog(`Writing hub pages to directories`, 'info');
      await this.writeHubPages(collections, featuredCollections);
      boundLog(`Finished writing hub pages`, 'success');

      boundLog(`Writing statics to directories`, 'info');
      await this.writeStaticPages(allSnippetData.snippets, collections);
      boundLog(`Finished writing statics`, 'success');

      return collections;
    });
  };

  static readSnippets = (dirPath, config) => {
    return TextParser.fromDir(dirPath, {
      withMetadata: true,
    }).then(data => data.map(s => withRecommendations(new Snippet(s, config))));
  };

  static writeSnippets = (snippets, featuredCollections) => {
    let serializableSnippets =
      global.settings.env === 'PRODUCTION'
        ? snippets.filter(s => !s.isScheduled)
        : snippets;

    return Promise.all(
      serializableSnippets.map(snippet => {
        const collectionIds = CollectionConfig.findCollectionIdsFromSnippetId(
          snippet.id
        ).map(c => `collection/${c.id}`);
        if (collectionIds && collectionIds.length) {
          const topCollectionId = featuredCollections
            .filter(c => c.startsWith('collection'))
            .find(c => collectionIds.includes(c));
          if (topCollectionId) {
            return SnippetSerializer.serializeSnippet(
              snippet,
              SnippetCollection.instances[topCollectionId]
            );
          }
        }
        return SnippetSerializer.serializeSnippet(snippet);
      })
    );
  };

  static writeListings = snippetCollections => {
    return Promise.all(
      snippetCollections.map(snippetCollection =>
        ListingSerializer.serializeListings(snippetCollection)
      )
    );
  };

  static writeHubPages = (snippetCollections, featuredCollectionIds) => {
    return HubSerializer.serialize(snippetCollections, featuredCollectionIds);
  };

  static writeStaticPages = (allSnippetData, collections) => {
    const { contentPath: outPath } = global.settings.paths;
    return Promise.all([
      JSONSerializer.serializeToDir(
        ...Chunk.createStaticPageChunks(outPath, '/404', 'NotFoundPage', 0)
      ),
      JSONSerializer.serializeToDir(
        ...Chunk.createStaticPageChunks(outPath, '/about', 'StaticPage', 0.25, {
          stringLiterals: literals.about,
        })
      ),
      JSONSerializer.serializeToDir(
        ...Chunk.createStaticPageChunks(
          outPath,
          '/cookies',
          'StaticPage',
          0.25,
          {
            stringLiterals: literals.cookies,
          }
        )
      ),
      JSONSerializer.serializeToDir(
        ...Chunk.createStaticPageChunks(
          outPath,
          '/search',
          'SearchPage',
          0.25,
          {
            searchIndex: [
              ...collections
                .filter(s => s.isSearchable)
                .map(s =>
                  new SnippetCollectionChip(s, {
                    withDescription: true,
                    withSearchTokens: true,
                  }).toObject()
                ),
              ...allSnippetData
                .filter(s => s.isListed)
                .map(s =>
                  new SnippetPreview(s, { withSearchTokens: true }).toObject()
                ),
            ],
            recommendedSnippets: allSnippetData
              .slice(0, 3)
              .map(s => new SnippetPreview(s).toObject()),
            pageDescription: literals.search.pageDescription(
              allSnippetData.length
            ),
          }
        )
      ),
    ]);
  };
}
