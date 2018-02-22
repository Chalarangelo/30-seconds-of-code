# -*- coding: utf-8 -*-

import sys
from inspect import getmembers

from ._hoedown import lib


def _set_constants():
    is_int = lambda n: isinstance(n, int)

    for name, value in getmembers(lib, is_int):
        if not name.startswith('HOEDOWN_'):
            continue
        setattr(sys.modules[__name__], name[8:], value)


if not hasattr(sys.modules[__name__], 'EXT_TABLES'):
    _set_constants()
