module.exports = function cleanWhitespace(node, item, list) {
    // remove when first or last item in sequence
    if (item.next === null || item.prev === null) {
        list.remove(item);
        return;
    }

    // remove when previous node is whitespace
    if (item.prev.data.type === 'WhiteSpace') {
        list.remove(item);
        return;
    }

    if ((this.stylesheet !== null && this.stylesheet.children === list) ||
        (this.block !== null && this.block.children === list)) {
        list.remove(item);
        return;
    }
};
