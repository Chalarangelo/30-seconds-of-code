// legacy IE function
// expression '(' raw ')'
module.exports = function() {
    return this.createSingleNodeList(
        this.Raw(this.scanner.currentToken, 0, 0, false, false)
    );
};
