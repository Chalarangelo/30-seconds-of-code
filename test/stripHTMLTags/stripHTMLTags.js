const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

module.exports = stripHTMLTags;