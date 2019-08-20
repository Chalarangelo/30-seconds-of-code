import slice from 'slice-ansi';
import stringWidth from 'string-width';

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 * @param {string} subject
 * @param {number} size
 * @returns {Array}
 */
export default (subject, size) => {
  let subjectSlice;

  subjectSlice = subject;

  const chunks = [];

  do {
    chunks.push(slice(subjectSlice, 0, size));

    subjectSlice = slice(subjectSlice, size).trim();
  } while (stringWidth(subjectSlice));

  return chunks;
};
