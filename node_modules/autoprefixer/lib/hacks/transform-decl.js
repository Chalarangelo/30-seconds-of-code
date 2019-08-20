"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var TransformDecl =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(TransformDecl, _Declaration);

  function TransformDecl() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = TransformDecl.prototype;

  /**
   * Recursively check all parents for @keyframes
   */
  _proto.keyframeParents = function keyframeParents(decl) {
    var parent = decl.parent;

    while (parent) {
      if (parent.type === 'atrule' && parent.name === 'keyframes') {
        return true;
      }

      var _parent = parent;
      parent = _parent.parent;
    }

    return false;
  }
  /**
   * Is transform contain 3D commands
   */
  ;

  _proto.contain3d = function contain3d(decl) {
    if (decl.prop === 'transform-origin') {
      return false;
    }

    for (var _iterator = TransformDecl.functions3d, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var func = _ref;

      if (decl.value.indexOf(func + "(") !== -1) {
        return true;
      }
    }

    return false;
  }
  /**
   * Replace rotateZ to rotate for IE 9
   */
  ;

  _proto.set = function set(decl, prefix) {
    decl = _Declaration.prototype.set.call(this, decl, prefix);

    if (prefix === '-ms-') {
      decl.value = decl.value.replace(/rotateZ/gi, 'rotate');
    }

    return decl;
  }
  /**
   * Don't add prefix for IE in keyframes
   */
  ;

  _proto.insert = function insert(decl, prefix, prefixes) {
    if (prefix === '-ms-') {
      if (!this.contain3d(decl) && !this.keyframeParents(decl)) {
        return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
      }
    } else if (prefix === '-o-') {
      if (!this.contain3d(decl)) {
        return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
      }
    } else {
      return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    }

    return undefined;
  };

  return TransformDecl;
}(Declaration);

_defineProperty(TransformDecl, "names", ['transform', 'transform-origin']);

_defineProperty(TransformDecl, "functions3d", ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ', 'rotate3d', 'rotateX', 'rotateY', 'perspective']);

module.exports = TransformDecl;