---
title: This is a test snippet, in JavaScript
language: javascript
tags: [link]
cover: do-more-computer
excerpt: This is a test snippet, do not publish it!
listed: false
dateModified: 2100-12-31
---

This is a **test** snippet. It is intended to provide a centralized place to _test_ all sorts of markdown content that one could produce in a post. It is not intended to be published. Always make sure the `dateModified` is in the far, far future.

## Headings

Supported heading levels are between `2` and `4` (inclusive). Level `1` is reserved for the post title.

## This is a level 2 heading with `some code`

In order to better test headings, we need to make sure that we have a lot of text here. The spacing between headings and paragraphs is imperative to get right.

### This is a level 3 heading with `some code`

- Lists might end up appearing right after a heading.
- We want to make sure they look correct, too.

#### This is a level 4 heading with `some code`

```html
<h4>Didn't see this one coming, huh?</h4>
```

This was a good opportunity to test what a code block would look like right after a heading. Hope it looks good!

## Links

Links come in all shapes and sizes. They are often in the form of an automatically generated reference, such as `Array.from()`.

Other times, they might be plain text linking to an internal resource, such as [this link](/demo/s/test-snippet).

And some other times, you might get a mixed content link, such as a link for the [modulo operator(`%`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder), which needs to be carefully styled to make sure it looks good.

However unlikely, it doesn't hurt to test for [`inline code block links that might break to a new line`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break) to make sure they render nicely.

## Code

**Code** is a key element in a website called _30 seconds of code_. Sometimes, it's `inline`, other times it's not. You might also have a key like <kbd>Cmd</kbd> in the text.

### Single code block, with a language

```js
// First we need to make sure lines that are 80 characters long fit snugly here.
const aFunction = (a, b = 2) => {
  if (a === b) return b;
  const c = a * b;
  const d = a > b ? `${a} is larger` : `${a} is smaller`;
  const e = 'something';
  return [e, { c, d }];
};
```

### Three consecutive code blocks, in different languages

```html
<div class="something">
  <p>Some text</p>
</div>
```

```css
.something {
  display: flex;
  flex-direction: column;
}
```

```js
const element = document.querySelector('.something');

if (element.innerText.match(/some text/gi)) {
  element.classList.add('some-class');
}
```

### Very long token

```js
// This is some long code that can't wrap on mobile
const thisIsAnExtremelyLongVariableNameJustForTestingIHopeINeverDoThisInRealLifeBecauseItIsTerrible = 'this is a test';
```

### Single code block, without a language

```
This is a code block without a language. It doesn't appear very often, yet it's important to make sure it looks good.

Let's also ensure lines wrap on their, as needed. Might come in handy!
```

### Titles

```js title="This is a title"
const x = 'this is a title';
```

#### Without language

```text title="No language"
No languge here
```

### CSS code with swatches

```css
.my-element {
  color: #ff0000;
  boder: 1px solid #00ff00;
  background-color: linear-gradient(to right, #0000ff 0%, #00ffff 50%);
}
```

### Highlighted lines

Regular:

```js {1} {3-4}
const x = 10;
x += 5;
const y = 20;
console.log(x + y);
```

With labels:

```js {"A":1} {"B":3-4}
const x = 10;
x += 5;
const y = 20;
console.log(x + y);
```

With longer labels:

```js {"A":1} {"B. This is a fairly long label and it needs its own line:":3-5}
const x = 10;
x += 5;

const y = 20;
console.log(x + y);
```

Inserted and deleted:

```js ins={2} del={1}
const x = 10;
const x = 20;
const y = 5;
console.log(x + y);
```

Inserted and deleted with labels:

```js ins={"A":2} del={"A":1}
const x = 10;
const x = 20;
const y = 5;
console.log(x + y);
```

### Collapsed lines

```js collapse={1-3}
const add = (a, b) => {
  return a + b;
};

const add = (a, b) => {
  return a + b;
};

add(1, 2);
```

## Other elements

There's a few more elements and some cases we should cover just to be safe.

### Image illustrations

![Diagram of Flexbox properties](./illustrations/flexbox-diagram.svg)

### Blockquotes

> This is a blockquote by some not-so-famous person. It's important to make sure it looks good, too. Let's also throw in a tiny bit of `code` for good measure.

> And this is a multi-paragraph blockquote.
>
> Notice how it's a little different.

### Horizontal rules

Apart from text, there are also horizontal rules.

---

We don't use them all that often, but you can see one above.

### Special inline elements

Some other elements appear less frequently. Namely there's <small>small text</small>, which is relatively uncommon, exponents that look like <sup>this</sup> and this weird <sub>sub thing</sub> that we don't really use anywhere.

### Tables

Tables are quite special and they may be used in a few places. Let's make sure they look great.

|    | Cookies | Local storage | Session storage |
| -- | -- | -- | -- |
| **Capacity** | 4KB | 10MB | 5MB |
| **Accessible from** | Any window | Any window | Same tab |
| **Expiration** | Manually set | Never | On tab close |
| **Storage location** | Browser and server | Browser only | Browser only |
| **Sent with requests** | Yes | No | No |
| **Blockable by users** | Yes | Yes | Yes |
| **Editable by users** | Yes | Yes | Yes |

### Lists

Somehow, we forgot about lists, but they are something we use a ton.

- This is a list item
- Part of an unordered list
- That has a few items
  - Sometimes we have sub-items
  - That are also unordered
- And we can go back to the main list

1. This is a list item
2. Part of an ordered list
3. That has a few items
   1. Sometimes we have sub-items
   2. That are also ordered
4. And we can go back to the main list

### Admonitions

> [!NOTE]
>
> Useful information that users should know, even when skimming content.

> [!TIP]
>
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
>
> Key information users need to know to achieve their goal.

> [!WARNING]
>
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
>
> Advises about risks or negative outcomes of certain actions.

> [!NOTE]
>
> A more complex admonition.
>
> This one has a few paragraphs.
> It also has some **strong** text.
>
> ```js
> const and = 'some code';
> ```

### Embedded content

#### CodePen embeds

https://codepen.io/chalarangelo/pen/mdodgeL

#### Article embeds

@[Won't render](/demo/s/test-snippet)

@[Suggested reading](/js/s/immutable-object-proxy)

@[Further reading](/js/proxy/p/1)

@[You may also like](/js/array)

@[Quick refresher](/js/s/string-case-conversion#convert-any-case-to-kebab-case)

### Custom components

#### Step visualizer

<step-visualizer>
  <script data-attribute-name="labels" type="application/json">
    [
      "First step",
      "Second step",
      "Third & final step"
    ]
  </script>

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | P → • S      | 0      | start rule                  |
| 2         | S → • S + M  | 0      | predict from (1)            |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | T → number • | 0      | scan from S(0)(6)           |
| 2         | M → T •      | 0      | complete from (1) & S(0)(5) |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | S → S + • M  | 0      | scan from S(1)(5)           |
| 2         | M → • M * T  | 2      | predict from (1)            |

</step-visualizer>

#### Code tabs

<code-tabs>
<details>
<summary>View the complete implementation</summary>

```js title="Currency.js"
const isoCodes = Intl.supportedValuesOf('currency');

const currencyFields = ['symbol', 'narrowSymbol', 'name'];

const allCurrencies = new Map(
  isoCodes.map(code => {
    const format = currencyDisplay => value =>
      Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: code,
        currencyDisplay,
      })
        .format(value)
        .trim();
    return [code, Object.freeze({ code, format })];
  })
);

const getCurrencyFromCode = code => {
  const isoCode = code.toUpperCase();
  return allCurrencies.get(isoCode);
};

class Currency {
  static get(code) {
    const currency = getCurrencyFromCode(code);
    if (!currency)
      throw new RangeError(`Invalid currency ISO code "${code}"`);
    return currency;
  }

  static wrap(currency) {
    if (
      typeof currency === 'object' &&
      getCurrencyFromCode(currency.code) === currency
    )
      return currency;

    return Currency.get(currency);
  }
}
```

```js title="Bank.js"
class Bank {
  static defaultBank;

  exchangeRates;

  constructor() {
    this.exchangeRates = new Map();
  }

  setRate(from, to, rate) {
    const fromCurrency = Currency.wrap(from);
    const toCurrency = Currency.wrap(to);
    const exchangeRate = Number.parseFloat(rate);

    this.exchangeRates.set(
      `${fromCurrency.code} -> ${toCurrency.code}`,
      exchangeRate
    );

    return this;
  }

  getRate(from, to) {
    const fromCurrency = Currency.wrap(from);
    const toCurrency = Currency.wrap(to);

    return this.exchangeRates.get(
      `${fromCurrency.code} -> ${toCurrency.code}`
    );
  }

  exchange(money, to) {
    if (!(money instanceof Money))
      throw new TypeError(`${money} is not an instance of Money`);

    const toCurrency = Currency.wrap(to);
    if (toCurrency === money.currency) return money;

    const exchangeRate = this.getRate(money.currency, toCurrency);
    if (!exchangeRate)
      throw new TypeError(
        `No exchange rate found for ${money.currency.code} to ${toCurrency.code}`
      );
    return new Money(money.value * exchangeRate, toCurrency);
  }
}
```

```js title="Money.js"
class Money {
  value;
  currency;
  bank;

  constructor(value, currency, bank = Bank.defaultBank) {
    this.value = Number.parseFloat(value);
    this.currency = Currency.wrap(currency);
    if (!(bank instanceof Bank))
      throw new TypeError(`${bank} is not an instance of Bank`);
    this.bank = bank;
  }

  format(currencyDisplay = 'symbol') {
    return this.currency.format(currencyDisplay)(this.value);
  }

  exchangeTo(currency) {
    return this.bank.exchange(this, currency);
  }

  add(money) {
    if (this.currency !== money.currency)
      money = money.exchangeTo(this.currency);
    return new Money(this.value + money.value, this.currency);
  }

  subtract(money) {
    if (this.currency !== money.currency)
      money = money.exchangeTo(this.currency);
    return new Money(this.value - money.value, this.currency);
  }

  multiply(num) {
    return new Money(this.value * num, this.currency);
  }

  divide(num) {
    return new Money(this.value / num, this.currency);
  }

  div(num) {
    return new Money(Math.floor(this.value / num), this.currency);
  }

  mod(num) {
    return new Money(this.value % num, this.currency);
  }

  divmod(num) {
    return [this.div(num), this.mod(num)];
  }

  equals(money) {
    if (this.currency !== money.currency)
      money = money.exchangeTo(this.currency);
    return this.value === money.value;
  }

  greaterThan(money) {
    if (this.currency !== money.currency)
      money = money.exchangeTo(this.currency);
    return this.value > money.value;
  }

  lessThan(money) {
    if (this.currency !== money.currency)
      money = money.exchangeTo(this.currency);
    return this.value < money.value;
  }
}
```

</details>
</code-tabs>

#### LaTex expressions

<latex-expression>

```math
r = \frac{d \times \pi}{180}
```

</latex-expression>

<latex-expression>

<figure>

```math
d = 2 \times r \times \arcsin\left(\sqrt{\sin^2\left(\frac{d\phi}{2}\right) + \cos(\phi_1) \cdot \cos(\phi_2) \cdot \sin^2\left(\frac{d\lambda}{2}\right)}\right)
```

</figure>

Where:
- `d` is the distance between the two points
- `r` is the radius of the Earth
- `φ1` and `φ2` are the latitudes of the two points in radians
- `dφ` is the difference in latitude between the two points
- `dλ` is the difference in longitude between the two points

</latex-expression>

<latex-expression>

```math
d^2 = x^2 + y^2 \\
x = x_2 - x_1\\
y = y_2 - y_1\\
d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 \\
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
```

</latex-expression>

<latex-expression>

```math
gcd(a, b) = \begin{cases}
\text{a} & \text{if } b = 0 \\
gcd(b, a \mod b) & \text{otherwise}
\end{cases}
```

</latex-expression>

#### Baseline status

As the imported module defines its own `baseline-status` component, we will name ours `baseline-support`. You can check [here](https://github.com/web-platform-dx/web-features) to find the `featureId` value you need.

<baseline-support featureId="font-size-adjust">
</baseline-support>


