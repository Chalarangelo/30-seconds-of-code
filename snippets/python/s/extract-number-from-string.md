---
title: Extract number(s) from string
type: snippet
language: python
tags: [string,regexp]
cover: succulent-10
dateModified: 2023-09-16T05:00:00-04:00
---
Extracts number(s) from a string. Returns all numbers present in a string as float in a list.

- Uses regex to find all numbers.
- **re.findall()** function is used to find all numeric values in the input string '**text**'
- The regular expression **r'\d+\.\d+|\d+'** matches both floating-point numbers (e.g., 25.99) and integers (e.g., 19).
- The extracted numbers are initially stored as strings. This can be converted to numeric types (e.g., float or int) based on requirements.

```py
def extract_numbers(text):
  numbers = re.findall(r'\d+\.\d+|\d+', text)
  # Convert the extracted strings to float if needed
  numbers = [float(number) for number in numbers]
  return numbers
  
```

```py
extract_numbers("The price of the products are $25.99 and $19.95.") # [25.99, 19.95]
```
