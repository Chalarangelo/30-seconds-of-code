<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>EventSource test</title>
  </head>
  <body>

    <h1>EventSource test</h1>
    <ul></ul>

    <script type="text/javascript">
      var logger = document.getElementsByTagName('ul')[0],
          socket = new EventSource('/');

      var log = function(text) {
        logger.innerHTML += '<li>' + text + '</li>';
      };

      socket.onopen = function() {
        log('OPEN');
      };

      socket.onmessage = function(event) {
        log('MESSAGE: ' + event.data);
      };

      socket.addEventListener('update', function(event) {
        log('UPDATE(' + event.lastEventId + '): ' + event.data);
      });

      socket.onerror = function(event) {
        log('ERROR: ' + event.message);
      };
    </script>

  </body>
</html>
