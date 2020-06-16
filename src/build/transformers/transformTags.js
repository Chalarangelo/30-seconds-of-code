import EXPERTISE_LEVELS from 'config/expertise';
import { capitalize } from 'utils';

const lowerCaseExpertiseLevels = EXPERTISE_LEVELS.filter(v => v !== 'Blog').map(v => v.toLowerCase());

const specialTagsDictionary = {
  'css': 'CSS',
  'javascript': 'JavaScript',
  'php': 'PHP',
};

const specialTags = Object.keys(specialTagsDictionary);

const languageTags = {
  'javascript': {
    short: 'js',
    long: 'javascript',
  },
  'react': {
    short: 'jsx',
    long: 'react',
  },
  'python': {
    short: 'py',
    long: 'python',
  },
};

const languageTagNames = Object.keys(languageTags);

/**
 * Given a tag name, transform it to the appropriate format for JSX.
 * Capitalize or use the special dictionary for tags.
 * @param {string} tag - The tag to be transformed.
 */
export const transformTagName = tag =>
  !specialTags.includes(tag.toLowerCase())
    ? tag.length ? capitalize(tag) : ''
    : specialTagsDictionary[tag.toLowerCase()];

/**
 * Given an array of tags, determine the expertise level.
 * Converts both the tag and the expertise list to lowercase for comparison.
 * @param {array} tags - Array of tags.
 */
export const determineExpertiseFromTags = tags =>
  tags.reduce((expertise, tag) =>
    lowerCaseExpertiseLevels.includes(tag.toLowerCase())
      ? tag
      : expertise,
  EXPERTISE_LEVELS[1]
  );

/**
* Given an array of tags, determine the language.
* Converts the tags and to lowercase for comparison.
 * @param {array} tags - Array of tags.
*/
export const determineLanguageFromTags = tags =>
  languageTags[
    tags.find(v => languageTagNames.includes(v.toLowerCase()))
  ] || {short: '', long: ''};

/**
 * Given an array of tags, strip the expertise level.
 * Converts both the tag and the expertise list to lowercase for comparison.
 * @param {array} tags - Array of tags.
 */
export const stripExpertiseFromTags = tags =>
  tags.filter(
    tag => !lowerCaseExpertiseLevels.includes(tag.toLowerCase())
  );

/**
 * Given an array of tags, strip the language.
 * Converts both the tag and the expertise list to lowercase for comparison.
 * @param {array} tags - Array of tags.
 */
export const stripLanguageFromTags = tags =>
  tags.filter(
    tag => !languageTagNames.includes(tag.toLowerCase())
  );
