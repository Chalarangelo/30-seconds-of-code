import { ArgsError } from 'blocks/utilities/error';
import { JSONSerializer } from 'blocks/serializers/json';
import { Chunk } from 'blocks/utilities/chunk';
import { Logger } from 'blocks/utilities/logger';
import { SnippetPreview } from 'blocks/adapters/snippetPreview';
import { SnippetCollectionChip } from 'blocks/adapters/snippetCollectionChip';
import literals from 'lang/en/listing';

const NEW_BLOG_CARDS = 3;
const TOP_SNIPPET_CARDS = 5;
const TOP_COLLECTION_CHIPS = 6;

/**
 * Serializes the data for the home and collections pages into JSON files.
 */
export class HubSerializer {
  static serialize = async (snippetCollections, featuredCollectionIds) => {
    if (
      !snippetCollections ||
      !snippetCollections.length ||
      !featuredCollectionIds ||
      !featuredCollectionIds.length
    ) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollections' must be a non-empty array of 'SnippetCollection' instances and 'featuredCollectionIds' must be a non-empty array of collection ids."
      );
    }

    const boundLog = Logger.bind('serializers.hub.serialize');

    const { contentPath: outDirPath } = global.settings.paths;
    const homeDir = `${outDirPath}/home`;
    const collectionDir = `${outDirPath}/collections`;

    const mainCollection = snippetCollections.find(c => c.type === 'main');
    const blogCollection = snippetCollections.find(c => c.blog);
    const listedCollections = featuredCollectionIds.map(id =>
      new SnippetCollectionChip(
        snippetCollections.find(c => c.id === id)
      ).toObject()
    );

    const newBlogs = blogCollection.snippets
      .filter(s => s.isListed)
      .sort((a, b) => +new Date(b.firstSeen) - +new Date(a.firstSeen))
      .slice(0, NEW_BLOG_CARDS);
    const newBlogIds = newBlogs.map(s => s.id);

    const topSnippets = mainCollection.snippets
      .filter(
        s => !newBlogIds.includes(s.id) && s.type === 'snippet' && s.isListed
      )
      .slice(0, TOP_SNIPPET_CARDS);

    const homeChunkPairs = [
      ['index', Chunk.createIndex(`/`, 'HomePage', 1.0)],
      [
        'context',
        {
          shelves: [
            {
              shelfType: 'collections',
              shelfName: literals.featuredCollections,
              shelfUrl: '/collections',
              shelfData: listedCollections.slice(0, TOP_COLLECTION_CHIPS),
            },
            {
              shelfType: 'snippets',
              shelfName: literals.newBlogs,
              shelfUrl: `${blogCollection.slugPrefix}/n/1`,
              shelfData: newBlogs.map(s => new SnippetPreview(s).toObject()),
            },
            {
              shelfType: 'snippets',
              shelfName: literals.topSnippets,
              shelfUrl: mainCollection.url,
              shelfData: topSnippets.map(s => new SnippetPreview(s).toObject()),
            },
          ],
          pageDescription: mainCollection.seoDescription,
        },
      ],
    ];

    const collectionChunkPairs = [
      ['index', Chunk.createIndex('/collections', 'CollectionsPage', 0.75)],
      [
        'context',
        {
          listingName: literals.collections,
          listingTitle: literals.collections,
          chipList: listedCollections,
          pageDescription: literals.pageDescription('collections', {
            collectionCount: listedCollections.length,
          }),
        },
      ],
    ];

    try {
      await JSONSerializer.serializeToDir(homeDir, ...homeChunkPairs);
      await JSONSerializer.serializeToDir(
        collectionDir,
        ...collectionChunkPairs
      );
    } catch (err) {
      boundLog(`Encountered an error while serializing hub pages`, 'error');
      boundLog(`${err}`, 'error');
      throw err;
    }
  };
}
