### 0.11.3 / 2019-06-10

- Fix a race condition that caused a timeout not to be cancelled immediately
  when the WebSocket is closed

### 0.11.2 / 2019-06-10

(This version was pulled due to an error when publishing)

### 0.11.1 / 2017-01-22

- Forcibly close the I/O stream after a timeout if the peer does not respond
  after calling `close()`

### 0.11.0 / 2016-02-24

- Introduce a `net` option to the `Client` class for setting things like, say,
  `servername`

### 0.10.0 / 2015-07-08

- Add the standard `code` and `reason` parameters to the `close` method

### 0.9.4 / 2015-03-08

- Don't send input to the driver before `start()` is called

### 0.9.3 / 2015-02-19

- Make sure the TCP socket is not left open when closing the connection

### 0.9.2 / 2014-12-21

- Only emit `error` once, and don't emit it after `close`

### 0.9.1 / 2014-12-18

- Check that all options to the WebSocket constructor are recognized

### 0.9.0 / 2014-12-13

- Allow protocol extensions to be passed into websocket-extensions

### 0.8.1 / 2014-11-12

- Send the correct hostname when upgrading a connection to TLS

### 0.8.0 / 2014-11-08

- Support connections via HTTP proxies
- Close the connection cleanly if we're still waiting for a handshake response

### 0.7.3 / 2014-10-04

- Allow sockets to be closed when they are in any state other than `CLOSED`

### 0.7.2 / 2013-12-29

- Make sure the `close` event is emitted by clients on Node v0.10

### 0.7.1 / 2013-12-03

- Support the `maxLength` websocket-driver option
- Make the client emit `error` events on network errors

### 0.7.0 / 2013-09-09

- Allow the server to send custom headers with EventSource responses

### 0.6.1 / 2013-07-05

- Add `ca` option to the client for specifying certificate authorities
- Start the server driver asynchronously so that `onopen` handlers can be added

### 0.6.0 / 2013-05-12

- Add support for custom headers

### 0.5.0 / 2013-05-05

- Extract the protocol handlers into the `websocket-driver` library
- Support the Node streaming API

### 0.4.4 / 2013-02-14

- Emit the `close` event if TCP is closed before CLOSE frame is acked

### 0.4.3 / 2012-07-09

- Add `Connection: close` to EventSource response
- Handle situations where `request.socket` is undefined

### 0.4.2 / 2012-04-06

- Add WebSocket error code `1011`.
- Handle URLs with no path correctly by sending `GET /`

### 0.4.1 / 2012-02-26

- Treat anything other than a `Buffer` as a string when calling `send()`

### 0.4.0 / 2012-02-13

- Add `ping()` method to server-side `WebSocket` and `EventSource`
- Buffer `send()` calls until the draft-76 handshake is complete
- Fix HTTPS problems on Node 0.7

### 0.3.1 / 2012-01-16

- Call `setNoDelay(true)` on `net.Socket` objects to reduce latency

### 0.3.0 / 2012-01-13

- Add support for `EventSource` connections

### 0.2.0 / 2011-12-21

- Add support for `Sec-WebSocket-Protocol` negotiation
- Support `hixie-76` close frames and 75/76 ignored segments
- Improve performance of HyBi parsing/framing functions
- Decouple parsers from TCP and reduce write volume

### 0.1.2 / 2011-12-05

- Detect closed sockets on the server side when TCP connection breaks
- Make `hixie-76` sockets work through HAProxy

### 0.1.1 / 2011-11-30

- Fix `addEventListener()` interface methods

### 0.1.0 / 2011-11-27

- Initial release, based on WebSocket components from Faye
