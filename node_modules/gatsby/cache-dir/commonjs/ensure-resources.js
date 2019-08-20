"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _loader = _interopRequireDefault(require("./loader"));

var _shallowCompare = _interopRequireDefault(require("shallow-compare"));

class EnsureResources extends _react.default.Component {
  constructor(props) {
    super();
    const {
      location,
      pageResources
    } = props;
    this.state = {
      location: Object.assign({}, location),
      pageResources: pageResources || _loader.default.loadPageSync(location.pathname)
    };
  }

  static getDerivedStateFromProps({
    location
  }, prevState) {
    if (prevState.location.href !== location.href) {
      const pageResources = _loader.default.loadPageSync(location.pathname);

      return {
        pageResources,
        location: Object.assign({}, location)
      };
    }

    return null;
  }

  loadResources(rawPath) {
    _loader.default.loadPage(rawPath).then(pageResources => {
      if (pageResources && pageResources.status !== `error`) {
        this.setState({
          location: Object.assign({}, window.location),
          pageResources
        });
      } else {
        window.history.replaceState({}, ``, location.href);
        window.location = rawPath;
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Always return false if we're missing resources.
    if (!nextState.pageResources) {
      this.loadResources(nextProps.location.pathname);
      return false;
    } // Check if the component or json have changed.


    if (this.state.pageResources !== nextState.pageResources) {
      return true;
    }

    if (this.state.pageResources.component !== nextState.pageResources.component) {
      return true;
    }

    if (this.state.pageResources.json !== nextState.pageResources.json) {
      return true;
    } // Check if location has changed on a page using internal routing
    // via matchPath configuration.


    if (this.state.location.key !== nextState.location.key && nextState.pageResources.page && (nextState.pageResources.page.matchPath || nextState.pageResources.page.path)) {
      return true;
    }

    return (0, _shallowCompare.default)(this, nextProps, nextState);
  }

  render() {
    return this.props.children(this.state);
  }

}

var _default = EnsureResources;
exports.default = _default;