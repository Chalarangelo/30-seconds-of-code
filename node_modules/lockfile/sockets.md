to ACQUIRE(lockname)
- create server, listen on lockname
  - if enotsock, WATCH(lockname)
  - if eaddrinuse,
    - CONNECT(lockname)
  - unref server
  - lock has been acquired via server
  ! on connection, place sockets in queue

to RELEASE(lockname)
- if acquired via connection
  - disconnect
- if acquired via server
  - send "OK" to front-most connection
    - when connection disconnects, RELEASE(lockname)
- if acquired via filename
  - unlink file

to CONNECT(lockname)
- net.connect(lockname)
  - if enoent or socket termination, ACQUIRE(lockname)
  - when server says "OK",
    - lock has been acquired via connection

to WATCH(lockname)
- fs.watch(lockname)
- on change, ACQUIRE(lockname)
