---
title: Implementing fuzzy matching in JavaScript
shortTitle: Fuzzy search matching
language: javascript
tags: [algorithm,string]
cover: raccoon
excerpt: Having built a search engine with TF-IDF and inverted indexes, we will now implement fuzzy matching to make searching error-tolerant.
listed: true
dateModified: 2025-04-29
journeyId: js/search
---

Last time, we explored [prefix search](/js/s/partial-search-matching) to help match the start of words while the user types. While our search system is pretty robust, it still lacks error tolerance. For example, if a user types `javscript` instead of `javascript`, our search system won't return any results. This is the problem **fuzzy matching** aims to solve.

> [!IMPORTANT]
>
> It's highly recommended that you start with the previous article, or even the one before it, if you haven't already. We'll built on top of past code and concepts in this one, so you'll have an easier time following along if you're familiar with them.

## Fuzzy matching

Fuzzy matching is a technique that allows you to search for documents that contain a **substring of the search term**, even if the substring is not an exact match. This is particularly useful when users make **typos or misspellings**, which is quite common in the real world.

### N-grams

Fuzzy matching can be implemented using various algorithms, but one of the most common approaches is to use **n-grams**. This algorithm works by breaking down a word into **smaller substrings of a fixed length**, called n-grams. The most common type of n-gram is the **trigram**, which consists of three characters.

Implementing a trigram algorithm is relatively simple:

```js
export const generateNgrams = (term, n = 3) => {
  const ngrams = [];

  for (let i = 0; i < term.length - n + 1; i++)
    ngrams.push(term.slice(i, i + n));

  return ngrams;
};

generateNgrams('javascript');
// ['jav', 'ava', 'vas', 'asc', 'scr', 'cri', 'rip', 'ipt']
```

As you can see, all that's needed is our trusty `for` loop and `String.prototype.slice()` to extract the n-grams. The `n` parameter is optional and defaults to `3`, but you can change it to any value you want, depending on the use case.

## N-gram indexing

Same as before, we'll employ an **inverted index** to store these values. After all, we want to be able to search for them same as regular terms and speed is paramount. Given the fact that we now need to store both terms and n-grams, we'll make some changes to our `addDocument` function to accommodate this.

```js {3,6-12,21-27}
const documents = [];
const invertedIndex = new Map();
const ngramsInvertedIndex = new Map();

const addDocument = document => {
  const terms = parseDocument(document);
  const ngrams = terms.reduce((acc, term) => {
    const ngrams = generateNgrams(term);
    acc.push(...ngrams);
    return acc;
  }, []);
  documents.push({ terms, ngrams });

  terms.forEach(term => {
    if (!invertedIndex.has(term)) invertedIndex.set(term, new Map());

    const docMap = invertedIndex.get(term);
    docMap.set(documents.length - 1, terms.filter((t) => t === term).length);
  });

  ngrams.forEach(ngram => {
    if (!ngramsInvertedIndex.has(ngram))
      ngramsInvertedIndex.set(ngram, new Set());

    const docSet = ngramsInvertedIndex.get(ngram);
    docSet.add(documents.length - 1);
  });
};
```

We'll also have to slightly adjust the `prefixMatches` function implementation to accommodate the **new data structure**.

```js {3}
const prefixMatches = (term, doc) => {
  const regex = new RegExp(`^${term}`, 'i');
  return doc.terms.filter(term => regex.test(term));
};
```

Nothing crazy so far, right? We've added a new `ngramInvertedIndex` to store the n-grams, and updated the `addDocument` function to populate it. The `prefixMatches` function now uses the `terms` property of the document object to filter for matches.

## Fuzzy search

Having set up the indexing, we can now implement the fuzzy search. Same as before, we'll rely on the inverted index to match results. We will, however, need to **score both based on the TF-IDF score and n-gram similarity**. _How should we go about it?_

### Scoring fuzzy matches

One method is to use a **weighing parameter** - let's call it `fuzzinness` - to control the balance between the two scores. The higher the value, the more weight is placed on n-gram matches, and the lower the value, the more weight is placed on exact matches. This allows us to control how fuzzy we want our search to be.

```js
// Adjust this value to control the fuzziness of the search
// Higher values mean more weight is placed on n-gram matches
// Lower values mean more weight is placed on exact matches
const fuzziness = 0.7;
```

After tinkering with the parameter a little bit, it seems like a value around `0.7` to `0.8` produces the best results. Very fuzzy searches (like `0.9`) tend to produce a lot of false positives, while very strict searches (like `0.1`) tend to miss a lot of relevant results.

### Updating the search function

Now that we have everything in place, we can update the search function to use the new n-gram index and scoring system. After calculating the score like before, we'll perform a **second pass** to calculate the n-gram similarity. This will be done by checking if the n-grams of the query match any of the n-grams in the document.

We'll then divide the number of matched n-grams with the maximum total number of n-grams, which is the max number of n-grams between the query and the document. This will give us a score between `0` and `1`, which we can then combine with the TF-IDF score using the `fuzziness` parameter.

```js {4-8,49-62}
const search = (query, fuzziness = 0.7) => {
  const queryTerms = parseDocument(query);
  const lastTermIndex = queryTerms.length - 1;
  const queryNgrams = queryTerms.reduce((acc, term) => {
    const ngrams = generateNgrams(term);
    acc.push(...ngrams);
    return acc;
  }, []);

  const scores = documents.reduce((scores, doc, docId) => {
    const score = queryTerms.reduce((score, term, i) => {
      if (invertedIndex.has(term)) {
        const indexEntry = invertedIndex.get(term).get(docId);
        if (!indexEntry) return score;

        const tf = indexEntry / doc.terms.length;
        const idf =
          Math.log(
            (documents.length + 1) / (invertedIndex.get(term).size + 1)
          ) + 1;
         return score + tf * idf;
      } else if (i === lastTermIndex) {
        const matches = prefixMatches(term, doc);
        if (!matches.length) return score;

        const { termFrequency, totalTermFrequency } = matches.reduce(
          (acc, match) => {
            const term = match.toLowerCase();
            const indexEntries = invertedIndex.get(term);
            if (indexEntries) {
              acc.termFrequency += indexEntries.get(docId) ?? 0;
              acc.totalTermFrequency += indexEntries.size;
            }
            return acc;
          },
          { termFrequency: 0, totalTermFrequency: 0 }
        );

        // Calculate TF as the total term frequency of the matched terms.
        const tf = termFrequency / doc.terms.length;
        // Calculate IDF using the sum of the total term frequencies.
        const idf = Math.log(
          documents.length / (totalTermFrequency || 1)
        );
        return score + tf * idf;
      }
    }, 0);

    // Calculate n-gram similarity
    const totalPossible = Math.min(queryNgrams.length, doc.ngrams.length);
    const ngramSimilarity = queryNgrams.reduce((similarity, ngram) => {
      const indexEntries = ngramsInvertedIndex.get(ngram);
      if (indexEntries && indexEntries.has(docId)) {
        similarity += 1;
      }
      return similarity;
    }, 0) / totalPossible;

    const combindScore =
      score * (1 - fuzziness) + ngramSimilarity * fuzziness;

    if (combindScore > 0) scores.set(docId, combindScore);

    return scores;
  }, new Map());

  const results = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));

  return results;
};
```

Finally, let's see it in action:

```js
addDocument('JavaScript is a web programming language.');
addDocument('Java is a general-purpose programming language');

search('java'); // Returns { 1: 0.8, 0: 0.7 }
search('javasc'); // Returns { 0: 0.75, 1: 0.35 }
search('javascript'); // Returns { 0: 0.8, 1: 0.175 }
search('javscript'); // Returns { 0: 0.5, 1: 0.1 }
```

Pretty cool, right? We can now account for typos and misspellings, and the results are still relevant. The `fuzziness` parameter might need some tweaking to be perfect for your use case, but overall, it seems to work well.

## Conclusion

In this article, we built on top of previous work to leverage our document index, inverted indexes, partial matching, TF-IDF and, finally, n-grams for fuzzy matching. I'd say this little search engine is pretty capable right now, enough to maybe even try out in production. I hope you enjoyed this journey and learned something new along the way, as I sure did! See you next time!
