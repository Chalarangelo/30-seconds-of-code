const{incrementAllBy} = require('./_30s.js');

test('incrementAllBy is a function', () => {
    expect(incrementAllBy).toBeInstanceOf(Function);
});
test('[1, 2, 3] increment without argument gives [2, 3, 4]', () => {
    expect(incrementAllBy([1, 2, 3])).toEqual([2, 3, 4]);
});
test('[1, 2, 3] increment by 2 gives [3, 4, 5]', () => {
    expect(incrementAllBy([1, 2, 3], 2)).toEqual([2, 3, 4]);
});