/*jslint vars: true, indent: 2 */
/*global window, document, XMLHttpRequest, EventSource */

"use strict";

function now() {
  var performance = window.performance;
  if (performance != undefined && performance.now != undefined) {
    return performance.now();
  }
  return new Date().getTime();
}

var messageId = Infinity;
var lastEventId = -Infinity;
var timeOfSending = -Infinity;
var msgs = document.createDocumentFragment();
var es = new EventSource("events");

function checkId() {
  if (lastEventId >= messageId) {
    messageId = Infinity;
    var div = document.createElement("div");
    div.className = "ping";
    div.innerHTML = " (ping: " + (now() - timeOfSending).toFixed() + "ms) ";
    msgs.insertBefore(div, msgs.firstChild);
  }
}

es.onmessage = function (event) {
  lastEventId = parseInt(event.lastEventId);
  var div = document.createElement("div");
  var text = document.createTextNode(event.data);
  div.appendChild(text);
  msgs.insertBefore(div, msgs.firstChild);
  checkId();
};

function showReadyState(event) {
  document.getElementById("readyStateConnecting").style.visibility = es.readyState === es.CONNECTING ? "visible" : "hidden";
  document.getElementById("readyStateOpen").style.visibility = es.readyState === es.OPEN ? "visible" : "hidden";
  document.getElementById("readyStateClosed").style.visibility = es.readyState === es.CLOSED ? "visible" : "hidden";
}

function post() {
  var message = document.getElementById("message").value;
  if (message === "") {
    return false;
  }
  document.getElementById("message").value = "";

  timeOfSending = now();
  messageId = Infinity;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "?message=" + encodeURIComponent(message), true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      messageId = parseInt(xhr.responseText) || Infinity;
      checkId();
    }
  };
  xhr.send(undefined);

  return false;
}

window.onload = function () {
  es.onopen = showReadyState;
  es.onerror = showReadyState;
  showReadyState(undefined);
  var m = document.getElementById("msgs");
  m.appendChild(msgs);
  msgs = m;
  document.getElementById("form").onsubmit = function (event) {
    post();
    return false;
  };
};
