var stableSort = (arr, compare) =>
arr
.map((item, index) => ({ item, index }))
.sort((a, b) =>
((result = compare(a.item, b.item)) => (result !== 0 ? result : a.index - b.index))()
)
.map(({ item }) => item);
module.exports = stableSort;