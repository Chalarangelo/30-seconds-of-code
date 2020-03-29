import EXPERTISE_LEVELS from 'config/expertise';
import { capitalize } from 'functions/utils';

const specialTagsDictionary = {
  'css': 'CSS',
  'javascript': 'JavaScript',
  'php': 'PHP',
};

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

/**
 * Given a tag name, transform it to the appropriate format for JSX.
 * Capitalize or use the special dictionary for tags.
 */
export const transformTagName = tag =>
  !Object.keys(specialTagsDictionary).includes(tag.toLowerCase())
    ? tag.length ? capitalize(tag) : ''
    : specialTagsDictionary[tag.toLowerCase()];

/**
 * Given an array of tags, determine the expertise level.
 * Converts both the tag and the expertise list to lowercase for comparison.
 */
export const determineExpertiseFromTags = tags =>
  tags.reduce((expertise, tag) =>
    EXPERTISE_LEVELS.map(
      v => v.toLowerCase()
    ).includes(
      tag.toLowerCase()
    )
      ? tag
      : expertise,
  EXPERTISE_LEVELS[1]
  );

/**
* Given an array of tags, determine the language.
* Converts the tags and to lowercase for comparison.
*/
export const determineLanguageFromTags = tags =>
  languageTags[
    tags.find(v => Object.keys(languageTags).includes(v.toLowerCase()))
  ] || {short: '', long: ''};

/**
 * Given an array of tags, strip the expertise level.
 * Converts both the tag and the expertise list to lowercase for comparison.
 */
export const stripExpertiseFromTags = tags =>
  tags.filter(
    tag => !EXPERTISE_LEVELS.map(
      v => v.toLowerCase()
    ).includes(
      tag.toLowerCase()
    )
  );

/**
 * Given an array of tags, strip the language.
 * Converts both the tag and the expertise list to lowercase for comparison.
 */
export const stripLanguageFromTags = tags =>
  tags.filter(
    tag => !Object.keys(languageTags).includes(tag.toLowerCase())
  );
