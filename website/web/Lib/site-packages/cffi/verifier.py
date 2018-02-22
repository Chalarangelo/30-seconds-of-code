#
# DEPRECATED: implementation for ffi.verify()
#
import sys, os, binascii, shutil, io
from . import __version_verifier_modules__
from . import ffiplatform
from .error import VerificationError

if sys.version_info >= (3, 3):
    import importlib.machinery
    def _extension_suffixes():
        return importlib.machinery.EXTENSION_SUFFIXES[:]
else:
    import imp
    def _extension_suffixes():
        return [suffix for suffix, _, type in imp.get_suffixes()
                if type == imp.C_EXTENSION]


if sys.version_info >= (3,):
    NativeIO = io.StringIO
else:
    class NativeIO(io.BytesIO):
        def write(self, s):
            if isinstance(s, unicode):
                s = s.encode('ascii')
            super(NativeIO, self).write(s)


class Verifier(object):

    def __init__(self, ffi, preamble, tmpdir=None, modulename=None,
                 ext_package=None, tag='', force_generic_engine=False,
                 source_extension='.c', flags=None, relative_to=None, **kwds):
        if ffi._parser._uses_new_feature:
            raise VerificationError(
                "feature not supported with ffi.verify(), but only "
                "with ffi.set_source(): %s" % (ffi._parser._uses_new_feature,))
        self.ffi = ffi
        self.preamble = preamble
        if not modulename:
            flattened_kwds = ffiplatform.flatten(kwds)
        vengine_class = _locate_engine_class(ffi, force_generic_engine)
        self._vengine = vengine_class(self)
        self._vengine.patch_extension_kwds(kwds)
        self.flags = flags
        self.kwds = self.make_relative_to(kwds, relative_to)
        #
        if modulename:
            if tag:
                raise TypeError("can't specify both 'modulename' and 'tag'")
        else:
            key = '\x00'.join([sys.version[:3], __version_verifier_modules__,
                               preamble, flattened_kwds] +
                              ffi._cdefsources)
            if sys.version_info >= (3,):
                key = key.encode('utf-8')
            k1 = hex(binascii.crc32(key[0::2]) & 0xffffffff)
            k1 = k1.lstrip('0x').rstrip('L')
            k2 = hex(binascii.crc32(key[1::2]) & 0xffffffff)
            k2 = k2.lstrip('0').rstrip('L')
            modulename = '_cffi_%s_%s%s%s' % (tag, self._vengine._class_key,
                                              k1, k2)
        suffix = _get_so_suffixes()[0]
        self.tmpdir = tmpdir or _caller_dir_pycache()
        self.sourcefilename = os.path.join(self.tmpdir, modulename + source_extension)
        self.modulefilename = os.path.join(self.tmpdir, modulename + suffix)
        self.ext_package = ext_package
        self._has_source = False
        self._has_module = False

    def write_source(self, file=None):
        """Write the C source code.  It is produced in 'self.sourcefilename',
        which can be tweaked beforehand."""
        with self.ffi._lock:
            if self._has_source and file is None:
                raise VerificationError(
                    "source code already written")
            self._write_source(file)

    def compile_module(self):
        """Write the C source code (if not done already) and compile it.
        This produces a dynamic link library in 'self.modulefilename'."""
        with self.ffi._lock:
            if self._has_module:
                raise VerificationError("module already compiled")
            if not self._has_source:
                self._write_source()
            self._compile_module()

    def load_library(self):
        """Get a C module from this Verifier instance.
        Returns an instance of a FFILibrary class that behaves like the
        objects returned by ffi.dlopen(), but that delegates all
        operations to the C module.  If necessary, the C code is written
        and compiled first.
        """
        with self.ffi._lock:
            if not self._has_module:
                self._locate_module()
                if not self._has_module:
                    if not self._has_source:
                        self._write_source()
                    self._compile_module()
            return self._load_library()

    def get_module_name(self):
        basename = os.path.basename(self.modulefilename)
        # kill both the .so extension and the other .'s, as introduced
        # by Python 3: 'basename.cpython-33m.so'
        basename = basename.split('.', 1)[0]
        # and the _d added in Python 2 debug builds --- but try to be
        # conservative and not kill a legitimate _d
        if basename.endswith('_d') and hasattr(sys, 'gettotalrefcount'):
            basename = basename[:-2]
        return basename

    def get_extension(self):
        ffiplatform._hack_at_distutils() # backward compatibility hack
        if not self._has_source:
            with self.ffi._lock:
                if not self._has_source:
                    self._write_source()
        sourcename = ffiplatform.maybe_relative_path(self.sourcefilename)
        modname = self.get_module_name()
        return ffiplatform.get_extension(sourcename, modname, **self.kwds)

    def generates_python_module(self):
        return self._vengine._gen_python_module

    def make_relative_to(self, kwds, relative_to):
        if relative_to and os.path.dirname(relative_to):
            dirname = os.path.dirname(relative_to)
            kwds = kwds.copy()
            for key in ffiplatform.LIST_OF_FILE_NAMES:
                if key in kwds:
                    lst = kwds[key]
                    if not isinstance(lst, (list, tuple)):
                        raise TypeError("keyword '%s' should be a list or tuple"
                                        % (key,))
                    lst = [os.path.join(dirname, fn) for fn in lst]
                    kwds[key] = lst
        return kwds

    # ----------

    def _locate_module(self):
        if not os.path.isfile(self.modulefilename):
            if self.ext_package:
                try:
                    pkg = __import__(self.ext_package, None, None, ['__doc__'])
                except ImportError:
                    return      # cannot import the package itself, give up
                    # (e.g. it might be called differently before installation)
                path = pkg.__path__
            else:
                path = None
            filename = self._vengine.find_module(self.get_module_name(), path,
                                                 _get_so_suffixes())
            if filename is None:
                return
            self.modulefilename = filename
        self._vengine.collect_types()
        self._has_module = True

    def _write_source_to(self, file):
        self._vengine._f = file
        try:
            self._vengine.write_source_to_f()
        finally:
            del self._vengine._f

    def _write_source(self, file=None):
        if file is not None:
            self._write_source_to(file)
        else:
            # Write our source file to an in memory file.
            f = NativeIO()
            self._write_source_to(f)
            source_data = f.getvalue()

            # Determine if this matches the current file
            if os.path.exists(self.sourcefilename):
                with open(self.sourcefilename, "r") as fp:
                    needs_written = not (fp.read() == source_data)
            else:
                needs_written = True

            # Actually write the file out if it doesn't match
            if needs_written:
                _ensure_dir(self.sourcefilename)
                with open(self.sourcefilename, "w") as fp:
                    fp.write(source_data)

            # Set this flag
            self._has_source = True

    def _compile_module(self):
        # compile this C source
        tmpdir = os.path.dirname(self.sourcefilename)
        outputfilename = ffiplatform.compile(tmpdir, self.get_extension())
        try:
            same = ffiplatform.samefile(outputfilename, self.modulefilename)
        except OSError:
            same = False
        if not same:
            _ensure_dir(self.modulefilename)
            shutil.move(outputfilename, self.modulefilename)
        self._has_module = True

    def _load_library(self):
        assert self._has_module
        if self.flags is not None:
            return self._vengine.load_library(self.flags)
        else:
            return self._vengine.load_library()

# ____________________________________________________________

_FORCE_GENERIC_ENGINE = False      # for tests

def _locate_engine_class(ffi, force_generic_engine):
    if _FORCE_GENERIC_ENGINE:
        force_generic_engine = True
    if not force_generic_engine:
        if '__pypy__' in sys.builtin_module_names:
            force_generic_engine = True
        else:
            try:
                import _cffi_backend
            except ImportError:
                _cffi_backend = '?'
            if ffi._backend is not _cffi_backend:
                force_generic_engine = True
    if force_generic_engine:
        from . import vengine_gen
        return vengine_gen.VGenericEngine
    else:
        from . import vengine_cpy
        return vengine_cpy.VCPythonEngine

# ____________________________________________________________

_TMPDIR = None

def _caller_dir_pycache():
    if _TMPDIR:
        return _TMPDIR
    result = os.environ.get('CFFI_TMPDIR')
    if result:
        return result
    filename = sys._getframe(2).f_code.co_filename
    return os.path.abspath(os.path.join(os.path.dirname(filename),
                           '__pycache__'))

def set_tmpdir(dirname):
    """Set the temporary directory to use instead of __pycache__."""
    global _TMPDIR
    _TMPDIR = dirname

def cleanup_tmpdir(tmpdir=None, keep_so=False):
    """Clean up the temporary directory by removing all files in it
    called `_cffi_*.{c,so}` as well as the `build` subdirectory."""
    tmpdir = tmpdir or _caller_dir_pycache()
    try:
        filelist = os.listdir(tmpdir)
    except OSError:
        return
    if keep_so:
        suffix = '.c'   # only remove .c files
    else:
        suffix = _get_so_suffixes()[0].lower()
    for fn in filelist:
        if fn.lower().startswith('_cffi_') and (
                fn.lower().endswith(suffix) or fn.lower().endswith('.c')):
            try:
                os.unlink(os.path.join(tmpdir, fn))
            except OSError:
                pass
    clean_dir = [os.path.join(tmpdir, 'build')]
    for dir in clean_dir:
        try:
            for fn in os.listdir(dir):
                fn = os.path.join(dir, fn)
                if os.path.isdir(fn):
                    clean_dir.append(fn)
                else:
                    os.unlink(fn)
        except OSError:
            pass

def _get_so_suffixes():
    suffixes = _extension_suffixes()
    if not suffixes:
        # bah, no C_EXTENSION available.  Occurs on pypy without cpyext
        if sys.platform == 'win32':
            suffixes = [".pyd"]
        else:
            suffixes = [".so"]

    return suffixes

def _ensure_dir(filename):
    dirname = os.path.dirname(filename)
    if dirname and not os.path.isdir(dirname):
        os.makedirs(dirname)
