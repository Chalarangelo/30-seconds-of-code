"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _pageRenderer = _interopRequireDefault(require("./page-renderer"));

var _normalizePagePath = _interopRequireDefault(require("./normalize-page-path"));

var _gatsby = require("gatsby");

var _socketIo = require("./socketIo");

if (process.env.NODE_ENV === `production`) {
  throw new Error(`It appears like Gatsby is misconfigured. JSONStore is Gatsby internal ` + `development-only component and should never be used in production.\n\n` + `Unless your site has a complex or custom webpack/Gatsby ` + `configuration this is likely a bug in Gatsby. ` + `Please report this at https://github.com/gatsbyjs/gatsby/issues ` + `with steps to reproduce this error.`);
}

const getPathFromProps = props => props.pageResources && props.pageResources.page ? (0, _normalizePagePath.default)(props.pageResources.page.path) : undefined;

class JSONStore extends _react.default.Component {
  constructor(props) {
    super(props);
    (0, _defineProperty2.default)(this, "handleMittEvent", (type, event) => {
      this.setState({
        staticQueryData: (0, _socketIo.getStaticQueryData)(),
        pageQueryData: (0, _socketIo.getPageQueryData)()
      });
    });
    this.state = {
      staticQueryData: (0, _socketIo.getStaticQueryData)(),
      pageQueryData: (0, _socketIo.getPageQueryData)(),
      path: null
    };
  }

  componentDidMount() {
    (0, _socketIo.registerPath)(getPathFromProps(this.props));

    ___emitter.on(`*`, this.handleMittEvent);
  }

  componentWillUnmount() {
    (0, _socketIo.unregisterPath)(this.state.path);

    ___emitter.off(`*`, this.handleMittEvent);
  }

  static getDerivedStateFromProps(props, state) {
    const newPath = getPathFromProps(props);

    if (newPath !== state.path) {
      (0, _socketIo.unregisterPath)(state.path);
      (0, _socketIo.registerPath)(newPath);
      return {
        path: newPath
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We want to update this component when:
    // - location changed
    // - page data for path changed
    // - static query results changed
    return this.props.location !== nextProps.location || this.state.path !== nextState.path || this.state.pageQueryData[(0, _normalizePagePath.default)(nextState.path)] !== nextState.pageQueryData[(0, _normalizePagePath.default)(nextState.path)] || this.state.staticQueryData !== nextState.staticQueryData;
  }

  render() {
    const data = this.state.pageQueryData[getPathFromProps(this.props)]; // eslint-disable-next-line

    if (!data) {
      return _react.default.createElement("div", null);
    }

    return _react.default.createElement(_gatsby.StaticQueryContext.Provider, {
      value: this.state.staticQueryData
    }, _react.default.createElement(_pageRenderer.default, (0, _extends2.default)({}, this.props, data)));
  }

}

var _default = JSONStore;
exports.default = _default;