"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _applyStyles = _interopRequireDefault(require("./apply-styles"));

var _measureText = _interopRequireDefault(require("./measure-text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Traverse the node tree, create Yoga nodes and assign styles to each Yoga node
const buildLayout = (node, options) => {
  const {
    config,
    terminalWidth,
    skipStaticElements
  } = options;

  const yogaNode = _yogaLayoutPrebuilt.default.Node.create(config);

  node.yogaNode = yogaNode;
  const style = node.style || {}; // Root node of the tree

  if (node.nodeName === 'ROOT') {
    // `terminalWidth` can be `undefined` if env isn't a TTY
    yogaNode.setWidth(terminalWidth || 100);

    if (node.childNodes.length > 0) {
      const childNodes = node.childNodes.filter(childNode => {
        return skipStaticElements ? !childNode.unstable__static : true;
      });

      for (const [index, childNode] of Object.entries(childNodes)) {
        const childYogaNode = buildLayout(childNode, options).yogaNode;
        yogaNode.insertChild(childYogaNode, index);
      }
    }

    return node;
  } // Apply margin, padding, flex, etc styles


  (0, _applyStyles.default)(yogaNode, style); // Nodes with only text have a child Yoga node dedicated for that text

  if (node.textContent || node.nodeValue) {
    const {
      width,
      height
    } = (0, _measureText.default)(node.textContent || node.nodeValue);
    yogaNode.setWidth(style.width || width);
    yogaNode.setHeight(style.height || height);
    return node;
  }

  if (Array.isArray(node.childNodes) && node.childNodes.length > 0) {
    const childNodes = node.childNodes.filter(childNode => {
      return skipStaticElements ? !childNode.unstable__static : true;
    });

    for (const [index, childNode] of Object.entries(childNodes)) {
      const {
        yogaNode: childYogaNode
      } = buildLayout(childNode, options);
      yogaNode.insertChild(childYogaNode, index);
    }
  }

  return node;
};

var _default = buildLayout;
exports.default = _default;