import { shape, string, oneOf } from 'prop-types';
import { EXPERTISE_LEVELS } from 'shared';
import {
  Html,
  Code,
  Tags,
  Authors,
  Language
} from './index';

const Snippet = shape({
  title: string,
  expertise: oneOf([...EXPERTISE_LEVELS, '']),
  tags: Tags,
  language: Language,
  code: Code,
  html: Html,
  url: string,
  description: string,
  authors: Authors,
});

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
