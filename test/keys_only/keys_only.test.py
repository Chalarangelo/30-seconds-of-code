import types,functools
from pytape import test
from keys_only import keys_only
def keys_only_test(t):
    t.true(isinstance(keys_only, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'keys_only is a function')
test('Testing keys_only',keys_only_test)
