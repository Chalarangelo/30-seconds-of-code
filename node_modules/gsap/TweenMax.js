/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
/* eslint-disable */

import TweenLite, { TweenPlugin, Ease, Power0, Power1, Power2, Power3, Power4, Linear } from "./TweenLite.js";
import TweenMaxBase from "./TweenMaxBase.js";
import CSSPlugin from "./CSSPlugin.js";
import AttrPlugin from "./AttrPlugin.js";
import RoundPropsPlugin from "./RoundPropsPlugin.js";
import DirectionalRotationPlugin from "./DirectionalRotationPlugin.js";
import TimelineLite from "./TimelineLite.js";
import TimelineMax from "./TimelineMax.js";
import BezierPlugin from "./BezierPlugin.js";
import { Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase } from "./EasePack.js";

//the following two lines are designed to prevent tree shaking of the classes that were historically included with TweenMax (otherwise, folks would have to reference CSSPlugin, for example, to ensure their CSS-related animations worked)
export var TweenMax = TweenMaxBase;
TweenMax._autoActivated = [TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, RoundPropsPlugin, DirectionalRotationPlugin, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase];

export { TweenMax as default };
export { TweenLite, TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, DirectionalRotationPlugin, RoundPropsPlugin, TweenPlugin, Ease, Power0, Power1, Power2, Power3, Power4, Linear, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase };
