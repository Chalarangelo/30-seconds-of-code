<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>WebSocket test</title>
  </head>
  <body>

    <h1>WebSocket test</h1>
    <ul></ul>

    <script type="text/javascript">
      var logger = document.getElementsByTagName('ul')[0],
          Socket = window.MozWebSocket || window.WebSocket,
          protos = ['foo', 'bar', 'xmpp'],
          socket = new Socket('ws://' + location.hostname + ':' + location.port + '/', protos),
          index  = 0;

      var log = function(text) {
        logger.innerHTML += '<li>' + text + '</li>';
      };

      socket.addEventListener('open', function() {
        log('OPEN: ' + socket.protocol);
        socket.send('Hello, world');
      });

      socket.onerror = function(event) {
        log('ERROR: ' + event.message);
      };

      socket.onmessage = function(event) {
        log('MESSAGE: ' + event.data);
        setTimeout(function() { socket.send(++index + ' ' + event.data) }, 2000);
      };

      socket.onclose = function(event) {
        log('CLOSE: ' + event.code + ', ' + event.reason);
      };
    </script>

  </body>
</html>
