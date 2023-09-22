import tagDictionary from 'settings/tags';
import { capitalize } from 'utils';

/**
 * Formats a tag for display.
 */
export class TagFormatter {
  static format = tag => {
    if (!tag.length) return '';
    if (tagDictionary[tag]) return tagDictionary[tag];
    return capitalize(tag);
  };
}
