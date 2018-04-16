import types,functools
from pytape import test
from values_only import values_only
def values_only_test(t):
    t.true(isinstance(values_only, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'values_only is a function')
test('Testing values_only',values_only_test)