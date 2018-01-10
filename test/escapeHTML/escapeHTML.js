module.exports = escapeHTML = str =>
str.replace(
/[&<>'"]/g,
tag =>
({
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
"'": '&#39;',
'"': '&quot;'
}[tag] || tag)
);