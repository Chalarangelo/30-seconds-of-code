import {
  rankingEngine as rankSnippet,
  searchIndexingEngine as tokenizeSnippet
} from 'engines';
import { convertToSeoSlug, uniqueElements } from 'utils';
import { determineExpertiseFromTags } from 'functions/transformers';

export default (id, snippetNode, markdownNode) => {
  return {
    id,
    tags: {
      all: snippetNode.attributes.tags,
      primary: snippetNode.attributes.tags[0],
    },
    expertise: determineExpertiseFromTags(snippetNode.attributes.tags),
    title: snippetNode.title,
    code: {
      src: snippetNode.attributes.codeBlocks.code,
      example: snippetNode.attributes.codeBlocks.example,
    },
    slug: `/${snippetNode.slugPrefix}${convertToSeoSlug(markdownNode.fields.slug)}`,
    url: `${snippetNode.repoUrlPrefix}${markdownNode.fields.slug.slice(0, -1)}.md`,
    path: markdownNode.fileAbsolutePath,
    text: {
      full: snippetNode.attributes.text,
      short: snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n')),
    },
    archived: snippetNode.archived,
    language: snippetNode.language,
    icon: snippetNode.icon,
    ranking: rankSnippet(snippetNode),
    recommendationRanking: snippetNode.recommendationRanking,
    firstSeen: new Date(+`${snippetNode.meta.firstSeen}000`),
    lastUpdated: new Date(+`${snippetNode.meta.lastUpdated}000`),
    searchTokens: uniqueElements([
      snippetNode.title,
      snippetNode.language.short,
      snippetNode.language.long,
      ...snippetNode.attributes.tags.filter(tag => tag !== 'beginner' && tag !== 'intermediate' && tag !== 'advanced'),
      ...tokenizeSnippet(
        snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n'))
      ),
    ].map(v => v.toLowerCase())).join(' '),
  };
};
