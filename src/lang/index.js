import en from 'lang/literals_en';

const _literals = {
  en,
};

export default (lang = 'en') => {
  const literals = _literals[lang];
  return (literalKey, ...params) => {
    const key = Array.isArray(literalKey) ? literalKey.join('') : literalKey;
    if (typeof literals[key] === 'string') return literals[key];
    if (typeof literals[key] === 'function') return literals[key](...params);
    if(typeof module !== 'undefined') console.warn(`Missing string literal: "${key}"`);
    return key;
  };
};
