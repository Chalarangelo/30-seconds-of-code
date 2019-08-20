import slice from 'slice-ansi';
import stringWidth from 'string-width';

/**
 * @param {string} input
 * @param {number} size
 * @returns {Array}
 */
export default (input, size) => {
  let subject;

  subject = input;

  const chunks = [];

  // https://regex101.com/r/gY5kZ1/1
  const re = new RegExp('(^.{1,' + size + '}(\\s+|$))|(^.{1,' + (size - 1) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk;

    chunk = subject.match(re);

    if (chunk) {
      chunk = chunk[0];

      subject = slice(subject, stringWidth(chunk));

      chunk = chunk.trim();
    } else {
      chunk = slice(subject, 0, size);
      subject = slice(subject, size);
    }

    chunks.push(chunk);
  } while (stringWidth(subject));

  return chunks;
};
