import fs from 'fs-extra';
import recommendationEngine from 'engines/recommendationEngine';
import { transformSnippetIndex } from 'build/transformers';
import { chunk } from 'utils';
import EXPERTISE_LEVELS from 'config/expertise';
import literals from 'lang/en/listing';

const ORDERS_MAP = {
  'p': literals.orders.popularity,
  'a': literals.orders.alphabetical,
  'e': literals.orders.expertise,
};

const CARDS_PER_PAGE = 40;

const compileListingPages = (
  indexedChunks,
  context,
  baseUrl,
  slugOrderingSegment,
  ordersList
) => {
  const {
    contentPath: contentOutDir,
  } = global._yild_instance.config.paths;

  indexedChunks.forEach((chunk, i, chunks) => {
    const isMainListing = context.listingType === 'main' && slugOrderingSegment === 'p' && i === 0;
    const outDir = `${contentOutDir}${baseUrl}/${slugOrderingSegment}/${i + 1}`;
    fs.ensureDirSync(outDir);

    fs.writeFileSync(
      `${outDir}/index.json`,
      JSON.stringify({
        template: 'ListingPage',
        fullRoute: `https://30secondsofcode.org${baseUrl}/${slugOrderingSegment}/${i + 1}`,
        relRoute: `${baseUrl}/${slugOrderingSegment}/${i + 1}`,
        priority: isMainListing ? 1.0 : 0.7,
      }, null, 2)
    );
    fs.writeFileSync(
      `${outDir}/snippetList.json`,
      JSON.stringify({
        snippetList: chunk,
      }, null, 2)
    );
    fs.writeFileSync(
      `${outDir}/metadata.json`,
      JSON.stringify({
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
      }, null, 2)
    );
  });
};

const compileListingPagesWithOrderOptions = (
  context,
  baseUrl,
  orders,
  chunks,
  contextCustomizer = () => ({})
) => {
  orders.forEach((order, i) => {
    compileListingPages(
      chunks[i],
      { ...context, ...contextCustomizer(order, i)},
      baseUrl,
      order,
      orders
    );
  });
};

const compileListingData = (snippetIndex, listingMetas) => {
  // 1. Create listing pages for the main listing:
  // Tranform and chunk data for popularity, alphabetical and expertise ordering
  const transformedIndex = transformSnippetIndex(snippetIndex);
  const popularChunks = chunk(transformedIndex, CARDS_PER_PAGE);
  const alphabeticalChunks = chunk(transformedIndex.sort((a, b) =>
    a.title.localeCompare(b.title)
  ), CARDS_PER_PAGE);
  const expertiseChunks = chunk(transformedIndex.sort((a, b) =>
    a.expertise === b.expertise ? a.title.localeCompare(b.title) :
      !a.expertise ? 1 : !b.expertise ? -1 :
        EXPERTISE_LEVELS.indexOf(a.expertise) - EXPERTISE_LEVELS.indexOf(b.expertise)
  ), CARDS_PER_PAGE);
  // Create main listing sublinks and customization method for context
  const mainListingSublinks = listingMetas
    .map(v => v.featured > 0 ? v : {...v, featured: 500 })
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
  compileListingPagesWithOrderOptions(
    {
      listingName: literals.snippetList,
      listingTitle: literals.snippetList,
      listingType: 'main',
      listingSublinks: mainListingSublinks,
      pageDescription: literals.pageDescription('main', {
        snippetCount: transformedIndex.length,
      }),
    },
    '/list',
    ['p', 'a', 'e'],
    [popularChunks, alphabeticalChunks, expertiseChunks],
    mainContextCustomizer
  );

  // 2. Create listing pages for the language listings
  listingMetas.forEach(listingMeta => {
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
    compileListingPagesWithOrderOptions(
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
      ['p', 'a', 'e'],
      [popularSlugChunks, alphabeticalSlugChunks, expertiseSlugChunks],
      slugContextCustomizer
    );

    // 3. Create listing pages for the tag listings
    snippetIndexTagPrefixes.forEach(tagPrefix => {
      // Determine slug prefix and relevant information, create chunks from data
      // for each of the ordering options
      const snippetIndexTagData = snippetIndex
        .filter(s =>
          s.tags.primary === tagPrefix && s.slug.startsWith(`${slugPrefix}`) ||
            ( s.blog &&
              s.tags.all.find(t => t.toLowerCase() === snippetIndexName.toLowerCase()) &&
              s.tags.all.find(t => t.toLowerCase() === tagPrefix.toLowerCase())
            )
        );
      const transformedTagChunks = transformSnippetIndex(snippetIndexTagData);
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
      compileListingPagesWithOrderOptions(
        {
          listingName: literals.codelangTag(snippetIndexName, tagPrefix),
          listingTitle: literals.codelang(snippetIndexName),
          listingType: 'tag',
          pageDescription: literals.pageDescription('tag', {
            snippetCount: snippetIndexSlugData.length,
            listingLanguage: snippetIndexName,
            listingTag: tagPrefix,
          }),
        },
        `${slugPrefix}/t/${tagPrefix}`,
        ['p', 'a', 'e'],
        [popularTagChunks, alphabeticalTagChunks, expertiseTagChunks],
        tagContextCustomizer
      );
    });
  });
};

const postProcess = (allData, allSnippetData, parentLog) => {
  const boundLog = parentLog.rebind('postProcess');

  // Generate listing datas
  compileListingData(allSnippetData, allData.map(({ data }) => data.meta));

  // Write snippet recommendations
  return allData.map(async({ snippetsPath, data }) => {
    const {
      contentPath: contentOutDir,
    } = global._yild_instance.config.paths;
    boundLog(`Post-processing snippets for ${snippetsPath}`, 'info');

    for (let snippet of data.data) {
      const recommendedSnippets = transformSnippetIndex(
        recommendationEngine(allSnippetData, snippet)
      );

      const outDir = `${contentOutDir}/${snippet.slug.slice(1)}`;
      fs.ensureDirSync(outDir);
      await fs.writeFile(
        `${outDir}/recommendations.json`,
        JSON.stringify({
          recommendedSnippets,
        }, null, 2)
      );
    }
  });
};

export default postProcess;
