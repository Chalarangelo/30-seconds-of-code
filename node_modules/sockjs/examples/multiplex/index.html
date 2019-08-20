<!doctype html>
<html><head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"></script>
    <script src="http://cdn.sockjs.org/websocket-multiplex-0.1.js"></script>
    <style>
      .box {
          width: 300px;
          float: left;
          margin: 0 20px 0 20px;
      }
      .box div, .box input {
          border: 1px solid;
          -moz-border-radius: 4px;
          border-radius: 4px;
          width: 100%;
          padding: 0px;
          margin: 5px;
      }
      .box div {
          border-color: grey;
          height: 300px;
          overflow: auto;
      }
      .box input {
          height: 30px;
      }
      h1 {
          margin-left: 75px;
      }
      body {
          background-color: #F0F0F0;
          font-family: "Arial";
      }
    </style>
</head><body lang="en">
    <h1>SockJS Multiplex example</h1>

    <div id="first" class="box">
      <div></div>
      <form><input autocomplete="off" value="Type here..."></input></form>
    </div>

    <div id="second" class="box">
      <div></div>
      <form><input autocomplete="off"></input></form>
    </div>

    <div id="third" class="box">
      <div></div>
      <form><input autocomplete="off"></input></form>
    </div>

    <script>
        // Pipe - convenience wrapper to present data received from an
        // object supporting WebSocket API in an html element. And the other
        // direction: data typed into an input box shall be sent back.
        var pipe = function(ws, el_name) {
            var div  = $(el_name + ' div');
            var inp  = $(el_name + ' input');
            var form = $(el_name + ' form');

            var print = function(m, p) {
                p = (p === undefined) ? '' : JSON.stringify(p);
                div.append($("<code>").text(m + ' ' + p));
                div.append($("<br>"));
                div.scrollTop(div.scrollTop() + 10000);
            };

            ws.onopen    = function()  {print('[*] open', ws.protocol);};
            ws.onmessage = function(e) {print('[.] message', e.data);};
            ws.onclose   = function()  {print('[*] close');};

            form.submit(function() {
                print('[ ] sending', inp.val());
                ws.send(inp.val());
                inp.val('');
                return false;
            });
        };

        var sockjs_url = '/multiplex';
        var sockjs = new SockJS(sockjs_url);

        var multiplexer = new WebSocketMultiplex(sockjs);
        var ann  = multiplexer.channel('ann');
        var bob  = multiplexer.channel('bob');
        var carl = multiplexer.channel('carl');

        pipe(ann,  '#first');
        pipe(bob,  '#second');
        pipe(carl, '#third');

        $('#first input').focus();
    </script>
</body></html>
