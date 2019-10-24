import { shape, string, oneOf } from 'prop-types';
import { EXPERTISE_LEVELS } from 'shared';
import {
  Html,
  Code,
  Tags,
  Language
} from './index';

const Snippet = shape({
  title: string,
  expertise: oneOf(EXPERTISE_LEVELS),
  tags: Tags,
  languge: Language,
  code: Code,
  html: Html,
  url: string,
});

Snippet.toString = () => `
  type Snippet implements Node {
    title: String
    expertise: String
    tags: TagData
    language: LanguageData
    code: CodeData
    html: HtmlData
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
