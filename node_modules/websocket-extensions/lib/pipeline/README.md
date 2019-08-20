# Extension pipelining

`websocket-extensions` models the extension negotiation and processing pipeline
of the WebSocket protocol. Between the driver parsing messages from the TCP
stream and handing those messages off to the application, there may exist a
stack of extensions that transform the message somehow.

In the parlance of this framework, a *session* refers to a single instance of an
extension, acting on a particular socket on either the server or the client
side. A session may transform messages both incoming to the application and
outgoing from the application, for example the `permessage-deflate` extension
compresses outgoing messages and decompresses incoming messages. Message streams
in either direction are independent; that is, incoming and outgoing messages
cannot be assumed to 'pair up' as in a request-response protocol.

Asynchronous processing of messages poses a number of problems that this
pipeline construction is intended to solve.


## Overview

Logically, we have the following:


    +-------------+  out  +---+     +---+     +---+       +--------+
    |             |------>|   |---->|   |---->|   |------>|        |
    | Application |       | A |     | B |     | C |       | Driver |
    |             |<------|   |<----|   |<----|   |<------|        |
    +-------------+  in   +---+     +---+     +---+       +--------+

                          \                       /
                           +----------o----------+
                                      |
                                   sessions


For outgoing messages, the driver receives the result of

        C.outgoing(B.outgoing(A.outgoing(message)))

    or, [A, B, C].reduce(((m, ext) => ext.outgoing(m)), message)

For incoming messages, the application receives the result of

        A.incoming(B.incoming(C.incoming(message)))

    or, [C, B, A].reduce(((m, ext) => ext.incoming(m)), message)

A session is of the following type, to borrow notation from pseudo-Haskell:

    type Session = {
      incoming :: Message -> Message
      outgoing :: Message -> Message
      close    :: () -> ()
    }

(That `() -> ()` syntax is intended to mean that `close()` is a nullary void
method; I apologise to any Haskell readers for not using the right monad.)

The `incoming()` and `outgoing()` methods perform message transformation in the
respective directions; `close()` is called when a socket closes so the session
can release any resources it's holding, for example a DEFLATE de/compression
context.

However because this is JavaScript, the `incoming()` and `outgoing()` methods
may be asynchronous (indeed, `permessage-deflate` is based on `zlib`, whose API
is stream-based). So their interface is strictly:

    type Session = {
      incoming :: Message -> Callback -> ()
      outgoing :: Message -> Callback -> ()
      close    :: () -> ()
    }

    type Callback = Either Error Message -> ()

This means a message *m2* can be pushed into a session while it's still
processing the preceding message *m1*. The messages can be processed
concurrently but they *must* be given to the next session in line (or to the
application) in the same order they came in. Applications will expect to receive
messages in the order they arrived over the wire, and sessions require this too.
So ordering of messages must be preserved throughout the pipeline.

Consider the following highly simplified extension that deflates messages on the
wire. `message` is a value conforming the type:

    type Message = {
      rsv1   :: Boolean
      rsv2   :: Boolean
      rsv3   :: Boolean
      opcode :: Number
      data   :: Buffer
    }

Here's the extension:

```js
var zlib = require('zlib');

var deflate = {
  outgoing: function(message, callback) {
    zlib.deflateRaw(message.data, function(error, result) {
      message.rsv1 = true;
      message.data = result;
      callback(error, message);
    });
  },

  incoming: function(message, callback) {
    // decompress inbound messages (elided)
  },

  close: function() {
    // no state to clean up
  }
};
```

We can call it with a large message followed by a small one, and the small one
will be returned first:

```js
var crypto = require('crypto'),
    large  = crypto.randomBytes(1 << 14),
    small  = new Buffer('hi');

deflate.outgoing({data: large}, function() {
  console.log(1, 'large');
});

deflate.outgoing({data: small}, function() {
  console.log(2, 'small');
});

/* prints:  2 'small'
            1 'large' */
```

So a session that processes messages asynchronously may fail to preserve message
ordering.

Now, this extension is stateless, so it can process messages in any order and
still produce the same output. But some extensions are stateful and require
message order to be preserved.

For example, when using `permessage-deflate` without `no_context_takeover` set,
the session retains a DEFLATE de/compression context between messages, which
accumulates state as it consumes data (later messages can refer to sections of
previous ones to improve compression). Reordering parts of the DEFLATE stream
will result in a failed decompression. Messages must be decompressed in the same
order they were compressed by the peer in order for the DEFLATE protocol to
work.

Finally, there is the problem of closing a socket. When a WebSocket is closed by
the application, or receives a closing request from the other peer, there may be
messages outgoing from the application and incoming from the peer in the
pipeline. If we close the socket and pipeline immediately, two problems arise:

* We may send our own closing frame to the peer before all prior messages we
  sent have been written to the socket, and before we have finished processing
  all prior messages from the peer
* The session may be instructed to close its resources (e.g. its de/compression
  context) while it's in the middle of processing a message, or before it has
  received messages that are upstream of it in the pipeline

Essentially, we must defer closing the sessions and sending a closing frame
until after all prior messages have exited the pipeline.


## Design goals

* Message order must be preserved between the protocol driver, the extension
  sessions, and the application
* Messages should be handed off to sessions and endpoints as soon as possible,
  to maximise throughput of stateless sessions
* The closing procedure should block any further messages from entering the
  pipeline, and should allow all existing messages to drain
* Sessions should be closed as soon as possible to prevent them holding memory
  and other resources when they have no more messages to handle
* The closing API should allow the caller to detect when the pipeline is empty
  and it is safe to continue the WebSocket closing procedure
* Individual extensions should remain as simple as possible to facilitate
  modularity and independent authorship

The final point about modularity is an important one: this framework is designed
to facilitate extensions existing as plugins, by decoupling the protocol driver,
extensions, and application. In an ideal world, plugins should only need to
contain code for their specific functionality, and not solve these problems that
apply to all sessions. Also, solving some of these problems requires
consideration of all active sessions collectively, which an individual session
is incapable of doing.

For example, it is entirely possible to take the simple `deflate` extension
above and wrap its `incoming()` and `outgoing()` methods in two `Transform`
streams, producing this type:

    type Session = {
      incoming :: TransformStream
      outtoing :: TransformStream
      close    :: () -> ()
    }

The `Transform` class makes it easy to wrap an async function such that message
order is preserved:

```js
var stream  = require('stream'),
    session = new stream.Transform({objectMode: true});

session._transform = function(message, _, callback) {
  var self = this;
  deflate.outgoing(message, function(error, result) {
    self.push(result);
    callback();
  });
};
```

However, this has a negative impact on throughput: it works by deferring
`callback()` until the async function has 'returned', which blocks `Transform`
from passing further input into the `_transform()` method until the current
message is dealt with completely. This would prevent sessions from processing
messages concurrently, and would unnecessarily reduce the throughput of
stateless extensions.

So, input should be handed off to sessions as soon as possible, and all we need
is a mechanism to reorder the output so that message order is preserved for the
next session in line.


## Solution

We now describe the model implemented here and how it meets the above design
goals. The above diagram where a stack of extensions sit between the driver and
application describes the data flow, but not the object graph. That looks like
this:


            +--------+
            | Driver |
            +---o----+
                |
                V
          +------------+      +----------+
          | Extensions o----->| Pipeline |
          +------------+      +-----o----+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+


A driver using this framework holds an instance of the `Extensions` class, which
it uses to register extension plugins, negotiate headers and transform messages.
The `Extensions` instance itself holds a `Pipeline`, which contains an array of
`Cell` objects, each of which wraps one of the sessions.


### Message processing

Both the `Pipeline` and `Cell` classes have `incoming()` and `outgoing()`
methods; the `Pipeline` interface pushes messages into the pipe, delegates the
message to each `Cell` in turn, then returns it back to the driver. Outgoing
messages pass through `A` then `B` then `C`, and incoming messages in the
reverse order.

Internally, a `Cell` contains two `Functor` objects. A `Functor` wraps an async
function and makes sure its output messages maintain the order of its input
messages. This name is due to [@fronx](https://github.com/fronx), on the basis
that, by preserving message order, the abstraction preserves the *mapping*
between input and output messages. To use our simple `deflate` extension from
above:

```js
var functor = new Functor(deflate, 'outgoing');

functor.call({data: large}, function() {
  console.log(1, 'large');
});

functor.call({data: small}, function() {
  console.log(2, 'small');
});

/*  ->  1 'large'
        2 'small' */
```

A `Cell` contains two of these, one for each direction:


                            +-----------------------+
                      +---->| Functor [A, incoming] |
    +----------+      |     +-----------------------+
    | Cell [A] o------+
    +----------+      |     +-----------------------+
                      +---->| Functor [A, outgoing] |
                            +-----------------------+


This satisfies the message transformation requirements: the `Pipeline` simply
loops over the cells in the appropriate direction to transform each message.
Because each `Cell` will preserve message order, we can pass a message to the
next `Cell` in line as soon as the current `Cell` returns it. This gives each
`Cell` all the messages in order while maximising throughput.


### Session closing

We want to close each session as soon as possible, after all existing messages
have drained. To do this, each `Cell` begins with a pending message counter in
each direction, labelled `in` and `out` below.


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 0          out: 0          out: 0


When a message *m1* enters the pipeline, say in the `outgoing` direction, we
increment the `pending.out` counter on all cells immediately.


                              +----------+
                        m1 => | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 1          out: 1          out: 1


*m1* is handed off to `A`, meanwhile a second message `m2` arrives in the same
direction. All `pending.out` counters are again incremented.


                              +----------+
                        m2 => | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                m1  |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 2          out: 2          out: 2


When the first cell's `A.outgoing` functor finishes processing *m1*, the first
`pending.out` counter is decremented and *m1* is handed off to cell `B`.


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                m2  |           m1  |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 1          out: 2          out: 2



As `B` finishes with *m1*, and as `A` finishes with *m2*, the `pending.out`
counters continue to decrement.


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |           m2  |           m1  |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 0          out: 1          out: 2



Say `C` is a little slow, and begins processing *m2* while still processing
*m1*. That's fine, the `Functor` mechanism will keep *m1* ahead of *m2* in the
output.


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |           m2  | m1
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 0          out: 0          out: 2


Once all messages are dealt with, the counters return to `0`.


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 0          out: 0          out: 0


The same process applies in the `incoming` direction, the only difference being
that messages are passed to `C` first.

This makes closing the sessions quite simple. When the driver wants to close the
socket, it calls `Pipeline.close()`. This *immediately* calls `close()` on all
the cells. If a cell has `in == out == 0`, then it immediately calls
`session.close()`. Otherwise, it stores the closing call and defers it until
`in` and `out` have both ticked down to zero. The pipeline will not accept new
messages after `close()` has been called, so we know the pending counts will not
increase after this point.

This means each session is closed as soon as possible: `A` can close while the
slow `C` session is still working, because it knows there are no more messages
on the way. Similarly, `C` will defer closing if `close()` is called while *m1*
is still in `B`, and *m2* in `A`, because its pending count means it knows it
has work yet to do, even if it's not received those messages yet. This concern
cannot be addressed by extensions acting only on their own local state, unless
we pollute individual extensions by making them all implement this same
mechanism.

The actual closing API at each level is slightly different:

    type Session = {
      close :: () -> ()
    }

    type Cell = {
      close :: () -> Promise ()
    }

    type Pipeline = {
      close :: Callback -> ()
    }

This might appear inconsistent so it's worth explaining. Remember that a
`Pipeline` holds a list of `Cell` objects, each wrapping a `Session`. The driver
talks (via the `Extensions` API) to the `Pipeline` interface, and it wants
`Pipeline.close()` to do two things: close all the sessions, and tell me when
it's safe to start the closing procedure (i.e. when all messages have drained
from the pipe and been handed off to the application or socket). A callback API
works well for that.

At the other end of the stack, `Session.close()` is a nullary void method with
no callback or promise API because we don't care what it does, and whatever it
does do will not block the WebSocket protocol; we're not going to hold off
processing messages while a session closes its de/compression context. We just
tell it to close itself, and don't want to wait while it does that.

In the middle, `Cell.close()` returns a promise rather than using a callback.
This is for two reasons. First, `Cell.close()` might not do anything
immediately, it might have to defer its effect while messages drain. So, if
given a callback, it would have to store it in a queue for later execution.
Callbacks work fine if your method does something and can then invoke the
callback itself, but if you need to store callbacks somewhere so another method
can execute them, a promise is a better fit. Second, it better serves the
purposes of `Pipeline.close()`: it wants to call `close()` on each of a list of
cells, and wait for all of them to finish. This is simple and idiomatic using
promises:

```js
var closed = cells.map((cell) => cell.close());
Promise.all(closed).then(callback);
```

(We don't actually use a full *Promises/A+* compatible promise here, we use a
much simplified construction that acts as a callback aggregater and resolves
synchronously and does not support chaining, but the principle is the same.)


### Error handling

We've not mentioned error handling so far but it bears some explanation. The
above counter system still applies, but behaves slightly differently in the
presence of errors.

Say we push three messages into the pipe in the outgoing direction:


                              +----------+
                m3, m2, m1 => | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 3          out: 3          out: 3


They pass through the cells successfully up to this point:


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                m3  |           m2  |           m1  |
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 1          out: 2          out: 3


At this point, session `B` produces an error while processing *m2*, that is *m2*
becomes *e2*. *m1* is still in the pipeline, and *m3* is queued behind *m2*.
What ought to happen is that *m1* is handed off to the socket, then *m2* is
released to the driver, which will detect the error and begin closing the
socket. No further processing should be done on *m3* and it should not be
released to the driver after the error is emitted.

To handle this, we allow errors to pass down the pipeline just like messages do,
to maintain ordering. But, once a cell sees its session produce an error, or it
receives an error from upstream, it should refuse to accept any further
messages. Session `B` might have begun processing *m3* by the time it produces
the error *e2*, but `C` will have been given *e2* before it receives *m3*, and
can simply drop *m3*.

Now, say *e2* reaches the slow session `C` while *m1* is still present,
meanwhile *m3* has been dropped. `C` will never receive *m3* since it will have
been dropped upstream. Under the present model, its `out` counter will be `3`
but it is only going to emit two more values: *m1* and *e2*. In order for
closing to work, we need to decrement `out` to reflect this. The situation
should look like this:


                              +----------+
                              | Pipeline |
                              +-----o----+
                                    |
                    +---------------+---------------+
                    |               |           e2  | m1
              +-----o----+    +-----o----+    +-----o----+
              | Cell [A] |    | Cell [B] |    | Cell [C] |
              +----------+    +----------+    +----------+
                 in: 0           in: 0           in: 0
                out: 0          out: 0          out: 2


When a cell sees its session emit an error, or when it receives an error from
upstream, it sets its pending count in the appropriate direction to equal the
number of messages it is *currently* processing. It will not accept any messages
after it sees the error, so this will allow the counter to reach zero.

Note that while *e2* is in the pipeline, `Pipeline` should drop any further
messages in the outgoing direction, but should continue to accept incoming
messages. Until *e2* makes it out of the pipe to the driver, behind previous
successful messages, the driver does not know an error has happened, and a
message may arrive over the socket and make it all the way through the incoming
pipe in the meantime. We only halt processing in the affected direction to avoid
doing unnecessary work since messages arriving after an error should not be
processed.

Some unnecessary work may happen, for example any messages already in the
pipeline following *m2* will be processed by `A`, since it's upstream of the
error. Those messages will be dropped by `B`.


## Alternative ideas

I am considering implementing `Functor` as an object-mode transform stream
rather than what is essentially an async function. Being object-mode, a stream
would preserve message boundaries and would also possibly help address
back-pressure. I'm not sure whether this would require external API changes so
that such streams could be connected to the downstream driver's streams.


## Acknowledgements

Credit is due to [@mnowster](https://github.com/mnowster) for helping with the
design and to [@fronx](https://github.com/fronx) for helping name things.
