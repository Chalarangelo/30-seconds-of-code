import {
  uniqueElements,
  similarity,
  chunk
} from './array';

describe('uniqueElements', () => {
  it('returns the unique elements in an array', () => {
    expect(uniqueElements([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('similarity', () => {
  it('returns an array of elements that appear in both arrays.', () => {
    expect(similarity([1, 2, 3], [1, 2, 4])).toEqual([1, 2]);
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
