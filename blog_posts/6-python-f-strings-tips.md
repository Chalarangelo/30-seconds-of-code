---
title: 6 Python f-strings tips and tricks
type: story
tags: python,string
authors: chalarangelo
cover: blog_images/sea-view.jpg
excerpt: Python's f-strings can do a lot more than you might expect. Learn a few useful tips and tricks in this quick guide.
firstSeen: 2021-07-20T05:00:00-04:00
---

Python's f-strings provide a more readable, concise and less error-prone way to format strings than traditional string formatting. They are packed with useful features that are sure to come in handy in day-to-day use. Let's take a look at some of them.

### String Interpolation

The most used f-string feature by far is string interpolation. All you need to do is wrap the value or variable in curly braces (`{}`) and you're good to go.

```py
str_val = 'apples'
num_val = 42

print(f'{num_val} {str_val}') # 42 apples
```

### Variable names

Apart from getting a variable's value, you can also get its name alongside the value. This can be especially useful when debugging and can be easily accomplished by adding an equals sign (`=`) after the variable name inside the curly braces.

Bear in mind that whitespace inside the curly braces is taken into account, so adding spaces around the equals sign can make for a more readable result.

```py
str_val = 'apples'
num_val = 42

print(f'{str_val=}, {num_val = }') # str_val='apples', num_val = 42
```

### Mathematical operations

Not syntactically unlike variable names, you can also perform mathematical operations in f-strings. You can place the mathematical expression inside the curly braces and, if you add an equal sign, you'll get the expression and its result.

```py
num_val = 42

print(f'{num_val % 2 = }') # num_val % 2 = 0
```

### Printable representation

Apart from plain string interpolation, you might want to get the printable representation of a value. This is already easy to accomplish using the `repr()` function. f-strings provide a much shorter syntax by appending a `!r` inside the curly braces.

```py
str_val = 'apples'

print(f'{str_val!r}') # 'apples'
```

### Number formatting

Additionally, f-strings can also be used for formatting - hence the **f** in the name. To add formatting to a value you can add a colon (`:`) followed by a format specifier. This can also be combined with the equals sing from before, shall you want to print the name of the variable as well.

Numbers are a great candidate for this. If, for example, you want to trim a numeric value to two digits after the decimal, you can use the `.2f` format specifier.

```py
price_val = 6.12658

print(f'{price_val:.2f}') # 6.13
```

### Date formatting

Finally, dates can also be formatted the same way as numbers, using format specifiers. As usual, `%Y` denotes the full year, `%m` is the month and `%d` is the day of the month.

```py
from datetime import datetime;

date_val = datetime.utcnow()

print(f'{date_val=:%Y-%m-%d}') # date_val=2021-07-09
```
