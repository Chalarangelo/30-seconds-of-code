---
title: Reverse vowels of a string
type: snippet
language: python
tags: [string]
cover: dark-mode
dateModified: 2023-09-05T20:48:17+05:00
---

Takes a string as input and reverses the positions of vowels. The positions of consonants remains unchanged.

- The input string is converted into a list of characters for easier manipulation
- The code defines a function called isvowel(ch) to check if a character 'ch' is a vowel. It returns True if 'ch' is a vowel and False otherwise.
- Two pointers, left and right, are initialized at the beginning and end of the string, respectively.
- Inside the loop, left pointer advances while checking if the character at that position is not a vowel.
- Similarly, right pointer moves backward while checking if the character at that position is not a vowel.
- When both pointers are pointing at vowels (or left has crossed right), it swaps the positions of the vowels.
- After swapping, it increments left and decrements right to continue checking and swapping other pairs of vowels until left and right cross each other.
- Finally, it returns the modified string.

```py
def reverseVowels(s):
        s=list(s)
        def isvowel(ch):
            return ch in "aeiouAEIOU"
			
        left, right = 0, len(s)-1
        while(left<right):
            while (not isvowel(s[left])) and left<right :
                left+=1
				
            while (not isvowel(s[right])) and left<right :
                right-=1
				
            s[left],s[right]=s[right],s[left]
            left+=1
            right-=1
			
        return ''.join(s)
```

```py
reverseVowels('hello') #'holle'
```
