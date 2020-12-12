import fs from 'fs-extra';
import { Logger } from 'build/utilities/logger';
import { Chunk } from 'build/utilities/chunk';
import { TextParser } from 'build/parsers/text';
import { Snippet } from 'build/entities/snippet';
import { SnippetPreview } from 'build/adapters/snippetPreview';
import { SnippetCollection } from 'build/entities/snippetCollection';
import { withRecommendations } from 'build/decorations/withRecommendations';
import { SnippetSerializer } from 'build/serializers/snippet';
import { ListingSerializer } from 'build/serializers/listing';
import { JSONSerializer } from 'build/serializers/json';
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
        if (c.type === 'language') {
          // Inject blog snippets into languages
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
      boundLog(`Writing snippets to directories`, 'info');
      await this.writeSnippets(allSnippetData.snippets);
      boundLog(`Finished writing snippets`, 'success');

      boundLog(`Writing listings to directories`, 'info');
      await this.writeListings(collections);
      boundLog(`Finished writing listings`, 'success');

      boundLog(`Writing statics to directories`, 'info');
      await this.writeStaticPages(allSnippetData.snippets);
      boundLog(`Finished writing statics`, 'success');

      return collections;
    });
  };

  static readSnippets = (dirPath, config) => {
    return TextParser.fromDir(dirPath, {
      withMetadata: true,
    }).then(data => data.map(s => withRecommendations(new Snippet(s, config))));
  };

  static writeSnippets = snippets => {
    return Promise.all(
      snippets.map(snippet => SnippetSerializer.serializeSnippet(snippet))
    );
  };

  static writeListings = snippetCollections => {
    return Promise.all(
      snippetCollections.map(snippetCollection =>
        ListingSerializer.serializeListings(snippetCollection)
      )
    );
  };

  static writeStaticPages = allSnippetData => {
    const { contentPath: outPath } = global.settings.paths;
    Promise.all([
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
          '/settings',
          'SettingsPage',
          0.05,
          {
            stringLiterals: literals.settings,
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
            searchIndex: allSnippetData
              .filter(s => s.isListed)
              .map(s =>
                new SnippetPreview(s, { withSearchTokens: true }).toObject()
              ),
            recommendedSnippets: allSnippetData
              .slice(0, 3)
              .map(s => new SnippetPreview(s).toObject()),
            pageDescription: literals.search.pageDescription(
              allSnippetData.length
            ),
          }
        )
      ),
      JSONSerializer.serializeToDir(
        ...Chunk.createStaticPageChunks(outPath, '/archive', 'SearchPage', 0, {
          searchIndex: allSnippetData
            .filter(s => !s.isListed)
            .map(s =>
              new SnippetPreview(s, { withSearchTokens: true }).toObject()
            ),
          recommendedSnippets: allSnippetData
            .slice(0, 3)
            .map(s => new SnippetPreview(s).toObject()),
          pageDescription: literals.search.pageDescription(
            allSnippetData.length
          ),
        })
      ),
    ]);
  };
}
