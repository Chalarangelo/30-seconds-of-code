import {
  mapNumRange
} from './math';

describe('mapNumRange', () => {
  it('maps 5 to the range 0-100 from 0-10', () => {
    expect(mapNumRange(5, 0, 10, 0, 100)).toEqual(50);
  });
});
