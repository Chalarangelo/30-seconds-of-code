import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';

export default (id, snippetNode, markdownNode) => {
  return {
    id,
    tags: snippetNode.tags,
    blogType: snippetNode.type,
    cover: snippetNode.cover,
    authors: snippetNode.authors,
    blog: true,
    expertise: snippetNode.expertise,
    title: snippetNode.title,
    code: snippetNode.code,
    slug: snippetNode.slug,
    url: snippetNode.url,
    path: markdownNode.fileAbsolutePath,
    text: snippetNode.text,
    language: snippetNode.language,
    icon: snippetNode.icon,
    ranking: snippetNode.ranking,
    firstSeen: snippetNode.firstSeen,
    lastUpdated: snippetNode.lastUpdated,
    searchTokens: uniqueElements([
      ...snippetNode.tags.all.filter(tag => tag !== 'beginner' && tag !== 'intermediate' && tag !== 'advanced'),
      ...tokenizeSnippet(
        `${snippetNode.text.short} ${snippetNode.title}`
      ),
    ].map(v => `${v}`.toLowerCase())).join(' '),
  };
};
