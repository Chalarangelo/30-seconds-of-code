---
title: How can I find the longest palindromic substring in a JavaScript string?
shortTitle: Longest palindromic substring
language: javascript
tags: [string,algorithm]
cover: flower-portrait-8
excerpt: While a brute-force longest palindrome finder is simple, it is not efficient. Let's explore a more efficient solution.
listed: true
dateModified: 2025-06-23
---

A palindrome is **a string that reads the same backward as forward**. For example, `'racecar'`, `'abba'` and `'level'` are palindromes. The longest palindromic substring is the longest contiguous substring of a given string that is also a palindrome.

> [!IMPORTANT]
>
> This article is meant as a way to **explore ways of thinking and algorithmic techniques**, so readers can apply them to various problems. If you're looking for the best solution to this problem, I suggest you check out [Manacher's algorithm](https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher's_algorithm), which is not explored here.

## Palindrome check

Checking for a palindrome is straightforward. We can simply **reverse the string** and check if it is equal to the original string. Here's a simple implementation:

```js
const isPalindrome = str => {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
};

isPalindrome('racecar');  // true
isPalindrome('abba');     // true
isPalindrome('hello');    // false
```

## Brute-force solution

Given the previous check, a **brute-force solution** would be to **check every possible substring** of the input string and see if it is a palindrome. While inefficient, this approach showcases a **two-pointer technique** that may be useful in similar problems.

We start at the beginning the string, keeping **two pointers**: the left pointer points at the start of the substring and the right pointer at the end. We then **check if the substring is a palindrome**. If it is, we compare the length of the current substring with the longest palindrome found so far. If it is longer, we update our longest palindrome.

When the right pointer reaches the end of the string, we move the left pointer one position to the right and **repeat the process** until we reach the end of the string.

```js
const longestPalindrome = str => {
  let best = { length: 0, value: '' };

  for (let l = 0; l < str.length; l++)
    for (let r = l + best.length; r < str.length; r++) {
      const current = { length: r - l, value: str.slice(l, r + 1) };
      if (!isPalindrome(current.value)) continue;
      if (current.length < best.length) continue;
      best = current;
    }

  return best.value;
};

longestPalindrome('babad'); // 'bab' or 'aba'
longestPalindrome('cbbd'); // 'bb'
```

This solution has a **time complexity** of `O(n^3)`, which is definitely not the best we can do. Let's look into a more efficient solution.

## Expanding around the center

Before I reveal a more efficient solution to the whole problem, I'd like to take a moment to find a **more efficient way to check if a string is a palindrome**.

Instead of reversing the string, we can **find its center** and expand outwards. Each iteration, we'll only **compare two characters**. If they are equal, we **expand outwards** until we reach the end of the string or find a mismatch.

```js
const expandAroundCenter = (str, left, right) => {
  while (left >= 0 && right < str.length && str[left] === str[right])
    left--, right++;
  return { left: left + 1, right: right - 1, length: right - left - 1 };
};

const isPalindrome = str => {
  const isEvenLength = str.length % 2 === 0;
  const centerPoints = isEvenLength ?
    [str.length / 2 - 1, str.length / 2] :
    [Math.floor(str.length / 2), Math.floor(str.length / 2)];
  const maxPalindrome = expandAroundCenter(str, ...centerPoints);
  return maxPalindrome.length === str.length
};

isPalindrome('racecar');  // true
isPalindrome('abba');     // true
isPalindrome('hello');    // false
```

## Efficient solution

Using the previous expansion technique, we can thus **iterate over the string** and check for palindromes. For each position, we'll check for both **even and odd length palindromes**. The longest palindrome found will be our answer.

```js
const expandAroundCenter = (str, left, right) => {
  while (left >= 0 && right < str.length && str[left] === str[right])
    left--, right++;
  return { left: left + 1, right: right - 1, length: right - left - 1 };
};

const longestPalindrome = str => {
  let best = { left: 0, right: 0, length: 0 };

  for (let i = 0; i < str.length; i++) {
    const currentOdd = expandAroundCenter(str, i, i);
    if (currentOdd.length > best.length)
      best = currentOdd;

    const currentEven = expandAroundCenter(str, i, i + 1);
    if (currentEven.length > best.length)
      best = currentEven;
  }

  return str.slice(best.left, best.right + 1);
};

longestPalindrome('babad'); // 'bab' or 'aba'
longestPalindrome('cbbd'); // 'bb'
```

_Is this more efficient than the previous solution?_ Absolutely! We've reduced the **time complexity** to `O(n^2)`, a significant improvement. It's not the best we can do, but we'll need specialized algorithms to achieve a better time complexity and, quite frankly, I don't really think there's a lot of value to gain from exploring them at this point.

## Conclusion

We've seen how thinking through a solution thoroughly and using stepping stones can lead us to a more refined and efficient solution without needing to resort to extremely specialized algorithms. I hope I did the two-pointer technique justice, as it's used to solve a whole class of problems, and that the explanation for the expansion technique can be applied to other problems as well. See you next time! 🧑‍🚀
