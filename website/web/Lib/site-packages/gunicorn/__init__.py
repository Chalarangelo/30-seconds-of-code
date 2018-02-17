# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.

version_info = (19, 7, 1)
__version__ = ".".join([str(v) for v in version_info])
SERVER_SOFTWARE = "gunicorn/%s" % __version__
