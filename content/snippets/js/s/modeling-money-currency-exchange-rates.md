---
title: Modeling money, currencies & exchange rates using JavaScript
shortTitle: Money, currencies & exchange rates
language: javascript
tags: [math,class]
cover: money
excerpt: A deep dive into modeling money, currencies, and exchange rates using JavaScript.
listed: true
dateModified: 2024-04-24
---

Working with money, currencies and exchange rates is pretty common, yet it's no easy task no matter the language. While JavaScript doesn't have a lot of useful features built into it, `Intl` can give us a head start with some parts of the process.

## Modeling currency

The first step in modeling any sort of monetary value is to have a **structure for currency**. Luckily, `Intl` has this problem solved for us. You can use `Intl.NumberFormat` with `style: 'currency'` to get a **formatter** for a specific currency. This formatter can then be used to format a number into a currency string.

> [!NOTE]
>
> We've previously covered [formatting a number into a currency string](/js/s/number-formatting#number-to-currency-string), which might cover some simpler use cases.

### Setting up currency information

In order to retrieve **all supported currencies**, we can use `Intl.supportedValuesOf()` with `'currency'` as the argument. This will return an array of the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) **currency codes** supported by the environment. Then, using `Map()`, `Array.prototype.map()` and `Intl.NumberFormat`, we can create an object for all currencies, that will format values on demand.

```js
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
// Returns a Map object with all currency information
// {
//   'USD': { code: 'USD', format: [Function] },
//   'EUR': { code: 'EUR', format: [Function] },
//   ...
// }
```

Notice how `Object.freeze()` is used to **prevent the object from being modified**. This is important because we don't want to accidentally change the currency information.

### Retrieving currency objects

Having set up all the currency information, we need a way to retrieve it when we need it. Getting the **same currency object for the same currency code** will be important later down the line for comparisons. As we have a `Map` object, we can use `Map.prototype.get()` to retrieve the currency object. As a safeguard, we should ensure the currency code matches the key, using `String.prototype.toUpperCase()`.

```js
const getCurrencyFromCode = code => {
  const isoCode = code.toUpperCase();
  return allCurrencies.get(isoCode);
};

const currency = getCurrencyFromCode('usd');
currency.format('symbol')(1000); // '$1,000.00'
```

We can then create a simple **static class** to handle currency retrieval. Apart from a simple `get()` method, we can also add a `wrap()` method. This method will return the **same currency object if it's passed as an argument**. Otherwise, it will retrieve the currency object using the `get()` method.

```js
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

const usd = Currency.get('usd');
usd.format('symbol')(1000); // '$1,000.00'

const usd2 = Currency.wrap(usd);
usd === usd2; // true
```

## Modeling money

A **monetary value** is simply a data structure that contains **a value and a currency**. Implementing a class for that is fairly simple, using the `Currency` class from before. We can then use the currency object to format the value as needed.

```js
class Money {
  value;
  currency;

  constructor(value, currency) {
    this.value = Number.parseFloat(value);
    this.currency = Currency.wrap(currency);
  }

  format(currencyDisplay = 'symbol') {
    return this.currency.format(currencyDisplay)(this.value);
  }
}

const money = new Money(1000, 'usd');
money.format();       // '$1,000.00'
money.format('code'); // 'USD 1,000.00'
```

> [!WARNING]
>
> This `Money` implementation is fairly **naive**, as the values are stored as **floating point numbers**. This can lead to **precision errors**, especially when performing mathematical operations. You might want to consider more robust numeric representations, if you're using this in a production environment.

### Mathematical operations with money

Performing mathematical operations with money is a bit more complex. We need to ensure that the **currency is the same** for both operands. We'll later cover how to handle exchange rates, but for now, we'll focus on the basic operations.

Oddly enough, **multiplication** and **division** are the low hanging fruits, as you can only multiply or divide by a scalar value. Similarly, the **modulo** and **quotient** operations can be implemented without any additional complexity.

```js
class Money {
  // ...

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
}

const money = new Money(1000, 'usd');
money.multiply(2).format(); // '$2,000.00'
money.divide(2).format();   // '$500.00'
money.div(3).format();      // '$333.00'
money.mod(3).format();      // '$1.00'
```

**Addition** and **subtraction** are the tough ones. We need to ensure that the currency is the same for both operands, which can be done by comparing the currency codes. If it's not, we can throw an error for the time being.

```js
class Money {
  // ...

  add(money) {
    if (this.currency !== money.currency)
      throw new Error('Cannot add money with different currencies');
    return new Money(this.value + money.value, this.currency);
  }

  subtract(money) {
    if (this.currency !== money.currency)
      throw new Error('Cannot subtract money with different currencies');
    return new Money(this.value - money.value, this.currency);
  }
}

const money1 = new Money(1000, 'usd');
const money2 = new Money(500, 'usd');
money1.add(money2).format();      // '$1,500.00'
money1.subtract(money2).format(); // '$500.00'
```

Finally, **equality** and **comparison** operations can be implemented by comparing the values and the currency codes. Again, we'll have to deal with the currency codes being different, but we'll throw an error for now.

```js
class Money {
  // ...

  equals(money) {
    if (this.currency !== money.currency)
      throw new Error('Cannot compare money with different currencies');
    return this.value === money.value;
  }

  greaterThan(money) {
    if (this.currency !== money.currency)
      throw new Error('Cannot compare money with different currencies');
    return this.value > money.value;
  }

  lessThan(money) {
    if (this.currency !== money.currency)
      throw new Error('Cannot compare money with different currencies');
    return this.value < money.value;
  }
}

const money1 = new Money(1000, 'usd');
const money2 = new Money(500, 'usd');
money1.equals(money2);      // false
money1.greaterThan(money2); // true
money1.lessThan(money2);    // false
```

## Modeling exchange rates

An **exchange rate** is simply a **ratio between two currencies**. Instead of modeling it as a class, using a **wrapper object** that contains multiple exchange rates provides more utility. We'll be calling this object a `Bank`.

### Creating a bank

The `Bank` class will contain a `Map` object that maps **currency pairs to exchange rates**. We can add exchange rates using `Map.prototype.set()` and retrieve them using `Map.prototype.get()`. In order to keep things neat and ensure we can pass **either currencies or ISO codes**, we can use the `Currency.wrap()` method from before.

```js
class Bank {
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
}

const bank = new Bank();
bank.setRate('usd', 'eur', 0.85);
bank.getRate('usd', 'eur'); // 0.85
```

### Converting money

Converting money from one currency to another is a matter of **multiplying the value by the exchange rate**. The responsibility for exchanging money is part of the `Bank` class, as it's the one that holds the exchange rates.

```js
class Bank {
  // ...

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

const bank = new Bank();
bank.setRate('usd', 'eur', 0.85);
const money = new Money(1000, 'usd');
bank.exchange(money, 'eur').format(); // '€850.00'
```

### Making money exchangeable

Using the `Bank` class to exchange money works, but it's a lot of work to do every time. The more practical scenario would be to **reference** a `Bank` instance from each `Money` object and use it to exchange money.

```js
class Money {
  value;
  currency;
  bank;

  constructor(value, currency, bank) {
    this.value = Number.parseFloat(value);
    this.currency = Currency.wrap(currency);
    if (!(bank instanceof Bank))
      throw new TypeError(`${bank} is not an instance of Bank`);
    this.bank = bank;
  }

  // ...

  exchangeTo(currency) {
    return this.bank.exchange(this, currency);
  }
}

const bank = new Bank();
bank.setRate('usd', 'eur', 0.85);
const money = new Money(1000, 'usd', bank);
money.exchangeTo('eur').format(); // '€850.00'
```

However, passing the `Bank` instance every time we create a `Money` object is not practical. In most scenarios, you'll only ever have a **single instance**, which can be easily added to the class as a static property. This allows for `Money` instances to **default to the same instance**, making exchanges easier.

```js
class Bank {
  static defaultBank;

  // ...
}

class Money {
  // ...

  constructor(value, currency, bank = Bank.defaultBank) {
    this.value = Number.parseFloat(value);
    this.currency = Currency.wrap(currency);
    if (!(bank instanceof Bank))
      throw new TypeError(`${bank} is not an instance of Bank`);
    this.bank = bank;
  }

  // ...
}

const bank = new Bank();
bank.setRate('usd', 'eur', 0.85);
Bank.defaultBank = bank;

const money = new Money(1000, 'usd');
money.exchangeTo('eur').format(); // '€850.00'
```

> [!TIP]
>
> If you plan on implementing **historical exchange rates**, you can use multiple `Bank` instances, one for each date. This way, you can easily switch between them when needed.

### Mathematical operations with exchange rates

Having set up exchange rates, we can now perform mathematical operations with money in **different currencies**. We need only check if two `Money` objects are in the same currency before performing the operation. If they're not, we can **exchange one of them to the other currency**.

```js
class Money {
  // ...

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

  // ...
}

const bank = new Bank();
bank.setRate('usd', 'eur', 0.85);
bank.setRate('eur', 'usd', 1.18);
Bank.defaultBank = bank;

const money1 = new Money(1000, 'usd');
const money2 = new Money(500, 'eur');
money1.add(money2).format();      // '$1,590.00'
money1.subtract(money2).format(); // '$410.00'
money1.equals(money2);            // false
money1.greaterThan(money2);       // true
money1.lessThan(money2);          // false
```

## Summary

Implementing a **basic structure** for money, currencies and exchange rates is a lot of work, but it's fairly straightforward once you get the basics down. There's plenty of improvements that you can make to this implementation, such as adding more mathematical operations, or handling historical exchange rates. However, this should give you a **good starting point** for any project that requires handling money.

<details>
<summary>View the complete implementation</summary>

```js [Currency.js]
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

```js [Bank.js]
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

```js [Money.js]
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
