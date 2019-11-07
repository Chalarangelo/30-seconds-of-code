// Standard suffix manipulations.
export const step2list = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log',
};

export const step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: '',
};

// Consonant-vowel sequences.
export const consonant = '[^aeiou]';
export const vowel = '[aeiouy]';
export const consonants = '(' + consonant + '[^aeiouy]*)';
export const vowels = '(' + vowel + '[aeiou]*)';

export const gt0 = new RegExp('^' + consonants + '?' + vowels + consonants);
export const eq1 = new RegExp(
  '^' + consonants + '?' + vowels + consonants + vowels + '?$'
);
export const gt1 = new RegExp('^' + consonants + '?(' + vowels + consonants + '){2,}');
export const vowelInStem = new RegExp('^' + consonants + '?' + vowel);
export const consonantLike = new RegExp('^' + consonants + vowel + '[^aeiouwxy]$');

// Exception expressions.
export const sfxLl = /ll$/;
export const sfxE = /^(.+?)e$/;
export const sfxY = /^(.+?)y$/;
export const sfxIon = /^(.+?(s|t))(ion)$/;
export const sfxEdOrIng = /^(.+?)(ed|ing)$/;
export const sfxAtOrBlOrIz = /(at|bl|iz)$/;
export const sfxEED = /^(.+?)eed$/;
export const sfxS = /^.+?[^s]s$/;
export const sfxSsesOrIes = /^.+?(ss|i)es$/;
export const sfxMultiConsonantLike = /([^aeiouylsz])\1$/;
export const step2 = new RegExp(
  '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$'
);
export const step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
export const step4 = new RegExp(
  '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$'
);
