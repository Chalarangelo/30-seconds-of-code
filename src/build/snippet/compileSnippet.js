import path from 'path';
import tokenizeSnippet from 'engines/searchIndexingEngine';
import { convertToSeoSlug, uniqueElements } from 'utils';
import {
  determineExpertiseFromTags,
  stripExpertiseFromTags,
  transformSnippetContext,
  transformBreadcrumbs,
  transformSnippetDescription
} from 'build/transformers';
import rankSnippet from 'engines/rankingEngine';
import {
  getData,
  getCodeBlocks,
  getTextualContent,
  getGitMetadata,
  getTags,
  getId
} from './snippetData';
import { createIndexChunk, writeChunks } from 'build/json';
import parseMarkdown from './parseMarkdown';

export const compileSnippet = async(
  snippetsPath, snippet, {
    sourceDir, commonData, slugPrefix, repoUrlPrefix, assetPath, outPath,
    langData, language, isCssSnippet, isBlogSnippet, hasOptionalLanguage,
    languages, icon, biasPenaltyMultiplier, cardTemplate, authors,
  }, returnFullSnippet = false
) => {
  let data, gitMetadata, tags, text, code, rawCode, type,
    excerpt, cover, shortSliceIndex, authorsData, langIcon, shortText;

  await Promise.all([
    getData(snippetsPath, snippet),
    getGitMetadata(snippet, snippetsPath),
  ]).then(values => {
    data = values[0];
    gitMetadata = values[1];
  });

  await Promise.all([
    getTags(data.attributes.tags),
    getTextualContent(data.body),
    isBlogSnippet
      ? [ null, [ ] ]
      : getCodeBlocks(data.body, {
        isCssSnippet,
        hasOptionalLanguage,
        languages,
        snippetName: snippet.slice(0, -3),
      }),
    isBlogSnippet ? `blog.${data.attributes.type}` : 'snippet',
  ]).then(values => {
    tags = values[0];
    text = values[1];
    [ code, rawCode ] = values[2];
    type = values[3];
  });

  if (isBlogSnippet) {
    excerpt = data.attributes.excerpt;
    cover = `${assetPath}${data.attributes.cover}`;
    shortSliceIndex = text.indexOf('\n\n') <= 180
      ? text.indexOf('\n\n')
      : text.indexOf(' ', 160);
    shortText = excerpt && excerpt.trim().length !== 0
      ? excerpt
      : `${text.slice(0, shortSliceIndex)}...`;
    authorsData = getTags(data.attributes.authors).map(a => authors[a]);
    langIcon = langData.find(l => tags.includes(l.language));
  } else
    shortText = text.slice(0, text.indexOf('\n\n'));

  const html = parseMarkdown(
    {
      texts: {
        fullDescription: isBlogSnippet ? data.body : text,
        description: shortText,
      },
      codeBlocks: rawCode,
    }, {
      isBlog: isBlogSnippet,
      type,
      assetPath,
    }
  );

  const snippetData = {
    ...commonData,
    id: getId(snippet, sourceDir),
    title: data.attributes.title,
    type,
    tags: {
      all: tags,
      primary: tags[0],
    },
    code,
    expertise: isBlogSnippet ? 'blog' : determineExpertiseFromTags(tags),
    text: {
      full: isBlogSnippet ? data.body : text,
      short: shortText,
    },
    cover,
    authors: authorsData,
    icon: langIcon ? langIcon.icon : icon,
    searchTokens: uniqueElements(
      isBlogSnippet ? [
        ...stripExpertiseFromTags(tags),
        ...tokenizeSnippet(`${shortText} ${data.attributes.title}`),
      ].map(v => v.toLowerCase()) : [
        data.attributes.title,
        language.short,
        language.long,
        ...stripExpertiseFromTags(tags),
        ...tokenizeSnippet(shortText),
      ].map(v => v.toLowerCase())
    ).join(' '),
    html,
    ...gitMetadata,
    slug: `/${slugPrefix}${convertToSeoSlug(snippet.slice(0, -3))}`,
    url: `${repoUrlPrefix}/${snippet}`,
  };

  snippetData.ranking = rankSnippet({
    ...snippetData,
    language: commonData.language,
    biasPenaltyMultiplier: biasPenaltyMultiplier
      ? biasPenaltyMultiplier
      : 1.0,
  });

  await writeChunks(
    `${outPath}/${snippetData.slug.slice(1)}`,
    ['index',
      createIndexChunk(
        snippetData.slug, 'SnippetPage', (snippetData.ranking * 0.85).toFixed(2),
        { vscodeUrl: `vscode://file/${path.resolve(`${snippetsPath}/${snippet}`)}`}
      ),
    ],
    ['snippet', {snippet: transformSnippetContext(snippetData, cardTemplate)}],
    ['metadata', {
      cardTemplate,
      breadcrumbs: transformBreadcrumbs(snippetData, cardTemplate),
      pageDescription: transformSnippetDescription(snippetData, cardTemplate),
    }]
  );

  if (returnFullSnippet) {
    return {
      ...createIndexChunk(
        snippetData.slug, 'SnippetPage', (snippetData.ranking * 0.85).toFixed(2),
        { vscodeUrl: `vscode://file/${path.resolve(`${snippetsPath}/${snippet}`)}`}
      ),
      context: {
        snippet: transformSnippetContext(snippetData, cardTemplate),
        cardTemplate,
        breadcrumbs: transformBreadcrumbs(snippetData, cardTemplate),
        pageDescription: transformSnippetDescription(snippetData, cardTemplate),
      },
    };
  }

  return {
    id: snippetData.id,
    tags: snippetData.tags,
    language: {
      long: snippetData.language.long,
      short: snippetData.language.short,
    },
    searchTokens: snippetData.searchTokens,
    ranking: snippetData.ranking,
    blog: snippetData.blog,
    title: snippetData.title,
    expertise: snippetData.expertise,
    icon: snippetData.icon,
    slug: snippetData.slug,
    html: {
      description: snippetData.html.description,
    },
  };
};

export default compileSnippet;
