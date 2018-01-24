const inRange = (n, start, end = null) => {
if (end && start > end) end = [start, (start = end)][0];
return end == null ? n >= 0 && n < start : n >= start && n < end;
};
module.exports = inRange