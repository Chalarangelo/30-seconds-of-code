/*!
 * VERSION: 0.6.8
 * DATE: 2018-02-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSRulePlugin",["plugins.TweenPlugin","TweenLite","plugins.CSSPlugin"],function(a,b,c){var d=function(){a.call(this,"cssRule"),this._overwriteProps.length=0},e=_gsScope.document,f=c.prototype.setRatio,g=d.prototype=new c;return g._propName="cssRule",g.constructor=d,d.version="0.6.8",d.API=2,d.getRule=function(a){var b,c,d,f,g=e.all?"rules":"cssRules",h=e.styleSheets,i=h.length,j=":"===a.charAt(0);for(a=(j?"":",")+a.split("::").join(":").toLowerCase()+",",j&&(f=[]);--i>-1;){try{if(c=h[i][g],!c)continue;b=c.length}catch(k){console.log(k);continue}for(;--b>-1;)if(d=c[b],d.selectorText&&-1!==(","+d.selectorText.split("::").join(":").toLowerCase()+",").indexOf(a)){if(!j)return d.style;f.push(d.style)}}return f},g._onInitTween=function(a,b,d){if(void 0===a.cssText)return!1;var f=a._gsProxy=a._gsProxy||e.createElement("div");return this._ss=a,this._proxy=f.style,f.style.cssText=a.cssText,c.prototype._onInitTween.call(this,f,b,d),!0},g.setRatio=function(a){f.call(this,a);for(var b=this._proxy,c=this._ss,d=b.length;--d>-1;)c[b[d]]=b[b[d]]},a.activate([d]),d},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("CSSRulePlugin");