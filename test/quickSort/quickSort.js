const quickSort = ([n, ...nums], desc) =>
isNaN(n)
? []
: [
...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
n,
...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
];
 module.exports = quickSort