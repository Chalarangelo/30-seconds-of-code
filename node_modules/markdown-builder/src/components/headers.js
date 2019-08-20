/**
 * Markdown Header utilities
 * @flow
 */

import { HEADER_PREFIX, withPrefix, SECTION_LINE_BREAK } from '../util';

/**
 * Header of specific level
 * @param {number} headerLevel 
 * @param {string} text 
 */
const hX = (headerLevel: number, text: string): string =>
  headerLevel > 6
    ? h6(text)
    : SECTION_LINE_BREAK + withPrefix(HEADER_PREFIX.repeat(headerLevel), text) + SECTION_LINE_BREAK;

const h1 = (text: string): string => hX(1, text);
const h2 = (text: string): string => hX(2, text);
const h3 = (text: string): string => hX(3, text);
const h4 = (text: string): string => hX(4, text);
const h5 = (text: string): string => hX(5, text);
const h6 = (text: string): string => hX(6, text);

export { hX, h1, h2, h3, h4, h5, h6 };
