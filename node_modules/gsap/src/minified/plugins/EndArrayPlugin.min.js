/*!
 * VERSION: 0.1.3
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine.plugin({propName:"endArray",API:2,version:"0.1.3",init:function(a,b,c){var d,e,f=b.length,g=this.a=[];if(this.target=a,this._mod=0,!f)return!1;for(;--f>-1;)d=a[f],e=b[f],d!==e&&g.push({i:f,s:d,c:e-d});return!0},mod:function(a){"function"==typeof a.endArray&&(this._mod=a.endArray)},set:function(a){var b,c,d=this.target,e=this.a,f=e.length,g=this._mod;if(g)for(;--f>-1;)b=e[f],d[b.i]=g(b.s+b.c*a,d);else for(;--f>-1;)b=e[f],c=b.s+b.c*a,d[b.i]=1e-6>c&&c>-1e-6?0:c}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();