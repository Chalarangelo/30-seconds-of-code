---
title: Implementing partial search matching in JavaScript
shortTitle: Partial search matching
language: javascript
tags: [algorithm,string,regexp]
cover: interior-9
excerpt: Building on top of the TF-IDF and inverted index implementation, we will implement partial search matching to make searching more robust.
listed: true
dateModified: 2025-04-14
journeyId: js/search
---

In the [previous article](/js/s/tf-idf-inverted-index), we discussed how to implement **TF-IDF** and use an **inverted index** to optimize document searching. However, in most modern search systems, **partial matching** is also pretty common. Let's take a look at how to implement partial matching on top of the existing TF-IDF and inverted index implementation.

> [!IMPORTANT]
>
> If you haven't read the previous article, or are unfamiliar with the techniques discussed, I strongly recommend you do so before continuing. The code in this article builds on that article, and it will be much easier to understand if you are familiar with them.

## Partial matching

Partial matching is a technique that allows you to search for **documents that contain a substring of the search term**. It's most often employed in search pages where the results are populated while you type. You may, for example, start typing _"JavaScript"_ and get results as soon a few characters have been typed (e.g. _"JavaSc"_).

As users type from the start of the word, we can use a simple **prefix search**. This can be very easily implemented with a **regular expression**.

```js
const prefixMatches = (term, doc) => {
  const regex = new RegExp(`^${term}`, 'i');
  return doc.filter(term => regex.test(term));
};

const terms = [
  'javascript', 'program', 'languag', 'us', 'in', 'program', 'web',
];

prefixMatches('pro', terms); // ['program', 'program']
prefixMatches('langu', terms); // ['languag']
prefixMatches('java', terms); // ['javascript']
```

As you may notice in the last example, partial matching doesn't always produce the expected result. If you were searching for `Java`, you'd get `JavaScript` documents, too. This can't necessarily be fixed by simple prefix matching, but you may employ some logic to decide whether to check for partial matches or not.

## Matching only when needed

We'll have to add some **conditions** to check for partial matches. The first one of them is trivially simple: we need **only partially match the last term** in the search query. This matches how users naturally type, so it makes sense.

The second condition needs a little bit of thought and is aimed mainly at **preventing the false positives** we saw in the previous example. Realistically, if we find a **full match** in the inverted index, it's better to use that than to use a partial match. This is because it will most likely be more relevant to the search term, and it will also be faster to find. So, if we find a full match in the inverted index, we can **skip the partial match** altogether.

```js {4,18-24}
// Updating the search function from the previous article
const search = query => {
  const queryTerms = parseDocument(query);
  const lastTermIndex = queryTerms.length - 1;

  const scores = documents.reduce((scores, doc, docId) => {
    const score = queryTerms.reduce((score, term, i) => {
      if (invertedIndex.has(term)) {
        const indexEntry = invertedIndex.get(term).get(docId);
        if (!indexEntry) return score;

        const tf = indexEntry / doc.length;
        const idf =
          Math.log(
            (documents.length + 1) / (invertedIndex.get(term).size + 1)
          ) + 1;
         return score + tf * idf;
      } else if (i === lastTermIndex) {
        // Only check for partial matches on the last term
        const matches = prefixMatches(term, doc);
        if (matches.length > 0) {
          console.log(`Partial matched "${term}" in document ${docId}`);
        }
      }
    }, 0);

    if (score > 0) scores.set(docId, score);

    return scores;
  }, new Map());

  const results = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));

  return results;
};

// Built on the previous article's code
addDocument('JavaScript is a web programming language.');
addDocument('Java is a general-purpose programming language');

search('java'); // Returns the second document [1]
search('javasc'); // Returns no documents, logs partial match on [0]
search('javascript'); // Returns the first document [0]
```

> [!NOTE]
>
> These **heuristics** seem to work well in my **limited experience**. Take them with a pinch of salt, as you may need to tweak them to find the best solution for your use case.

As you can see, this solution ensures that if a term is found in the inverted index, it won't be partially matched to avoid false positive. However, we've only managed to find the relevant document. We now have to score them.

## TF-IDF of partial matches

Luckily, **scoring partial matches** is pretty simple. While there are various ways to go about it, I think the most straightforward approach is to use the same **TF-IDF formula** as before, but with a few modifications.

A partial match can result in **more than one term**. This means we can't simply use the term frequency (**TF**) of the term in the document, like before. However, we can **sum the frequencies** of all the terms that matched. This will give us a score that is proportional to the number of terms that matched, which is what we want.

Similarly, the inverse document frequency (**IDF**) can be calculated in the same way as before. The only difference is that we need to **divide the number of documents by the number of documents** that contain any of the terms that matched, matching the calculation we did for the term frequency.

```js {21-40}
const search = query => {
  const queryTerms = parseDocument(query);
  const lastTermIndex = queryTerms.length - 1;

  const scores = documents.reduce((scores, doc, docId) => {
    const score = queryTerms.reduce((score, term, i) => {
      if (invertedIndex.has(term)) {
        const indexEntry = invertedIndex.get(term).get(docId);
        if (!indexEntry) return score;

        const tf = indexEntry / doc.length;
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
        const tf = termFrequency / doc.length;
        // Calculate IDF using the sum of the total term frequencies.
        const idf = Math.log(
          documents.length / (totalTermFrequency || 1)
        );
        return score + tf * idf;
      }
    }, 0);

    if (score > 0) scores.set(docId, score);

    return scores;
  }, new Map());

  const results = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));

  return results;
};

// Supposing the documents are the same as before
search('java'); // Returns the second document [1]
search('javasc'); // Returns the first document [0]
search('language java'); // Returns both documents [1, 0]
search('language javasc'); // Returns both documents [0, 1]
search('javasc language'); // Returns no documents
```

Given the results, I would say this is a pretty good solution, that follows the principles we've established so far, ranking documents by their relevance to the search term.

## Conclusion

TF-IDF, inverted indexes and now partial matching. This is a pretty good combination of techniques to implement a search engine. I'll let you in on a little secret: they're exactly what I've implemented for the search engine on this website and I'm pretty happy with the results. Give it a try and see for yourself!
