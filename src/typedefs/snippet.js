import {
  Html,
  Code,
  Tags,
  Language
} from './index';

const Snippet = {
  typeName: `SnippetData`,
};

Snippet.toString = () => `
  type Snippet implements Node {
    title: String
    expertise: String
    tags: ${Tags.typeName}
    language: ${Language.typeName}
    icon: String
    code: ${Code.typeName}
    html: ${Html.typeName}
    slug: String
    id: String
    path: String
    archived: Boolean
    text: TextData
  }

  ${Html}

  ${Code}

  type TextData @infer {
    full: String
    short: String
  }

  ${Tags}

  ${Language}
`;

export default Snippet;
