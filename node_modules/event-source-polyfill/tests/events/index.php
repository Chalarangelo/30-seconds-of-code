<?php

  function replace($s, $pattern, $callback) {
    return preg_replace_callback($pattern, function ($matches) use ($callback) {
      $matches[] = null;
      return call_user_func_array($callback, $matches);
    }, $s);
  }

  $lastEventId = floatval(isset($_SERVER["HTTP_LAST_EVENT_ID"]) ? $_SERVER["HTTP_LAST_EVENT_ID"] : 0);
  if ($lastEventId == 0) {
    $lastEventId = floatval(isset($_GET["lastEventId"]) ? $_GET["lastEventId"] : 0);
  }
  $estest = isset($_GET["estest"]) ? $_GET["estest"] : "";
  $headers = replace($estest, "#\n\n[\s\S]*#sui", function () {
    return "";
  });
  $headers = replace($headers, "#[^\n]*#sui", function ($h) {
    header($h);
  });
  $body = replace($estest, "#^[\s\S]*?\n\n#sui", function () {
    return "";
  });
  $body = replace($body, "#\<random\(\)\>#sui", function () {
    return rand();
  });
  $body = replace($body, "#<lastEventId\((\d+)\)>#sui", function ($p, $increment) use ($lastEventId) {
    return $lastEventId + floatval($increment);
  });
  replace($body, "#([\s\S]*?)(?:\<delay\((\d+)\)\>)?#sui", function ($p, $s, $delay) {
    if ($s !== "") {
      echo $s;
      ob_flush();
      flush();
    }
    if ($delay) {
      usleep(floatval($delay) * 1000);
    }
  });

  exit();
?>