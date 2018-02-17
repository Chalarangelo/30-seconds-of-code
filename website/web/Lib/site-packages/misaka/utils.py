# -*- coding: utf-8 -*-

import operator as op
import warnings

try:
    reduce
except NameError:
    from functools import reduce

from ._hoedown import ffi
from .constants import *


extension_map = {
    'tables': EXT_TABLES,
    'fenced-code': EXT_FENCED_CODE,
    'footnotes': EXT_FOOTNOTES,
    'autolink': EXT_AUTOLINK,
    'strikethrough': EXT_STRIKETHROUGH,
    'underline': EXT_UNDERLINE,
    'highlight': EXT_HIGHLIGHT,
    'quote': EXT_QUOTE,
    'superscript': EXT_SUPERSCRIPT,
    'math': EXT_MATH,
    'no-intra-emphasis': EXT_NO_INTRA_EMPHASIS,
    'space-headers': EXT_SPACE_HEADERS,
    'math-explicit': EXT_MATH_EXPLICIT,
    'disable-indented-code': EXT_DISABLE_INDENTED_CODE,
}

html_flag_map = {
    'skip-html': HTML_SKIP_HTML,
    'escape': HTML_ESCAPE,
    'hard-wrap': HTML_HARD_WRAP,
    'use-xhtml': HTML_USE_XHTML,
}


def args_to_int(mapping, argument):
    """
    Convert list of strings to an int using a mapping.
    """
    if isinstance(argument, int):
        if argument == 0:
            return 0
        deprecation('passing extensions and flags as constants is deprecated')
        return argument
    elif isinstance(argument, (tuple, list)):
        return reduce(op.or_, [mapping[n] for n in set(argument) if n in mapping], 0)
    raise TypeError('argument must be a list of strings or an int')


def deprecation(message):
    warnings.warn(message, DeprecationWarning, stacklevel=3)


def to_string(buffer):
    if buffer == ffi.NULL or buffer.size == 0:
        return ''
    return ffi.string(buffer.data, buffer.size).decode('utf-8')
