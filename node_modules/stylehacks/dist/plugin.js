"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = plugin;
function plugin(targets, nodeTypes, detect) {
    class Plugin {
        constructor(result) {
            this.nodes = [];
            this.result = result;
            this.targets = targets;
            this.nodeTypes = nodeTypes;
        }

        push(node, metadata) {
            node._stylehacks = Object.assign({}, metadata, {
                message: `Bad ${metadata.identifier}: ${metadata.hack}`,
                browsers: this.targets
            });

            this.nodes.push(node);
        }

        any(node) {
            if (~this.nodeTypes.indexOf(node.type)) {
                detect.apply(this, arguments);

                return !!node._stylehacks;
            }

            return false;
        }

        detectAndResolve(...args) {
            this.nodes = [];

            detect.apply(this, args);

            return this.resolve();
        }

        detectAndWarn(...args) {
            this.nodes = [];

            detect.apply(this, args);

            return this.warn();
        }

        resolve() {
            return this.nodes.forEach(node => node.remove());
        }

        warn() {
            return this.nodes.forEach(node => {
                const { message, browsers, identifier, hack } = node._stylehacks;

                return node.warn(this.result, message, { browsers, identifier, hack });
            });
        }
    }

    return Plugin;
}
module.exports = exports["default"];