/** Removes unnecessary whitespace from template literals parsed as classNames */
export const trimWhiteSpace = (...args) => {
  const plainText = args[0][0];
  const interpolations = args
    .slice(1)
    .reduce((str, cur) => `${str + cur} `, '');
  return (`${plainText} ${interpolations}`).replace(/\s+/gm, ' ').trim() || null;
};

/** Capitalizes the first letter of a string */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
