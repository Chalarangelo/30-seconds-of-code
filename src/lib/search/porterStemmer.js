// Standard suffix manipulations.
const step2list = {
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

const step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: '',
};

// Consonant-vowel sequences.
const consonant = '[^aeiou]';
const vowel = '[aeiouy]';
const consonants = '(' + consonant + '[^aeiouy]*)';
const vowels = '(' + vowel + '[aeiou]*)';

const gt0 = new RegExp('^' + consonants + '?' + vowels + consonants);
const eq1 = new RegExp(
  '^' + consonants + '?' + vowels + consonants + vowels + '?$'
);
const gt1 = new RegExp('^' + consonants + '?(' + vowels + consonants + '){2,}');
const vowelInStem = new RegExp('^' + consonants + '?' + vowel);
const consonantLike = new RegExp('^' + consonants + vowel + '[^aeiouwxy]$');

// Exception expressions.
const sfxLl = /ll$/;
const sfxE = /^(.+?)e$/;
const sfxY = /^(.+?)y$/;
const sfxIon = /^(.+?(s|t))(ion)$/;
const sfxEdOrIng = /^(.+?)(ed|ing)$/;
const sfxAtOrBlOrIz = /(at|bl|iz)$/;
const sfxEED = /^(.+?)eed$/;
const sfxS = /^.+?[^s]s$/;
const sfxSsesOrIes = /^.+?(ss|i)es$/;
const sfxMultiConsonantLike = /([^aeiouylsz])\1$/;
const step2 = new RegExp(
  '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$'
);
const step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
const step4 = new RegExp(
  '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$'
);

/**
 * Stems a string:
 * - Return as-is if under 3 characters long
 * - Use porter stemmer otherwise
 */
export const stem = str => {
  // Exit early
  if (str.length < 3) return str;

  let firstCharacterWasLowerCaseY;
  let match;

  // Detect initial `y`, make sure it never matches.
  if (str.startsWith('y')) {
    firstCharacterWasLowerCaseY = true;
    str = 'Y' + str.slice(1);
  }

  // Step 1a.
  if (sfxSsesOrIes.test(str)) {
    // Remove last two characters.
    str = str.slice(0, -2);
  } else if (sfxS.test(str)) {
    // Remove last character.
    str = str.slice(0, -1);
  }

  // Step 1b.
  if ((match = sfxEED.exec(str))) {
    if (gt0.test(match[1])) {
      // Remove last character.
      str = str.slice(0, -1);
    }
  } else if ((match = sfxEdOrIng.exec(str)) && vowelInStem.test(match[1])) {
    str = match[1];

    if (sfxAtOrBlOrIz.test(str)) {
      // Append `e`.
      str += 'e';
    } else if (sfxMultiConsonantLike.test(str)) {
      // Remove last character.
      str = str.slice(0, -1);
    } else if (consonantLike.test(str)) {
      // Append `e`.
      str += 'e';
    }
  }

  // Step 1c.
  if ((match = sfxY.exec(str)) && vowelInStem.test(match[1])) {
    // Remove suffixing `y` and append `i`.
    str = match[1] + 'i';
  }

  // Step 2.
  if ((match = step2.exec(str)) && gt0.test(match[1]))
    str = match[1] + step2list[match[2]];

  // Step 3.
  if ((match = step3.exec(str)) && gt0.test(match[1]))
    str = match[1] + step3list[match[2]];

  // Step 4.
  if ((match = step4.exec(str))) {
    if (gt1.test(match[1])) str = match[1];
  } else if ((match = sfxIon.exec(str)) && gt1.test(match[1])) str = match[1];

  // Step 5.
  if (
    (match = sfxE.exec(str)) &&
    (gt1.test(match[1]) ||
      (eq1.test(match[1]) && !consonantLike.test(match[1])))
  )
    str = match[1];

  if (sfxLl.test(str) && gt1.test(str)) str = str.slice(0, -1);

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasLowerCaseY) str = 'y' + str.slice(1);

  return str;
};
