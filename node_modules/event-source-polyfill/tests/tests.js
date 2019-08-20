/*jslint indent: 2, vars: true, plusplus: true */
/*global setTimeout, clearTimeout, location, EventSource, asyncTest, ok, strictEqual, start */

(function (global) {
  "use strict";

  var EventSource = global.EventSourcePolyfill;
  var stop = global.windowStop;

  if (location.hash === "#native") {
    EventSource = global.NativeEventSource || global.EventSource;
  }

  var url = "events";

  var commonHeaders = "Access-Control-Allow-Origin: *\n" +
                      "Content-Type: text/event-stream\n" +
                      "Cache-Control: no-store\n";

  var mainTests = function () {
    // Opera bug with "XMLHttpRequest#onprogress"
    asyncTest("EventSource: 3 messages with small delay", function () {
      var body = "data\n\n<delay(25)>data\n\n<delay(25)>data\n\n<delay(10000)>";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var n = 0;
      es.onmessage = function () {
        n += 1;
      };
      es.onerror = es.onopen = function () {
        es.onerror = es.onopen = undefined;
        setTimeout(function () {
          es.close();
          ok(n === 3, "failed, n = " + n);
          start();
        }, 1000);
      };
    });

    asyncTest("EventSource: ping-pong", function () {
      var n = 0;
      var timeStamp = new Date().getTime();
      var es = undefined;
      var timer = 0;
      var onTimeout = undefined;
      var body = "retry: 500\n" +
                 "data: " + Math.random() + "\n\n" +
                 "<delay(1500)>" +
                 "data: " + Math.random() + "\n\n" +
                 "<delay(1500)>" +
                 "data: " + Math.random() + "\n\n" +
                 "<delay(10000)>";
      if (global.XDomainRequest != undefined) {
        body = new Array(2048).join(" ") + body;
      }
      es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function () {
        ++n;
        clearTimeout(timer);
        if (n === 3) {
          es.close();
          ok(true, "test 0, duration: " + (new Date().getTime() - timeStamp));
          start();
        } else {
          timer = setTimeout(onTimeout, 2000);
        }
      };
      onTimeout = function () {
        es.close();
        ok(false, "failed, n = " + n);
        start();
      };
      timer = setTimeout(onTimeout, 1000);
    });

    asyncTest("EventSource: 1; 2; 3; 4; 5;", function () {
      var body = "retry: 500\n" +
                 "id: <lastEventId(1)>\n" +
                 "data: <lastEventId(1)>;\n\n" +
                 "id: <lastEventId(2)>\n" +
                 "data: <lastEventId(2)>;\n\n" +
                 "id: <lastEventId(3)>\n" +
                 "data: <lastEventId(3)>;\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = "";
      var timer = 0;

      function onTimeout() {
        clearTimeout(timer);
        var z = " 1; 2; 3; 4; 5;";
        strictEqual(s.slice(0, z.length), z, "test 10");
        es.close();
        start();
      }

      timer = setTimeout(onTimeout, 2000);

      es.onmessage = function (event) {
        s += " " + event.data;
      };
    });

    asyncTest("EventSource: event-stream parsing", function () {
      var body = "data:\\0\ndata:  2\rData:1\ndata\\0:2\ndata:1\r\\0data:4\nda-ta:3\rdata_5\ndata:3\rdata:\r\n data:32\ndata:4\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function (event) {
        strictEqual(event.data, "\\0\n 2\n1\n3\n\n4");
        es.close();
        start();
      };
    });

    // native EventSource is buggy in Opera, FF < 11, Chrome < ?
    asyncTest("EventSource: lastEventId should not be set when connection dropped without data dispatch", function () {
      var body = "retry: 500\n" +
                 "data: -1\n\n" +
                 "id: 1\n" +
                 "data: 1\n\n" +
                 "id: 2\n" +
                 "drop connection test";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var closeCount = 0;

      es.onmessage = function (event) {
        if (Number(event.lastEventId) === 2) {
          closeCount = 1000;
          es.close();
          ok(false, "lastEventId should not be set when connection dropped without data dispatch (see http://www.w3.org/Bugs/Public/show_bug.cgi?id=13761 )");
          start();
        }
      };

      es.onerror = function () {
        closeCount++;
        if (closeCount === 3) {
          es.close();
          ok(true, "ok");
          start();
        }
      };
    });

    asyncTest("EventSource: Once the end of the file is reached, any pending data must be discarded", function () {
      var body = "data: data0";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = "";
      var f = function () {
        es.onerror = es.onmessage = undefined;
        es.close();
        strictEqual(s, "", "Once the end of the file is reached, any pending data must be discarded. (If the file ends in the middle of an event, before the final empty line, the incomplete event is not dispatched.)");
        start();
      };
      es.onmessage = function (e) {
        s = e.data;
        f();
      };
      es.onerror = function () {
        f();
      };
    });

    asyncTest("EventSource#close()", function () {
      var body = "data: data0;\n\ndata: data1;\n\ndata: data2;\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = "";
      es.onmessage = function () {
        if (s === "") {
          setTimeout(function () {
            es.close();
            ok(s === "1", "http://www.w3.org/Bugs/Public/show_bug.cgi?id=14331");
            start();
          }, 200);
        }
        s += "1";
        es.close();
      };
    });

    asyncTest("EventSource#close()", function () {
      var body = "";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onopen = function () {
        strictEqual(es.readyState, EventSource.OPEN);
        start();
        es.close();
      };
    });

    asyncTest("format", function () {
      var body = "data\n\n<delay(1000)>";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function (event) {
        es.close();
        ok(event.data === "", "failed");
        start();
      };
      es.onerror = function () {
        es.close();
        ok(false, "failed");
        start();
      };
    });

    asyncTest("`EventSource#close` in `EventSource#onmessage`", function () {
      var body = "data:1\n\n<delay(1000)>";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function () {
        es.close();
        ok(es.readyState === EventSource.CLOSED, "failed");
        start();
      };
      es.onerror = function () {
        es.close();
        ok(false, "failed");
        start();
      };
    });

    asyncTest("chunks", function () {
      var body = "data:1<delay(1000)>2<delay(1000)>\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function (event) {
        es.close();
        ok(event.data === "12", "failed");
        start();
      };
      es.onerror = function () {
        es.close();
        ok(false, "failed");
        start();
      };
    });

    asyncTest("onprogress-and-onreadystatechange-50ms", function () {
      var body = "data:1<delay(1000)>2<delay(25)>3<delay(25)>\n<delay(25)>\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function (event) {
        es.close();
        strictEqual(event.data, "123");
        start();
      };
      es.onerror = function () {
        es.close();
        ok(false, "no message event");
        start();
      };
    });

    // IE 11, Edge 17
    asyncTest("fast-response-text-parsing-after-big-data", function () {
      var body = "<bigData>\n\n<delay(5000)>data: small1\n\n<delay(1000)>data: small2\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var t = 0;
      es.onmessage = function (event) {
        if (event.data === "small1") {
          t = Date.now();
        }
        if (event.data === "small2") {
          t = Date.now() - t;
          es.close();
          strictEqual(t < 1000 + 4, true);
          start();
        }
      };
      es.onerror = function () {
        es.close();
        ok(false, "no message event");
        start();
      };
    });

    asyncTest("unicode", function () {
      var body = "data:<byte(F0)><delay(500)><byte(9F)><delay(500)><byte(8F)><delay(500)><byte(A9)><delay(500)>\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      es.onmessage = function (event) {
        es.close();
        ok(event.data === "\uD83C\uDFE9", "failed");
        start();
      };
      es.onerror = function () {
        es.close();
        ok(false, "failed");
        start();
      };
    });

    asyncTest("EventSource + close before open", function () {
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + "data:test\n\n"));
      var events = '';
      window.onunhandledrejection = es.onopen = es.onmessage = es.onerror = function (event) {
        events += event.type;
      };
      es.close();
      window.setTimeout(function () {
        strictEqual(events, '');
        strictEqual(es.readyState, EventSource.CLOSED);
        start();
      }, 1000);
    });

    asyncTest("EventSource + close after open", function () {
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + "data:test\n\n"));
      var events = '';
      window.onunhandledrejection = es.onopen = es.onmessage = es.onerror = function (event) {
        events += event.type;
        if (event.type === 'open') {
          es.close();
        }
      };
      window.setTimeout(function () {
        strictEqual(events, 'open');
        strictEqual(es.readyState, EventSource.CLOSED);
        start();
      }, 1000);
    });

  };

  mainTests();
  
  var otherTests = function () {
    var getURL = function (credentials) {
      return location.protocol + "//" + credentials + location.hostname + ":" + location.port + location.pathname.split("/").slice(0, -1).join("/") + "/events";
    };
    var url4CORS = getURL(location.protocol === "https:" ? "http:" : "https");
    var urlWithAuthorization = getURL(location.protocol, "user012:pass012");

    // try with native EventSource in Opera 12
    asyncTest("URL with username and password for Basic Authorization", function () {
      var es = undefined;
      try {
        es = new EventSource(urlWithAuthorization + "?authorization=true&estest=" + encodeURIComponent(commonHeaders + "\n\n" + "\ndata:<authorization>\n\n"));
      } catch (error) {
        if (global.console != undefined) {
          global.console.log(error);
        }
      }
      if (es != undefined) {
        es.onmessage = function (event) {
          var data = event.data;
          ok(data === "Basic dXNlcjAxMjpwYXNzMDEy", data); // window.btoa("user012:pass012")
          es.close();
          start();
        };
        es.onerror = function (event) {
          ok(false, "failed");
          es.close();
          start();
        };
      } else {
        ok(false, "failed");
        start();
      }
    });

    asyncTest("blob: URL", function () {
      if (global.URL != undefined) {
        var es = new EventSource(global.URL.createObjectURL(new global.Blob(["retry:1000\ndata:1\n\n"], {
          type: "text/event-stream;charset=utf-8"
        })));
        var message = "";
        es.onmessage = function (event) {
          message = event.data;
        };
        es.onerror = function (event) {
          ok(message === "1" && es.readyState === EventSource.CONNECTING, "failed");
          es.close();
          start();
        };
      } else {
        ok(false, "failed");
        start();
      }
    });

    asyncTest("data: URL", function () {
      var es = undefined;
      try {
        es = new EventSource("data:text/event-stream;charset=utf-8," + encodeURIComponent("retry:1000\ndata:1\n\n"));
      } catch (error) {
        if (global.console != undefined) {
          global.console.log(error);
        }
      }
      if (es != undefined) {
        var message = "";
        es.onmessage = function (event) {
          message = event.data;
        };
        es.onerror = function (event) {
          ok(message === "1" && es.readyState === EventSource.CONNECTING, "failed");
          es.close();
          start();
        };
      } else {
        ok(false, "failed");
        start();
      }
    });

    asyncTest("Cache-Control: no-store", function () {
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "Cache-Control: max-age=3600\nExpires: " + new Date(new Date().getTime() + 3600000).toUTCString() + "\n\n" + "retry:1000\ndata:<random()>\n\n"));
      var data = "";
      var f = true;
      var counter = 0;
      es.onmessage = function (event) {
        var x = event.data;
        f = data !== x;
        data = x;
        ++counter;
      };
      es.onerror = function () {
        if (counter === 2) {
          es.close();
          ok(f, "failed");
          start();
        }
      };
    });

    asyncTest("EventSource + window.stop", function () {
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + "retry:1000\ndata:abc\n\n<delay(1000)>"));
      var lastEventTime = 0;
      var lastEventType = "";
      var readyStateAtLastEvent = -1;
      es.onmessage =
      es.onerror =
      es.onopen = function (event) {
        lastEventTime = new Date().getTime();
        lastEventType = event.type;
        readyStateAtLastEvent = es.readyState;
      };
      setTimeout(function () {
        if (stop != undefined) {
          stop();
        }
      }, 100);
      setTimeout(function () {
        var isActive = (new Date().getTime() - lastEventTime) < 2500;
        ok(es.readyState === EventSource.CLOSED ? !isActive && lastEventType === "error" && readyStateAtLastEvent === EventSource.CLOSED : isActive, "");
        es.close();
        start();
      }, 4000);
    });

    asyncTest("EventSource + file download", function () {
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + "data:1\n<delay(500)>"));
      location.href = url + "?estest=" + encodeURIComponent(commonHeaders + "Content-Disposition: attachment; filename=\"test.txt\"" + "\n\n" + "test");
      setTimeout(function () {
        ok(es.readyState !== EventSource.CLOSED, es.readyState);
        start();
      }, 2000);
    });

    asyncTest("EventSource constructor", function () {
      var body = "";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      ok(es instanceof EventSource, "failed");
      es.close();
      start();
    });

    asyncTest("EventSource.CLOSED", function () {
      ok(EventSource.CLOSED === 2, "failed");
      start();
    });

    // Opera, Firefox, Chrome: 03
    // IE 9 - Edge 15: 023
    // EventEmitter node.js: 023

    asyncTest("EventTarget addEventListener/removeEventListener", function () {
      var body = "data: test\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = "";
      var listeners = {};
      function a(n) {
        return listeners[n] || (listeners[n] = function () {
          s += n;
          if (n === 0) {
            es.removeEventListener("message", a(0));
            es.removeEventListener("message", a(2));
            es.addEventListener("message", a(4));
            setTimeout(function () {
              es.close();
              strictEqual(s, "03", "EventTarget");
              start();
            }, 0);
          }
        });
      }
      es.addEventListener("message", a(0));
      es.addEventListener("message", a(1));
      es.addEventListener("message", a(2));
      es.addEventListener("message", a(3));
      es.removeEventListener("message", a(1));
    });

    // https://developer.mozilla.org/en/DOM/element.removeEventListener#Browser_compatibility
    // optional useCapture

    // Native EventSource + CORS: Opera 12, Firefox 11, Chrome 26 (WebKit 537.27)
    asyncTest("EventSource CORS", function () {
      var body = "id: <lastEventId(100)>\n" +
                 "data: 0\n\n";
      var es = new EventSource(url4CORS + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));

      es.onmessage = function (event) {
        if (event.lastEventId === "200") {
          ok(true, "ok");
          start();
          es.close();
        }
      };
      es.onerror = function () {
        if (es.readyState === EventSource.CLOSED) {
          ok(false, "not ok");
          start();
          es.close();
        }
      };
    });

    //IE 8 - 9 issue, Native EventSource in Opera 12
    asyncTest("event-stream null character", function () {
      var body = "data: a\n\n" +
                 "data: \x00\n\n" +
                 "data: b\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var ok = false;
      es.onmessage = function (event) {
        if (event.data === "\x00") {
          ok = true;
        }
      };
      es.onerror = function () {
        es.close();
        strictEqual(true, ok);
        start();
      };
    });
    
    asyncTest("EventSource retry delay - see http://code.google.com/p/chromium/issues/detail?id=86230", function () {
      var body = "retry: 800\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = 0;
      es.onopen = function () {
        if (s === 0) {
          s = new Date().getTime();
        } else {
          es.close();
          s = new Date().getTime() - s;
          ok(s >= 750, "!" + s);
          start();
        }
      };
    });

    // buggy with native EventSource in Opera - DSK-362337
    asyncTest("EventSource: event-stream with \"message\", \"error\", \"open\" events", function () {
      var body = "data: a\n\n" +
                 "event: open\ndata: b\n\n" +
                 "event: message\ndata: c\n\n" +
                 "event: error\ndata: d\n\n" +
                 "event:\ndata: e\n\n" +
                 "event: end\ndata: f\n\n";
      var es = new EventSource(url + "?estest=" + encodeURIComponent(commonHeaders + "\n\n" + body));
      var s = "";
      function handler(event) {
        s += event.data || "";
      }
      es.addEventListener("open", handler);
      es.addEventListener("message", handler);
      es.addEventListener("error", handler);
      es.addEventListener("end", handler);
      es.onerror = function (event) {
        if (event.data == undefined) { // !(event instanceof MessageEvent)
          strictEqual(s, "abcdef");
          start();
          es.close();
        }
      };
    });
    
    asyncTest("infinite reconnection", function () {
      var es = new EventSource("http://functionfunction" + Math.floor(Math.random() * 1e10) + ".org");
      var n = 0;
      es.onerror = function () {
        ++n;
        if (es.readyState === EventSource.CLOSED) {
          es.close();
          ok(false, "!");
          start();
        } else {
          if (n === 5) {
            es.close();
            ok(true, "!");
            start();
          }
        }
      };
    });
  };

  //otherTests();
  
}(this));
