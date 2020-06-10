import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';

export default (id, snippetNode, markdownNode) => {
  return {
    id,
    tags: snippetNode.tags,
    expertise: snippetNode.expertise,
    title: snippetNode.title,
    code: snippetNode.code,
    slug: snippetNode.slug,
    url: snippetNode.url,
    path: markdownNode.fileAbsolutePath,
    text: snippetNode.text,
    language: {
      ...snippetNode.language,
      otherLanguages: snippetNode.otherLanguages ? snippetNode.otherLanguages : undefined,
    },
    icon: snippetNode.icon,
    ranking: snippetNode.ranking,
    firstSeen: snippetNode.firstSeen,
    lastUpdated: snippetNode.lastUpdated,
    searchTokens: uniqueElements([
      snippetNode.title,
      snippetNode.language.short,
      snippetNode.language.long,
      ...snippetNode.tags.all.filter(tag => tag !== 'beginner' && tag !== 'intermediate' && tag !== 'advanced'),
      ...tokenizeSnippet(
        snippetNode.text.short
      ),
    ].map(v => v.toLowerCase())).join(' '),
  };
};
