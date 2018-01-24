const unescapeHTML = str =>
str.replace(
/&amp;|&lt;|&gt;|&#39;|&quot;/g,
tag =>
({
'&amp;': '&',
'&lt;': '<',
'&gt;': '>',
'&#39;': "'",
'&quot;': '"'
}[tag] || tag)
);
module.exports = unescapeHTML