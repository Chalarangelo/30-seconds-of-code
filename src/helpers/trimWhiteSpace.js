export const trimWhiteSpace = (...args) => {
  const plainText = args[0][0];
  const interpolations = args
    .slice(1)
    .reduce((str, cur) => `${str + cur} `, '');
  return (`${plainText} ${interpolations}`).replace(/\s+/gm, ' ').trim() || null;
};
