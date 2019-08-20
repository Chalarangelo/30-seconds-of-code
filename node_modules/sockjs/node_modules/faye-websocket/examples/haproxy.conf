defaults
   mode http
   timeout client  5s
   timeout connect 5s
   timeout server  5s

frontend all 0.0.0.0:3000
   mode http
   timeout client 120s

   option forwardfor
   option http-server-close
   option http-pretend-keepalive

   default_backend sockets

backend sockets
   balance uri depth 2
   timeout server  120s
   server socket1 127.0.0.1:7000
