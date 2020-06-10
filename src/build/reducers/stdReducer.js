import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';
import { determineExpertiseFromTags } from 'build/transformers';

export default (id, snippetNode, markdownNode) => {
  return {
    id,
    tags: snippetNode.tags,
    expertise: determineExpertiseFromTags(snippetNode.tags.all),
    title: snippetNode.title,
    code: snippetNode.attributes.codeBlocks,
    slug: snippetNode.slug,
    url: snippetNode.url,
    path: markdownNode.fileAbsolutePath,
    text: {
      full: snippetNode.attributes.text,
      short: snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n')),
    },
    language: {
      ...snippetNode.language,
      otherLanguages: snippetNode.otherLanguages ? snippetNode.otherLanguages : undefined,
    },
    icon: snippetNode.icon,
    ranking: snippetNode.ranking,
    firstSeen: new Date(+`${snippetNode.meta.firstSeen}000`),
    lastUpdated: new Date(+`${snippetNode.meta.lastUpdated}000`),
    searchTokens: uniqueElements([
      snippetNode.title,
      snippetNode.language.short,
      snippetNode.language.long,
      ...snippetNode.tags.all.filter(tag => tag !== 'beginner' && tag !== 'intermediate' && tag !== 'advanced'),
      ...tokenizeSnippet(
        snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n'))
      ),
    ].map(v => v.toLowerCase())).join(' '),
  };
};
