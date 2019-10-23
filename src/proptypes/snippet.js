import { shape, string, bool, arrayOf, oneOf } from 'prop-types';
import { EXPERTISE_LEVELS } from 'shared';
import LanguagePropType from './language';

export default shape({
  title: string,
  expertise: oneOf(EXPERTISE_LEVELS),
  tags: arrayOf(string),
  languge: LanguagePropType,
  descriptionHtml: string,
  explanationHtml: string,
  code: string,
  codeHtml: string,
  exampleHtml: string,
  url: string,
});
