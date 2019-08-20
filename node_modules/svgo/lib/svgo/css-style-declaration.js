'use strict';

var csstree = require('css-tree'),
    csstools = require('../css-tools');


var CSSStyleDeclaration = function(node) {
    this.parentNode = node;

    this.properties = new Map();
    this.hasSynced = false;

    this.styleAttr = null;
    this.styleValue = null;

    this.parseError = false;
};

/**
 * Performs a deep clone of this object.
 *
 * @param parentNode the parentNode to assign to the cloned result
 */
CSSStyleDeclaration.prototype.clone = function(parentNode) {
    var node = this;
    var nodeData = {};

    Object.keys(node).forEach(function(key) {
        if (key !== 'parentNode') {
            nodeData[key] = node[key];
        }
    });

    // Deep-clone node data.
    nodeData = JSON.parse(JSON.stringify(nodeData));

    var clone = new CSSStyleDeclaration(parentNode);
    Object.assign(clone, nodeData);
    return clone;
};

CSSStyleDeclaration.prototype.hasStyle = function() {
    this.addStyleHandler();
};




// attr.style

CSSStyleDeclaration.prototype.addStyleHandler = function() {

    this.styleAttr = { // empty style attr
        'name': 'style',
        'value': null
    };

    Object.defineProperty(this.parentNode.attrs, 'style', {
        get: this.getStyleAttr.bind(this),
        set: this.setStyleAttr.bind(this),
        enumerable: true,
        configurable: true
    });

    this.addStyleValueHandler();
};

// attr.style.value

CSSStyleDeclaration.prototype.addStyleValueHandler = function() {

    Object.defineProperty(this.styleAttr, 'value', {
        get: this.getStyleValue.bind(this),
        set: this.setStyleValue.bind(this),
        enumerable: true,
        configurable: true
    });
};

CSSStyleDeclaration.prototype.getStyleAttr = function() {
    return this.styleAttr;
};

CSSStyleDeclaration.prototype.setStyleAttr = function(newStyleAttr) {
    this.setStyleValue(newStyleAttr.value); // must before applying value handler!

    this.styleAttr = newStyleAttr;
    this.addStyleValueHandler();
    this.hasSynced = false; // raw css changed
};

CSSStyleDeclaration.prototype.getStyleValue = function() {
    return this.getCssText();
};

CSSStyleDeclaration.prototype.setStyleValue = function(newValue) {
    this.properties.clear(); // reset all existing properties
    this.styleValue = newValue;
    this.hasSynced = false; // raw css changed
};




CSSStyleDeclaration.prototype._loadCssText = function() {
    if (this.hasSynced) {
        return;
    }
    this.hasSynced = true; // must be set here to prevent loop in setProperty(...)

    if (!this.styleValue || this.styleValue.length === 0) {
        return;
    }
    var inlineCssStr = this.styleValue;

    var declarations = {};
    try {
        declarations = csstree.parse(inlineCssStr, {
            context: 'declarationList',
            parseValue: false
        });
    } catch (parseError) {
        this.parseError = parseError;
        return;
    }
    this.parseError = false;

    var self = this;
    declarations.children.each(function(declaration) {
        try {
          var styleDeclaration = csstools.csstreeToStyleDeclaration(declaration);
          self.setProperty(styleDeclaration.name, styleDeclaration.value, styleDeclaration.priority);
        } catch(styleError) {
            if(styleError.message !== 'Unknown node type: undefined') {
                self.parseError = styleError;
            }
        }
    });
};


// only reads from properties

/**
 * Get the textual representation of the declaration block (equivalent to .cssText attribute).
 *
 * @return {String} Textual representation of the declaration block (empty string for no properties)
 */
CSSStyleDeclaration.prototype.getCssText = function() {
    var properties = this.getProperties();

    if (this.parseError) {
        // in case of a parse error, pass through original styles
        return this.styleValue;
    }

    var cssText = [];
    properties.forEach(function(property, propertyName) {
        var strImportant = property.priority === 'important' ? '!important' : '';
        cssText.push(propertyName.trim() + ':' + property.value.trim() + strImportant);
    });
    return cssText.join(';');
};

CSSStyleDeclaration.prototype._handleParseError = function() {
    if (this.parseError) {
        console.warn('Warning: Parse error when parsing inline styles, style properties of this element cannot be used. The raw styles can still be get/set using .attr(\'style\').value. Error details: ' + this.parseError);
    }
};


CSSStyleDeclaration.prototype._getProperty = function(propertyName) {
    if(typeof propertyName === 'undefined') {
        throw Error('1 argument required, but only 0 present.');
    }

    var properties = this.getProperties();
    this._handleParseError();

    var property = properties.get(propertyName.trim());
    return property;
};

/**
 * Return the optional priority, "important".
 *
 * @param {String} propertyName representing the property name to be checked.
 * @return {String} priority that represents the priority (e.g. "important") if one exists. If none exists, returns the empty string.
 */
CSSStyleDeclaration.prototype.getPropertyPriority = function(propertyName) {
    var property = this._getProperty(propertyName);
    return property ? property.priority : '';
};

/**
 * Return the property value given a property name.
 *
 * @param {String} propertyName representing the property name to be checked.
 * @return {String} value containing the value of the property. If not set, returns the empty string.
 */
CSSStyleDeclaration.prototype.getPropertyValue = function(propertyName) {
    var property = this._getProperty(propertyName);
    return property ? property.value : null;
};

/**
 * Return a property name.
 *
 * @param {Number} index of the node to be fetched. The index is zero-based.
 * @return {String} propertyName that is the name of the CSS property at the specified index.
 */
CSSStyleDeclaration.prototype.item = function(index) {
    if(typeof index === 'undefined') {
        throw Error('1 argument required, but only 0 present.');
    }

    var properties = this.getProperties();
    this._handleParseError();

    return Array.from(properties.keys())[index];
};

/**
 * Return all properties of the node.
 *
 * @return {Map} properties that is a Map with propertyName as key and property (propertyValue + propertyPriority) as value.
 */
CSSStyleDeclaration.prototype.getProperties = function() {
    this._loadCssText();
    return this.properties;
};


// writes to properties

/**
 * Remove a property from the CSS declaration block.
 *
 * @param {String} propertyName representing the property name to be removed.
 * @return {String} oldValue equal to the value of the CSS property before it was removed.
 */
CSSStyleDeclaration.prototype.removeProperty = function(propertyName) {
    if(typeof propertyName === 'undefined') {
        throw Error('1 argument required, but only 0 present.');
    }

    this.hasStyle();

    var properties = this.getProperties();
    this._handleParseError();

    var oldValue = this.getPropertyValue(propertyName);
    properties.delete(propertyName.trim());
    return oldValue;
};

/**
 * Modify an existing CSS property or creates a new CSS property in the declaration block.
 *
 * @param {String} propertyName representing the CSS property name to be modified.
 * @param {String} [value] containing the new property value. If not specified, treated as the empty string. value must not contain "!important" -- that should be set using the priority parameter.
 * @param {String} [priority] allowing the "important" CSS priority to be set. If not specified, treated as the empty string.
 * @return {undefined}
 */
CSSStyleDeclaration.prototype.setProperty = function(propertyName, value, priority) {
    if(typeof propertyName === 'undefined') {
        throw Error('propertyName argument required, but only not present.');
    }

    this.hasStyle();

    var properties = this.getProperties();
    this._handleParseError();

    var property = {
        value: value.trim(),
        priority: priority.trim()
    };
    properties.set(propertyName.trim(), property);

    return property;
};


module.exports = CSSStyleDeclaration;
