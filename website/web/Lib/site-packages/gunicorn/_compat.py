import sys

from gunicorn import six

PY26 = (sys.version_info[:2] == (2, 6))
PY33 = (sys.version_info >= (3, 3))


def _check_if_pyc(fname):
    """Return True if the extension is .pyc, False if .py
    and None if otherwise"""
    from imp import find_module
    from os.path import realpath, dirname, basename, splitext

    # Normalize the file-path for the find_module()
    filepath = realpath(fname)
    dirpath = dirname(filepath)
    module_name = splitext(basename(filepath))[0]

    # Validate and fetch
    try:
        fileobj, fullpath, (_, _, pytype) = find_module(module_name, [dirpath])
    except ImportError:
        raise IOError("Cannot find config file. "
                      "Path maybe incorrect! : {0}".format(filepath))
    return pytype, fileobj, fullpath


def _get_codeobj(pyfile):
    """ Returns the code object, given a python file """
    from imp import PY_COMPILED, PY_SOURCE

    result, fileobj, fullpath = _check_if_pyc(pyfile)

    # WARNING:
    # fp.read() can blowup if the module is extremely large file.
    # Lookout for overflow errors.
    try:
        data = fileobj.read()
    finally:
        fileobj.close()

    # This is a .pyc file. Treat accordingly.
    if result is PY_COMPILED:
        # .pyc format is as follows:
        # 0 - 4 bytes: Magic number, which changes with each create of .pyc file.
        #              First 2 bytes change with each marshal of .pyc file. Last 2 bytes is "\r\n".
        # 4 - 8 bytes: Datetime value, when the .py was last changed.
        # 8 - EOF: Marshalled code object data.
        # So to get code object, just read the 8th byte onwards till EOF, and
        # UN-marshal it.
        import marshal
        code_obj = marshal.loads(data[8:])

    elif result is PY_SOURCE:
        # This is a .py file.
        code_obj = compile(data, fullpath, 'exec')

    else:
        # Unsupported extension
        raise Exception("Input file is unknown format: {0}".format(fullpath))

    # Return code object
    return code_obj

if six.PY3:
    def execfile_(fname, *args):
        if fname.endswith(".pyc"):
            code = _get_codeobj(fname)
        else:
            code = compile(open(fname, 'rb').read(), fname, 'exec')
        return six.exec_(code, *args)

    def bytes_to_str(b):
        if isinstance(b, six.text_type):
            return b
        return str(b, 'latin1')

    import urllib.parse

    def unquote_to_wsgi_str(string):
        return _unquote_to_bytes(string).decode('latin-1')

    _unquote_to_bytes = urllib.parse.unquote_to_bytes

else:
    def execfile_(fname, *args):
        """ Overriding PY2 execfile() implementation to support .pyc files """
        if fname.endswith(".pyc"):
            return six.exec_(_get_codeobj(fname), *args)
        return execfile(fname, *args)

    def bytes_to_str(s):
        if isinstance(s, unicode):
            return s.encode('utf-8')
        return s

    import urllib
    unquote_to_wsgi_str = urllib.unquote


# The following code adapted from trollius.py33_exceptions
def _wrap_error(exc, mapping, key):
    if key not in mapping:
        return
    new_err_cls = mapping[key]
    new_err = new_err_cls(*exc.args)

    # raise a new exception with the original traceback
    six.reraise(new_err_cls, new_err,
                exc.__traceback__ if hasattr(exc, '__traceback__') else sys.exc_info()[2])

if PY33:
    import builtins

    BlockingIOError = builtins.BlockingIOError
    BrokenPipeError = builtins.BrokenPipeError
    ChildProcessError = builtins.ChildProcessError
    ConnectionRefusedError = builtins.ConnectionRefusedError
    ConnectionResetError = builtins.ConnectionResetError
    InterruptedError = builtins.InterruptedError
    ConnectionAbortedError = builtins.ConnectionAbortedError
    PermissionError = builtins.PermissionError
    FileNotFoundError = builtins.FileNotFoundError
    ProcessLookupError = builtins.ProcessLookupError

    def wrap_error(func, *args, **kw):
        return func(*args, **kw)
else:
    import errno
    import select
    import socket

    class BlockingIOError(OSError):
        pass

    class BrokenPipeError(OSError):
        pass

    class ChildProcessError(OSError):
        pass

    class ConnectionRefusedError(OSError):
        pass

    class InterruptedError(OSError):
        pass

    class ConnectionResetError(OSError):
        pass

    class ConnectionAbortedError(OSError):
        pass

    class PermissionError(OSError):
        pass

    class FileNotFoundError(OSError):
        pass

    class ProcessLookupError(OSError):
        pass

    _MAP_ERRNO = {
        errno.EACCES: PermissionError,
        errno.EAGAIN: BlockingIOError,
        errno.EALREADY: BlockingIOError,
        errno.ECHILD: ChildProcessError,
        errno.ECONNABORTED: ConnectionAbortedError,
        errno.ECONNREFUSED: ConnectionRefusedError,
        errno.ECONNRESET: ConnectionResetError,
        errno.EINPROGRESS: BlockingIOError,
        errno.EINTR: InterruptedError,
        errno.ENOENT: FileNotFoundError,
        errno.EPERM: PermissionError,
        errno.EPIPE: BrokenPipeError,
        errno.ESHUTDOWN: BrokenPipeError,
        errno.EWOULDBLOCK: BlockingIOError,
        errno.ESRCH: ProcessLookupError,
    }

    def wrap_error(func, *args, **kw):
        """
        Wrap socket.error, IOError, OSError, select.error to raise new specialized
        exceptions of Python 3.3 like InterruptedError (PEP 3151).
        """
        try:
            return func(*args, **kw)
        except (socket.error, IOError, OSError) as exc:
            if hasattr(exc, 'winerror'):
                _wrap_error(exc, _MAP_ERRNO, exc.winerror)
                # _MAP_ERRNO does not contain all Windows errors.
                # For some errors like "file not found", exc.errno should
                # be used (ex: ENOENT).
            _wrap_error(exc, _MAP_ERRNO, exc.errno)
            raise
        except select.error as exc:
            if exc.args:
                _wrap_error(exc, _MAP_ERRNO, exc.args[0])
            raise

if PY26:
    from urlparse import (
        _parse_cache, MAX_CACHE_SIZE, clear_cache, _splitnetloc, SplitResult,
        scheme_chars,
    )

    def urlsplit(url, scheme='', allow_fragments=True):
        """Parse a URL into 5 components:
        <scheme>://<netloc>/<path>?<query>#<fragment>
        Return a 5-tuple: (scheme, netloc, path, query, fragment).
        Note that we don't break the components up in smaller bits
        (e.g. netloc is a single string) and we don't expand % escapes."""
        allow_fragments = bool(allow_fragments)
        key = url, scheme, allow_fragments, type(url), type(scheme)
        cached = _parse_cache.get(key, None)
        if cached:
            return cached
        if len(_parse_cache) >= MAX_CACHE_SIZE: # avoid runaway growth
            clear_cache()
        netloc = query = fragment = ''
        i = url.find(':')
        if i > 0:
            if url[:i] == 'http': # optimize the common case
                scheme = url[:i].lower()
                url = url[i+1:]
                if url[:2] == '//':
                    netloc, url = _splitnetloc(url, 2)
                    if (('[' in netloc and ']' not in netloc) or
                            (']' in netloc and '[' not in netloc)):
                        raise ValueError("Invalid IPv6 URL")
                if allow_fragments and '#' in url:
                    url, fragment = url.split('#', 1)
                if '?' in url:
                    url, query = url.split('?', 1)
                v = SplitResult(scheme, netloc, url, query, fragment)
                _parse_cache[key] = v
                return v
            for c in url[:i]:
                if c not in scheme_chars:
                    break
            else:
                # make sure "url" is not actually a port number (in which case
                # "scheme" is really part of the path)
                rest = url[i+1:]
                if not rest or any(c not in '0123456789' for c in rest):
                    # not a port number
                    scheme, url = url[:i].lower(), rest

        if url[:2] == '//':
            netloc, url = _splitnetloc(url, 2)
            if (('[' in netloc and ']' not in netloc) or
                    (']' in netloc and '[' not in netloc)):
                raise ValueError("Invalid IPv6 URL")
        if allow_fragments and '#' in url:
            url, fragment = url.split('#', 1)
        if '?' in url:
            url, query = url.split('?', 1)
        v = SplitResult(scheme, netloc, url, query, fragment)
        _parse_cache[key] = v
        return v

else:
    from gunicorn.six.moves.urllib.parse import urlsplit
