import { transformSnippetIndex } from 'build/transformers';
import { chunk } from 'utils';
import EXPERTISE_LEVELS from 'config/expertise';
import literals from 'lang/en/listing';
import { createIndexChunk, writeChunks } from 'build/json';

const ORDERS_MAP = {
  'p': literals.orders.popularity,
  'a': literals.orders.alphabetical,
  'e': literals.orders.expertise,
  'n': literals.orders.newest,
};

const CARDS_PER_PAGE = 15;

export const compileListingPages = async(
  chunks,
  context,
  baseUrl,
  slugOrderingSegment,
  ordersList
) => {
  const {
    contentPath: contentOutDir,
  } = global.yild.paths;

  for (let [i, chunk] of chunks.entries()) {
    const isPopularityOrdered = slugOrderingSegment === 'p';
    const isFirstPage = isPopularityOrdered && i === 0;
    const isMainListing = context.listingType === 'main' && isPopularityOrdered;
    const isMainListingFirstPage = isMainListing && isFirstPage;
    const isTopLevelListing = (context.listingType === 'language' || context.listingType === 'blog') && isPopularityOrdered;
    const isTopLevelListingFirstPage = isTopLevelListing && isFirstPage;
    const isMainTagListing = context.listingType === 'tag' && isFirstPage;
    const priority = isMainListingFirstPage ? 1.0
      : (isTopLevelListingFirstPage || isMainListing) ? 0.75
        : (isMainTagListing || isTopLevelListing) ? 0.5
          : 0.25;
    const outDir = `${contentOutDir}${baseUrl}/${slugOrderingSegment}/${i + 1}`;

    await writeChunks(
      outDir,
      ['index',
        createIndexChunk(`${baseUrl}/${slugOrderingSegment}/${i + 1}`, 'ListingPage', priority),
      ],
      ['snippetList', { snippetList: chunk }],
      ['metadata', {
        isMainListing,
        paginator: {
          pageNumber: i + 1,
          totalPages: chunks.length,
          baseUrl,
          slugOrderingSegment,
        },
        sorter: {
          orders: ordersList.map(order => (
            {
              url: `${baseUrl}/${order}/1`,
              title: ORDERS_MAP[order],
            }
          )),
          selectedOrder: ORDERS_MAP[slugOrderingSegment],
        },
        ...context,
      }]
    );
  }
};

export const compileListingPagesWithOrderOptions = async(
  context,
  baseUrl,
  orders,
  chunks,
  contextCustomizer = () => ({})
) => {
  for (let [i, order] of orders.entries()) {
    await compileListingPages(
      chunks[i],
      { ...context, ...contextCustomizer(order, i)},
      baseUrl,
      order,
      orders
    );
  }
};

/**
 * Write data for listings to appropriate JSON files.
 * @param {Array} snippetIndex - The array of indexed snippets.
 * @param {Array} listingMetas - An array of listing metadata objects.
 */
export const compileListingData = async(snippetIndex, listingMetas) => {
  // 1. Create listing pages for the main listing:
  // Tranform and chunk data for popularity, alphabetical and expertise ordering
  const transformedIndex = transformSnippetIndex(
    snippetIndex.filter(s => s.isListed)
  );
  const popularChunks = chunk(transformedIndex, CARDS_PER_PAGE);
  // Create main listing sublinks and customization method for context
  const mainListingSublinks = listingMetas
    .filter(v => v.featured > 0)
    .sort((a, b) => a.featured === b.featured ? a.name - b.name : a.featured - b.featured);
  const mainContextCustomizer = order => {
    return {
      listingSublinks: mainListingSublinks
        .map(l => ({
          ...l,
          url: l.url.replace('/p/1', `/${order}/1`),
        })),
    };
  };
  // Create the listing pages with the order options provided
  await compileListingPagesWithOrderOptions(
    {
      listingName: literals.snippetList,
      listingTitle: literals.snippetList,
      listingType: 'main',
      listingSublinks: mainListingSublinks,
      pageDescription: literals.pageDescription('main', {
        snippetCount: snippetIndex.length,
      }),
    },
    '/list',
    ['p'],
    [popularChunks],
    mainContextCustomizer
  );

  // 2. Create listing pages for the language listings
  for (let listingMeta of listingMetas) {
    // Determine slug prefix and relevant information, create chunks from data for
    // each of the ordering options
    const slugPrefix = listingMeta.slugPrefix;
    const snippetIndexName = snippetIndex
      .find(s => s.slug.startsWith(`${slugPrefix}`)).language.long || '';
    const snippetIndexSlugData = snippetIndex.filter(s =>
      s.slug.startsWith(`${slugPrefix}`) ||
        (s.blog && s.tags.all.find(t => t.toLowerCase() === snippetIndexName.toLowerCase()))
    );
    const transformedSlugChunks = transformSnippetIndex(snippetIndexSlugData);
    const popularSlugChunks = chunk(transformedSlugChunks, CARDS_PER_PAGE);
    const alphabeticalSlugChunks = chunk(transformedSlugChunks.sort((a, b) =>
      a.title.localeCompare(b.title)
    ), CARDS_PER_PAGE);
    const freshnessSlugChunks = chunk(
      transformSnippetIndex(snippetIndexSlugData.sort((a, b) =>
        +new Date(b.firstSeen) - +new Date(a.firstSeen)
      )),
      CARDS_PER_PAGE
    );
    const expertiseSlugChunks = chunk(transformedSlugChunks.sort((a, b) =>
      a.expertise === b.expertise ? a.title.localeCompare(b.title) :
        !a.expertise ? 1 : !b.expertise ? -1 :
          EXPERTISE_LEVELS.indexOf(a.expertise) - EXPERTISE_LEVELS.indexOf(b.expertise)
    ), CARDS_PER_PAGE);
    // Determine tag prefixes for the listing
    const snippetIndexTagPrefixes = listingMeta.tags;
    const slugContextCustomizer = order => {
      return {
        listingSublinks: listingMeta.blog ? [] : [
          {
            url: `${slugPrefix}/${order}/1`,
            name: literals.tag('all'),
            selected: true,
          },
          ...listingMeta.tags
            .map(tag => ({
              url: `${slugPrefix}/t/${tag}/${order}/1`,
              name: literals.tag(tag),
            })),
        ],
      };
    };
    // Create the listing pages with the order options provided
    await compileListingPagesWithOrderOptions(
      {
        listingName: listingMeta.blog ? literals.blog : literals.codelang(snippetIndexName),
        listingTitle: listingMeta.blog ? literals.blog : literals.codelang(snippetIndexName),
        listingType: listingMeta.blog ? 'blog' : 'language',
        pageDescription: literals.pageDescription(listingMeta.blog ? 'blog' : 'language', {
          snippetCount: snippetIndexSlugData.length,
          listingLanguage: listingMeta.blog ? 'blog' : snippetIndexName,
        }),
      },
      `${slugPrefix}`,
      listingMeta.blog ? ['p', 'n'] : ['p', 'a', 'e'],
      listingMeta.blog
        ? [popularSlugChunks, freshnessSlugChunks]
        : [popularSlugChunks, alphabeticalSlugChunks, expertiseSlugChunks],
      slugContextCustomizer
    );

    // 3. Create listing pages for the tag listings
    for(let tagPrefix of snippetIndexTagPrefixes) {
      const currentTag = listingMeta.tags
        .find(tag => tag === tagPrefix );
      // Determine slug prefix and relevant information, create chunks from data
      // for each of the ordering options
      const snippetIndexTagData = snippetIndex
        .filter(s =>
          ( s.slug.startsWith(`${slugPrefix}`) &&
            s.tags.all.find(t => t.toLowerCase() === tagPrefix.toLowerCase())
          ) ||
          ( s.blog &&
            s.tags.all.find(t => t.toLowerCase() === snippetIndexName.toLowerCase()) &&
            s.tags.all.find(t => t.toLowerCase() === tagPrefix.toLowerCase())
          )
        );
      const transformedTagChunks = transformSnippetIndex(snippetIndexTagData, false, currentTag);
      const popularTagChunks = chunk(transformedTagChunks, CARDS_PER_PAGE);
      const alphabeticalTagChunks = chunk(transformedTagChunks.sort((a, b) =>
        a.title.localeCompare(b.title)
      ), CARDS_PER_PAGE);
      const expertiseTagChunks = chunk(transformedTagChunks.sort((a, b) =>
        a.expertise === b.expertise ? a.title.localeCompare(b.title) :
          !a.expertise ? 1 : !b.expertise ? -1 :
            EXPERTISE_LEVELS.indexOf(a.expertise) - EXPERTISE_LEVELS.indexOf(b.expertise)
      ), CARDS_PER_PAGE);
      const tagContextCustomizer = order => {
        return {
          listingSublinks: listingMeta.blog ? [] : [
            {
              url: `${slugPrefix}/${order}/1`,
              name: literals.tag('all'),
              selected: true,
            },
            ...listingMeta.tags
              .map(tag => ({
                url: `${slugPrefix}/t/${tag}/${order}/1`,
                name: literals.tag(tag),
              })),
          ].map(tag => ({ ...tag, selected: tag.url.indexOf(`/t/${tagPrefix}/`) !== -1 })),
        };
      };
      // Create the listing pages with the order options provided
      await compileListingPagesWithOrderOptions(
        {
          listingName: literals.codelangTag(snippetIndexName, tagPrefix),
          listingTitle: literals.codelang(snippetIndexName),
          listingType: 'tag',
          pageDescription: literals.pageDescription('tag', {
            snippetCount: snippetIndexTagData.length,
            listingLanguage: snippetIndexName,
            listingTag: tagPrefix,
          }),
        },
        `${slugPrefix}/t/${tagPrefix}`,
        ['p', 'a', 'e'],
        [popularTagChunks, alphabeticalTagChunks, expertiseTagChunks],
        tagContextCustomizer
      );
    }
  }
};
