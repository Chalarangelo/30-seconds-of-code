import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';
// TODO: Consider parsing this via a new parser or similar
// The argument against is that it's a single case and might not extend to other repos in the future
import authors from '../../../content/sources/30blog/blog_data/blog_authors';

export default (id, snippetNode, markdownNode, langData) => {
  const lowercaseTags = snippetNode.tags.all.map(t => t.toLowerCase());
  const langIcon = langData.find(l => lowercaseTags.includes(l.language));
  return {
    id,
    tags: snippetNode.tags,
    blogType: snippetNode.type,
    cover: snippetNode.attributes.cover,
    authors: snippetNode.attributes.authors.map(a => authors[a]),
    blog: true,
    expertise: snippetNode.expertise,
    title: snippetNode.title,
    code: snippetNode.code,
    slug: snippetNode.slug,
    url: snippetNode.url,
    path: markdownNode.fileAbsolutePath,
    text: snippetNode.text,
    language: {},
    icon: langIcon ? langIcon.icon : snippetNode.icon,
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
