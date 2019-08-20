/**
 * Markdown Emphasis utilities
 * @flow
 */

import { surround } from '../util';
import {
  EMPHASIS_ITALICS,
  EMPHASIS_BOLD,
  EMPHASIS_STRIKETHROUGH,
} from '../util/constants';

/**
 * Produces italic text
 * @param {string} text 
 */
const i = (text: string): string => surround(EMPHASIS_ITALICS, text);

/**
 * Produces bold text
 * @param {string} text 
 */
const b = (text: string): string => surround(EMPHASIS_BOLD, text);

/**
 * Produces strikethroughed text
 * @param {string} text 
 */
const s = (text: string): string => surround(EMPHASIS_STRIKETHROUGH, text);

export { i, b, s };
