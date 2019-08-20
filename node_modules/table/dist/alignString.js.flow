import _ from 'lodash';
import stringWidth from 'string-width';

const alignments = [
  'left',
  'right',
  'center'
];

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
const alignLeft = (subject, width) => {
  return subject + ' '.repeat(width);
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
const alignRight = (subject, width) => {
  return ' '.repeat(width) + subject;
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
const alignCenter = (subject, width) => {
  let halfWidth;

  halfWidth = width / 2;

  if (halfWidth % 2 === 0) {
    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth);
  } else {
    halfWidth = Math.floor(halfWidth);

    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth + 1);
  }
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 *
 * @param {string} subject
 * @param {number} containerWidth
 * @param {string} alignment One of the valid options (left, right, center).
 * @returns {string}
 */
export default (subject, containerWidth, alignment) => {
  if (!_.isString(subject)) {
    throw new TypeError('Subject parameter value must be a string.');
  }

  if (!_.isNumber(containerWidth)) {
    throw new TypeError('Container width parameter value must be a number.');
  }

  const subjectWidth = stringWidth(subject);

  if (subjectWidth > containerWidth) {
    // console.log('subjectWidth', subjectWidth, 'containerWidth', containerWidth, 'subject', subject);

    throw new Error('Subject parameter value width cannot be greater than the container width.');
  }

  if (!_.isString(alignment)) {
    throw new TypeError('Alignment parameter value must be a string.');
  }

  if (!alignments.includes(alignment)) {
    throw new Error('Alignment parameter value must be a known alignment parameter value (left, right, center).');
  }

  if (subjectWidth === 0) {
    return ' '.repeat(containerWidth);
  }

  const availableWidth = containerWidth - subjectWidth;

  if (alignment === 'left') {
    return alignLeft(subject, availableWidth);
  }

  if (alignment === 'right') {
    return alignRight(subject, availableWidth);
  }

  return alignCenter(subject, availableWidth);
};
