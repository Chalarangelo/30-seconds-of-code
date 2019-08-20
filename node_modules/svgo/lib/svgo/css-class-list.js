'use strict';

var values = require('object.values');
if (!Object.values) {
    values.shim();
}


var CSSClassList = function(node) {
    this.parentNode = node;
    this.classNames = new Set();
    this.classAttr = null;
    //this.classValue = null;
};

/**
 * Performs a deep clone of this object.
 *
 * @param parentNode the parentNode to assign to the cloned result
 */
CSSClassList.prototype.clone = function(parentNode) {
    var node = this;
    var nodeData = {};

    Object.keys(node).forEach(function(key) {
        if (key !== 'parentNode') {
            nodeData[key] = node[key];
        }
    });

    // Deep-clone node data.
    nodeData = JSON.parse(JSON.stringify(nodeData));

    var clone = new CSSClassList(parentNode);
   Object.assign(clone, nodeData);
    return clone;
};

CSSClassList.prototype.hasClass = function() {
    this.classAttr = { // empty class attr
        'name': 'class',
        'value': null
    };

    this.addClassHandler();
};


// attr.class

CSSClassList.prototype.addClassHandler = function() {

    Object.defineProperty(this.parentNode.attrs, 'class', {
        get: this.getClassAttr.bind(this),
        set: this.setClassAttr.bind(this),
        enumerable: true,
        configurable: true
    });

    this.addClassValueHandler();
};

// attr.class.value

CSSClassList.prototype.addClassValueHandler = function() {

    Object.defineProperty(this.classAttr, 'value', {
        get: this.getClassValue.bind(this),
        set: this.setClassValue.bind(this),
        enumerable: true,
        configurable: true
    });
};

CSSClassList.prototype.getClassAttr = function() {
    return this.classAttr;
};

CSSClassList.prototype.setClassAttr = function(newClassAttr) {
    this.setClassValue(newClassAttr.value); // must before applying value handler!

    this.classAttr = newClassAttr;
    this.addClassValueHandler();
};

CSSClassList.prototype.getClassValue = function() {
    var arrClassNames = Array.from(this.classNames);
    return arrClassNames.join(' ');
};

CSSClassList.prototype.setClassValue = function(newValue) {
    if(typeof newValue === 'undefined') {
      this.classNames.clear();
      return;
    }
    var arrClassNames = newValue.split(' ');
    this.classNames = new Set(arrClassNames);
};


CSSClassList.prototype.add = function(/* variadic */) {
    this.hasClass();
    Object.values(arguments).forEach(this._addSingle.bind(this));
};

CSSClassList.prototype._addSingle = function(className) {
    this.classNames.add(className);
};


CSSClassList.prototype.remove = function(/* variadic */) {
    this.hasClass();
    Object.values(arguments).forEach(this._removeSingle.bind(this));
};

CSSClassList.prototype._removeSingle = function(className) {
    this.classNames.delete(className);
};


CSSClassList.prototype.item = function(index) {
    var arrClassNames = Array.from(this.classNames);
    return arrClassNames[index];
};

CSSClassList.prototype.toggle = function(className, force) {
    if(this.contains(className) || force === false) {
        this.classNames.delete(className);
    }
    this.classNames.add(className);
};

CSSClassList.prototype.contains = function(className) {
    return this.classNames.has(className);
};


module.exports = CSSClassList;