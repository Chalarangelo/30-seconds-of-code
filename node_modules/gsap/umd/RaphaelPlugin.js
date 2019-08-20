/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	var	_NaNExp = /[^\d\-\.]/g,
		_DEG2RAD = Math.PI / 180,
		_numExp = /(\d|\.)+/g,
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		//parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
		_parseColor = function(color) {
			if (typeof(color) === "number") {
				return [color >> 16, (color >> 8) & 255, color & 255];
			} else if (color === "" || color == null || color === "none" || typeof(color) !== "string") {
				return _colorLookup.transparent;
			} else if (_colorLookup[color]) {
				return _colorLookup[color];
			} else if (color.charAt(0) === "#") {
				if (color.length === 4) { //for shorthand like #9F0
					color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
				}
				color = parseInt(color.substr(1), 16);
				return [color >> 16, (color >> 8) & 255, color & 255];
			}
			return color.match(_numExp) || _colorLookup.transparent;
		},

		_transformMap = {scaleX:1, scaleY:1, tx:1, ty:1, rotation:1, shortRotation:1, skewX:1, skewY:1, scale:1},

		//parses the transform values for an element, returning an object with x, y, scaleX, scaleY, rotation, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
		_getTransform = function(t, rec) {
			var s = t.matrix,
				min = 0.000001,
				a = s.a,
				b = s.b,
				c = s.c,
				d = s.d,
				m = rec ? t._gsTransform || {skewY:0} : {skewY:0},
				invX = (m.scaleX < 0); //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.

			m.tx = s.e - (m.ox || 0); //ox is the offset x that we record in setRatio() whenever we apply a custom transform that might use a pivot point. Remember, s.e and s.f get affected by things like scale. For example, imagine an object whose top left corner is at 100,100 and then we scale it up to 300% using the center as the pivot point - that corner would now be very different even though to the user, they didn't intend to change/tween the x/y position per se. Therefore, we record whatever offsets we make so that we can compensate when reading the values back.
			m.ty = s.f - (m.oy || 0); //oy is the offset y (see note above)
			m.scaleX = Math.sqrt(a * a + b * b);
			m.scaleY = Math.sqrt(d * d + c * c);
			m.rotation = (a || b) ? Math.atan2(b, a) : m.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
			m.skewX = (c || d) ? Math.atan2(c, d) + m.rotation : m.skewX || 0;
			if (Math.abs(m.skewX) > Math.PI / 2) {
				if (invX) {
					m.scaleX *= -1;
					m.skewX += (m.rotation <= 0) ? Math.PI : -Math.PI;
					m.rotation += (m.rotation <= 0) ? Math.PI : -Math.PI;
				} else {
					m.scaleY *= -1;
					m.skewX += (m.skewX <= 0) ? Math.PI : -Math.PI;
				}
			}
			//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs().
			if (m.rotation < min) if (m.rotation > -min) if (a || b) {
				m.rotation = 0;
			}
			if (m.skewX < min) if (m.skewX > -min) if (b || c) {
				m.skewX = 0;
			}
			if (rec) {
				t._gsTransform = m; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
			}
			return m;
		},

		//takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
		_parseVal = function(v, d) {
			return (v == null) ? d : (typeof(v) === "string" && v.indexOf("=") === 1) ? parseInt(v.charAt(0)+"1", 10) * Number(v.substr(2)) + d : Number(v);
		},

		//translates strings like "40deg" or "40" or 40rad" or "+=40deg" to a numeric radian angle, optionally relative to a default value (if "+=" or "-=" prefix is found)
		_parseAngle = function(v, d) {
			var m = (v.indexOf("rad") === -1) ? _DEG2RAD : 1,
				r = (v.indexOf("=") === 1);
			v = Number(v.replace(_NaNExp, "")) * m;
			return r ? v + d : v;
		},


		RaphaelPlugin = _gsScope._gsDefine.plugin({
			propName: "raphael",
			version: "0.2.2",
			API: 2,

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween) {
				if (!target.attr) { //raphael must have attr() method
					return false;
				}
				this._target = target;
				this._tween = tween;
				this._props = target._gsProps = target._gsProps || {};
				var p, s, v, pt, clr1, clr2, rel;

				for (p in value) {

					v = value[p];

					if (p === "transform") {
						this._parseTransform(target, v);
						continue;
					} else if (_transformMap[p] || p === "pivot") {
						this._parseTransform(target, value);
						continue;
					}

					s = target.attr(p);

					//Some of these properties are in place in order to conform with the standard PropTweens in TweenPlugins so that overwriting and roundProps occur properly. For example, f and r may seem unnecessary here, but they enable other functionality.
					//_next:*	next linked list node		[object]
					//t: 	*	target 						[object]
					//p:	*	property (camelCase)		[string]
					//s: 	*	starting value				[number]
					//c:	*	change value				[number]
					//f:	* 	is function					[boolean]
					//n:	*	name (for overwriting)		[string]
					//b:		beginning value				[string]
					//i:		intermediate value			[string]
					//e: 		ending value				[string]
					//r:	*	round						[boolean]
					//type:		0=normal, 1=color, 2=rgba, -1=non-tweening prop	[number]
					this._firstPT = pt = {_next:this._firstPT,
						t:this._props,
						p:p,
						b:s,
						f:false,
						n:"raphael_" + p,
						r:false,
						type:0};

					//color values must be split apart into their R, G, B (and sometimes alpha) values and tweened independently.
					if (p === "fill" || p === "stroke") {
						clr1 = _parseColor(s);
						clr2 = _parseColor(v);
						pt.e = v;
						pt.s = Number(clr1[0]);				//red starting value
						pt.c = Number(clr2[0]) - pt.s;		//red change
						pt.gs = Number(clr1[1]);			//green starting value
						pt.gc = Number(clr2[1]) - pt.gs;	//green change
						pt.bs = Number(clr1[2]);			//blue starting value
						pt.bc = Number(clr2[2]) - pt.bs;	//blue change
						if (clr1.length > 3 || clr2.length > 3) { //detect an rgba() value
							pt.as = (clr1.length < 4) ? 1 : Number(clr1[3]);
							pt.ac = ((clr2.length < 4) ? 1 : Number(clr2[3])) - pt.as;
							pt.type = 2; //2 = rgba() tween
						} else {
							pt.type = 1; //1 = color tween, -1 = no tween, just set the value at the end because there's no changes
						}

					} else {

						s = (typeof(s) === "string") ? parseFloat(s.replace(_NaNExp, "")) : Number(s);

						if (typeof(v) === "string") {
							rel = (v.charAt(1) === "=");
							v = parseFloat(v.replace(_NaNExp, ""));
						} else {
							rel = false;
						}

						pt.e = (v || v === 0) ? (rel ? v + s : v) : value[p]; //ensures that any += or -= prefixes are taken care of.

						if ((s || s === 0) && (v || v === 0) && (pt.c = (rel ? v : v - s))) { //faster than isNaN(). Also, we set pt.c (change) here because if it's 0, we'll just treat it like a non-tweening value. can't do (v !== start) because if it's a relative value and the CHANGE is identical to the START, the condition will fail unnecessarily.
							pt.s = s;
						} else {
							pt.type = -1;
							pt.i = value[p]; //intermediate value is typically the same as the end value.
							pt.s = pt.c = 0;
						}

					}

					this._overwriteProps.push("raphael_" + p);
					if (pt._next) {
						pt._next._prev = pt;
					}
				}

				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				var pt = this._firstPT, val;

				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = Math.round(val);
					}
					if (!pt.type) {
						pt.t[pt.p] = val;
					} else if (pt.type === 1) { //rgb()
						pt.t[pt.p] = "rgb(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ")";
					} else if (pt.type === 2) { //rgba()
						pt.t[pt.p] = "rgba(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ", " + (pt.as + (v * pt.ac)) + ")";
					} else if (pt.type === -1) { //non-tweening
						pt.t[pt.p] = pt.i;
					}
					pt = pt._next;
				}

				this._target.attr(this._props);

				//apply transform values like x, y, scaleX, scaleY, rotation, skewX, or skewY. We do these after looping through all the PropTweens because those are where the changes are made to scaleX/scaleY/rotation/skewX/skewY/x/y.
				if (this._transform) {
					pt = this._transform; //to improve speed and reduce size, reuse the pt variable as an alias to the _transform property
					var ang = pt.rotation,
						skew = ang - pt.skewX,
						a = Math.cos(ang) * pt.scaleX,
						b = Math.sin(ang) * pt.scaleX,
						c = Math.sin(skew) * -pt.scaleY,
						d = Math.cos(skew) * pt.scaleY,
						min = 0.000001,
						pxl = this._pxl,
						pyl = this._pyl;

					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases for both b and c. The conditional logic here is faster than calling Math.abs().
					if (b < min) if (b > -min) {
						b = 0;
					}
					if (c < min) if (c > -min) {
						c = 0;
					}
					pt.ox = this._pxg - (pxl * a + pyl * c); //we must record the offset x/y that we're making from the regular tx/ty (matrix.e and f) so that we can correctly interpret positional data in _getTransform(). See note there on tx and ox.
					pt.oy = this._pyg - (pxl * b + pyl * d);
					this._target.transform("m" + a + "," + b + "," + c + "," + d + "," + (pt.tx + pt.ox) + "," + (pt.ty + pt.oy));
				}

			}

		}),
		p = RaphaelPlugin.prototype;

	//compares the beginning x, y, scaleX, scaleY, rotation, and skewX properties with the ending ones and adds PropTweens accordingly wherever necessary. We must tween them individually (rather than just tweening the matrix values) so that elgant overwriting can occur, like if one tween is controlling scaleX, scaleY, and rotation and then another one starts mid-tween that is trying to control the scaleX only - this tween should continue tweening scaleY and rotation.
	p._parseTransform = function(t, v) {
		if (this._transform) { return; } //only need to parse the transform once, and only if the browser supports it.

		var m1 = this._transform = _getTransform(t, true),
			min = 0.000001,
			m2, skewY, p, pt, copy, dx, dy, mtx, pivot;

		if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)

			m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
				  scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
				  tx:_parseVal(v.tx, m1.tx),
				  ty:_parseVal(v.ty, m1.ty)};

			if (v.shortRotation != null) {
				m2.rotation = (typeof(v.shortRotation) === "number") ? v.shortRotation * _DEG2RAD : _parseAngle(v.shortRotation, m1.rotation);
				var dif = (m2.rotation - m1.rotation) % (Math.PI * 2);
				if (dif !== dif % Math.PI) {
					dif += Math.PI * ((dif < 0) ? 2 : -2);
				}
				m2.rotation = m1.rotation + dif;

			} else {
				m2.rotation = (v.rotation == null) ? m1.rotation : (typeof(v.rotation) === "number") ? v.rotation * _DEG2RAD : _parseAngle(v.rotation, m1.rotation);
			}
			m2.skewX = (v.skewX == null) ? m1.skewX : (typeof(v.skewX) === "number") ? v.skewX * _DEG2RAD : _parseAngle(v.skewX, m1.skewX);

			//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
			m2.skewY = (v.skewY == null) ? m1.skewY : (typeof(v.skewY) === "number") ? v.skewY * _DEG2RAD : _parseAngle(v.skewY, m1.skewY);
			if ((skewY = m2.skewY - m1.skewY)) {
				m2.skewX += skewY;
				m2.rotation += skewY;
			}
			//don't allow rotation/skew values to be a SUPER small decimal because when they're translated back to strings for setting the css property, the browser reports them in a funky way, like 1-e7. Of course we could use toFixed() to resolve that issue but that hurts performance quite a bit with all those function calls on every frame, plus it is virtually impossible to discern values that small visually (nobody will notice changing a rotation of 0.0000001 to 0, so the performance improvement is well worth it).
			if (m2.skewY < min) if (m2.skewY > -min) {
				m2.skewY = 0;
			}
			if (m2.skewX < min) if (m2.skewX > -min) {
				m2.skewX = 0;
			}
			if (m2.rotation < min) if (m2.rotation > -min) {
				m2.rotation = 0;
			}

			pivot = v.localPivot || v.globalPivot;

			if (typeof(pivot) === "string") {
				copy = pivot.split(",");
				dx = Number(copy[0]);
				dy = Number(copy[1]);
			} else if (typeof(pivot) === "object") {
				dx = Number(pivot.x);
				dy = Number(pivot.y);
			} else if (v.localPivot) {
				copy = t.getBBox(true);
				dx = copy.width / 2;
				dy = copy.height / 2;
			} else {
				copy = t.getBBox();
				dx = copy.x + copy.width / 2;
				dy = copy.y + copy.height / 2;
			}

			if (v.localPivot) {
				mtx = t.matrix;
				dx += t.attr("x");
				dy += t.attr("y");
				this._pxl = dx;
				this._pyl = dy;
				this._pxg = dx * mtx.a + dy * mtx.c + mtx.e - m1.tx;
				this._pyg = dx * mtx.b + dy * mtx.d + mtx.f - m1.ty;
			} else {
				mtx = t.matrix.invert();
				this._pxl = dx * mtx.a + dy * mtx.c + mtx.e;
				this._pyl = dx * mtx.b + dy * mtx.d + mtx.f;
				this._pxg = dx - m1.tx;
				this._pyg = dy - m1.ty;
			}

		} else if (typeof(v) === "string") { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
			copy = this._target.transform();
			t.transform(v);
			m2 = _getTransform(t, false);
			t.transform(copy);
		} else {
			return;
		}

		for (p in _transformMap) {
			if (m1[p] !== m2[p]) if (p !== "shortRotation") if (p !== "scale") {
				this._firstPT = pt = {_next:this._firstPT, t:m1, p:p, s:m1[p], c:m2[p] - m1[p], n:p, f:false, r:false, b:m1[p], e:m2[p], type:0};
				if (pt._next) {
					pt._next._prev = pt;
				}
				this._overwriteProps.push("raphael_" + p);
			}
		}
	};

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }