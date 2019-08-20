'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stylehacks = _postcss2.default.plugin('stylehacks', (opts = {}) => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        const processors = _plugins2.default.reduce((list, Plugin) => {
            const hack = new Plugin(result);
            const applied = browsers.some(browser => {
                return hack.targets.some(target => browser === target);
            });

            if (applied) {
                return list;
            }

            return [...list, hack];
        }, []);

        css.walk(node => {
            processors.forEach(proc => {
                if (!~proc.nodeTypes.indexOf(node.type)) {
                    return;
                }

                if (opts.lint) {
                    return proc.detectAndWarn(node);
                }

                return proc.detectAndResolve(node);
            });
        });
    };
});

stylehacks.detect = node => {
    return _plugins2.default.some(Plugin => {
        const hack = new Plugin();

        return hack.any(node);
    });
};

exports.default = stylehacks;
module.exports = exports['default'];