# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.

import base64
import binascii
import time
import logging
logging.Logger.manager.emittedNoHandlerWarning = 1
from logging.config import fileConfig
import os
import socket
import sys
import threading
import traceback

from gunicorn import util
from gunicorn.six import PY3, string_types


# syslog facility codes
SYSLOG_FACILITIES = {
        "auth":     4,
        "authpriv": 10,
        "cron":     9,
        "daemon":   3,
        "ftp":      11,
        "kern":     0,
        "lpr":      6,
        "mail":     2,
        "news":     7,
        "security": 4,  #  DEPRECATED
        "syslog":   5,
        "user":     1,
        "uucp":     8,
        "local0":   16,
        "local1":   17,
        "local2":   18,
        "local3":   19,
        "local4":   20,
        "local5":   21,
        "local6":   22,
        "local7":   23
        }


CONFIG_DEFAULTS = dict(
        version=1,
        disable_existing_loggers=False,

        loggers={
            "root": {"level": "INFO", "handlers": ["console"]},
            "gunicorn.error": {
                "level": "INFO",
                "handlers": ["error_console"],
                "propagate": True,
                "qualname": "gunicorn.error"
            },

            "gunicorn.access": {
                "level": "INFO",
                "handlers": ["console"],
                "propagate": True,
                "qualname": "gunicorn.access"
            }
        },
        handlers={
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "generic",
                "stream": "sys.stdout"
            },
            "error_console": {
                "class": "logging.StreamHandler",
                "formatter": "generic",
                "stream": "sys.stderr"
            },
        },
        formatters={
            "generic": {
                "format": "%(asctime)s [%(process)d] [%(levelname)s] %(message)s",
                "datefmt": "[%Y-%m-%d %H:%M:%S %z]",
                "class": "logging.Formatter"
            }
        }
)


def loggers():
    """ get list of all loggers """
    root = logging.root
    existing = root.manager.loggerDict.keys()
    return [logging.getLogger(name) for name in existing]


class SafeAtoms(dict):

    def __init__(self, atoms):
        dict.__init__(self)
        for key, value in atoms.items():
            if isinstance(value, string_types):
                self[key] = value.replace('"', '\\"')
            else:
                self[key] = value

    def __getitem__(self, k):
        if k.startswith("{"):
            kl = k.lower()
            if kl in self:
                return super(SafeAtoms, self).__getitem__(kl)
            else:
                return "-"
        if k in self:
            return super(SafeAtoms, self).__getitem__(k)
        else:
            return '-'


def parse_syslog_address(addr):

    if addr.startswith("unix://"):
        sock_type = socket.SOCK_STREAM

        # are we using a different socket type?
        parts = addr.split("#", 1)
        if len(parts) == 2:
            addr = parts[0]
            if parts[1] == "dgram":
                sock_type = socket.SOCK_DGRAM

        return (sock_type, addr.split("unix://")[1])

    if addr.startswith("udp://"):
        addr = addr.split("udp://")[1]
        socktype = socket.SOCK_DGRAM
    elif addr.startswith("tcp://"):
        addr = addr.split("tcp://")[1]
        socktype = socket.SOCK_STREAM
    else:
        raise RuntimeError("invalid syslog address")

    if '[' in addr and ']' in addr:
        host = addr.split(']')[0][1:].lower()
    elif ':' in addr:
        host = addr.split(':')[0].lower()
    elif addr == "":
        host = "localhost"
    else:
        host = addr.lower()

    addr = addr.split(']')[-1]
    if ":" in addr:
        port = addr.split(':', 1)[1]
        if not port.isdigit():
            raise RuntimeError("%r is not a valid port number." % port)
        port = int(port)
    else:
        port = 514

    return (socktype, (host, port))


class Logger(object):

    LOG_LEVELS = {
        "critical": logging.CRITICAL,
        "error": logging.ERROR,
        "warning": logging.WARNING,
        "info": logging.INFO,
        "debug": logging.DEBUG
    }
    loglevel = logging.INFO

    error_fmt = r"%(asctime)s [%(process)d] [%(levelname)s] %(message)s"
    datefmt = r"[%Y-%m-%d %H:%M:%S %z]"

    access_fmt = "%(message)s"
    syslog_fmt = "[%(process)d] %(message)s"

    atoms_wrapper_class = SafeAtoms

    def __init__(self, cfg):
        self.error_log = logging.getLogger("gunicorn.error")
        self.error_log.propagate = False
        self.access_log = logging.getLogger("gunicorn.access")
        self.access_log.propagate = False
        self.error_handlers = []
        self.access_handlers = []
        self.logfile = None
        self.lock = threading.Lock()
        self.cfg = cfg
        self.setup(cfg)

    def setup(self, cfg):
        self.loglevel = self.LOG_LEVELS.get(cfg.loglevel.lower(), logging.INFO)
        self.error_log.setLevel(self.loglevel)
        self.access_log.setLevel(logging.INFO)

        # set gunicorn.error handler
        if self.cfg.capture_output and cfg.errorlog != "-":
            for stream in sys.stdout, sys.stderr:
                stream.flush()

            self.logfile = open(cfg.errorlog, 'a+')
            os.dup2(self.logfile.fileno(), sys.stdout.fileno())
            os.dup2(self.logfile.fileno(), sys.stderr.fileno())

        self._set_handler(self.error_log, cfg.errorlog,
                          logging.Formatter(self.error_fmt, self.datefmt))

        # set gunicorn.access handler
        if cfg.accesslog is not None:
            self._set_handler(self.access_log, cfg.accesslog,
                fmt=logging.Formatter(self.access_fmt), stream=sys.stdout)

        # set syslog handler
        if cfg.syslog:
            self._set_syslog_handler(
                self.error_log, cfg, self.syslog_fmt, "error"
            )
            self._set_syslog_handler(
                self.access_log, cfg, self.syslog_fmt, "access"
            )

        if cfg.logconfig:
            if os.path.exists(cfg.logconfig):
                defaults = CONFIG_DEFAULTS.copy()
                defaults['__file__'] = cfg.logconfig
                defaults['here'] = os.path.dirname(cfg.logconfig)
                fileConfig(cfg.logconfig, defaults=defaults,
                           disable_existing_loggers=False)
            else:
                msg = "Error: log config '%s' not found"
                raise RuntimeError(msg % cfg.logconfig)

    def critical(self, msg, *args, **kwargs):
        self.error_log.critical(msg, *args, **kwargs)

    def error(self, msg, *args, **kwargs):
        self.error_log.error(msg, *args, **kwargs)

    def warning(self, msg, *args, **kwargs):
        self.error_log.warning(msg, *args, **kwargs)

    def info(self, msg, *args, **kwargs):
        self.error_log.info(msg, *args, **kwargs)

    def debug(self, msg, *args, **kwargs):
        self.error_log.debug(msg, *args, **kwargs)

    def exception(self, msg, *args, **kwargs):
        self.error_log.exception(msg, *args, **kwargs)

    def log(self, lvl, msg, *args, **kwargs):
        if isinstance(lvl, string_types):
            lvl = self.LOG_LEVELS.get(lvl.lower(), logging.INFO)
        self.error_log.log(lvl, msg, *args, **kwargs)

    def atoms(self, resp, req, environ, request_time):
        """ Gets atoms for log formating.
        """
        status = resp.status
        if isinstance(status, str):
            status = status.split(None, 1)[0]
        atoms = {
            'h': environ.get('REMOTE_ADDR', '-'),
            'l': '-',
            'u': self._get_user(environ) or '-',
            't': self.now(),
            'r': "%s %s %s" % (environ['REQUEST_METHOD'],
                environ['RAW_URI'], environ["SERVER_PROTOCOL"]),
            's': status,
            'm': environ.get('REQUEST_METHOD'),
            'U': environ.get('PATH_INFO'),
            'q': environ.get('QUERY_STRING'),
            'H': environ.get('SERVER_PROTOCOL'),
            'b': getattr(resp, 'sent', None) and str(resp.sent) or '-',
            'B': getattr(resp, 'sent', None),
            'f': environ.get('HTTP_REFERER', '-'),
            'a': environ.get('HTTP_USER_AGENT', '-'),
            'T': request_time.seconds,
            'D': (request_time.seconds*1000000) + request_time.microseconds,
            'L': "%d.%06d" % (request_time.seconds, request_time.microseconds),
            'p': "<%s>" % os.getpid()
        }

        # add request headers
        if hasattr(req, 'headers'):
            req_headers = req.headers
        else:
            req_headers = req

        if hasattr(req_headers, "items"):
            req_headers = req_headers.items()

        atoms.update(dict([("{%s}i" % k.lower(), v) for k, v in req_headers]))

        resp_headers = resp.headers
        if hasattr(resp_headers, "items"):
            resp_headers = resp_headers.items()

        # add response headers
        atoms.update(dict([("{%s}o" % k.lower(), v) for k, v in resp_headers]))

        # add environ variables
        environ_variables = environ.items()
        atoms.update(dict([("{%s}e" % k.lower(), v) for k, v in environ_variables]))

        return atoms

    def access(self, resp, req, environ, request_time):
        """ See http://httpd.apache.org/docs/2.0/logs.html#combined
        for format details
        """

        if not (self.cfg.accesslog or self.cfg.logconfig or self.cfg.syslog):
            return

        # wrap atoms:
        # - make sure atoms will be test case insensitively
        # - if atom doesn't exist replace it by '-'
        safe_atoms = self.atoms_wrapper_class(self.atoms(resp, req, environ,
            request_time))

        try:
            self.access_log.info(self.cfg.access_log_format % safe_atoms)
        except:
            self.error(traceback.format_exc())

    def now(self):
        """ return date in Apache Common Log Format """
        return time.strftime('[%d/%b/%Y:%H:%M:%S %z]')

    def reopen_files(self):
        if self.cfg.capture_output and self.cfg.errorlog != "-":
            for stream in sys.stdout, sys.stderr:
                stream.flush()

            with self.lock:
                if self.logfile is not None:
                    self.logfile.close()
                self.logfile = open(self.cfg.errorlog, 'a+')
                os.dup2(self.logfile.fileno(), sys.stdout.fileno())
                os.dup2(self.logfile.fileno(), sys.stderr.fileno())


        for log in loggers():
            for handler in log.handlers:
                if isinstance(handler, logging.FileHandler):
                    handler.acquire()
                    try:
                        if handler.stream:
                            handler.stream.close()
                            handler.stream = open(handler.baseFilename,
                                    handler.mode)
                    finally:
                        handler.release()

    def close_on_exec(self):
        for log in loggers():
            for handler in log.handlers:
                if isinstance(handler, logging.FileHandler):
                    handler.acquire()
                    try:
                        if handler.stream:
                            util.close_on_exec(handler.stream.fileno())
                    finally:
                        handler.release()

    def _get_gunicorn_handler(self, log):
        for h in log.handlers:
            if getattr(h, "_gunicorn", False):
                return h

    def _set_handler(self, log, output, fmt, stream=None):
        # remove previous gunicorn log handler
        h = self._get_gunicorn_handler(log)
        if h:
            log.handlers.remove(h)

        if output is not None:
            if output == "-":
                h = logging.StreamHandler(stream)
            else:
                util.check_is_writeable(output)
                h = logging.FileHandler(output)
                # make sure the user can reopen the file
                try:
                    os.chown(h.baseFilename, self.cfg.user, self.cfg.group)
                except OSError:
                    # it's probably OK there, we assume the user has given
                    # /dev/null as a parameter.
                    pass

            h.setFormatter(fmt)
            h._gunicorn = True
            log.addHandler(h)

    def _set_syslog_handler(self, log, cfg, fmt, name):
        # setup format
        if not cfg.syslog_prefix:
            prefix = cfg.proc_name.replace(":", ".")
        else:
            prefix = cfg.syslog_prefix

        prefix = "gunicorn.%s.%s" % (prefix, name)

        # set format
        fmt = logging.Formatter(r"%s: %s" % (prefix, fmt))

        # syslog facility
        try:
            facility = SYSLOG_FACILITIES[cfg.syslog_facility.lower()]
        except KeyError:
            raise RuntimeError("unknown facility name")

        # parse syslog address
        socktype, addr = parse_syslog_address(cfg.syslog_addr)

        # finally setup the syslog handler
        if sys.version_info >= (2, 7):
            h = logging.handlers.SysLogHandler(address=addr,
                    facility=facility, socktype=socktype)
        else:
            # socktype is only supported in 2.7 and sup
            # fix issue #541
            h = logging.handlers.SysLogHandler(address=addr,
                    facility=facility)

        h.setFormatter(fmt)
        h._gunicorn = True
        log.addHandler(h)

    def _get_user(self, environ):
        user = None
        http_auth = environ.get("HTTP_AUTHORIZATION")
        if http_auth and http_auth.startswith('Basic'):
            auth = http_auth.split(" ", 1)
            if len(auth) == 2:
                try:
                    # b64decode doesn't accept unicode in Python < 3.3
                    # so we need to convert it to a byte string
                    auth = base64.b64decode(auth[1].strip().encode('utf-8'))
                    if PY3:  # b64decode returns a byte string in Python 3
                        auth = auth.decode('utf-8')
                    auth = auth.split(":", 1)
                except TypeError as exc:
                    self.debug("Couldn't get username: %s", exc)
                    return user
                except binascii.Error as exc:
                    self.debug("Couldn't get username: %s", exc)
                    return user
                if len(auth) == 2:
                    user = auth[0]
        return user
