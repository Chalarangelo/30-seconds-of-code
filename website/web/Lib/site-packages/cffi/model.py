import types
import weakref

from .lock import allocate_lock
from .error import CDefError, VerificationError, VerificationMissing

# type qualifiers
Q_CONST    = 0x01
Q_RESTRICT = 0x02
Q_VOLATILE = 0x04

def qualify(quals, replace_with):
    if quals & Q_CONST:
        replace_with = ' const ' + replace_with.lstrip()
    if quals & Q_VOLATILE:
        replace_with = ' volatile ' + replace_with.lstrip()
    if quals & Q_RESTRICT:
        # It seems that __restrict is supported by gcc and msvc.
        # If you hit some different compiler, add a #define in
        # _cffi_include.h for it (and in its copies, documented there)
        replace_with = ' __restrict ' + replace_with.lstrip()
    return replace_with


class BaseTypeByIdentity(object):
    is_array_type = False
    is_raw_function = False

    def get_c_name(self, replace_with='', context='a C file', quals=0):
        result = self.c_name_with_marker
        assert result.count('&') == 1
        # some logic duplication with ffi.getctype()... :-(
        replace_with = replace_with.strip()
        if replace_with:
            if replace_with.startswith('*') and '&[' in result:
                replace_with = '(%s)' % replace_with
            elif not replace_with[0] in '[(':
                replace_with = ' ' + replace_with
        replace_with = qualify(quals, replace_with)
        result = result.replace('&', replace_with)
        if '$' in result:
            raise VerificationError(
                "cannot generate '%s' in %s: unknown type name"
                % (self._get_c_name(), context))
        return result

    def _get_c_name(self):
        return self.c_name_with_marker.replace('&', '')

    def has_c_name(self):
        return '$' not in self._get_c_name()

    def is_integer_type(self):
        return False

    def get_cached_btype(self, ffi, finishlist, can_delay=False):
        try:
            BType = ffi._cached_btypes[self]
        except KeyError:
            BType = self.build_backend_type(ffi, finishlist)
            BType2 = ffi._cached_btypes.setdefault(self, BType)
            assert BType2 is BType
        return BType

    def __repr__(self):
        return '<%s>' % (self._get_c_name(),)

    def _get_items(self):
        return [(name, getattr(self, name)) for name in self._attrs_]


class BaseType(BaseTypeByIdentity):

    def __eq__(self, other):
        return (self.__class__ == other.__class__ and
                self._get_items() == other._get_items())

    def __ne__(self, other):
        return not self == other

    def __hash__(self):
        return hash((self.__class__, tuple(self._get_items())))


class VoidType(BaseType):
    _attrs_ = ()

    def __init__(self):
        self.c_name_with_marker = 'void&'

    def build_backend_type(self, ffi, finishlist):
        return global_cache(self, ffi, 'new_void_type')

void_type = VoidType()


class BasePrimitiveType(BaseType):
    def is_complex_type(self):
        return False


class PrimitiveType(BasePrimitiveType):
    _attrs_ = ('name',)

    ALL_PRIMITIVE_TYPES = {
        'char':               'c',
        'short':              'i',
        'int':                'i',
        'long':               'i',
        'long long':          'i',
        'signed char':        'i',
        'unsigned char':      'i',
        'unsigned short':     'i',
        'unsigned int':       'i',
        'unsigned long':      'i',
        'unsigned long long': 'i',
        'float':              'f',
        'double':             'f',
        'long double':        'f',
        'float _Complex':     'j',
        'double _Complex':    'j',
        '_Bool':              'i',
        # the following types are not primitive in the C sense
        'wchar_t':            'c',
        'char16_t':           'c',
        'char32_t':           'c',
        'int8_t':             'i',
        'uint8_t':            'i',
        'int16_t':            'i',
        'uint16_t':           'i',
        'int32_t':            'i',
        'uint32_t':           'i',
        'int64_t':            'i',
        'uint64_t':           'i',
        'int_least8_t':       'i',
        'uint_least8_t':      'i',
        'int_least16_t':      'i',
        'uint_least16_t':     'i',
        'int_least32_t':      'i',
        'uint_least32_t':     'i',
        'int_least64_t':      'i',
        'uint_least64_t':     'i',
        'int_fast8_t':        'i',
        'uint_fast8_t':       'i',
        'int_fast16_t':       'i',
        'uint_fast16_t':      'i',
        'int_fast32_t':       'i',
        'uint_fast32_t':      'i',
        'int_fast64_t':       'i',
        'uint_fast64_t':      'i',
        'intptr_t':           'i',
        'uintptr_t':          'i',
        'intmax_t':           'i',
        'uintmax_t':          'i',
        'ptrdiff_t':          'i',
        'size_t':             'i',
        'ssize_t':            'i',
        }

    def __init__(self, name):
        assert name in self.ALL_PRIMITIVE_TYPES
        self.name = name
        self.c_name_with_marker = name + '&'

    def is_char_type(self):
        return self.ALL_PRIMITIVE_TYPES[self.name] == 'c'
    def is_integer_type(self):
        return self.ALL_PRIMITIVE_TYPES[self.name] == 'i'
    def is_float_type(self):
        return self.ALL_PRIMITIVE_TYPES[self.name] == 'f'
    def is_complex_type(self):
        return self.ALL_PRIMITIVE_TYPES[self.name] == 'j'

    def build_backend_type(self, ffi, finishlist):
        return global_cache(self, ffi, 'new_primitive_type', self.name)


class UnknownIntegerType(BasePrimitiveType):
    _attrs_ = ('name',)

    def __init__(self, name):
        self.name = name
        self.c_name_with_marker = name + '&'

    def is_integer_type(self):
        return True

    def build_backend_type(self, ffi, finishlist):
        raise NotImplementedError("integer type '%s' can only be used after "
                                  "compilation" % self.name)

class UnknownFloatType(BasePrimitiveType):
    _attrs_ = ('name', )

    def __init__(self, name):
        self.name = name
        self.c_name_with_marker = name + '&'

    def build_backend_type(self, ffi, finishlist):
        raise NotImplementedError("float type '%s' can only be used after "
                                  "compilation" % self.name)


class BaseFunctionType(BaseType):
    _attrs_ = ('args', 'result', 'ellipsis', 'abi')

    def __init__(self, args, result, ellipsis, abi=None):
        self.args = args
        self.result = result
        self.ellipsis = ellipsis
        self.abi = abi
        #
        reprargs = [arg._get_c_name() for arg in self.args]
        if self.ellipsis:
            reprargs.append('...')
        reprargs = reprargs or ['void']
        replace_with = self._base_pattern % (', '.join(reprargs),)
        if abi is not None:
            replace_with = replace_with[:1] + abi + ' ' + replace_with[1:]
        self.c_name_with_marker = (
            self.result.c_name_with_marker.replace('&', replace_with))


class RawFunctionType(BaseFunctionType):
    # Corresponds to a C type like 'int(int)', which is the C type of
    # a function, but not a pointer-to-function.  The backend has no
    # notion of such a type; it's used temporarily by parsing.
    _base_pattern = '(&)(%s)'
    is_raw_function = True

    def build_backend_type(self, ffi, finishlist):
        raise CDefError("cannot render the type %r: it is a function "
                        "type, not a pointer-to-function type" % (self,))

    def as_function_pointer(self):
        return FunctionPtrType(self.args, self.result, self.ellipsis, self.abi)


class FunctionPtrType(BaseFunctionType):
    _base_pattern = '(*&)(%s)'

    def build_backend_type(self, ffi, finishlist):
        result = self.result.get_cached_btype(ffi, finishlist)
        args = []
        for tp in self.args:
            args.append(tp.get_cached_btype(ffi, finishlist))
        abi_args = ()
        if self.abi == "__stdcall":
            if not self.ellipsis:    # __stdcall ignored for variadic funcs
                try:
                    abi_args = (ffi._backend.FFI_STDCALL,)
                except AttributeError:
                    pass
        return global_cache(self, ffi, 'new_function_type',
                            tuple(args), result, self.ellipsis, *abi_args)

    def as_raw_function(self):
        return RawFunctionType(self.args, self.result, self.ellipsis, self.abi)


class PointerType(BaseType):
    _attrs_ = ('totype', 'quals')

    def __init__(self, totype, quals=0):
        self.totype = totype
        self.quals = quals
        extra = qualify(quals, " *&")
        if totype.is_array_type:
            extra = "(%s)" % (extra.lstrip(),)
        self.c_name_with_marker = totype.c_name_with_marker.replace('&', extra)

    def build_backend_type(self, ffi, finishlist):
        BItem = self.totype.get_cached_btype(ffi, finishlist, can_delay=True)
        return global_cache(self, ffi, 'new_pointer_type', BItem)

voidp_type = PointerType(void_type)

def ConstPointerType(totype):
    return PointerType(totype, Q_CONST)

const_voidp_type = ConstPointerType(void_type)


class NamedPointerType(PointerType):
    _attrs_ = ('totype', 'name')

    def __init__(self, totype, name, quals=0):
        PointerType.__init__(self, totype, quals)
        self.name = name
        self.c_name_with_marker = name + '&'


class ArrayType(BaseType):
    _attrs_ = ('item', 'length')
    is_array_type = True

    def __init__(self, item, length):
        self.item = item
        self.length = length
        #
        if length is None:
            brackets = '&[]'
        elif length == '...':
            brackets = '&[/*...*/]'
        else:
            brackets = '&[%s]' % length
        self.c_name_with_marker = (
            self.item.c_name_with_marker.replace('&', brackets))

    def resolve_length(self, newlength):
        return ArrayType(self.item, newlength)

    def build_backend_type(self, ffi, finishlist):
        if self.length == '...':
            raise CDefError("cannot render the type %r: unknown length" %
                            (self,))
        self.item.get_cached_btype(ffi, finishlist)   # force the item BType
        BPtrItem = PointerType(self.item).get_cached_btype(ffi, finishlist)
        return global_cache(self, ffi, 'new_array_type', BPtrItem, self.length)

char_array_type = ArrayType(PrimitiveType('char'), None)


class StructOrUnionOrEnum(BaseTypeByIdentity):
    _attrs_ = ('name',)
    forcename = None

    def build_c_name_with_marker(self):
        name = self.forcename or '%s %s' % (self.kind, self.name)
        self.c_name_with_marker = name + '&'

    def force_the_name(self, forcename):
        self.forcename = forcename
        self.build_c_name_with_marker()

    def get_official_name(self):
        assert self.c_name_with_marker.endswith('&')
        return self.c_name_with_marker[:-1]


class StructOrUnion(StructOrUnionOrEnum):
    fixedlayout = None
    completed = 0
    partial = False
    packed = False

    def __init__(self, name, fldnames, fldtypes, fldbitsize, fldquals=None):
        self.name = name
        self.fldnames = fldnames
        self.fldtypes = fldtypes
        self.fldbitsize = fldbitsize
        self.fldquals = fldquals
        self.build_c_name_with_marker()

    def has_anonymous_struct_fields(self):
        if self.fldtypes is None:
            return False
        for name, type in zip(self.fldnames, self.fldtypes):
            if name == '' and isinstance(type, StructOrUnion):
                return True
        return False

    def enumfields(self):
        fldquals = self.fldquals
        if fldquals is None:
            fldquals = (0,) * len(self.fldnames)
        for name, type, bitsize, quals in zip(self.fldnames, self.fldtypes,
                                              self.fldbitsize, fldquals):
            if name == '' and isinstance(type, StructOrUnion):
                # nested anonymous struct/union
                for result in type.enumfields():
                    yield result
            else:
                yield (name, type, bitsize, quals)

    def force_flatten(self):
        # force the struct or union to have a declaration that lists
        # directly all fields returned by enumfields(), flattening
        # nested anonymous structs/unions.
        names = []
        types = []
        bitsizes = []
        fldquals = []
        for name, type, bitsize, quals in self.enumfields():
            names.append(name)
            types.append(type)
            bitsizes.append(bitsize)
            fldquals.append(quals)
        self.fldnames = tuple(names)
        self.fldtypes = tuple(types)
        self.fldbitsize = tuple(bitsizes)
        self.fldquals = tuple(fldquals)

    def get_cached_btype(self, ffi, finishlist, can_delay=False):
        BType = StructOrUnionOrEnum.get_cached_btype(self, ffi, finishlist,
                                                     can_delay)
        if not can_delay:
            self.finish_backend_type(ffi, finishlist)
        return BType

    def finish_backend_type(self, ffi, finishlist):
        if self.completed:
            if self.completed != 2:
                raise NotImplementedError("recursive structure declaration "
                                          "for '%s'" % (self.name,))
            return
        BType = ffi._cached_btypes[self]
        #
        self.completed = 1
        #
        if self.fldtypes is None:
            pass    # not completing it: it's an opaque struct
            #
        elif self.fixedlayout is None:
            fldtypes = [tp.get_cached_btype(ffi, finishlist)
                        for tp in self.fldtypes]
            lst = list(zip(self.fldnames, fldtypes, self.fldbitsize))
            sflags = 0
            if self.packed:
                sflags = 8    # SF_PACKED
            ffi._backend.complete_struct_or_union(BType, lst, self,
                                                  -1, -1, sflags)
            #
        else:
            fldtypes = []
            fieldofs, fieldsize, totalsize, totalalignment = self.fixedlayout
            for i in range(len(self.fldnames)):
                fsize = fieldsize[i]
                ftype = self.fldtypes[i]
                #
                if isinstance(ftype, ArrayType) and ftype.length == '...':
                    # fix the length to match the total size
                    BItemType = ftype.item.get_cached_btype(ffi, finishlist)
                    nlen, nrest = divmod(fsize, ffi.sizeof(BItemType))
                    if nrest != 0:
                        self._verification_error(
                            "field '%s.%s' has a bogus size?" % (
                            self.name, self.fldnames[i] or '{}'))
                    ftype = ftype.resolve_length(nlen)
                    self.fldtypes = (self.fldtypes[:i] + (ftype,) +
                                     self.fldtypes[i+1:])
                #
                BFieldType = ftype.get_cached_btype(ffi, finishlist)
                if isinstance(ftype, ArrayType) and ftype.length is None:
                    assert fsize == 0
                else:
                    bitemsize = ffi.sizeof(BFieldType)
                    if bitemsize != fsize:
                        self._verification_error(
                            "field '%s.%s' is declared as %d bytes, but is "
                            "really %d bytes" % (self.name,
                                                 self.fldnames[i] or '{}',
                                                 bitemsize, fsize))
                fldtypes.append(BFieldType)
            #
            lst = list(zip(self.fldnames, fldtypes, self.fldbitsize, fieldofs))
            ffi._backend.complete_struct_or_union(BType, lst, self,
                                                  totalsize, totalalignment)
        self.completed = 2

    def _verification_error(self, msg):
        raise VerificationError(msg)

    def check_not_partial(self):
        if self.partial and self.fixedlayout is None:
            raise VerificationMissing(self._get_c_name())

    def build_backend_type(self, ffi, finishlist):
        self.check_not_partial()
        finishlist.append(self)
        #
        return global_cache(self, ffi, 'new_%s_type' % self.kind,
                            self.get_official_name(), key=self)


class StructType(StructOrUnion):
    kind = 'struct'


class UnionType(StructOrUnion):
    kind = 'union'


class EnumType(StructOrUnionOrEnum):
    kind = 'enum'
    partial = False
    partial_resolved = False

    def __init__(self, name, enumerators, enumvalues, baseinttype=None):
        self.name = name
        self.enumerators = enumerators
        self.enumvalues = enumvalues
        self.baseinttype = baseinttype
        self.build_c_name_with_marker()

    def force_the_name(self, forcename):
        StructOrUnionOrEnum.force_the_name(self, forcename)
        if self.forcename is None:
            name = self.get_official_name()
            self.forcename = '$' + name.replace(' ', '_')

    def check_not_partial(self):
        if self.partial and not self.partial_resolved:
            raise VerificationMissing(self._get_c_name())

    def build_backend_type(self, ffi, finishlist):
        self.check_not_partial()
        base_btype = self.build_baseinttype(ffi, finishlist)
        return global_cache(self, ffi, 'new_enum_type',
                            self.get_official_name(),
                            self.enumerators, self.enumvalues,
                            base_btype, key=self)

    def build_baseinttype(self, ffi, finishlist):
        if self.baseinttype is not None:
            return self.baseinttype.get_cached_btype(ffi, finishlist)
        #
        if self.enumvalues:
            smallest_value = min(self.enumvalues)
            largest_value = max(self.enumvalues)
        else:
            import warnings
            try:
                # XXX!  The goal is to ensure that the warnings.warn()
                # will not suppress the warning.  We want to get it
                # several times if we reach this point several times.
                __warningregistry__.clear()
            except NameError:
                pass
            warnings.warn("%r has no values explicitly defined; "
                          "guessing that it is equivalent to 'unsigned int'"
                          % self._get_c_name())
            smallest_value = largest_value = 0
        if smallest_value < 0:   # needs a signed type
            sign = 1
            candidate1 = PrimitiveType("int")
            candidate2 = PrimitiveType("long")
        else:
            sign = 0
            candidate1 = PrimitiveType("unsigned int")
            candidate2 = PrimitiveType("unsigned long")
        btype1 = candidate1.get_cached_btype(ffi, finishlist)
        btype2 = candidate2.get_cached_btype(ffi, finishlist)
        size1 = ffi.sizeof(btype1)
        size2 = ffi.sizeof(btype2)
        if (smallest_value >= ((-1) << (8*size1-1)) and
            largest_value < (1 << (8*size1-sign))):
            return btype1
        if (smallest_value >= ((-1) << (8*size2-1)) and
            largest_value < (1 << (8*size2-sign))):
            return btype2
        raise CDefError("%s values don't all fit into either 'long' "
                        "or 'unsigned long'" % self._get_c_name())

def unknown_type(name, structname=None):
    if structname is None:
        structname = '$%s' % name
    tp = StructType(structname, None, None, None)
    tp.force_the_name(name)
    tp.origin = "unknown_type"
    return tp

def unknown_ptr_type(name, structname=None):
    if structname is None:
        structname = '$$%s' % name
    tp = StructType(structname, None, None, None)
    return NamedPointerType(tp, name)


global_lock = allocate_lock()
_typecache_cffi_backend = weakref.WeakValueDictionary()

def get_typecache(backend):
    # returns _typecache_cffi_backend if backend is the _cffi_backend
    # module, or type(backend).__typecache if backend is an instance of
    # CTypesBackend (or some FakeBackend class during tests)
    if isinstance(backend, types.ModuleType):
        return _typecache_cffi_backend
    with global_lock:
        if not hasattr(type(backend), '__typecache'):
            type(backend).__typecache = weakref.WeakValueDictionary()
        return type(backend).__typecache

def global_cache(srctype, ffi, funcname, *args, **kwds):
    key = kwds.pop('key', (funcname, args))
    assert not kwds
    try:
        return ffi._typecache[key]
    except KeyError:
        pass
    try:
        res = getattr(ffi._backend, funcname)(*args)
    except NotImplementedError as e:
        raise NotImplementedError("%s: %r: %s" % (funcname, srctype, e))
    # note that setdefault() on WeakValueDictionary is not atomic
    # and contains a rare bug (http://bugs.python.org/issue19542);
    # we have to use a lock and do it ourselves
    cache = ffi._typecache
    with global_lock:
        res1 = cache.get(key)
        if res1 is None:
            cache[key] = res
            return res
        else:
            return res1

def pointer_cache(ffi, BType):
    return global_cache('?', ffi, 'new_pointer_type', BType)

def attach_exception_info(e, name):
    if e.args and type(e.args[0]) is str:
        e.args = ('%s: %s' % (name, e.args[0]),) + e.args[1:]
