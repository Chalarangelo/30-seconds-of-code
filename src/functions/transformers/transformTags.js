import { EXPERTISE_LEVELS } from 'shared';
import { capitalize } from 'functions/utils';

const specialTagsDictionary = {
  'css': 'CSS',
  'javascript': 'JavaScript',
  'php': 'PHP',
};

/**
 * Given a tag name, transform it to the appropriate format for JSX.
 * Capitalize or use the special dictionary for tags.
 */
export const transformTagName = tag =>
  !Object.keys(specialTagsDictionary).includes(tag.toLowerCase())
    ? capitalize(tag)
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
