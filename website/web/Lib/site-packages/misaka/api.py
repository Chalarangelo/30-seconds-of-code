# -*- coding: utf-8 -*-

import re
try:
    from urllib.parse import quote as urlquote
except ImportError:
    from urllib import quote as urlquote

from ._hoedown import lib, ffi
from .callbacks import python_callbacks, to_string
from .constants import *
from .utils import extension_map, html_flag_map, args_to_int, \
    deprecation, to_string


__all__ = [
    'escape_html',
    'html',
    'smartypants',
    'Markdown',
    'BaseRenderer',
    'HtmlRenderer',
    'HtmlTocRenderer',
    'SaferHtmlRenderer',

    'args_to_int',
    'extension_map',
    'html_flag_map',

    'EXT_TABLES',
    'EXT_FENCED_CODE',
    'EXT_FOOTNOTES',
    'EXT_AUTOLINK',
    'EXT_STRIKETHROUGH',
    'EXT_UNDERLINE',
    'EXT_HIGHLIGHT',
    'EXT_QUOTE',
    'EXT_SUPERSCRIPT',
    'EXT_MATH',
    'EXT_NO_INTRA_EMPHASIS',
    'EXT_SPACE_HEADERS',
    'EXT_MATH_EXPLICIT',
    'EXT_DISABLE_INDENTED_CODE',

    'HTML_SKIP_HTML',
    'HTML_ESCAPE',
    'HTML_HARD_WRAP',
    'HTML_USE_XHTML',

    'LIST_ORDERED',
    'LI_BLOCK',

    'TABLE_ALIGN_LEFT',
    'TABLE_ALIGN_RIGHT',
    'TABLE_ALIGN_CENTER',
    'TABLE_ALIGNMASK',
    'TABLE_HEADER',

    'AUTOLINK_NORMAL',
    'AUTOLINK_EMAIL',
]


IUNIT = 1024
OUNIT = 64
MAX_NESTING = 16


def escape_html(text, escape_slash=False):
    """
    Binding for Hoedown's HTML escaping function.

    The implementation is inspired by the OWASP XSS Prevention recommendations:

    .. code-block:: none

        & --> &amp;
        < --> &lt;
        > --> &gt;
        " --> &quot;
        ' --> &#x27;
        / --> &#x2F;  when escape_slash is set to True

    .. versionadded:: 2.1.0
    """
    byte_str = text.encode('utf-8')
    ob = lib.hoedown_buffer_new(OUNIT)
    lib.hoedown_escape_html(ob, byte_str, len(byte_str), int(escape_slash))

    try:
        return to_string(ob)
    finally:
        lib.hoedown_buffer_free(ob)


def html(text, extensions=0, render_flags=0):
    """
    Convert markdown text to HTML.

    ``extensions`` can be a list or tuple of extensions (e.g.
    ``('fenced-code', 'footnotes', 'strikethrough')``) or an integer
    (e.g. ``EXT_FENCED_CODE | EXT_FOOTNOTES | EXT_STRIKETHROUGH``).

    ``render_flags`` can be a list or tuple of flags (e.g.
    ``('skip-html', 'hard-wrap')``) or an integer
    (e.g. ``HTML_SKIP_HTML | HTML_HARD_WRAP``).
    """
    extensions = args_to_int(extension_map, extensions)
    render_flags = args_to_int(html_flag_map, render_flags)

    ib = lib.hoedown_buffer_new(IUNIT)
    ob = lib.hoedown_buffer_new(OUNIT)
    renderer = lib.hoedown_html_renderer_new(render_flags, 0)
    document = lib.hoedown_document_new(renderer, extensions, 16);

    lib.hoedown_buffer_puts(ib, text.encode('utf-8'))
    lib.hoedown_document_render(document, ob, ib.data, ib.size);
    lib.hoedown_buffer_free(ib);
    lib.hoedown_document_free(document);
    lib.hoedown_html_renderer_free(renderer);

    try:
        return to_string(ob)
    finally:
        lib.hoedown_buffer_free(ob);


def smartypants(text):
    """
    Transforms sequences of characters into HTML entities.

    ===================================  =====================  =========
    Markdown                             HTML                   Result
    ===================================  =====================  =========
    ``'s`` (s, t, m, d, re, ll, ve)      &rsquo;s               ’s
    ``"Quotes"``                         &ldquo;Quotes&rdquo;   “Quotes”
    ``---``                              &mdash;                —
    ``--``                               &ndash;                –
    ``...``                              &hellip;               …
    ``. . .``                            &hellip;               …
    ``(c)``                              &copy;                 ©
    ``(r)``                              &reg;                  ®
    ``(tm)``                             &trade;                ™
    ``3/4``                              &frac34;               ¾
    ``1/2``                              &frac12;               ½
    ``1/4``                              &frac14;               ¼
    ===================================  =====================  =========
    """
    byte_str = text.encode('utf-8')
    ob = lib.hoedown_buffer_new(OUNIT)
    lib.hoedown_html_smartypants(ob, byte_str, len(byte_str))

    try:
        return to_string(ob)
    finally:
        lib.hoedown_buffer_free(ob);


class Markdown(object):
    """
    Parses markdown text and renders it using the given renderer.

    ``extensions`` can be a list or tuple of extensions (e.g.
    ``('fenced-code', 'footnotes', 'strikethrough')``) or an integer
    (e.g. ``EXT_FENCED_CODE | EXT_FOOTNOTES | EXT_STRIKETHROUGH``).
    """
    def __init__(self, renderer, extensions=0):
        self.renderer = renderer
        self.extensions = args_to_int(extension_map, extensions)

    def __call__(self, text):
        """
        Parses and renders markdown text.
        """
        ib = lib.hoedown_buffer_new(IUNIT)
        lib.hoedown_buffer_puts(ib, text.encode('utf-8'))

        ob = lib.hoedown_buffer_new(OUNIT)
        document = lib.hoedown_document_new(
            self.renderer.renderer,
            self.extensions,
            MAX_NESTING);
        lib.hoedown_document_render(document, ob, ib.data, ib.size);

        lib.hoedown_buffer_free(ib)
        lib.hoedown_document_free(document)

        try:
            return to_string(ob)
        finally:
            lib.hoedown_buffer_free(ob);


class BaseRenderer(object):
    def __init__(self):
        self.renderer = ffi.new('hoedown_renderer *')
        self._renderer_handle = ffi.new_handle(self)

        for name in python_callbacks.keys():
            if hasattr(self, name):
                setattr(self.renderer, name, python_callbacks[name])
            else:
                setattr(self.renderer, name, ffi.NULL)

        # Store the render class' handle in the render data.
        self._data = ffi.new('hoedown_renderer_data *')
        self.renderer.opaque = self._data
        ffi.cast('hoedown_renderer_data *', self.renderer.opaque).opaque = \
            self._renderer_handle


class HtmlRenderer(BaseRenderer):
    """
    A wrapper for the HTML renderer that's included in Hoedown.

    ``render_flags`` can be a list or tuple of flags (e.g.
    ``('skip-html', 'hard-wrap')``) or an integer
    (e.g. ``HTML_SKIP_HTML | HTML_HARD_WRAP``).

    ``nesting_level`` limits what's included in the table of contents.
    The default value is 0, no headers.

    An instance of the ``HtmlRenderer`` can not be shared with multiple
    :py:class:`Markdown` instances, because it carries state that's changed
    by the ``Markdown`` instance.
    """
    def __init__(self, flags=0, nesting_level=0):
        flags = args_to_int(html_flag_map, flags)
        self.renderer = self._new_renderer(flags, nesting_level)
        self._renderer_handle = ffi.new_handle(self)

        # Store the render class' handle in the render state.
        state = ffi.cast('hoedown_renderer_data *', self.renderer.opaque)
        state.opaque = self._renderer_handle

        for name in python_callbacks.keys():
            if hasattr(self, name):
                setattr(self.renderer, name, python_callbacks[name])

    def _new_renderer(self, flags, nesting_level):
        return lib.hoedown_html_renderer_new(flags, nesting_level)

    def __del__(self):
        lib.hoedown_html_renderer_free(self.renderer)


class HtmlTocRenderer(HtmlRenderer):
    """
    A wrapper for the HTML table of contents renderer that's included in Hoedown.

    ``nesting_level`` limits what's included in the table of contents.
    The default value is 6, all headers.

    An instance of the ``HtmlTocRenderer`` can not be shared with multiple
    :py:class:`Markdown` instances, because it carries state that's changed
    by the ``Markdown`` instance.
    """
    def __init__(self, nesting_level=6):
        HtmlRenderer.__init__(self, 0, nesting_level)

    def _new_renderer(self, flags, nesting_level):
        return lib.hoedown_html_toc_renderer_new(nesting_level)


class SaferHtmlRenderer(HtmlRenderer):
    """
    A subclass of :class:`HtmlRenderer` which adds protections against
    Cross-Site Scripting (XSS):

    1. The ``'skip-html'`` flag is turned on by default, preventing injection of
       HTML elements. If you want to escape HTML code instead of removing it
       entirely, change ``sanitization_mode`` to ``'escape'``.
    2. The URLs of links and images are filtered to prevent JavaScript injection.
       This also blocks the rendering of email addresses into links.
       See the :meth:`check_url` method below.
    3. Optionally, the URLs can also be rewritten to counter other attacks such
       as phishing.

    Enabling URL rewriting requires extra arguments:

    :arg link_rewrite: the URL of a redirect page, necessary to rewrite the
        ``href`` attributes of links
    :arg img_src_rewrite: the URL of an image proxy, necessary to rewrite the
        ``src`` attributes of images

    Both strings should include a ``{url}`` placeholder for the URL-encoded
    target. Examples::

        link_rewrite='https://example.com/redirect?url={url}',
        img_src_rewrite='https://img-proxy-domain/{url}'

    .. versionadded:: 2.1.0
    """
    _allowed_url_re = re.compile(r'^https?:', re.I)

    def __init__(self, flags=(), sanitization_mode='skip-html', nesting_level=0,
                 link_rewrite=None, img_src_rewrite=None):
        if not isinstance(flags, tuple):
            raise TypeError("`flags` should be a tuple of strings")
        HtmlRenderer.__init__(self, flags + (sanitization_mode,), nesting_level)
        self.link_rewrite = link_rewrite
        self.img_src_rewrite = img_src_rewrite

    def autolink(self, raw_url, is_email):
        """
        Filters links generated by the ``autolink`` extension.
        """
        if self.check_url(raw_url):
            url = self.rewrite_url(('mailto:' if is_email else '') + raw_url)
            url = escape_html(url)
            return '<a href="%s">%s</a>' % (url, escape_html(raw_url))
        else:
            return escape_html('<%s>' % raw_url)

    def image(self, raw_url, title='', alt=''):
        """
        Filters the ``src`` attribute of an image.

        Note that filtering the source URL of an ``<img>`` tag is only a very
        basic protection, and it's mostly useless in modern browsers (they block
        JavaScript in there by default). An example of attack that filtering
        does not thwart is phishing based on HTTP Auth, see `this issue
        <https://github.com/liberapay/liberapay.com/issues/504>`_ for details.

        To mitigate this issue you should only allow images from trusted services,
        for example your own image store, or a proxy (see :meth:`rewrite_url`).
        """
        if self.check_url(raw_url, is_image_src=True):
            url = self.rewrite_url(raw_url, is_image_src=True)
            maybe_alt = ' alt="%s"' % escape_html(alt) if alt else ''
            maybe_title = ' title="%s"' % escape_html(title) if title else ''
            url = escape_html(url)
            return '<img src="%s"%s%s />' % (url, maybe_alt, maybe_title)
        else:
            return escape_html("![%s](%s)" % (alt, raw_url))

    def link(self, content, raw_url, title=''):
        """
        Filters links.
        """
        if self.check_url(raw_url):
            url = self.rewrite_url(raw_url)
            maybe_title = ' title="%s"' % escape_html(title) if title else ''
            url = escape_html(url)
            return ('<a href="%s"%s>' + content + '</a>') % (url, maybe_title)
        else:
            return escape_html("[%s](%s)" % (content, raw_url))

    def check_url(self, url, is_image_src=False):
        """
        This method is used to check a URL.

        Returns :obj:`True` if the URL is "safe", :obj:`False` otherwise.

        The default implementation only allows HTTP and HTTPS links. That means
        no ``mailto:``, no ``xmpp:``, no ``ftp:``, etc.

        This method exists specifically to allow easy customization of link
        filtering through subclassing, so don't hesitate to write your own.

        If you're thinking of implementing a blacklist approach, see
        "`Which URL schemes are dangerous (XSS exploitable)?
        <http://security.stackexchange.com/q/148428/37409>`_".
        """
        return bool(self._allowed_url_re.match(url))

    def rewrite_url(self, url, is_image_src=False):
        """
        This method is called to rewrite URLs.

        It uses either ``self.link_rewrite`` or ``self.img_src_rewrite``
        depending on the value of ``is_image_src``. The URL is returned
        unchanged if the corresponding attribute is :obj:`None`.
        """
        rewrite = self.img_src_rewrite if is_image_src else self.link_rewrite
        if rewrite:
            return rewrite.format(url=urlquote(url))
        return url
