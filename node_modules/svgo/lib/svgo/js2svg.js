'use strict';

var EOL = require('os').EOL,
    textElem = require('../../plugins/_collections.js').elemsGroups.textContent.concat('title');

var defaults = {
    doctypeStart: '<!DOCTYPE',
    doctypeEnd: '>',
    procInstStart: '<?',
    procInstEnd: '?>',
    tagOpenStart: '<',
    tagOpenEnd: '>',
    tagCloseStart: '</',
    tagCloseEnd: '>',
    tagShortStart: '<',
    tagShortEnd: '/>',
    attrStart: '="',
    attrEnd: '"',
    commentStart: '<!--',
    commentEnd: '-->',
    cdataStart: '<![CDATA[',
    cdataEnd: ']]>',
    textStart: '',
    textEnd: '',
    indent: 4,
    regEntities: /[&'"<>]/g,
    regValEntities: /[&"<>]/g,
    encodeEntity: encodeEntity,
    pretty: false,
    useShortTags: true
};

var entities = {
      '&': '&amp;',
      '\'': '&apos;',
      '"': '&quot;',
      '>': '&gt;',
      '<': '&lt;',
    };

/**
 * Convert SVG-as-JS object to SVG (XML) string.
 *
 * @param {Object} data input data
 * @param {Object} config config
 *
 * @return {Object} output data
 */
module.exports = function(data, config) {

    return new JS2SVG(config).convert(data);

};

function JS2SVG(config) {

    if (config) {
        this.config = Object.assign({}, defaults, config);
    } else {
        this.config = Object.assign({}, defaults);
    }

    var indent = this.config.indent;
    if (typeof indent == 'number' && !isNaN(indent)) {
        this.config.indent = (indent < 0) ? '\t' : ' '.repeat(indent);
    } else if (typeof indent != 'string') {
        this.config.indent = '    ';
    }

    if (this.config.pretty) {
        this.config.doctypeEnd += EOL;
        this.config.procInstEnd += EOL;
        this.config.commentEnd += EOL;
        this.config.cdataEnd += EOL;
        this.config.tagShortEnd += EOL;
        this.config.tagOpenEnd += EOL;
        this.config.tagCloseEnd += EOL;
        this.config.textEnd += EOL;
    }

    this.indentLevel = 0;
    this.textContext = null;

}

function encodeEntity(char) {
    return entities[char];
}

/**
 * Start conversion.
 *
 * @param {Object} data input data
 *
 * @return {String}
 */
JS2SVG.prototype.convert = function(data) {

    var svg = '';

    if (data.content) {

        this.indentLevel++;

        data.content.forEach(function(item) {

            if (item.elem) {
               svg += this.createElem(item);
            } else if (item.text) {
               svg += this.createText(item.text);
            } else if (item.doctype) {
                svg += this.createDoctype(item.doctype);
            } else if (item.processinginstruction) {
                svg += this.createProcInst(item.processinginstruction);
            } else if (item.comment) {
                svg += this.createComment(item.comment);
            } else if (item.cdata) {
                svg += this.createCDATA(item.cdata);
            }

        }, this);

    }

    this.indentLevel--;

    return {
        data: svg,
        info: {
            width: this.width,
            height: this.height
        }
    };

};

/**
 * Create indent string in accordance with the current node level.
 *
 * @return {String}
 */
JS2SVG.prototype.createIndent = function() {

    var indent = '';

    if (this.config.pretty && !this.textContext) {
        indent = this.config.indent.repeat(this.indentLevel - 1);
    }

    return indent;

};

/**
 * Create doctype tag.
 *
 * @param {String} doctype doctype body string
 *
 * @return {String}
 */
JS2SVG.prototype.createDoctype = function(doctype) {

    return  this.config.doctypeStart +
            doctype +
            this.config.doctypeEnd;

};

/**
 * Create XML Processing Instruction tag.
 *
 * @param {Object} instruction instruction object
 *
 * @return {String}
 */
JS2SVG.prototype.createProcInst = function(instruction) {

    return  this.config.procInstStart +
            instruction.name +
            ' ' +
            instruction.body +
            this.config.procInstEnd;

};

/**
 * Create comment tag.
 *
 * @param {String} comment comment body
 *
 * @return {String}
 */
JS2SVG.prototype.createComment = function(comment) {

    return  this.config.commentStart +
            comment +
            this.config.commentEnd;

};

/**
 * Create CDATA section.
 *
 * @param {String} cdata CDATA body
 *
 * @return {String}
 */
JS2SVG.prototype.createCDATA = function(cdata) {

    return  this.createIndent() +
            this.config.cdataStart +
            cdata +
            this.config.cdataEnd;

};

/**
 * Create element tag.
 *
 * @param {Object} data element object
 *
 * @return {String}
 */
JS2SVG.prototype.createElem = function(data) {

    // beautiful injection for obtaining SVG information :)
    if (
        data.isElem('svg') &&
        data.hasAttr('width') &&
        data.hasAttr('height')
    ) {
        this.width = data.attr('width').value;
        this.height = data.attr('height').value;
    }

    // empty element and short tag
    if (data.isEmpty()) {
        if (this.config.useShortTags) {
            return this.createIndent() +
                   this.config.tagShortStart +
                   data.elem +
                   this.createAttrs(data) +
                   this.config.tagShortEnd;
        } else {
            return this.createIndent() +
                   this.config.tagShortStart +
                   data.elem +
                   this.createAttrs(data) +
                   this.config.tagOpenEnd +
                   this.config.tagCloseStart +
                   data.elem +
                   this.config.tagCloseEnd;
        }
    // non-empty element
    } else {
        var tagOpenStart = this.config.tagOpenStart,
            tagOpenEnd = this.config.tagOpenEnd,
            tagCloseStart = this.config.tagCloseStart,
            tagCloseEnd = this.config.tagCloseEnd,
            openIndent = this.createIndent(),
            textIndent = '',
            processedData = '',
            dataEnd = '';

        if (this.textContext) {
            tagOpenStart = defaults.tagOpenStart;
            tagOpenEnd = defaults.tagOpenEnd;
            tagCloseStart = defaults.tagCloseStart;
            tagCloseEnd = defaults.tagCloseEnd;
            openIndent = '';
        } else if (data.isElem(textElem)) {
            if (this.config.pretty) {
                textIndent += openIndent + this.config.indent;
            }
            this.textContext = data;
        }

        processedData += this.convert(data).data;

        if (this.textContext == data) {
            this.textContext = null;
            if (this.config.pretty) dataEnd = EOL;
        }

        return  openIndent +
                tagOpenStart +
                data.elem +
                this.createAttrs(data) +
                tagOpenEnd +
                textIndent +
                processedData +
                dataEnd +
                this.createIndent() +
                tagCloseStart +
                data.elem +
                tagCloseEnd;

    }

};

/**
 * Create element attributes.
 *
 * @param {Object} elem attributes object
 *
 * @return {String}
 */
JS2SVG.prototype.createAttrs = function(elem) {

    var attrs = '';

    elem.eachAttr(function(attr) {

        if (attr.value !== undefined) {
            attrs +=    ' ' +
                        attr.name +
                        this.config.attrStart +
                        String(attr.value).replace(this.config.regValEntities, this.config.encodeEntity) +
                        this.config.attrEnd;
        }
        else {
            attrs +=    ' ' +
                        attr.name;
        }


    }, this);

    return attrs;

};

/**
 * Create text node.
 *
 * @param {String} text text
 *
 * @return {String}
 */
JS2SVG.prototype.createText = function(text) {

    return  this.createIndent() +
            this.config.textStart +
            text.replace(this.config.regEntities, this.config.encodeEntity) +
            (this.textContext ? '' : this.config.textEnd);

};
