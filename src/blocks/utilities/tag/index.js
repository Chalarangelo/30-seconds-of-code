import EXPERTISE_LEVELS from 'settings/expertise';
import tagSettings from 'settings/tags';
import { capitalize } from 'utils';

const lowerCaseExpertiseLevels = EXPERTISE_LEVELS.filter(
  v => v !== 'Article'
).map(v => v.toLowerCase());
const { specialTagsDictionary, languageTags } = tagSettings;
const specialTags = Object.keys(specialTagsDictionary);
const languageTagNames = Object.keys(languageTags);

/**
 * Helper methods for tag formatting and metadata parsing.
 */
export class Tag {
  /**
   * Given a tag name, transform it to the appropriate format for JSX.
   * Capitalize or use the special dictionary for tags.
   * @param {string} tag - The tag to be transformed.
   */
  static format = tag =>
    !specialTags.includes(tag.toLowerCase())
      ? tag.length
        ? capitalize(tag)
        : ''
      : specialTagsDictionary[tag.toLowerCase()];

  /**
   * Given an array of tags, determine the expertise level.
   * Converts both the tag and the expertise list to lowercase for comparison.
   * @param {Array<string>} tags - Array of tags.
   */
  static determineExpertise = tags =>
    tags.reduce(
      (expertise, tag) =>
        lowerCaseExpertiseLevels.includes(tag.toLowerCase()) ? tag : expertise,
      EXPERTISE_LEVELS[1]
    );

  /**
   * Given an array of tags, determine the language.
   * Converts the tags and to lowercase for comparison.
   * @param {Array<string>} tags - Array of tags.
   */
  static determineLanguage = tags =>
    languageTags[
      tags.find(v => languageTagNames.includes(v.toLowerCase()))
    ] || { short: '', long: '' };

  /**
   * Given an array of tags, strip the expertise level.
   * Converts both the tag and the expertise list to lowercase for comparison.
   * @param {Array<string>} tags - Array of tags.
   */
  static stripExpertise = tags =>
    tags.filter(tag => !lowerCaseExpertiseLevels.includes(tag.toLowerCase()));

  /**
   * Given an array of tags, strip the language.
   * Converts both the tag and the expertise list to lowercase for comparison.
   * @param {Array<string>} tags - Array of tags.
   */
  static stripLanguage = tags =>
    tags.filter(tag => !languageTagNames.includes(tag.toLowerCase()));
}
