'use strict';

exports.type = 'perItem';

exports.active = false;

exports.params = {
    delim: '__',
    prefixIds: true,
    prefixClassNames: true,
};

exports.description = 'prefix IDs';


var path = require('path'),
    csstree = require('css-tree'),
    unquote = require('unquote'),
    collections = require('./_collections.js'),
    referencesProps = collections.referencesProps,
    rxId = /^#(.*)$/, // regular expression for matching an ID + extracing its name
    addPrefix = null;


// Escapes a string for being used as ID
var escapeIdentifierName = function(str) {
    return str.replace(/[\. ]/g, '_');
};

// Matches an #ID value, captures the ID name
var matchId = function(urlVal) {
    var idUrlMatches = urlVal.match(rxId);
    if (idUrlMatches === null) {
        return false;
    }
    return idUrlMatches[1];
};

// Matches an url(...) value, captures the URL
var matchUrl = function(val) {
    var urlMatches = /url\((.*?)\)/gi.exec(val);
    if (urlMatches === null) {
        return false;
    }
    return urlMatches[1];
};

// Checks if attribute is empty
var attrNotEmpty = function(attr) {
    return (attr && attr.value && attr.value.length > 0);
};

// prefixes an #ID
var prefixId = function(val) {
    var idName = matchId(val);
    if (!idName) {
        return false;
    }
    return '#' + addPrefix(idName);
};


// attr.value helper methods

// prefixes a class attribute value
var addPrefixToClassAttr = function(attr) {
    if (!attrNotEmpty(attr)) {
        return;
    }

    attr.value = attr.value.split(/\s+/).map(addPrefix).join(' ');
};

// prefixes an ID attribute value
var addPrefixToIdAttr = function(attr) {
    if (!attrNotEmpty(attr)) {
        return;
    }

    attr.value = addPrefix(attr.value);
};

// prefixes a href attribute value
var addPrefixToHrefAttr = function(attr) {
    if (!attrNotEmpty(attr)) {
        return;
    }

    var idPrefixed = prefixId(attr.value);
    if (!idPrefixed) {
        return;
    }
    attr.value = idPrefixed;
};

// prefixes an URL attribute value
var addPrefixToUrlAttr = function(attr) {
    if (!attrNotEmpty(attr)) {
        return;
    }

    // url(...) in value
    var urlVal = matchUrl(attr.value);
    if (!urlVal) {
        return;
    }

    var idPrefixed = prefixId(urlVal);
    if (!idPrefixed) {
        return;
    }

    attr.value = 'url(' + idPrefixed + ')';
};


/**
 * Prefixes identifiers
 *
 * @param {Object} node node
 * @param {Object} opts plugin params
 * @param {Object} extra plugin extra information
 *
 * @author strarsis <strarsis@gmail.com>
 */
exports.fn = function(node, opts, extra) {

    // prefix, from file name or option
    var prefix = 'prefix';
    if (opts.prefix) {
        if (typeof opts.prefix === 'function') {
            prefix = opts.prefix(node, extra);
        } else {
            prefix = opts.prefix;
        }
    } else if (opts.prefix === false) {
        prefix = false;
    } else if (extra && extra.path && extra.path.length > 0) {
        var filename = path.basename(extra.path);
        prefix = filename;
    }


    // prefixes a normal value
    addPrefix = function(name) {
        if(prefix === false){
            return escapeIdentifierName(name);
        }
        return escapeIdentifierName(prefix + opts.delim + name);
    };


    // <style/> property values

    if (node.elem === 'style') {
        if (node.isEmpty()) {
            // skip empty <style/>s
            return node;
        }

        var cssStr = node.content[0].text || node.content[0].cdata || [];

        var cssAst = {};
        try {
            cssAst = csstree.parse(cssStr, {
                parseValue: true,
                parseCustomProperty: false
            });
        } catch (parseError) {
            console.warn('Warning: Parse error of styles of <style/> element, skipped. Error details: ' + parseError);
            return node;
        }

        var idPrefixed = '';
        csstree.walk(cssAst, function(node) {

            // #ID, .class
            if (((opts.prefixIds        && node.type === 'IdSelector') ||
                 (opts.prefixClassNames && node.type === 'ClassSelector')) &&
                 node.name) {
                node.name = addPrefix(node.name);
                return;
            }

            // url(...) in value
            if (node.type === 'Url' &&
                node.value.value && node.value.value.length > 0) {
                idPrefixed = prefixId(unquote(node.value.value));
                if (!idPrefixed) {
                    return;
                }
                node.value.value = idPrefixed;
            }

        });

        // update <style>s
        node.content[0].text = csstree.generate(cssAst);
        return node;
    }


    // element attributes

    if (!node.attrs) {
        return node;
    }


    // Nodes

    if(opts.prefixIds) {
        // ID
        addPrefixToIdAttr(node.attrs.id);
    }

    if(opts.prefixClassNames) {
        // Class
        addPrefixToClassAttr(node.attrs.class);
    }


    // References

    // href
    addPrefixToHrefAttr(node.attrs.href);

    // (xlink:)href (deprecated, must be still supported)
    addPrefixToHrefAttr(node.attrs['xlink:href']);

    // (referenceable) properties
    for (var referencesProp of referencesProps) {
        addPrefixToUrlAttr(node.attrs[referencesProp]);
    }


    return node;
};
