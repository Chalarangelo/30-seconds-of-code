import os
import sys

try:
    basestring
except NameError:
    # Python 3.x
    basestring = str

def error(msg):
    from distutils.errors import DistutilsSetupError
    raise DistutilsSetupError(msg)


def execfile(filename, glob):
    # We use execfile() (here rewritten for Python 3) instead of
    # __import__() to load the build script.  The problem with
    # a normal import is that in some packages, the intermediate
    # __init__.py files may already try to import the file that
    # we are generating.
    with open(filename) as f:
        src = f.read()
    src += '\n'      # Python 2.6 compatibility
    code = compile(src, filename, 'exec')
    exec(code, glob, glob)


def add_cffi_module(dist, mod_spec):
    from cffi.api import FFI

    if not isinstance(mod_spec, basestring):
        error("argument to 'cffi_modules=...' must be a str or a list of str,"
              " not %r" % (type(mod_spec).__name__,))
    mod_spec = str(mod_spec)
    try:
        build_file_name, ffi_var_name = mod_spec.split(':')
    except ValueError:
        error("%r must be of the form 'path/build.py:ffi_variable'" %
              (mod_spec,))
    if not os.path.exists(build_file_name):
        ext = ''
        rewritten = build_file_name.replace('.', '/') + '.py'
        if os.path.exists(rewritten):
            ext = ' (rewrite cffi_modules to [%r])' % (
                rewritten + ':' + ffi_var_name,)
        error("%r does not name an existing file%s" % (build_file_name, ext))

    mod_vars = {'__name__': '__cffi__', '__file__': build_file_name}
    execfile(build_file_name, mod_vars)

    try:
        ffi = mod_vars[ffi_var_name]
    except KeyError:
        error("%r: object %r not found in module" % (mod_spec,
                                                     ffi_var_name))
    if not isinstance(ffi, FFI):
        ffi = ffi()      # maybe it's a function instead of directly an ffi
    if not isinstance(ffi, FFI):
        error("%r is not an FFI instance (got %r)" % (mod_spec,
                                                      type(ffi).__name__))
    if not hasattr(ffi, '_assigned_source'):
        error("%r: the set_source() method was not called" % (mod_spec,))
    module_name, source, source_extension, kwds = ffi._assigned_source
    if ffi._windows_unicode:
        kwds = kwds.copy()
        ffi._apply_windows_unicode(kwds)

    if source is None:
        _add_py_module(dist, ffi, module_name)
    else:
        _add_c_module(dist, ffi, module_name, source, source_extension, kwds)

def _set_py_limited_api(Extension, kwds):
    """
    Add py_limited_api to kwds if setuptools >= 26 is in use.
    Do not alter the setting if it already exists.
    Setuptools takes care of ignoring the flag on Python 2 and PyPy.

    CPython itself should ignore the flag in a debugging version
    (by not listing .abi3.so in the extensions it supports), but
    it doesn't so far, creating troubles.  That's why we check
    for "not hasattr(sys, 'gettotalrefcount')" (the 2.7 compatible equivalent
    of 'd' not in sys.abiflags). (http://bugs.python.org/issue28401)

    On Windows, it's better not to use py_limited_api until issue #355
    can be resolved (by having virtualenv copy PYTHON3.DLL).  See also
    the start of _cffi_include.h.
    """
    if ('py_limited_api' not in kwds and not hasattr(sys, 'gettotalrefcount')
            and sys.platform != 'win32'):
        import setuptools
        try:
            setuptools_major_version = int(setuptools.__version__.partition('.')[0])
            if setuptools_major_version >= 26:
                kwds['py_limited_api'] = True
        except ValueError:  # certain development versions of setuptools
            # If we don't know the version number of setuptools, we
            # try to set 'py_limited_api' anyway.  At worst, we get a
            # warning.
            kwds['py_limited_api'] = True
    return kwds

def _add_c_module(dist, ffi, module_name, source, source_extension, kwds):
    from distutils.core import Extension
    # We are a setuptools extension. Need this build_ext for py_limited_api.
    from setuptools.command.build_ext import build_ext
    from distutils.dir_util import mkpath
    from distutils import log
    from cffi import recompiler

    allsources = ['$PLACEHOLDER']
    allsources.extend(kwds.pop('sources', []))
    kwds = _set_py_limited_api(Extension, kwds)
    ext = Extension(name=module_name, sources=allsources, **kwds)

    def make_mod(tmpdir, pre_run=None):
        c_file = os.path.join(tmpdir, module_name + source_extension)
        log.info("generating cffi module %r" % c_file)
        mkpath(tmpdir)
        # a setuptools-only, API-only hook: called with the "ext" and "ffi"
        # arguments just before we turn the ffi into C code.  To use it,
        # subclass the 'distutils.command.build_ext.build_ext' class and
        # add a method 'def pre_run(self, ext, ffi)'.
        if pre_run is not None:
            pre_run(ext, ffi)
        updated = recompiler.make_c_source(ffi, module_name, source, c_file)
        if not updated:
            log.info("already up-to-date")
        return c_file

    if dist.ext_modules is None:
        dist.ext_modules = []
    dist.ext_modules.append(ext)

    base_class = dist.cmdclass.get('build_ext', build_ext)
    class build_ext_make_mod(base_class):
        def run(self):
            if ext.sources[0] == '$PLACEHOLDER':
                pre_run = getattr(self, 'pre_run', None)
                ext.sources[0] = make_mod(self.build_temp, pre_run)
            base_class.run(self)
    dist.cmdclass['build_ext'] = build_ext_make_mod
    # NB. multiple runs here will create multiple 'build_ext_make_mod'
    # classes.  Even in this case the 'build_ext' command should be
    # run once; but just in case, the logic above does nothing if
    # called again.


def _add_py_module(dist, ffi, module_name):
    from distutils.dir_util import mkpath
    from distutils.command.build_py import build_py
    from distutils.command.build_ext import build_ext
    from distutils import log
    from cffi import recompiler

    def generate_mod(py_file):
        log.info("generating cffi module %r" % py_file)
        mkpath(os.path.dirname(py_file))
        updated = recompiler.make_py_source(ffi, module_name, py_file)
        if not updated:
            log.info("already up-to-date")

    base_class = dist.cmdclass.get('build_py', build_py)
    class build_py_make_mod(base_class):
        def run(self):
            base_class.run(self)
            module_path = module_name.split('.')
            module_path[-1] += '.py'
            generate_mod(os.path.join(self.build_lib, *module_path))
    dist.cmdclass['build_py'] = build_py_make_mod

    # the following is only for "build_ext -i"
    base_class_2 = dist.cmdclass.get('build_ext', build_ext)
    class build_ext_make_mod(base_class_2):
        def run(self):
            base_class_2.run(self)
            if self.inplace:
                # from get_ext_fullpath() in distutils/command/build_ext.py
                module_path = module_name.split('.')
                package = '.'.join(module_path[:-1])
                build_py = self.get_finalized_command('build_py')
                package_dir = build_py.get_package_dir(package)
                file_name = module_path[-1] + '.py'
                generate_mod(os.path.join(package_dir, file_name))
    dist.cmdclass['build_ext'] = build_ext_make_mod

def cffi_modules(dist, attr, value):
    assert attr == 'cffi_modules'
    if isinstance(value, basestring):
        value = [value]

    for cffi_module in value:
        add_cffi_module(dist, cffi_module)
