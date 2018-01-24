const bottomVisible = () =>
document.documentElement.clientHeight + window.scrollY >=
(document.documentElement.scrollHeight || document.documentElement.clientHeight);
module.exports = bottomVisible