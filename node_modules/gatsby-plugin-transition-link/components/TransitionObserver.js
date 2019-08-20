"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _createTransitionContext = require("../context/createTransitionContext");

function TransitionObserver(props) {
  var innerRef = (0, _react.useRef)(null);
  var context = (0, _react.useContext)(_createTransitionContext.publicContext);

  var _useState = (0, _react.useState)(null),
      contextState = _useState[0],
      updateContextState = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      observing = _useState2[0],
      setObserving = _useState2[1];

  var observerSupport = 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
  (0, _react.useEffect)(function () {
    if (innerRef && innerRef.current) {
      var observer;
      var options = {
        threshold: 1
      };
      observer = new IntersectionObserver(function (observed) {
        var thisObserved = observed[0];
        setObserving(!!thisObserved.intersectionRatio);
      }, options);
      observer.observe(innerRef.current);
      return function () {
        return observer.unobserve(innerRef.current);
      };
    }
  }, [innerRef]);
  (0, _react.useEffect)(function () {
    if (!observerSupport || props.forceRender) {
      // always update the context if there is no intersection
      // observer support or if the prop forceRender is set to true
      updateContextState(context);
    } else if (observing) {
      updateContextState(context);
    }
  }, [context.transitionStatus, innerRef, observing]);
  return props.children(contextState, innerRef);
}

var _default = TransitionObserver;
exports.default = _default;