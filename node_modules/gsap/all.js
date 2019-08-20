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
import TweenLite, {Ease, Power0, Power1, Power2, Power3, Power4, Linear, _gsScope} from "./TweenLite.js";

import TweenMax from "./TweenMaxBase.js";
import TimelineLite from "./TimelineLite.js";
import TimelineMax from "./TimelineMax.js";

// plugins
import AttrPlugin from "./AttrPlugin.js";
import BezierPlugin from "./BezierPlugin.js";
import ColorPropsPlugin from "./ColorPropsPlugin.js";
import CSSPlugin from "./CSSPlugin.js";
import CSSRulePlugin from "./CSSRulePlugin.js";
import DirectionalRotationPlugin from "./DirectionalRotationPlugin.js";
import EaselPlugin from "./EaselPlugin.js";
import EndArrayPlugin from "./EndArrayPlugin.js";
import ModifiersPlugin from "./ModifiersPlugin.js";
import PixiPlugin from "./PixiPlugin.js";
import RoundPropsPlugin from "./RoundPropsPlugin.js";
import ScrollToPlugin from "./ScrollToPlugin.js";
import TextPlugin from "./TextPlugin.js";


// utils
import Draggable from "./Draggable.js";

// easing
import {
	Back,
	Elastic,
	Bounce,
	RoughEase,
	SlowMo,
	SteppedEase,
	Circ,
	Expo,
	Sine,
	ExpoScaleEase
} from "./EasePack.js";

// bonus tools
/*
import DrawSVGPlugin from "./DrawSVGPlugin.js";
import MorphSVGPlugin from "./MorphSVGPlugin.js";
import Physics2DPlugin from "./Physics2DPlugin.js";
import PhysicsPropsPlugin from "./PhysicsPropsPlugin.js";
import ScrambleTextPlugin from "./ScrambleTextPlugin.js";
import ThrowPropsPlugin from "./ThrowPropsPlugin.js";
import GSDevTools from "./GSDevTools.js";
import SplitText from "./SplitText.js";
import CustomBounce from "./CustomBounce.js";
import CustomEase from "./CustomEase.js";
import CustomWiggle from "./CustomWiggle.js";

export {
	DrawSVGPlugin,
	MorphSVGPlugin,
	Physics2DPlugin,
	PhysicsPropsPlugin,
	ScrambleTextPlugin,
	ThrowPropsPlugin,
	GSDevTools,
	SplitText,
	CustomBounce,
	CustomEase,
	CustomWiggle
}
*/



export {
	TweenLite,
	TweenMax,
	TimelineLite,
	TimelineMax,
	_gsScope,

	// plugins
	AttrPlugin,
	BezierPlugin,
	ColorPropsPlugin,
	CSSPlugin,
	CSSRulePlugin,
	DirectionalRotationPlugin,
	EaselPlugin,
	EndArrayPlugin,
	ModifiersPlugin,
	PixiPlugin,
	RoundPropsPlugin,
	ScrollToPlugin,
	TextPlugin,

	// utils
	Draggable,

	// easing
	Ease,
	Power0,
	Power1,
	Power2,
	Power3,
	Power4,
	Linear,
	Back,
	Elastic,
	Bounce,
	RoughEase,
	SlowMo,
	SteppedEase,
	Circ,
	Expo,
	Sine,
	ExpoScaleEase

};