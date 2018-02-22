# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.

from functools import partial
import errno
import sys

try:
    import eventlet
except ImportError:
    raise RuntimeError("You need eventlet installed to use this worker.")

# validate the eventlet version
if eventlet.version_info < (0, 9, 7):
    raise RuntimeError("You need eventlet >= 0.9.7")


from eventlet import hubs, greenthread
from eventlet.greenio import GreenSocket
from eventlet.hubs import trampoline
from eventlet.wsgi import ALREADY_HANDLED as EVENTLET_ALREADY_HANDLED
import greenlet

from gunicorn.http.wsgi import sendfile as o_sendfile
from gunicorn.workers.async import AsyncWorker

def _eventlet_sendfile(fdout, fdin, offset, nbytes):
    while True:
        try:
            return o_sendfile(fdout, fdin, offset, nbytes)
        except OSError as e:
            if e.args[0] == errno.EAGAIN:
                trampoline(fdout, write=True)
            else:
                raise


def _eventlet_serve(sock, handle, concurrency):
    """
    Serve requests forever.

    This code is nearly identical to ``eventlet.convenience.serve`` except
    that it attempts to join the pool at the end, which allows for gunicorn
    graceful shutdowns.
    """
    pool = eventlet.greenpool.GreenPool(concurrency)
    server_gt = eventlet.greenthread.getcurrent()

    while True:
        try:
            conn, addr = sock.accept()
            gt = pool.spawn(handle, conn, addr)
            gt.link(_eventlet_stop, server_gt, conn)
            conn, addr, gt = None, None, None
        except eventlet.StopServe:
            sock.close()
            pool.waitall()
            return


def _eventlet_stop(client, server, conn):
    """
    Stop a greenlet handling a request and close its connection.

    This code is lifted from eventlet so as not to depend on undocumented
    functions in the library.
    """
    try:
        try:
            client.wait()
        finally:
            conn.close()
    except greenlet.GreenletExit:
        pass
    except Exception:
        greenthread.kill(server, *sys.exc_info())


def patch_sendfile():
    from gunicorn.http import wsgi

    if o_sendfile is not None:
        setattr(wsgi, "sendfile", _eventlet_sendfile)


class EventletWorker(AsyncWorker):

    def patch(self):
        hubs.use_hub()
        eventlet.monkey_patch(os=False)
        patch_sendfile()

    def is_already_handled(self, respiter):
        if respiter == EVENTLET_ALREADY_HANDLED:
            raise StopIteration()
        else:
            return super(EventletWorker, self).is_already_handled(respiter)

    def init_process(self):
        self.patch()
        super(EventletWorker, self).init_process()

    def handle_quit(self, sig, frame):
        eventlet.spawn(super(EventletWorker, self).handle_quit, sig, frame)

    def timeout_ctx(self):
        return eventlet.Timeout(self.cfg.keepalive or None, False)

    def handle(self, listener, client, addr):
        if self.cfg.is_ssl:
            client = eventlet.wrap_ssl(client, server_side=True,
                                       **self.cfg.ssl_options)

        super(EventletWorker, self).handle(listener, client, addr)

    def run(self):
        acceptors = []
        for sock in self.sockets:
            gsock = GreenSocket(sock)
            gsock.setblocking(1)
            hfun = partial(self.handle, gsock)
            acceptor = eventlet.spawn(_eventlet_serve, gsock, hfun,
                                      self.worker_connections)

            acceptors.append(acceptor)
            eventlet.sleep(0.0)

        while self.alive:
            self.notify()
            eventlet.sleep(1.0)

        self.notify()
        try:
            with eventlet.Timeout(self.cfg.graceful_timeout) as t:
                [a.kill(eventlet.StopServe()) for a in acceptors]
                [a.wait() for a in acceptors]
        except eventlet.Timeout as te:
            if te != t:
                raise
            [a.kill() for a in acceptors]
