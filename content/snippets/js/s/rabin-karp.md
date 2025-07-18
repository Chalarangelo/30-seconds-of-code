---
title: Rabin-Karp Algorithm
shortTitle: Rabin-Karp Algorithm
language: javascript
tags: [algorithm,string]
cover: rabin-karp-string
excerpt: Discover how the Rabin-Karp algorithm efficiently matches patterns in strings using rolling hashes, ideal for text search and pattern detection in JavaScript.
listed: true
dateModified: 2025-07-18
---


# Rabin-Karp algorithm for string matching

The Rabin-Karp algorithm efficiently finds a pattern in a text using a rolling hash. It computes the hash of the pattern and compares it with hashes of text substrings, sliding one character at a time. Matching hashes trigger character-by-character checks to avoid collisions. This approach achieves an average time complexity of O(n + m).

## How it works
- Compute the pattern's hash and the first text window's hash.
- Slide the window, updating the hash in constant time.
- Compare hashes; verify matches with character checks.
- Repeat until a match is found or the text ends.

## JavaScript example
Search for a pattern in a text using Rabin-Karp.

```javascript
function rabinKarp(text, pattern) {
  const n = text.length, m = pattern.length;
  const b = 256, q = 101; // Base and modulus
  let patternHash = 0, textHash = 0, h = 1;
  const matches = [];

  // Calculate h = b^(m-1) % q
  for (let i = 0; i < m - 1; i++) h = (h * b) % q;

  // Compute initial hashes
  for (let i = 0; i < m; i++) {
    patternHash = (b * patternHash + pattern.charCodeAt(i)) % q;
    textHash = (b * textHash + text.charCodeAt(i)) % q;
  }

  // Slide window and check for matches
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (pattern[j] !== text[i + j]) { match = false; break; }
      }
      if (match) matches.push(i);
    }
    if (i < n - m) {
      textHash = (b * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (textHash < 0) textHash += q;
    }
  }

  return matches;
}

// Example usage
console.log(rabinKarp("ababc", "abc")); // [2]
```

## Why use it
Rabin-Karp excels in large texts or multiple pattern searches, leveraging rolling hashes for speed. It’s ideal for applications like plagiarism detection or DNA sequence matching, though collisions require careful handling.