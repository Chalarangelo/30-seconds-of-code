# Requires recent Haproxy to work with websockets (for example 1.4.16).
defaults
    mode http
    # Set timeouts to your needs
    timeout client  5s
    timeout connect 5s
    timeout server  5s

frontend all 0.0.0.0:8888
    mode http
    timeout client 120s

    option forwardfor
    # Fake connection:close, required in this setup.
    option http-server-close
    option http-pretend-keepalive

    acl is_sockjs path_beg /echo /broadcast /close
    acl is_stats  path_beg /stats

    use_backend sockjs if is_sockjs
    use_backend stats if is_stats
    default_backend static


backend sockjs
    # Load-balance according to hash created from first two
    # directories in url path. For example requests going to /1/
    # should be handled by single server (assuming resource prefix is
    # one-level deep, like "/echo").
    balance uri depth 2
    timeout server  120s
    server srv_sockjs1 127.0.0.1:9999
    # server srv_sockjs2 127.0.0.1:9998

backend static
    balance roundrobin
    server srv_static 127.0.0.1:8000

backend stats
    stats uri /stats
    stats enable
