import { uniqueElements, insertAt, chunk, sample } from './array';

describe('uniqueElements', () => {
  it('returns the unique elements in an array', () => {
    expect(uniqueElements([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('chunk', () => {
  it('chunks an array with a remainder', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it('chunks an empty array', () => {
    expect(chunk([])).toEqual([]);
  });
});

describe('insertAt', () => {
  it('inserts the element at the given index', () => {
    let arr = [1, 2, 3];
    expect(insertAt(1, 4, arr)).toEqual([1, 2, 4, 3]);
  });
});

describe('sample', () => {
  it('returns a random element from the given array', () => {
    let arr = [1, 2, 3];
    expect(arr.includes(sample(arr))).toBeTruthy();
  });
});
