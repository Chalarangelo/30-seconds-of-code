import types,functools
from pytape import test
from byte_size import byte_size
def byte_size_test(t):
    t.true(isinstance(byte_size, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'byte_size is a function')
test('Testing byte_size',byte_size_test)