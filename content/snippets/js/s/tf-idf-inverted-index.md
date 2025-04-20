---
title: Implementing search in JavaScript, using TF-IDF and an inverted index
shortTitle: TF-IDF and inverted index search
language: javascript
tags: [algorithm,string,regexp]
cover: typewriter
excerpt: Building on top of the Porter stemmer, we'll explore how to use TF-IDF and an inverted index to implement a search algorithm in JavaScript.
listed: true
dateModified: 2025-04-09
journeyId: js/search
---

In the [previous article](/js/s/porter-stemming-algorithm), I went into detail how one could implement the **Porter stemming algorithm** in JavaScript. While the algorithm can be used along with a simple tokenization strategy to search for keywords in a document, it's insufficient for complex searching tasks. In this article, we'll explore how we can use **TF-IDF** for more advanced search tasks and implement an **inverted index** to speed up the search process.

## Tokenization

Before we begin, let's establish a simple **tokenization** strategy. As we're only concerned with plaintext documents, we can use a **regular expression** to split the text into words.

```js
const tokenize = str =>
  str
    .split(/[^a-z0-9\-']+/i)
    .filter(tkn => !tkn.length < 2)
    .map(tkn => tkn.toLowerCase());

const text = 'The quick brown fox jumps over the lazy dog.';
const tokens = tokenize(text);
// ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']
```

All we're doing here is matching characters other than alphanumeric characters, hyphens, and apostrophes and splitting the text into words. We're also filtering out short words and converting all words to lowercase for easier comparison.

## Stopword removal

**Stopwords** are common words that are often filtered out before or after processing of natural language data. These words are usually not relevant for search tasks and can be safely removed. Lists of stopwords are readily available online, but for simplicity, we'll use a small list of common English stopwords.

```js
const removeStopwords = (stopWords, words) =>
  words.filter(tkn => !stopWords.includes(tkn));

const commonStopWords = [
  'a', 'am', 'an', 'are', 'be', 'been', 'being', 'by', 'cannot', 'could',
  'did', 'do', 'does', 'doing', 'for', 'had', 'has', 'have', 'having', 'he',
  'her', 'hers', 'him','his', 'i', 'if', 'is', 'it', 'its', 'me', 'my', 'no',
  'nor', 'of', 'or', 'other', 'our', 'ours', 'she', 'should', 'so', 'such',
  'that', 'the', 'their', 'theirs', 'them', 'then', 'there', 'these', 'they',
  'those', 'too', 'was', 'we', 'were', 'who', 'whom', 'with', 'would', 'you',
  'your', 'yours'
];

const text = 'The quick brown fox jumps over the lazy dog.';
const tokens = tokenize(text);
const filteredTokens = removeStopwords(commonStopWords, tokens);
// ['quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']
```

## Arbitrary search

Having a basic understanding of these steps, we can use the Porter stemmer to stem the words and perform a search. We'll use the Porter stemmer from the previous article and search for the word 'jump'.

```js
// Assuming the `porterStemmer` function is available
import { porterStemmer } from './porterStemmer.js';

const documents = [];

const parseDocument = document => {
  const tokens = tokenize(document);
  const filteredTokens = removeStopwords(commonStopWords, tokens);
  const stemmedTokens = filteredTokens.map(porterStemmer);
  return stemmedTokens;
};

const addDocument = document => {
  const terms = parseDocument(document);
  documents.push(terms);
};

const search = query => {
  const stemmedQuery = porterStemmer(query);
  const results = documents.filter(doc => doc.includes(stemmedQuery));
  return results;
};

addDocument(
  'JavaScript is a programming language, used in programming the web.'
);
addDocument(
  'Python is a high-level programming language, used in data science.'
);
addDocument(
  'CSS is a style sheet language, used in web development.'
);
addDocument(
  'HTML is a markup language, used in web development.'
);

search('javascript'); // Returns the first document [0]
search('language'); // Returns all documents [0, 1, 2, 3]
search('programming language'); // Returns nothing []
search('web'); // Returns the first, third, and fourth document [0, 2, 3]
```

As you can see, using this technique has some limitations. While we can extend it to search for **multiple words**, it's overall not particularly good at **ranking the results**. This is why we'll be exploring a better measure of relevance, TF-IDF.

## TF-IDF

TF-IDF refers to the **term frequency-inverse document frequency**. It is a measurement that is intended to reflect **how important a word is to a document in a collection or corpus**. The TF-IDF value increases **proportionally** to the number of times a word appears in the document and is offset by the frequency of the word in the corpus.

The implementation is straightforward. All we need to add is a `Map` to use as a vocabulary and add the terms found in each document to it. Then, we can calculate the **term frequency (TF)** of a term in a document by dividing the number of times the term appears in the document by the total number of terms in the document.

Similarly, we can calculate the **inverse document frequency (IDF)** of a term by dividing the total number of documents by the number of documents that contain it. Finally, we can calculate the **TF-IDF** of a term in a document by multiplying the two values.

> [!NOTE]
>
> I'm using the **IDF formula with smoothing** in these examples, but you can switch it out for a different formula, if you prefer.

We can then search for documents by tokenizing the given query, then calculating the TF-IDF of each term in each document and summing the values. The documents can then be **sorted by the sum of the TF-IDF values** to get the most relevant documents.

```js
const documents = [];
const vocabulary = new Map();

const addDocument = document => {
  const terms = parseDocument(document);
  documents.push(terms);

  terms.forEach(term => {
    vocabulary.set(term, (vocabulary.get(term) || 0) + 1);
  });
};

const calculateTF = (term, documentIndex) => {
  const docTerms = documents[documentIndex];
  const termCount = docTerms.filter((t) => t === term).length;
  return termCount / docTerms.length;
};

const calculateIDF = term => {
  const totalDocs = documents.length;
  const docsWithTerm = vocabulary.get(term) || 0;

  return Math.log((totalDocs + 1) / (docsWithTerm + 1)) + 1;
};

const calculateTFIDF = (term, documentIndex) =>
  calculateTF(term, documentIndex) * calculateIDF(term);

const search = query => {
  const queryTerms = parseDocument(query);

  return documents
    .reduce((scores, doc, index) => {
      const score = queryTerms.reduce(
        (score, term) => (score += calculateTFIDF(term, index)), 0
      );
      scores.push({ document: index, score });

      return scores;
    }, [])
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
};

// Supposing the documents are the same as before
search('javascript'); // Returns the first document [1]
search('language'); // Returns all documents [0, 3, 1, 2]
search('programming language'); // Returns all documents [0, 3, 1, 2]
search('web'); // Returns the first, third, and fourth document [0, 3, 2]
```

While subtle, in this example you can see the last query returning the documents in a different order. This is a result of ranking the documents by their TF-IDF values, ranking the documents by relevance.

## Inverted index

The TF-IDF implementation is already a significant improvement over the previous search method. However, it can still be slow for large collections of documents. To speed up the search process, we can use an **inverted index**.

An inverted index is a data structure that maps terms to the documents that contain them. This allows us to quickly find documents that contain a given term. We can use a `Map` to store the inverted index, where **the keys are terms** and the values are maps that map document IDs to term frequencies.

Then, we can alter our `search` function to use the inverted index to calculate the TF-IDF values. This way, we can avoid iterating over all documents for each term in the query, significantly **speeding up the search process**.

```js
const documents = [];
const invertedIndex = new Map();

const addDocument = document => {
  const terms = parseDocument(document);
  documents.push(terms);

  terms.forEach(term => {
    if (!invertedIndex.has(term)) invertedIndex.set(term, new Map());

    const docMap = invertedIndex.get(term);
    docMap.set(documents.length - 1, terms.filter((t) => t === term).length);
  });
};

const search = query => {
  const queryTerms = parseDocument(query);
  const scores = documents.reduce((scores, doc, docId) => {
    const score = queryTerms.reduce((score, term) => {
      if (invertedIndex.has(term)) {
        const indexEntry = invertedIndex.get(term).get(docId);
        if (!indexEntry) return score;

        const tf = indexEntry / doc.length;
        const idf =
          Math.log(
            (documents.length + 1) / (invertedIndex.get(term).size + 1)
          ) + 1;
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
search('javascript'); // Returns the first document [0]
search('language'); // Returns all documents [0, 3, 1, 2]
search('programming language'); // Returns all documents [0, 1, 3, 2]
search('web'); // Returns the first, third, and fourth document [0, 3, 2]
```

## Conclusion

That's all for the time being. We've stitched together all the pieces of a simple, yet powerful and performant search algorithm. It's definitely not as powerful as a full-fledged search engine, but it's a good starting point for understanding how search works under the hood and get into natural language processing (NLP).
