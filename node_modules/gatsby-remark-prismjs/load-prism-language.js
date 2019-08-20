"use strict";

const Prism = require(`prismjs`);

const prismComponents = require(`prismjs/components`); // Get the real name of a language given it or an alias


const getBaseLanguageName = (nameOrAlias, components = prismComponents) => {
  if (components.languages[nameOrAlias]) {
    return nameOrAlias;
  }

  return Object.keys(components.languages).find(language => {
    const {
      alias
    } = components.languages[language];
    if (!alias) return false;

    if (Array.isArray(alias)) {
      return alias.includes(nameOrAlias);
    } else {
      return alias === nameOrAlias;
    }
  });
};

module.exports = function loadPrismLanguage(language) {
  const baseLanguage = getBaseLanguageName(language);

  if (!baseLanguage) {
    throw new Error(`Prism doesn't support language '${language}'.`);
  }

  if (Prism.languages[baseLanguage]) {
    // Don't load already loaded language
    return;
  }

  const languageData = prismComponents.languages[baseLanguage];

  if (languageData.option === `default`) {
    // Default language has already been loaded by Prism
    return;
  }

  if (languageData.require) {
    // Load the required language first
    if (Array.isArray(languageData.require)) {
      languageData.require.forEach(loadPrismLanguage);
    } else {
      loadPrismLanguage(languageData.require);
    }
  }

  require(`prismjs/components/prism-${baseLanguage}.js`);
};
/* Exposed for unit testing */


module.exports.getBaseLanguageName = getBaseLanguageName;