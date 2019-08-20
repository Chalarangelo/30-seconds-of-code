/**
 * Misc
 * @flow
 */

import { HORIZONTAL_RULE, SECTION_LINE_BREAK, surround } from '../util';

const hr = () => surround(SECTION_LINE_BREAK, HORIZONTAL_RULE);

const collapsible = (summary: string, content: string) =>
  SECTION_LINE_BREAK +
  `
<details>
<summary>${summary}</summary>

${content}
</details>
`;

const anchor = (val: string) => {
  const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
  const replacement = '-';
  const whitespace = /\s/g;

  if (typeof val !== 'string') return '';
  const anchor = val.replace(/[A-Z]+/g, str => str.toLowerCase());
  return '#' + anchor
    .trim()
    .replace(re, '')
    .replace(whitespace, replacement);
};

const link = (title: string, url: string | null = null) => {
  if (url === null) {
    url = anchor(title);
  }
  return `[${title}](${url})`;
};

const image = (alt: string, url: string, title: string = '') =>
  `![${alt}](${url}${title !== '' ? ` "${title}"` : ''})`;

export { hr, collapsible, anchor, link, image };
