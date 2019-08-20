'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isCustomProp = require('./isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const important = node => node.important;
const unimportant = node => !node.important;

const hasInherit = node => node.value.toLowerCase() === 'inherit';
const hasInitial = node => node.value.toLowerCase() === 'initial';
const hasUnset = node => node.value.toLowerCase() === 'unset';

exports.default = (props, includeCustomProps = true) => {
    if (props.some(hasInherit) && !props.every(hasInherit)) {
        return false;
    }

    if (props.some(hasInitial) && !props.every(hasInitial)) {
        return false;
    }

    if (props.some(hasUnset) && !props.every(hasUnset)) {
        return false;
    }

    if (includeCustomProps && props.some(_isCustomProp2.default) && !props.every(_isCustomProp2.default)) {
        return false;
    }

    return props.every(unimportant) || props.every(important);
};

module.exports = exports['default'];