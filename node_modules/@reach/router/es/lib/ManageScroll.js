function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { Location } from "../";

var scrollPositions = {};

var ManageScrollImpl = function (_React$Component) {
  _inherits(ManageScrollImpl, _React$Component);

  function ManageScrollImpl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ManageScrollImpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.listener = function () {
      scrollPositions[_this.props.location.key] = window.scrollY;
      try {
        sessionStorage.setItem("scrollPositions", JSON.stringify(scrollPositions));
      } catch (e) {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ManageScrollImpl.prototype.componentDidMount = function componentDidMount() {
    try {
      // session storage will throw for a few reasons
      // - user settings
      // - in-cognito/private browsing
      // - who knows...
      var storage = JSON.parse(sessionStorage.getItem("scrollPositions"));
      if (storage) {
        scrollPositions = JSON.parse(storage) || {};
        var key = this.props.location.key;

        if (scrollPositions[key]) {
          window.scrollTo(0, scrollPositions[key]);
        }
      }
    } catch (e) {}

    window.addEventListener("scroll", this.listener);
  };

  ManageScrollImpl.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.listener);
  };

  ManageScrollImpl.prototype.componentDidUpdate = function componentDidUpdate() {
    var key = this.props.location.key;

    if (!scrollPositions[key]) {
      // never seen this location before
      window.scrollTo(0, 0);
    } else {
      // seen it
      window.scrollTo(0, scrollPositions[key]);
    }
  };

  ManageScrollImpl.prototype.render = function render() {
    return null;
  };

  return ManageScrollImpl;
}(React.Component);

process.env.NODE_ENV !== "production" ? ManageScrollImpl.propTypes = {
  location: function location() {}
} : void 0;


export default (function () {
  return React.createElement(
    Location,
    null,
    function (_ref) {
      var location = _ref.location;
      return React.createElement(ManageScrollImpl, { location: location });
    }
  );
});