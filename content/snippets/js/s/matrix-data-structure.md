---
title: Creating a Matrix data structure in JavaScript
shortTitle: Matrix data structure
language: javascript
tags: [class,array]
cover: coffee-branch
excerpt: After working with 2D arrays for a while, I decided to create a convenient wrapper for operations. Here's the gist of it.
listed: true
dateModified: 2025-06-01
---

It's no secret I've been solving a lot of algorithmic problems lately. Many of them involve dynamic programming and **2D arrays**. Unlike other languages, JavaScript's syntax isn't very convenient for working with 2D arrays, or as math people call them, **matrices**. So, I took matters into my own hands and created a class that contains most of the functionality I need.

> [!NOTE]
>
> This implementation is by no means complete. It's a relatively extensive solution that covers a lot of different needs and gives you the basic building blocks. **Feel free to extend it** to your liking.

## Data structure

After fooling around with 1D and 2D arrays, it turns out that the naive approach of a **2D array** is the most efficient, given how it affects the performance of operations. On top of the `data` 2D array, we'll also keep track of the number of **rows** (`rows`) and **columns** (`cols`). This will help us avoid unnecessary calculations when we need to access the dimensions of the matrix.

```js
const matrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

// Matrix {
//   rows: 3, cols: 3,
//   data: [
//     [ 1, 2, 3 ],
//     [ 4, 5, 6 ],
//     [ 7, 8, 9 ]
//   ]
//  }
```

## Initialization

Before we can **initialize the data** in the matrix, we'll need some methods to help us with that. I'm going to add the following for starters:

- `fill`: Fills the matrix with a specific value.
- `copy`: Creates a deep copy of the matrix.

Let's also add some **static initialization methods** to the class, namely:

- `from`: Creates a matrix from the given dimensions (`{ rows, cols }`) & fills it with `0`.
- `zeroes`: Essentially the same as `from`.
- `identity`: Creates an identity matrix of the given size. An **identity matrix** is a square matrix with `1`s on the diagonal and `0`s everywhere else.

@[You may also like](/js/s/initialize-2d-array)

```js
class Matrix {
  constructor(data) {
    if (Array.isArray(data)) {
      this.rows = data.length;
      this.cols = data[0].length;
      this.data = data;
    } else {
      this.rows = data.rows;
      this.cols = data.cols;
      this.fill(0);
    }
  }

  static from({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static zeroes({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static identity({ size }) {
    return new Matrix(
      Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
      )
    );
  }

  fill(value) {
    this.data = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => value)
    );
  }

  copy() {
    return new Matrix(this.data.map(row => row.map(value => value)));
  }
}
```

## Iteration

Iterating over the matrix should be as painless as possible. Taking inspiration from the `Map` native data structure, I opted to add the following methods that return **iterators**:

- `indexes`: Returns an iterator that yields the indexes of the matrix.
- `values`: Returns an iterator that yields the values of the matrix.
- `entries`: Returns an iterator that yields the entries of the matrix.
- `Symbol.iterator`: Returns an iterator that yields the values of the matrix.

@[Quick refresher](/js/s/make-iterable)

```js
class Matrix {
  *indexes() {
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++) yield [i, j];
  }

  *values() {
    yield* this[Symbol.iterator]();
  }

  *entries() {
    for (let [i, j] of this.indexes()) yield [i, j, this.data[i][j]];
  }

  *[Symbol.iterator]() {
    for (let [i, j] of this.indexes()) yield this.data[i][j];
  }
}
```

## Accessing values

Again, drawing inspiration from native data structures, I added some methods to **access the matrix data**, either as single values or as slices. The following methods are available:

- `get`: Returns the value at the given indexes (`i, j`).
- `set`: Sets the value at the given indexes (`i, j`).
- `row`: Returns the row at the given index.
- `col`: Returns the column at the given index.

I also needed to add a `checkIndex` method to check if the given index is inside the matrix bounds. If not, a `RangeError` is thrown.

```js
class Matrix {
  checkIndex(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');
  }

  get(i, j) {
    this.checkIndex(i, j);
    return this.data[i][j];
  }

  set(i, j, value) {
    this.checkIndex(i, j);
    this.data[i][j] = value;
  }

  row(i) {
    this.checkIndex(i, 0);
    return this.data[i];
  }

  col(j) {
    this.checkIndex(0, j);
    return this.data.map(row => row[j]);
  }
}
```

## Math operations

Matrixes are often used for **mathematical operations**, so, naturally, I added a whole lot of them. I will not go into details about each one of them, but an overview will be provided.

### Basic math operations

Basic mathematical operations form the foundation of other matrix operations and are very common in many use cases. We'll add the following methods:

- `add`: Adds two matrices together.
- `subtract`: Subtracts one matrix from another.
- `multiply`: Multiplies two matrices together.
- `multiplyWithScalar`: Multiplies a matrix with a scalar.

> [!TIP]
>
> If you're not familiar with **matrix multiplication**, I recommend reading up on it. It's a bit tricky to understand at first, but once you get the hang of it, it's pretty straightforward.

```js collapse={14-21}
class Matrix {
  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(
      this.data.map((row, i) =>
        row.map((value, j) => value + matrix.data[i][j])
      )
    );
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(
      this.data.map((row, i) =>
        row.map((value, j) => value - matrix.data[i][j])
      )
    );
  }

  multiply(matrix) {
    if (this.cols !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result[i][j] = 0;
        for (let k = 0; k < this.cols; k++) {
          result[i][j] += this.data[i][k] * matrix.data[k][j];
        }
      }
    }

    return new Matrix(result);
  }

  multiplyWithScalar(scalar) {
    return new Matrix(this.data.map(row => row.map(value => value * scalar)));
  }
}
```

### Additional math operations

Mathematical operations form the bulk of a lot of the functionality I've needed in the past, but basic math doesn't cover everything. Some very **common operations** for working with numbers need to be added, too:

- `max` / `maxIndex`/ `maxPerRow` / `maxPerCol`: Return the maximum value in the matrix, the index of the maximum value, the maximum value in each row, and the maximum value in each column, respectively.
- `min` / `minIndex` / `minPerRow` / `minPerCol`: Return the minimum value in the matrix, the index of the minimum value, the minimum value in each row, and the minimum value in each column, respectively.
- `sum` / `sumPerRow` / `sumPerCol`: Return the sum of all values in the matrix, the sum of all values in each row, and the sum of all values in each column, respectively.
- `prod` / `prodPerRow` / `prodPerCol`: Return the product of all values in the matrix, the product of all values in each row, and the product of all values in each column, respectively.
- `mean` / `meanPerRow` / `meanPerCol`: Return the mean of all values in the matrix, the mean of all values in each row, and the mean of all values in each column, respectively.
- `variance` / `variancePerRow` / `variancePerCol`: Return the variance of all values in the matrix, the variance of all values in each row, and the variance of all values in each column, respectively.
- `std` / `stdPerRow` / `stdPerCol`: Return the standard deviation of all values in the matrix, the standard deviation of all values in each row, and the standard deviation of all values in each column, respectively.
- `cumulativeSum` / `cumulativeSumPerRow` / `cumulativeSumPerCol`: Return the cumulative sum of all values in the matrix, the cumulative sum of all values in each row, and the cumulative sum of all values in each column, respectively.
- `cumulativeProd` / `cumulativeProdPerRow` / `cumulativeProdPerCol`: Return the cumulative product of all values in the matrix, the cumulative product of all values in each row, and the cumulative product of all values in each column, respectively.

@[Quick refresher](/js/s/numeric-array-math-operations)

Phew! That's a lot of methods. We'll add them all at once, but I'll make sure to fold the ones that are similar to previous methods for brevity. Feel free to use the clickable expand/collapse feature to see the full code.

```js collapse={41-46,50-59,71-74,86-89,113-119,123-129,157-166,170-179,183-191,195-204,208-218}
class Matrix {
  max() {
    return this.reduce((acc, value) => Math.max(acc, value), this.data[0][0]);
  }

  maxPerRow() {
    return this.data.map(row => Math.max(...row));
  }

  maxPerCol() {
    const result = Array.from({ length: this.cols }, (_, j) => this.data[0][j]);

    for (let [, j, value] of this.entries())
      if (value > result[j]) result[j] = value;

    return result;
  }

  maxIndex() {
    return this.reduce(
      ([maxValue, maxIndex], value, [i, j]) => {
        if (value > maxValue) {
          maxValue = value;
          maxIndex = [i, j];
        }
        return [maxValue, maxIndex];
      },
      [this.data[0][0], [0, 0]]
    )[1];
  }

  min() {
    return this.reduce((acc, value) => Math.min(acc, value), this.data[0][0]);
  }

  minPerRow() {
    return this.data.map(row => Math.min(...row));
  }

  minPerCol() {
    const result = Array.from({ length: this.cols }, (_, j) => this.data[0][j]);

    for (let [, j, value] of this.entries())
      if (value < result[j]) result[j] = value;

    return result;
  }

  minIndex() {
    return this.reduce(
      ([minValue, minIndex], value, [i, j]) => {
        if (value < minValue) {
          minValue = value;
          minIndex = [i, j];
        }
        return [minValue, minIndex];
      },
      [this.data[0][0], [0, 0]]
    )[1];
  }

  sum() {
    return this.reduce((acc, value) => acc + value, 0);
  }

  sumPerRow() {
    return this.data.map(row => row.reduce((acc, value) => acc + value, 0));
  }

  sumPerCol() {
    const result = Array.from({ length: this.cols }, () => 0);
    for (let [, j, value] of this.entries()) result[j] += value;

    return result;
  }

  prod() {
    return this.reduce((acc, value) => acc * value, 1);
  }

  prodPerRow() {
    return this.data.map(row => row.reduce((acc, value) => acc * value, 1));
  }

  prodPerCol() {
    const result = Array.from({ length: this.cols }, () => 1);
    for (let [, j, value] of this.entries()) result[j] *= value;

    return result;
  }

  mean() {
    return this.sum() / (this.rows * this.cols);
  }

  meanPerRow() {
    return this.sumPerRow().map(sum => sum / this.cols);
  }

  meanPerCol() {
    return this.sumPerCol().map(sum => sum / this.rows);
  }

  variance() {
    const mean = this.mean();
    return (
      this.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) /
      (this.rows * this.cols)
    );
  }

  variancePerRow() {
    return this.meanPerRow().map(
      (mean, i) =>
        this.data[i].reduce(
          (acc, value) => acc + Math.pow(value - mean, 2),
          0
        ) / this.cols
    );
  }

  variancePerCol() {
    return this.meanPerCol().map((mean, j) => {
      let sum = 0;
      for (let i = 0; i < this.rows; i++) {
        sum += Math.pow(this.data[i][j] - mean, 2);
      }
      return sum / this.rows;
    });
  }

  std() {
    return Math.sqrt(this.variance());
  }

  stdPerRow() {
    return this.variancePerRow().map(variance => Math.sqrt(variance));
  }

  stdPerCol() {
    return this.variancePerCol().map(variance => Math.sqrt(variance));
  }

  cumulativeSum() {
    const result = Array.from({ length: this.rows }, () => []);
    let lastValue = 0;

    for (let [i, j, value] of this.entries()) {
      lastValue += value;
      result[i][j] = lastValue;
    }

    return new Matrix(result);
  }

  cumulativeSumPerRow() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
      let lastValue = 0;
      for (let j = 0; j < this.cols; j++) {
        lastValue += this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeSumPerCol() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let j = 0; j < this.cols; j++) {
      let lastValue = 0;
      for (let i = 0; i < this.rows; i++) {
        lastValue += this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeProd() {
    const result = Array.from({ length: this.rows }, () => []);
    let lastValue = 1;

    for (let [i, j, value] of this.entries()) {
      lastValue *= value;
      result[i][j] = lastValue;
    }

    return new Matrix(result);
  }

  cumulativeProdPerRow() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
      let lastValue = 1;
      for (let j = 0; j < this.cols; j++) {
        lastValue *= this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeProdPerCol() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let j = 0; j < this.cols; j++) {
      let lastValue = 1;
      for (let i = 0; i < this.rows; i++) {
        lastValue *= this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }
}
```

## Matrix operations

Matrix operations are a bit more complex and, quite frankly, I only understand the very basics of them. So, that's what I've implemented so far.

### Transpose

The **transpose** of a matrix is a new matrix whose rows are the columns of the original matrix. This is a very common operation in linear algebra and is often used in machine learning and data science.

@[Quick refresher](/js/s/transpose-matrix)

```js
class Matrix {
  transpose() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.cols; i++)
      for (let j = 0; j < this.rows; j++) result[i][j] = this.data[j][i];

    return new Matrix(result);
  }
}
```

### Diagonal & trace

The **diagonal** of a matrix is a 1D vector that contains the elements of the matrix that are on the diagonal. Similarly, the **trace** of a matrix is the sum of the elements on the diagonal. Both are pretty common in many areas of programming.

```js collapse={11-14}
class Matrix {
  diagonal() {
    const result = [];
    const size = Math.min(this.rows, this.cols);
    for (let i = 0; i < size; i++) result[i] = this.data[i][i];

    return result;
  }

  trace() {
    if (this.rows !== this.cols)
      throw new Error('Matrix must be square to calculate trace');

    return this.diagonal().reduce((acc, value) => acc + value, 0);
  }
}
```

### Determinant & submatrices

The **determinant** of a matrix is a scalar value that can be calculated from the elements of a square matrix. It is a very important concept in linear algebra, but it takes a little bit of work to implement.

In order to calculate it, we need to use recursion and the concept of minors. I'm not going to dive into any of these topics here, but you can find more resources online.

@[Quick refresher](/js/recursion)

The methods we're adding are:

- `minorSubmatrix`: Calculates the minor submatrix of the matrix, meaning the matrix that remains after removing the specified row and column.
- `determinant`: Calculates the determinant of the matrix.
- `submatrix`: Calculates the submatrix of the matrix, if we keep columns and rows within the given ranges. This is not explicitly needed for the determinant, but it's a good helper method to have.

```js collapse={3-15,19-28,32-49}
class Matrix {
  minorSubmatrix(row, col) {
    const result = [];

    for (let i = 0; i < this.rows; i++) {
      if (i === row) continue;
      const newRow = [];
      for (let j = 0; j < this.cols; j++) {
        if (j === col) continue;
        newRow.push(this.data[i][j]);
      }
      result.push(newRow);
    }

    return new Matrix(result);
  }

  submatrix(rowStart, colStart, rowEnd, colEnd) {
    const result = [];

    for (let i = rowStart; i <= rowEnd; i++) {
      const newRow = [];
      for (let j = colStart; j <= colEnd; j++) newRow.push(this.data[i][j]);

      result.push(newRow);
    }

    return new Matrix(result);
  }

  determinant() {
    if (this.rows !== this.cols)
      throw new Error('Matrix must be square to calculate determinant');

    if (this.rows === 1) return this.data[0][0];

    if (this.rows === 2)
      return (
        this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
      );

    let det = 0;

    for (let j = 0; j < this.cols; j++) {
      const minor = this.minorSubmatrix(0, j);
      det += (j % 2 === 0 ? 1 : -1) * this.data[0][j] * minor.determinant();
    }

    return det;
  }
}
```

## Predicate matching

Native JavaScript arrays have a lot of methods for **matching values**, such as `find`, `some`, `every`, and so on. The same behavior is easy enough to implement for our matrix class, so let's add the following methods:

- `every` / `some`: Check if all or some values in the matrix match the given predicate.
- `find` / `findIndex` / `findLast` / `findLastIndex`: Find the first or last value in the matrix that matches the given predicate, or the index of that value.
- `includes`: Check if the matrix includes a value.
- `indexOf`/ `lastIndexOf`: Find the first or last index of a value in the matrix.

```js collapse={10-13,17-20,24-27,31-35,39-43,59-63}
class Matrix {
  every(callback) {
    for (let [i, j, value] of this.entries())
      if (!callback(value, [i, j], this)) return false;

    return true;
  }

  some(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return true;

    return false;
  }

  find(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return value;

    return undefined;
  }

  findIndex(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return [i, j];

    return undefined;
  }

  findLast(callback) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (callback(this.data[i][j], [i, j], this)) return this.data[i][j];

    return undefined;
  }

  findLastIndex(callback) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (callback(this.data[i][j], [i, j], this)) return [i, j];

    return undefined;
  }

  includes(value) {
    for (let val of this) if (val === value) return true;

    return false;
  }

  indexOf(value) {
    for (let [i, j, val] of this.entries()) if (val === value) return [i, j];

    return undefined;
  }

  lastIndexOf(value) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (this.data[i][j] === value) return [i, j];

    return undefined;
  }
}
```

## Other array operations

Native JavaScript arrays have, after ES6, a whole host of useful methods for **manipulating their data**. Naturally, these are very useful in a matrix context, too.

### Mapping & reducing

It goes without saying that the most useful methods in arrays are `map`, `reduce`, `reduceRight` and `forEach`. Thus, we'll add them to our matrix class, too.

```js collapse={26-32}
class Matrix {
  forEach(callback) {
    for (let [i, j, value] of this.entries()) callback(value, [i, j], this);
  }

  map(callback) {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[i][j] = callback(this.data[i][j], [i, j], this);

    return new Matrix(result);
  }

  reduce(callback, initialValue) {
    let accumulator = initialValue;

    for (let [i, j, value] of this.entries())
      accumulator = callback(accumulator, value, [i, j], this);

    return accumulator;
  }

  reduceRight(callback, initialValue) {
    let accumulator = initialValue;

    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        accumulator = callback(accumulator, this.data[i][j], [i, j], this);

    return accumulator;
  }
}
```

### Flattening

**Flattening** a matrix is pretty simple as, in essence, it's just a 2D array. Naturally, `flat` and `flatMap` are pretty easy to implement.

```js
class Matrix {
  flat() {
    return this.data.flat(2);
  }

  flatMap(callback) {
    return this.map(callback).flat();
  }
}
```

### Filtering

**Filtering** a matrix can be done a few different ways. From regular filtering, similar to arrays, to using a **mask matrix/2D array**, there are a few methods we can add:

- `mask`: Filter the matrix using a mask matrix. Filtered values are replaces with `0`.
- `filter`: Filter the matrix using a predicate function. Filtered values are replaced with holes (`undefined`).
- `filterNonZero`: Replace `0` values with holes (`undefined`).
- `findMatches`: Filter the matrix using a predicate function and return a 1D vector of the matching values.
- `findIndexOfMatches`: Filter the matrix using a predicate function and return a 1D vector of the indexes of the matching values.

Notice that all of these methods are not in-place, meaning they **return a new matrix** with the filtered values. This is important to keep in mind when using them.

```js collapse={3-10,42-45}
class Matrix {
  mask(maskValue) {
    if (Array.isArray(maskValue)) {
      if (this.rows !== maskValue.length || this.cols !== maskValue[0].length)
        throw new Error('Matrix dimensions do not match');
    } else if (maskValue instanceof Matrix) {
      if (this.rows !== maskValue.rows || this.cols !== maskValue.cols)
        throw new Error('Matrix dimensions do not match');
    } else if (typeof maskValue !== 'function')
      throw new TypeError('Mask value must be a function or a matrix');

    const getMaskAt =
      typeof maskValue === 'function'
        ? maskValue
        : Array.isArray(maskValue)
          ? (_, [i, j]) => maskValue[i][j]
          : (_, [i, j]) => maskValue.data[i][j];

    return this.map((value, [i, j]) =>
      getMaskAt(value, [i, j], this) ? value : 0
    );
  }

  filter(callback) {
    return this.map((value, [i, j]) =>
      callback(value, [i, j], this) ? value : undefined
    );
  }

  filterNonZero() {
    return this.map(value => (value !== 0 ? value : undefined));
  }

  findMatches(callback) {
    return this.reduce((acc, value, [i, j]) => {
      if (callback(value, [i, j], this)) acc.push(value);
      return acc;
    }, []);
  }

  findIndexOfMatches(callback) {
    return this.reduce((acc, value, [i, j]) => {
      if (callback(value, [i, j], this)) acc.push([i, j]);
      return acc;
    }, []);
  }
}
```

## Matrix transformations

Apart from operating on the data in the matrix, we also need to be able to **transform** it in various ways. This is a very common need when working with, say, images or graphics.

### Flipping

**Flipping** a matrix horizontally or vertically is exactly what it sounds like - rotating the matrix around the x or y axis.

```js
class Matrix {
  flipHorizontal() {
    const result = this.data.map(row => row.toReversed());
    return new Matrix(result);
  }

  flipVertical() {
    const result = this.data.toReversed().map(row => [...row]);
    return new Matrix(result);
  }
}
```

### Rotation

**Rotating** the matrix clockwise and counterclockwise is a little more involved, but still pretty straightforward. We don't need any more rotations than just these two, as we can always rotate more than once to get the desired result.

```js collapse={13-19}
class Matrix {
  rotateClockwise() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[j][this.rows - i - 1] = this.data[i][j];

    return new Matrix(result);
  }

  rotateCounterClockwise() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[this.cols - j - 1][i] = this.data[i][j];

    return new Matrix(result);
  }
}
```

### Merging

**Merging** a matrix to the original one should also be included, as this way we can easily combine matrices together.

```js
class Matrix {
  mergeCols(matrix) {
    if (this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(this.data.concat(matrix.data));
  }

  mergeRows(matrix) {
    if (this.rows !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(this.data.map((row, i) => row.concat(matrix.data[i])));
  }
}
```

### Expanding

Finally, we may want to **expand** a matrix to a larger size, either horizontally or vertically. This is essentially merging the matrix with a new one, filled with `0`s.

```js collapse={10-14}
class Matrix {
  expandRows(rows, fillValue = 0) {
    const newRows = new Matrix({ rows, cols: this.cols });
    newRows.fill(fillValue);

    return this.mergeCols(newRows);
  }

  expandCols(cols, fillValue = 0) {
    const newCols = new Matrix({ rows: this.rows, cols });
    newCols.fill(fillValue);

    return this.mergeRows(newCols);
  }
}
```

## Serialization & deserialization

Finally, we can add some utility methods for **serializing and deserializing** the matrix. We'll only implement JSON and string serialization, but CSV should be easy enough to implement, too.

```js
class Matrix {
  toString() {
    return this.data.toString();
  }

  toLocaleString() {
    return this.data.toLocaleString();
  }

  toJSON() {
    return JSON.stringify(this.data);
  }

  static fromJSON(json) {
    return new Matrix(JSON.parse(json));
  }
}
```

## Conclusion

And that's it! A ton of work and code went into this one, but I think it was worth it. I hope you find this class useful in your projects. You can find the **full source code and tests** in the [dedicated GitHub repository](https://github.com/Chalarangelo/matrix-playground/blob/master/src/matrix.js).
