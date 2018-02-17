from .error import VerificationError

class CffiOp(object):
    def __init__(self, op, arg):
        self.op = op
        self.arg = arg

    def as_c_expr(self):
        if self.op is None:
            assert isinstance(self.arg, str)
            return '(_cffi_opcode_t)(%s)' % (self.arg,)
        classname = CLASS_NAME[self.op]
        return '_CFFI_OP(_CFFI_OP_%s, %s)' % (classname, self.arg)

    def as_python_bytes(self):
        if self.op is None and self.arg.isdigit():
            value = int(self.arg)     # non-negative: '-' not in self.arg
            if value >= 2**31:
                raise OverflowError("cannot emit %r: limited to 2**31-1"
                                    % (self.arg,))
            return format_four_bytes(value)
        if isinstance(self.arg, str):
            raise VerificationError("cannot emit to Python: %r" % (self.arg,))
        return format_four_bytes((self.arg << 8) | self.op)

    def __str__(self):
        classname = CLASS_NAME.get(self.op, self.op)
        return '(%s %s)' % (classname, self.arg)

def format_four_bytes(num):
    return '\\x%02X\\x%02X\\x%02X\\x%02X' % (
        (num >> 24) & 0xFF,
        (num >> 16) & 0xFF,
        (num >>  8) & 0xFF,
        (num      ) & 0xFF)

OP_PRIMITIVE       = 1
OP_POINTER         = 3
OP_ARRAY           = 5
OP_OPEN_ARRAY      = 7
OP_STRUCT_UNION    = 9
OP_ENUM            = 11
OP_FUNCTION        = 13
OP_FUNCTION_END    = 15
OP_NOOP            = 17
OP_BITFIELD        = 19
OP_TYPENAME        = 21
OP_CPYTHON_BLTN_V  = 23   # varargs
OP_CPYTHON_BLTN_N  = 25   # noargs
OP_CPYTHON_BLTN_O  = 27   # O  (i.e. a single arg)
OP_CONSTANT        = 29
OP_CONSTANT_INT    = 31
OP_GLOBAL_VAR      = 33
OP_DLOPEN_FUNC     = 35
OP_DLOPEN_CONST    = 37
OP_GLOBAL_VAR_F    = 39
OP_EXTERN_PYTHON   = 41

PRIM_VOID          = 0
PRIM_BOOL          = 1
PRIM_CHAR          = 2
PRIM_SCHAR         = 3
PRIM_UCHAR         = 4
PRIM_SHORT         = 5
PRIM_USHORT        = 6
PRIM_INT           = 7
PRIM_UINT          = 8
PRIM_LONG          = 9
PRIM_ULONG         = 10
PRIM_LONGLONG      = 11
PRIM_ULONGLONG     = 12
PRIM_FLOAT         = 13
PRIM_DOUBLE        = 14
PRIM_LONGDOUBLE    = 15

PRIM_WCHAR         = 16
PRIM_INT8          = 17
PRIM_UINT8         = 18
PRIM_INT16         = 19
PRIM_UINT16        = 20
PRIM_INT32         = 21
PRIM_UINT32        = 22
PRIM_INT64         = 23
PRIM_UINT64        = 24
PRIM_INTPTR        = 25
PRIM_UINTPTR       = 26
PRIM_PTRDIFF       = 27
PRIM_SIZE          = 28
PRIM_SSIZE         = 29
PRIM_INT_LEAST8    = 30
PRIM_UINT_LEAST8   = 31
PRIM_INT_LEAST16   = 32
PRIM_UINT_LEAST16  = 33
PRIM_INT_LEAST32   = 34
PRIM_UINT_LEAST32  = 35
PRIM_INT_LEAST64   = 36
PRIM_UINT_LEAST64  = 37
PRIM_INT_FAST8     = 38
PRIM_UINT_FAST8    = 39
PRIM_INT_FAST16    = 40
PRIM_UINT_FAST16   = 41
PRIM_INT_FAST32    = 42
PRIM_UINT_FAST32   = 43
PRIM_INT_FAST64    = 44
PRIM_UINT_FAST64   = 45
PRIM_INTMAX        = 46
PRIM_UINTMAX       = 47
PRIM_FLOATCOMPLEX  = 48
PRIM_DOUBLECOMPLEX = 49
PRIM_CHAR16        = 50
PRIM_CHAR32        = 51

_NUM_PRIM          = 52
_UNKNOWN_PRIM          = -1
_UNKNOWN_FLOAT_PRIM    = -2
_UNKNOWN_LONG_DOUBLE   = -3

_IO_FILE_STRUCT        = -1

PRIMITIVE_TO_INDEX = {
    'char':               PRIM_CHAR,
    'short':              PRIM_SHORT,
    'int':                PRIM_INT,
    'long':               PRIM_LONG,
    'long long':          PRIM_LONGLONG,
    'signed char':        PRIM_SCHAR,
    'unsigned char':      PRIM_UCHAR,
    'unsigned short':     PRIM_USHORT,
    'unsigned int':       PRIM_UINT,
    'unsigned long':      PRIM_ULONG,
    'unsigned long long': PRIM_ULONGLONG,
    'float':              PRIM_FLOAT,
    'double':             PRIM_DOUBLE,
    'long double':        PRIM_LONGDOUBLE,
    'float _Complex':     PRIM_FLOATCOMPLEX,
    'double _Complex':    PRIM_DOUBLECOMPLEX,
    '_Bool':              PRIM_BOOL,
    'wchar_t':            PRIM_WCHAR,
    'char16_t':           PRIM_CHAR16,
    'char32_t':           PRIM_CHAR32,
    'int8_t':             PRIM_INT8,
    'uint8_t':            PRIM_UINT8,
    'int16_t':            PRIM_INT16,
    'uint16_t':           PRIM_UINT16,
    'int32_t':            PRIM_INT32,
    'uint32_t':           PRIM_UINT32,
    'int64_t':            PRIM_INT64,
    'uint64_t':           PRIM_UINT64,
    'intptr_t':           PRIM_INTPTR,
    'uintptr_t':          PRIM_UINTPTR,
    'ptrdiff_t':          PRIM_PTRDIFF,
    'size_t':             PRIM_SIZE,
    'ssize_t':            PRIM_SSIZE,
    'int_least8_t':       PRIM_INT_LEAST8,
    'uint_least8_t':      PRIM_UINT_LEAST8,
    'int_least16_t':      PRIM_INT_LEAST16,
    'uint_least16_t':     PRIM_UINT_LEAST16,
    'int_least32_t':      PRIM_INT_LEAST32,
    'uint_least32_t':     PRIM_UINT_LEAST32,
    'int_least64_t':      PRIM_INT_LEAST64,
    'uint_least64_t':     PRIM_UINT_LEAST64,
    'int_fast8_t':        PRIM_INT_FAST8,
    'uint_fast8_t':       PRIM_UINT_FAST8,
    'int_fast16_t':       PRIM_INT_FAST16,
    'uint_fast16_t':      PRIM_UINT_FAST16,
    'int_fast32_t':       PRIM_INT_FAST32,
    'uint_fast32_t':      PRIM_UINT_FAST32,
    'int_fast64_t':       PRIM_INT_FAST64,
    'uint_fast64_t':      PRIM_UINT_FAST64,
    'intmax_t':           PRIM_INTMAX,
    'uintmax_t':          PRIM_UINTMAX,
    }

F_UNION         = 0x01
F_CHECK_FIELDS  = 0x02
F_PACKED        = 0x04
F_EXTERNAL      = 0x08
F_OPAQUE        = 0x10

G_FLAGS = dict([('_CFFI_' + _key, globals()[_key])
                for _key in ['F_UNION', 'F_CHECK_FIELDS', 'F_PACKED',
                             'F_EXTERNAL', 'F_OPAQUE']])

CLASS_NAME = {}
for _name, _value in list(globals().items()):
    if _name.startswith('OP_') and isinstance(_value, int):
        CLASS_NAME[_value] = _name[3:]
