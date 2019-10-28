import { determineExpertiseFromTags } from 'functions/utils';

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
      html: snippetNode.attributes.codeBlocks.html,
      css: snippetNode.attributes.codeBlocks.css,
      js: snippetNode.attributes.codeBlocks.js,
      scopedCss: snippetNode.attributes.codeBlocks.scopedCss,
    },
    slug: `/${snippetNode.slugPrefix}${markdownNode.fields.slug}`,
    path: markdownNode.fileAbsolutePath,
    text: {
      full: snippetNode.attributes.text,
      short: snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n')),
    },
    archived: snippetNode.archived,
    language: {
      ...snippetNode.language,
      otherLanguages: snippetNode.otherLanguages,
    },
    browserSupport: snippetNode.attributes.browserSupport,
  };
};
