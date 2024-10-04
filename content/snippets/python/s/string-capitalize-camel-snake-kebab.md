---
title: Case conversion Python functions
shortTitle: Case conversion
language: python
tags: [string,regexp]
cover: digital-nomad-9
excerpt: Learn how to capitalize, camelcase, snake case, and kebab case strings in Python.
listed: false
dateModified: 2024-08-25
---

## Capitalize string

In order to capitalize the first letter of a string, you can use list slicing and the `str.upper()` method. Then, use `str.join()` to combine the capitalized first letter with the rest of the characters. Omit the `lower_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to lowercase.

```py
def capitalize(s, lower_rest = False):
  return ''.join([s[:1].upper(), (s[1:].lower() if lower_rest else s[1:])])

capitalize('fooBar') # 'FooBar'
capitalize('fooBar', True) # 'Foobar'
```

## Decapitalize string

To decapitalize the first letter of a string, you can use the exact same method as above, but with the `str.lower()` method instead of `str.upper()`.

```py
def decapitalize(s, upper_rest = False):
  return ''.join([s[:1].lower(), (s[1:].upper() if upper_rest else s[1:])])

decapitalize('FooBar') # 'fooBar'
decapitalize('FooBar', True) # 'fOOBAR'
```

## Capitalize every word

To capitalize every word in a string, you can use the `str.title()` method.

```py
def capitalize_every_word(s):
  return s.title()

capitalize_every_word('hello world!') # 'Hello World!'
```

## Camel case string

To convert a string to camel case, you can use `re.sub()` to replace any `-` or `_` with a space, using the regexp `r"(_|-)+"`. Then, use `str.title()` to capitalize every word and convert the rest to lowercase. Finally, use `str.replace()` to remove any spaces between words.

```py
from re import sub

def camel(s):
  s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return ''.join([s[0].lower(), s[1:]])

camel('some_database_field_name') # 'someDatabaseFieldName'
camel('Some label that needs to be camelized')
# 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property') # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens')
# 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

## Kebab case string

To kebab case a string, you'll use the same method as above, except replace `str.title()` with `re.sub()` to match all words in the string and then use `str.lower()` to convert them to lowercase. Finally, use `str.replace()` to replace spaces with `-`.

```py
from re import sub

def kebab(s):
  return '-'.join(
    sub(r"(\s|_|-)+"," ",
    sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: ' ' + mo.group(0).lower(), s)).split())

kebab('camelCase') # 'camel-case'
kebab('some text') # 'some-text'
kebab('some-mixed_string With spaces_underscores-and-hyphens')
# 'some-mixed-string-with-spaces-underscores-and-hyphens'
kebab('AllThe-small Things') # 'all-the-small-things'
```

## Snake case string

To snake case a string, you can use the same method as above, but replace the `-` with `_`.

```py
from re import sub

def snake(s):
  return '_'.join(
    sub('([A-Z][a-z]+)', r' \1',
    sub('([A-Z]+)', r' \1',
    s.replace('-', ' '))).split()).lower()

snake('camelCase') # 'camel_case'
snake('some text') # 'some_text'
snake('some-mixed_string With spaces_underscores-and-hyphens')
# 'some_mixed_string_with_spaces_underscores_and_hyphens'
snake('AllThe-small Things') # 'all_the_small_things'
```
