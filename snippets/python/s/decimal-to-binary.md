---
title: Decimal to Binary Converter
type: snippet
language: python
tags: [string]
cover: rising-sun
dateModified: 2023-08-20T00:00:00-04:00
---

Convert a decimal number to its binary representation.

- Convert a decimal number to binary.
- The binary representation is returned as a string.

```python
def decimal_to_binary(decimal_num):
    """
    Convert a decimal number to its binary representation.
    
    Args:
        decimal_num (int): The decimal number to be converted.
        
    Returns:
        str: The binary representation of the decimal number.
    """
    if decimal_num == 0:
        return '0'
    
    binary = ''
    while decimal_num > 0:
        binary = str(decimal_num % 2) + binary
        decimal_num //= 2
    
    return binary
```

```python
decimal_number = 42
binary_representation = decimal_to_binary(decimal_number)  # 101010
```