import { shape, string, bool, arrayOf, oneOf, checkPropTypes } from 'prop-types';
import { EXPERTISE_LEVELS } from 'shared';
import LanguagePropType from './language';
import TagsPropType from './tags';
import CodePropType from './code';
import HtmlPropType from './html';

export default shape({
  title: string,
  expertise: oneOf(EXPERTISE_LEVELS),
  tags: TagsPropType,
  languge: LanguagePropType,
  code: CodePropType,
  html: HtmlPropType,
  url: string,
});
