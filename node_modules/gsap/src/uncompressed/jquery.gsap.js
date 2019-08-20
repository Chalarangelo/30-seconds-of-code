/*!
 * VERSION: 0.1.13
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com/jquery-gsap-plugin/
 *
 * Requires TweenLite version 1.8.0 or higher and CSSPlugin.
 *
 * @license Copyright (c) 2013-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */
(function($) {
	"use strict";

	var	_animate = $.fn.animate,
		_stop = $.fn.stop,
		_enabled = true,
		TweenLite, CSSPlugin, _warned,
		_copy = function(o) {
			var copy = {},
				p;
			for (p in o) {
				copy[p] = o[p];
			}
			return copy;
		},
		_reserved = {overwrite:1, delay:1, useFrames:1, runBackwards:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, autoCSS:1},
		_defaultLegacyProps = ",scrollTop,scrollLeft,show,hide,toggle,",
		_legacyProps = _defaultLegacyProps,
		_copyCriticalReserved = function(main, sub) {
			for (var p in _reserved) {
				if (_reserved[p] && main[p] !== undefined) {
					sub[p] = main[p];
				}
			}
		},
		_createEase = function(ease) {
			return function(p) {
				return ease.getRatio(p);
			};
		},
		_easeMap = {},
		_init = function() {
			var globals = window.GreenSockGlobals || window,
				p;
			TweenLite = globals.TweenMax || globals.TweenLite; //we prioritize TweenMax if it's loaded so that we can accommodate special features like repeat, yoyo, repeatDelay, etc.
			if (TweenLite) {
				globals = globals.com.greensock;
				CSSPlugin = globals.plugins.CSSPlugin;
				_easeMap = globals.easing.Ease.map || {}; //don't do just window.Ease or window.CSSPlugin because some other libraries like EaselJS/TweenJS use those same names and there could be a collision.
			}
			if (!TweenLite || !CSSPlugin) {
				TweenLite = null;
				if (!_warned && window.console) {
					window.console.log("The jquery.gsap.js plugin requires the TweenMax (or at least TweenLite and CSSPlugin) JavaScript file(s).");
					_warned = true;
				}
				return;
			}
			if ($.easing) {
				for (p in _easeMap) {
					$.easing[p] = _createEase(_easeMap[p]);
				}
				_init = false;
			}
		};

	$.fn.animate = function(prop, speed, easing, callback) {
		prop = prop || {};
		if (_init) {
			_init();
			if (!TweenLite || !CSSPlugin) {
				return _animate.call(this, prop, speed, easing, callback);
			}
		}
		if (!_enabled || prop.skipGSAP === true || (typeof(speed) === "object" && typeof(speed.step) === "function")) { //we don't support the "step" feature because it's too costly performance-wise, so fall back to the native animate() call if we sense one. Same with scrollTop and scrollLeft which are handled in a special way in jQuery.
			return _animate.call(this, prop, speed, easing, callback);
		}
		var config = $.speed(speed, easing, callback),
			vars = {ease:(_easeMap[config.easing] || ((config.easing === false) ? _easeMap.linear : _easeMap.swing))},
			obj = this,
			specEasing = (typeof(speed) === "object") ? speed.specialEasing : null,
			val, p, doAnimation, specEasingVars;

		for (p in prop) {
			val = prop[p];
			if (val instanceof Array && _easeMap[val[1]]) {
				specEasing = specEasing || {};
				specEasing[p] = val[1];
				val = val[0];
			}
			if (val === "show" || val === "hide" || val === "toggle" || (_legacyProps.indexOf(p) !== -1 && _legacyProps.indexOf("," + p + ",") !== -1)) { //note: slideUp() and slideDown() pass in opacity:"show" or opacity:"hide"
				return _animate.call(this, prop, speed, easing, callback);
			} else {
				vars[(p.indexOf("-") === -1) ? p : $.camelCase(p)] = val;
			}
		}

		if (specEasing) {
			vars = _copy(vars);
			specEasingVars = [];
			for (p in specEasing) {
				val = specEasingVars[specEasingVars.length] = {};
				_copyCriticalReserved(vars, val);
				val.ease = (_easeMap[specEasing[p]] || vars.ease);
				if (p.indexOf("-") !== -1) {
					p = $.camelCase(p);
				}
				val[p] = vars[p];
				delete vars[p];
			}
			if (specEasingVars.length === 0) {
				specEasingVars = null;
			}
		}

		doAnimation = function(next) {
			var varsCopy = _copy(vars),
				i;
			if (specEasingVars) {
				i = specEasingVars.length;
				while (--i > -1) {
					TweenLite.to(this, $.fx.off ? 0 : config.duration / 1000, specEasingVars[i]);
				}
			}
			varsCopy.onComplete = function() {
				if (next) {
					next();
				} else if (config.old) {
					$(this).each(config.old);
				}
			};
			TweenLite.to(this, $.fx.off ? 0 : config.duration / 1000, varsCopy);
		};

		if (config.queue !== false) {
			obj.queue(config.queue, doAnimation); //note: the queued function will get called once for each element in the jQuery collection.
			if (typeof(config.old) === "function") {
				$(obj[obj.length-1]).queue(config.queue, function(next) {
					config.old.call(obj);
					next();
				});
			}
		} else {
			doAnimation.call(obj);
		}

		return obj;
	};


	$.fn.stop = function(clearQueue, gotoEnd) {
		_stop.call(this, clearQueue, gotoEnd);
		if (TweenLite) {
			if (gotoEnd) {
				var tweens = TweenLite.getTweensOf(this),
					i = tweens.length,
					progress;
				while (--i > -1) {
					progress = tweens[i].totalTime() / tweens[i].totalDuration();
					if (progress > 0 && progress < 1) {
						tweens[i].seek(tweens[i].totalDuration());
					}
				}
			}
			TweenLite.killTweensOf(this);
		}
		return this;
	};

	$.gsap = {
		enabled:function(value) {
			_enabled = value;
		},
		version:"0.1.13",
		legacyProps:function(value) {
			_legacyProps = _defaultLegacyProps + value + ",";
		}
	};

}(jQuery));