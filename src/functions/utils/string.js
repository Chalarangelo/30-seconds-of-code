/** Removes unnecessary whitespace from template literals parsed as classNames */
export const trimWhiteSpace = (...args) => {
  const plainTexts = args[0]
    .join(' ')
    .split(' ')
    .map(v => v.trim())
    .filter(Boolean);
  const interpolations = (args || [])
    .slice(1)
    .filter(Boolean)
    .reduce((acc, v) => [...acc, ...v.split(' ')], [])
    .map(v => v.trim())
    .filter(Boolean);
  return [...new Set([...plainTexts, ...interpolations])]
    .join(' ')
    .replace(/\s+/gm, ' ')
    .trim() || undefined;
};

/** Capitalizes the first letter of a string */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
