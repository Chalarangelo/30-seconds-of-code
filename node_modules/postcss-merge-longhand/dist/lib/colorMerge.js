'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = colorMerge;

var _getDecls = require('./getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _hasAllProps = require('./hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _insertCloned = require('./insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllRules(props, properties) {
    return properties.reduce((list, property) => {
        props.filter(n => n.prop && ~n.prop.indexOf(property)).forEach((result, index) => {
            if (!list[index]) {
                list.push([]);
            }
            list[index].push(result);
        });
        return list;
    }, [[]]);
}

function colorMerge({ rule, properties, prop, value }) {
    let decls = (0, _getDecls2.default)(rule, properties);

    while (decls.length) {
        const lastNode = decls[decls.length - 1];
        const props = decls.filter(node => node.important === lastNode.important);
        if ((0, _hasAllProps2.default)(props, ...properties)) {
            getAllRules(props, properties).reverse().forEach(group => {
                (0, _insertCloned2.default)(rule, lastNode, {
                    prop,
                    value: value(group)
                });
            });
            props.forEach(_remove2.default);
        }
        decls = decls.filter(node => !~props.indexOf(node));
    }
}
module.exports = exports['default'];