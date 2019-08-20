module.exports = { escape, unescape };

function unescape(w) {
    w = w.charAt(0) === '"'
        ? w.replace(/^"|([^\\])"$/g, '$1')
        : w.replace(/\\ /g, ' ');

    return w.replace(/\\("|'|\$|`|\\)/g, '$1');
}

function escape(w) {
    w = w.replace(/(["'$`\\])/g,'\\$1');
    return w.match(/\s+/) ? `"${w}"` : w;
}
