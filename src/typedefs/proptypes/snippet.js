import { shape, string } from 'prop-types';
import authors from './authors';
import code from './code';
import html from './html';
import language from './language';
import tags from './tags';

export default shape({
  title: string,
  expertise: string,
  tags,
  language,
  code,
  html,
  url: string,
  description: string,
  authors,
});
