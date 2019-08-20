// @flow strict

const MAX_SUGGESTIONS = 5;

/**
 * Given [ A, B, C ] return ' Did you mean A, B, or C?'.
 */
declare function didYouMean(suggestions: $ReadOnlyArray<string>): string;
// eslint-disable-next-line no-redeclare
declare function didYouMean(
  subMessage: string,
  suggestions: $ReadOnlyArray<string>,
): string;

// eslint-disable-next-line no-redeclare
export default function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestions] =
    typeof firstArg === 'string'
      ? [firstArg, secondArg]
      : [undefined, firstArg];

  let message = ' Did you mean ';
  if (subMessage) {
    message += subMessage + ' ';
  }

  switch (suggestions.length) {
    case 0:
      return '';
    case 1:
      return message + suggestions[0] + '?';
    case 2:
      return message + suggestions[0] + ' or ' + suggestions[1] + '?';
  }

  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(', ') + ', or ' + lastItem + '?';
}
