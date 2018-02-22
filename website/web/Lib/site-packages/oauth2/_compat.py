try:
    TEXT = unicode
except NameError: #pragma NO COVER Py3k
    PY3 = True
    TEXT = str
    STRING_TYPES = (str, bytes)
    def b(x, encoding='ascii'):
        return bytes(x, encoding)
else: #pragma NO COVER Python2
    PY3 = False
    STRING_TYPES = (unicode, bytes)
    def b(x, encoding='ascii'):
        if isinstance(x, unicode):
            x = x.encode(encoding)
        return x

def u(x, encoding='ascii'):
    if isinstance(x, TEXT): #pragma NO COVER
        return x
    try:
        return x.decode(encoding)
    except AttributeError: #pragma NO COVER
        raise ValueError('WTF: %s' % x)

try:
    import urlparse
except ImportError: #pragma NO COVER Py3k
    from urllib.parse import parse_qs
    from urllib.parse import parse_qsl
    from urllib.parse import quote
    from urllib.parse import unquote
    from urllib.parse import unquote_to_bytes
    from urllib.parse import urlencode
    from urllib.parse import urlsplit
    from urllib.parse import urlunsplit
    from urllib.parse import urlparse
    from urllib.parse import urlunparse
else: #pragma NO COVER Python2
    from urlparse import parse_qs
    from urlparse import parse_qsl
    from urllib import quote
    from urllib import unquote
    from urllib import urlencode
    from urlparse import urlsplit
    from urlparse import urlunsplit
    from urlparse import urlparse
    from urlparse import urlunparse
    unquote_to_bytes = unquote
