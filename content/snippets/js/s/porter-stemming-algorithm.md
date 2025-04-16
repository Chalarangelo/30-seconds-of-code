---
title: Implementing the Porter stemming algorithm in JavaScript
shortTitle: Porter stemming algorithm
language: javascript
tags: [algorithm,string,regexp]
cover: touch-flower
excerpt: Learn how to implement the Porter stemming algorithm in JavaScript, a simple algorithm for stripping English words of common suffixes.
listed: true
dateModified: 2025-04-06
journeyId: js/search
---

I recently started working on a new search prototype. After all, it was about time I revised this almost six year old relic that is the search powering my website. While I'm working on exciting things behind the scenes, let's have a look at the code I wrote one cloudy afternoon back on 2019 and talk about the Porter stemming algorithm.

## Definition

The **Porter stemming algorithm** was devised by Martin F. Porter in 1980 (that's 45 years ago). In the paper he describes a set of steps for stripping English words of common suffixes that depart little to no meaning, reducing them to their bases forms, a process known as **stemming**.

The algorithm consists of 5 steps, with steps 1 and 5 one being broken down into multiple sub-steps. It's still in use today, even though it's limited to English words and doesn't produce true roots in many cases, due to its relative simplicity. However, it's still a great starting point, of you want to get into **natural language processing (NLP)** or build a somewhat simple text-based *search engine*.

## Terminology

We'll brush up on the **terminology**, as described in the original paper, to make it a little easier to follow along.

A **consonant**  in a word is a letter other than A, E, I, O or U, and other
than Y preceded by a consonant. If a letter is not a consonant, it is a **vowel**. These are denoted by `c` and `v`, respectively. Non-zero sequences of these are denoted by `C` and `V`.

Any **word**, or part of a word, can be matched by a singular pattern:

```plaintext
[C](VC){m}[V]
```

In the above definition, square brackets denote arbitrary presence of their contents and the `(VC){m}` denotes `m` repetitions of the pattern `VC`. `m` is called the **measure** of any word or part of a word.

**Rules** for removing a suffix are given in the following form:

```plaintext
( condition ) S1 -> S2
```

This means that if a word ends in `S1` and the stem before `S1` satisfies the `condition`, then `S1` is replaced by `S2`.

The **condition** is usually given in terms of `m`, but may also contain:

- `*S` - the stem ends with `S` (similarly for other letters)
- `*v*` - the stem contains a vowel
- `*d` - the stem ends with a double consonant (e.g. `tt`, `ss`)
- `*o` - the stem ends with a consonant-vowel-consonant sequence, where the second consonant is not `w`, `x` or `y` (e.g. `wil`, `hop`)

The condition may also contain `and`, `or` and `not`.

Given a **set of rules** for a single step, **only one is obeyed**, and the longest suffix is removed.

## Step-by-step implementation

Having covered the terminology, let's jump in to the implementation. Each step will be presented as a table of rules, followed by a code snippet that implements them, some examples and a short explanation.

> [!IMPORTANT]
>
> This implementation is meant mainly as a **learning resource**. That means some parts may be **unoptimized** or there may be **mistakes**. I've tested this to the best of my abilities and optimized it for **readability**, without sacrificing too much performance. As this algorithm is quite popular, you can definitely look up more optimized versions, if you need to use it in a production environment.

### Common patterns

Before we begin, let's define some **common regular expression patterns** that we'll use throughout the implementation:

```js
// c - consonant
const consonant = '[^aeiou]';
// v - vowel
const vowel = '[aeiouy]';
// C - consonant sequence
const consonants = '(' + consonant + '[^aeiouy]*)';
// V - vowel sequence
const vowels = '(' + vowel + '[aeiou]*)';
// m > 0
const mGreaterThanZero = new RegExp(
  '^' + consonants + '?' + vowels + consonants
);
// m = 1
const mEqualsOne = new RegExp(
  '^' + consonants + '?' + vowels + consonants + vowels + '?$'
);
// m > 1
const mGreaterThanOne = new RegExp(
  '^' + consonants + '?(' + vowels + consonants + '){2,}'
);
// *v* - stem contains a vowel
const stemContainsVowel = new RegExp(
  '^' + consonants + '?' + vowel
);
// *o - stem ends with a consonant-vowel-consonant sequence
const stemEndsWithConsonantVowelConsonant = new RegExp(
  '^' + consonants + '?' + consonant + vowel + '[^aeiouwxy]$'
);
```

### Step 1a

Step 1a is concerned with the removal of **plural form suffixes**. The rules are as follows:

| Rule | Example |
|------|---------|
| `SSES -> SS` | `CARESSES -> CARESS` |
| `IES -> I` | `PONIES -> PONI` <br/> `TIES -> TI` |
| `SS -> SS` | `CARESS -> CARESS` |
| `S -> ` | `CATS -> CAT` |

```js
const step1a = word => {
  if (word.endsWith('sses')) return word.slice(0, -2);
  if (word.endsWith('ies')) return word.slice(0, -2);
  if (word.endsWith('ss')) return word;
  if (word.endsWith('s')) return word.slice(0, -1);
  return word;
};

step1a('caresses');   // caress
step1a('ponies');     // poni
step1a('ties');       // ti
step1a('caress');     // caress
step1a('cats');       // cat
```

### Step 1b

Step 1b is concerned with the removal of **past tenses and gerunds**. It also deals with restoring the prefix to its true form after suffix removal. The rules are as follows:

| Rule | Example |
|------|---------|
| `(m>0) EED -> EE` | `FEED -> FEED` <br/> `AGREED -> AGREE` |
| `(m>0) ED -> ` | `PLASTERED -> PLASTER` <br/> `BLED -> BLED` |
| `(m>0) ING -> ` | `MOTORING -> MOTOR` <br/> `SING -> SING` |

If the second or third of the rules in is successful, the following rules are applied, too:

| Rule | Example |
|------|---------|
| `AT -> ATE` | `CONFLAT`~~`ED`~~`-> CONFLATE` |
| `BL -> BLE` | `TROUBL`~~`ED`~~`-> TROUBLE` |
| `IZ -> IZE` | `SIZ`~~`ED`~~`-> SIZE` |
| `(*d and not (*L or *S or *Z))`<br/>`-> single letter` | `HOPP`~~`ING`~~`-> HOP` <br/> `TANN`~~`ED`~~`-> TAN` <br/> `FALL`~~`ING`~~`-> FALL` <br/> `HISS`~~`ING`~~`-> HISS` <br/> `FIZZ`~~`ED`~~`-> FIZZ` |
| `(m=1 and *o) -> E` | `FAIL`~~`ING`~~`-> FAIL` <br/> `FIL`~~`ING`~~`-> FILE` |


```js
const step1b = word => {
  if (word.endsWith('eed') && mGreaterThanZero.test(word.slice(0, -3)))
    return word.slice(0, -1);

  let matched = null;
  if (word.endsWith('ed') && mGreaterThanZero.test(word.slice(0, -2)))
    matched = word.slice(0, -2);
  if (word.endsWith('ing') && mGreaterThanZero.test(word.slice(0, -3)))
    matched = word.slice(0, -3);

  if (matched) {
    if (/(at|bl|iz)$/.test(matched))
      return matched + 'e';
    if (/([^aeiouylsz])\1$/g.test(matched))
      return matched.slice(0, -1);
    if (
      mEqualsOne.test(matched) &&
      stemEndsWithConsonantVowelConsonant.test(matched)
    )
      return matched + 'e';
    return matched;
  }

  return word;
};

step1b('feed');       // feed
step1b('agreed');     // agree
step1b('plastered');  // plaster
step1b('bled');       // bled
step1b('motoring');   // motor
step1b('sing');       // sing
step1b('conflated');  // conflate
step1b('troubled');   // trouble
step1b('sized');      // size
step1b('hopping');    // hop
step1b('tanned');     // tan
step1b('falling');    // fall
step1b('hissing');    // hiss
step1b('fizzed');     // fizz
step1b('failing');    // fail
step1b('filing');     // file
```

### Step 1c

Step 1c is concerned with the removal of `-y` **suffixes**. The rule is as follows:

| Rule | Example |
|------|---------|
| `(*v*) Y -> I` | `HAPPY -> HAPPI` <br/> `SKY -> SKI` |

```js
const step1c = word => {
  if (word.endsWith('y') && stemContainsVowel.test(word.slice(0, -1)))
    return word.slice(0, -1) + 'i';
  return word;
};

step1c('happy');  // happi
step1c('sky');    // ski
```

### Step 2

Step 2 is concerned with the removal of **common suffixes**. The rules are as follows:

| Rule | Example |
|------|---------|
| `(m>0) ATIONAL -> ATE` | `RELATIONAL -> RELATE` |
| `(m>0) TIONAL -> TION` | `CONDITIONAL -> CONDITION` <br/> `RATIONAL -> RATIONAL` |
| `(m>0) ENCI -> ENCE` | `VALENCI -> VALENCE` |
| `(m>0) ANCI -> ANCE` | `HESITANCI -> HESITANCE` |
| `(m>0) IZER -> IZE` | `DIGITIZER -> DIGITIZE` |
| `(m>0) ABLI -> ABLE` | `CONFORMABLI -> CONFORMABLE` |
| `(m>0) ALLI -> AL` | `RADICALLI -> RADICAL` |
| `(m>0) ENTLI -> ENT` | `DIFFERENTLI -> DIFFERENT` |
| `(m>0) ELI -> E` | `VILELI -> VILE` |
| `(m>0) OUSLI -> OUS` | `ANALOGOUSLI -> ANALOGOUS` |
| `(m>0) IZATION -> IZE` | `VIETNAMIZATION -> VIETNAMIZE` |
| `(m>0) ATION -> ATE` | `PREDICATION -> PREDICATE` |
| `(m>0) ATOR -> ATE` | `OPERATOR -> OPERATE` |
| `(m>0) ALISM -> AL` | `FEUDALISM -> FEUDAL` |
| `(m>0) IVENESS -> IVE` | `DECISIVENESS -> DECISIVE` |
| `(m>0) FULNESS -> FUL` | `HOPEFULNESS -> HOPEFUL` |
| `(m>0) OUSNESS -> OUS` | `CALLOUSNESS -> CALLOUS` |
| `(m>0) ALITI -> AL` | `FORMALITI -> FORMAL` |
| `(m>0) IVITI -> IVE` | `SENSITIVITI -> SENSITIVE` |
| `(m>0) BILITI -> BLE` | `SENSIBILITI -> SENSIBLE` |

```js
const step2 = word => {
  const rules = {
    ational: 'ate',
    tional: 'tion',
    enci: 'ence',
    anci: 'ance',
    izer: 'ize',
    abli: 'able',
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
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanZero.test(word.slice(0, -suffix.length))
    )
      return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

step2('relational');       // relate
step2('conditional');      // condition
step2('rational');         // rational
step2('valenci');          // valence
step2('hesitanci');        // hesitance
step2('digitizer');        // digitize
step2('conformabli');      // conformable
step2('radicalli');        // radical
step2('differentli');      // different
step2('vileli');           // vile
step2('analogousli');      // analogous
step2('vietnamization');   // vietnamize
step2('predication');      // predicate
step2('operator');         // operate
step2('feudalism');        // feudal
step2('decisiveness');     // decisive
step2('hopefulness');      // hopeful
step2('callousness');      // callous
step2('formaliti');        // formal
step2('sensitiviti');      // sensitive
step2('sensibiliti');      // sensible
```

### Step 3

Step 3 is also concerned with removing **common suffixes**. The rules are as follows:

| Rule | Example |
|------|---------|
| `(m>0) ICATE -> IC` | `TRIPLICATE -> TRIPLIC` |
| `(m>0) ATIVE -> ` | `FORMATIVE -> FORM` |
| `(m>0) ALIZE -> AL` | `FORMALIZE -> FORMAL` |
| `(m>0) ICITI -> IC` | `ELECTRICITI -> ELECTRIC` |
| `(m>0) ICAL -> IC` | `ELECTRICAL -> ELECTRIC` |
| `(m>0) FUL -> ` | `HOPEFUL -> HOPE` |
| `(m>0) NESS -> ` | `GOODNESS -> GOOD` |

```js
const step3 = word => {
  const rules = {
    icate: 'ic',
    ative: '',
    alize: 'al',
    iciti: 'ic',
    ical: 'ic',
    ful: '',
    ness: '',
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanZero.test(word.slice(0, -suffix.length))
    )
      return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

step3('triplicate');    // triplic
step3('formative');     // form
step3('formalize');     // formal
step3('electriciti');   // electric
step3('electrical');    // electric
step3('hopeful');       // hope
step3('goodness');      // good
```

### Step 4

Step 4 is also concerned with removing **common suffixes**. The rules are as follows:

| Rule | Example |
|------|---------|
| `(m>1) AL -> ` | `REVIVAL -> REVIV` |
| `(m>1) ANCE -> ` | `ALLOWANCE -> ALLOW` |
| `(m>1) ENCE -> ` | `INFERENCE -> INFER` |
| `(m>1) ER -> ` | `AIRLINER -> AIRLIN` |
| `(m>1) IC -> ` | `GYROSCOPIC -> GYROSCOP` |
| `(m>1) ABLE -> ` | `ADJUSTABLE -> ADJUST` |
| `(m>1) IBLE -> ` | `DEFENSIBLE -> DEFENS` |
| `(m>1) ANT -> ` | `IRRITANT -> IRRIT` |
| `(m>1) EMENT -> ` | `REPLACEMENT -> REPLAC` |
| `(m>1) MENT -> ` | `ADJUSTMENT -> ADJUST` |
| `(m>1) ENT -> ` | `DEPENDENT -> DEPEND` |
| `(m>1 and (*S or *T)) ION -> ` | `ADOPTION -> ADOPT` |
| `(m>1) OU -> ` | `HOMOLOGOU -> HOMOLOG` |
| `(m>1) ISM -> ` | `COMMUNISM -> COMMUN` |
| `(m>1) ATE -> ` | `ACTIVATE -> ACTIV` |
| `(m>1) ITI -> ` | `ANGULARITI -> ANGULAR` |
| `(m>1) OUS -> ` | `HOMOLOGOUS -> HOMOLOG` |
| `(m>1) IVE -> ` | `EFFECTIVE -> EFFECT` |
| `(m>1) IZE -> ` | `BOWDLERIZE -> BOWDLER` |

```js
const step4 = word => {
  const rules = {
    al: '',
    ance: '',
    ence: '',
    er: '',
    ic: '',
    able: '',
    ible: '',
    ant: '',
    ement: '',
    ment: '',
    ent: '',
    ion: '',
    ou: '',
    ism: '',
    ate: '',
    iti: '',
    ous: '',
    ive: '',
    ize: '',
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanOne.test(word.slice(0, -suffix.length))
    )
      if (suffix === 'ion' && /[^st]$/.test(word.slice(0, -3)))
        continue;
      else
        return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

step4('revival');       // reviv
step4('allowance');     // allow
step4('inference');     // infer
step4('airliner');      // airlin
step4('gyroscopic');    // gyroscop
step4('adjustable');    // adjust
step4('defensible');    // defens
step4('irritant');      // irrit
step4('replacement');   // replac
step4('adjustment');    // adjust
step4('dependent');     // depend
step4('adoption');      // adopt
step4('homologou');     // homolog
step4('communism');     // commun
step4('activate');      // activ
step4('angulariti');    // angular
step4('homologous');    // homolog
step4('effective');     // effect
step4('bowdlerize');    // bowdler
```

### Step 5a

Step 5a is concerned with **common suffix adjustments**. The rules are as follows:

| Rule | Example |
|------|---------|
| `(m>1) E -> ` | `PROBATE -> PROBAT` <br/> `RATE -> RATE` |
| `(m=1 and not *o) E -> ` | `CEASE -> CEAS` |

```js
const step5a = word => {
  if (
    word.endsWith('e') &&
    mGreaterThanOne.test(word.slice(0, -1))
  )
    return word.slice(0, -1);
  if (
    word.endsWith('e') &&
    mEqualsOne.test(word.slice(0, -1)) &&
    !stemEndsWithConsonantVowelConsonant.test(word.slice(0, -1))
  )
    return word.slice(0, -1);
  return word;
};

step5a('probate');  // probat
step5a('rate');     // rate
step5a('cease');    // ceas
```

### Step 5b

Step 5b is concerned with replacing `-ll` **suffixes** with `-l`. The rule is as follows:

| Rule | Example |
|------|---------|
| `(m>1 and *d and *L)`<br/>`-> single letter` | `CONTROLL -> CONTROL` <br/> `ROLL -> ROLL` |

```js
const step5b = word => {
  if (
    word.endsWith('ll') &&
    mGreaterThanOne.test(word)
  )
    return word.slice(0, -1);
  return word;
};

step5b('controll');  // control
step5b('roll');      // roll
```

## Conclusion

Wow, that was quite a lot to absorb! Putting everything together will give you a basic implementation of the Porter stemming algorithm. It's a great starting point if you're looking to get into natural language processing. Give it a go!

## Addendum: Code summary

If you're looking for the **complete implementation**, here's a summary of all the steps combined, as well as the main function that ties everything together:

<details>
<summary>View the complete implementation</summary>

```js
// c - consonant
const consonant = '[^aeiou]';
// v - vowel
const vowel = '[aeiouy]';
// C - consonant sequence
const consonants = '(' + consonant + '[^aeiouy]*)';
// V - vowel sequence
const vowels = '(' + vowel + '[aeiou]*)';
// m > 0
const mGreaterThanZero = new RegExp(
  '^' + consonants + '?' + vowels + consonants
);
// m = 1
const mEqualsOne = new RegExp(
  '^' + consonants + '?' + vowels + consonants + vowels + '?$'
);
// m > 1
const mGreaterThanOne = new RegExp(
  '^' + consonants + '?(' + vowels + consonants + '){2,}'
);
// *v* - stem contains a vowel
const stemContainsVowel = new RegExp(
  '^' + consonants + '?' + vowel
);
// *o - stem ends with a consonant-vowel-consonant sequence
const stemEndsWithConsonantVowelConsonant = new RegExp(
  '^' + consonants + '?' + consonant + vowel + '[^aeiouwxy]$'
);

// Step 1a - common plural forms
const step1a = word => {
  if (word.endsWith('sses')) return word.slice(0, -2);
  if (word.endsWith('ies')) return word.slice(0, -2);
  if (word.endsWith('ss')) return word;
  if (word.endsWith('s')) return word.slice(0, -1);
  return word;
};

// Step 1b - past tenses and gerunds
const step1b = word => {
  if (word.endsWith('eed') && mGreaterThanZero.test(word.slice(0, -3)))
    return word.slice(0, -1);

  let matched = null;
  if (word.endsWith('ed') && mGreaterThanZero.test(word.slice(0, -2)))
    matched = word.slice(0, -2);
  if (word.endsWith('ing') && mGreaterThanZero.test(word.slice(0, -3)))
    matched = word.slice(0, -3);

  if (matched) {
    if (/(at|bl|iz)$/.test(matched))
      return matched + 'e';
    if (/([^aeiouylsz])\1$/g.test(matched))
      return matched.slice(0, -1);
    if (
      mEqualsOne.test(matched) &&
      stemEndsWithConsonantVowelConsonant.test(matched)
    )
      return matched + 'e';
    return matched;
  }

  return word;
};

// Step 1c - -y suffixes
const step1c = word => {
  if (word.endsWith('y') && stemContainsVowel.test(word.slice(0, -1)))
    return word.slice(0, -1) + 'i';
  return word;
};

// Step 2 - common suffixes
const step2 = word => {
  const rules = {
    ational: 'ate',
    tional: 'tion',
    enci: 'ence',
    anci: 'ance',
    izer: 'ize',
    abli: 'able',
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
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanZero.test(word.slice(0, -suffix.length))
    )
      return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

// Step 3 - common suffixes
const step3 = word => {
  const rules = {
    icate: 'ic',
    ative: '',
    alize: 'al',
    iciti: 'ic',
    ical: 'ic',
    ful: '',
    ness: '',
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanZero.test(word.slice(0, -suffix.length))
    )
      return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

// Step 4 - common suffixes
const step4 = word => {
  const rules = {
    al: '',
    ance: '',
    ence: '',
    er: '',
    ic: '',
    able: '',
    ible: '',
    ant: '',
    ement: '',
    ment: '',
    ent: '',
    ion: '',
    ou: '',
    ism: '',
    ate: '',
    iti: '',
    ous: '',
    ive: '',
    ize: '',
  };

  for (const [suffix, replacement] of Object.entries(rules)) {
    if (
      word.endsWith(suffix) &&
      mGreaterThanOne.test(word.slice(0, -suffix.length))
    )
      if (suffix === 'ion' && /[^st]$/.test(word.slice(0, -3)))
        continue;
      else
        return word.slice(0, -suffix.length) + replacement;
  }

  return word;
};

// Step 5a - common suffixes
const step5a = word => {
  if (
    word.endsWith('e') &&
    mGreaterThanOne.test(word.slice(0, -1))
  )
    return word.slice(0, -1);
  if (
    word.endsWith('e') &&
    mEqualsOne.test(word.slice(0, -1)) &&
    !stemEndsWithConsonantVowelConsonant.test(word.slice(0, -1))
  )
    return word.slice(0, -1);
  return word;
};

// Step 5b - -ll suffixes
const step5b = word => {
  if (
    word.endsWith('ll') &&
    mGreaterThanOne.test(word)
  )
    return word.slice(0, -1);
  return word;
};

const porterStemmer = word => {
  let stemmed = step1a(word);
  stemmed = step1b(stemmed);
  stemmed = step1c(stemmed);
  stemmed = step2(stemmed);
  stemmed = step3(stemmed);
  stemmed = step4(stemmed);
  stemmed = step5a(stemmed);
  stemmed = step5b(stemmed);
  return stemmed;
};
```

</details>
