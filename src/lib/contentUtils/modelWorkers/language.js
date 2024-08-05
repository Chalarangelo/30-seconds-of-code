import FileHandler from '#src/lib/contentUtils/fileHandler.js';

export const extractLanguageData = async languageGlob => {
  const languageData = await FileHandler.read(languageGlob);

  return languageData.reduce((acc, language) => {
    const {
      short,
      long,
      name,
      references = {},
      additionalReferences = [],
    } = language;
    acc.set(long, {
      id: long,
      long,
      short,
      name,
      references,
      allLanguageReferences: [long, ...additionalReferences],
    });
    return acc;
  }, new Map());
};

export const exportLanguageData = languageData => {
  return [...languageData.values()].map(lang => {
    return {
      model: 'Language',
      id: lang.long,
      long: lang.long,
      short: lang.short,
      name: lang.name,
    };
  });
};
