# -*- coding: utf-8 -
#
# This file is part of gunicorn released under the MIT license.
# See the NOTICE for more information.
from __future__ import print_function

import os
import pkg_resources
import sys

try:
    import configparser as ConfigParser
except ImportError:
    import ConfigParser

from paste.deploy import loadapp, loadwsgi
SERVER = loadwsgi.SERVER

from gunicorn.app.base import Application
from gunicorn.config import Config, get_default_config_file
from gunicorn import util


def _has_logging_config(paste_file):
    cfg_parser = ConfigParser.ConfigParser()
    cfg_parser.read([paste_file])
    return cfg_parser.has_section('loggers')


def paste_config(gconfig, config_url, relative_to, global_conf=None):
    # add entry to pkg_resources
    sys.path.insert(0, relative_to)
    pkg_resources.working_set.add_entry(relative_to)

    config_url = config_url.split('#')[0]
    cx = loadwsgi.loadcontext(SERVER, config_url, relative_to=relative_to,
                              global_conf=global_conf)
    gc, lc = cx.global_conf.copy(), cx.local_conf.copy()
    cfg = {}

    host, port = lc.pop('host', ''), lc.pop('port', '')
    if host and port:
        cfg['bind'] = '%s:%s' % (host, port)
    elif host:
        cfg['bind'] = host.split(',')

    cfg['default_proc_name'] = gc.get('__file__')

    # init logging configuration
    config_file = config_url.split(':')[1]
    if _has_logging_config(config_file):
        cfg.setdefault('logconfig', config_file)

    for k, v in gc.items():
        if k not in gconfig.settings:
            continue
        cfg[k] = v

    for k, v in lc.items():
        if k not in gconfig.settings:
            continue
        cfg[k] = v

    return cfg


def load_pasteapp(config_url, relative_to, global_conf=None):
    return loadapp(config_url, relative_to=relative_to,
            global_conf=global_conf)

class PasterBaseApplication(Application):
    gcfg = None

    def app_config(self):
        return paste_config(self.cfg, self.cfgurl, self.relpath,
                global_conf=self.gcfg)

    def load_config(self):
        super(PasterBaseApplication, self).load_config()

        # reload logging conf
        if hasattr(self, "cfgfname"):
            parser = ConfigParser.ConfigParser()
            parser.read([self.cfgfname])
            if parser.has_section('loggers'):
                from logging.config import fileConfig
                config_file = os.path.abspath(self.cfgfname)
                fileConfig(config_file, dict(__file__=config_file,
                                             here=os.path.dirname(config_file)))


class PasterApplication(PasterBaseApplication):

    def init(self, parser, opts, args):
        if len(args) != 1:
            parser.error("No application name specified.")

        cwd = util.getcwd()
        cfgfname = os.path.normpath(os.path.join(cwd, args[0]))
        cfgfname = os.path.abspath(cfgfname)
        if not os.path.exists(cfgfname):
            parser.error("Config file not found: %s" % cfgfname)

        self.cfgurl = 'config:%s' % cfgfname
        self.relpath = os.path.dirname(cfgfname)
        self.cfgfname = cfgfname

        sys.path.insert(0, self.relpath)
        pkg_resources.working_set.add_entry(self.relpath)

        return self.app_config()

    def load(self):
        # chdir to the configured path before loading,
        # default is the current dir
        os.chdir(self.cfg.chdir)

        return load_pasteapp(self.cfgurl, self.relpath, global_conf=self.gcfg)


class PasterServerApplication(PasterBaseApplication):

    def __init__(self, app, gcfg=None, host="127.0.0.1", port=None, *args, **kwargs):
        self.cfg = Config()
        self.gcfg = gcfg  # need to hold this for app_config
        self.app = app
        self.callable = None

        gcfg = gcfg or {}
        cfgfname = gcfg.get("__file__")
        if cfgfname is not None:
            self.cfgurl = 'config:%s' % cfgfname
            self.relpath = os.path.dirname(cfgfname)
            self.cfgfname = cfgfname

        cfg = kwargs.copy()

        if port and not host.startswith("unix:"):
            bind = "%s:%s" % (host, port)
        else:
            bind = host
        cfg["bind"] = bind.split(',')

        if gcfg:
            for k, v in gcfg.items():
                cfg[k] = v
            cfg["default_proc_name"] = cfg['__file__']

        try:
            for k, v in cfg.items():
                if k.lower() in self.cfg.settings and v is not None:
                    self.cfg.set(k.lower(), v)
        except Exception as e:
            print("\nConfig error: %s" % str(e), file=sys.stderr)
            sys.stderr.flush()
            sys.exit(1)

        if cfg.get("config"):
            self.load_config_from_file(cfg["config"])
        else:
            default_config = get_default_config_file()
            if default_config is not None:
                self.load_config_from_file(default_config)

    def load(self):
        # chdir to the configured path before loading,
        # default is the current dir
        os.chdir(self.cfg.chdir)

        return self.app


def run():
    """\
    The ``gunicorn_paster`` command for launching Paster compatible
    applications like Pylons or Turbogears2
    """
    util.warn("""This command is deprecated.

    You should now use the `--paste` option. Ex.:

        gunicorn --paste development.ini
    """)

    from gunicorn.app.pasterapp import PasterApplication
    PasterApplication("%(prog)s [OPTIONS] pasteconfig.ini").run()


def paste_server(app, gcfg=None, host="127.0.0.1", port=None, *args, **kwargs):
    """\
    A paster server.

    Then entry point in your paster ini file should looks like this:

    [server:main]
    use = egg:gunicorn#main
    host = 127.0.0.1
    port = 5000

    """

    util.warn("""This command is deprecated.

    You should now use the `--paste` option. Ex.:

        gunicorn --paste development.ini
    """)

    from gunicorn.app.pasterapp import PasterServerApplication
    PasterServerApplication(app, gcfg=gcfg, host=host, port=port, *args, **kwargs).run()
