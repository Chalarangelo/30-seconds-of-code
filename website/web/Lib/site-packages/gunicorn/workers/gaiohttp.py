# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.

import sys

if sys.version_info >= (3, 3):
    try:
        import aiohttp  # NOQA
    except ImportError:
        raise RuntimeError("You need aiohttp installed to use this worker.")
    else:
        from gunicorn.workers._gaiohttp import AiohttpWorker
        __all__ = ['AiohttpWorker']
else:
    raise RuntimeError("You need Python >= 3.3 to use the asyncio worker")
