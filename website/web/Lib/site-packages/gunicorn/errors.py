# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.


# we inherit from BaseException here to make sure to not be caucght 
# at application level
class HaltServer(BaseException):
    def __init__(self, reason, exit_status=1):
        self.reason = reason
        self.exit_status = exit_status

    def __str__(self):
        return "<HaltServer %r %d>" % (self.reason, self.exit_status)


class ConfigError(Exception):
    """ Exception raised on config error """


class AppImportError(Exception):
    """ Exception raised when loading an application """
