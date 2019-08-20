/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const INDENT = '  ';

/**
 * a utility class to produce well-formed, indented XML
 * @param {ContentWriter} contentWriter the content writer that this utility wraps
 * @constructor
 */
function XMLWriter(contentWriter) {
    this.cw = contentWriter;
    this.stack = [];
}

function attrString(attrs) {
    if (!attrs) {
        return '';
    }
    const ret = [];
    Object.keys(attrs).forEach(k => {
        const v = attrs[k];
        ret.push(k + '="' + v + '"');
    });
    return ret.length === 0 ? '' : ' ' + ret.join(' ');
}

XMLWriter.prototype.indent = function(str) {
    return this.stack.map(() => INDENT).join('') + str;
};

/**
 * writes the opening XML tag with the supplied attributes
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs attributes for the tag
 */
XMLWriter.prototype.openTag = function(name, attrs) {
    const str = this.indent('<' + name + attrString(attrs) + '>');
    this.cw.println(str);
    this.stack.push(name);
};

/**
 * closes an open XML tag.
 * @param {String} name - tag name to close. This must match the writer's
 *  notion of the tag that is currently open.
 */
XMLWriter.prototype.closeTag = function(name) {
    if (this.stack.length === 0) {
        throw new Error('Attempt to close tag ' + name + ' when not opened');
    }
    const stashed = this.stack.pop();
    const str = '</' + name + '>';

    if (stashed !== name) {
        throw new Error(
            'Attempt to close tag ' +
                name +
                ' when ' +
                stashed +
                ' was the one open'
        );
    }
    this.cw.println(this.indent(str));
};
/**
 * writes a tag and its value opening and closing it at the same time
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs tag attributes
 * @param {String} [content=null] content optional tag content
 */
XMLWriter.prototype.inlineTag = function(name, attrs, content) {
    let str = '<' + name + attrString(attrs);
    if (content) {
        str += '>' + content + '</' + name + '>';
    } else {
        str += '/>';
    }
    str = this.indent(str);
    this.cw.println(str);
};
/**
 * closes all open tags and ends the document
 */
XMLWriter.prototype.closeAll = function() {
    this.stack
        .slice()
        .reverse()
        .forEach(name => {
            this.closeTag(name);
        });
};

module.exports = XMLWriter;
