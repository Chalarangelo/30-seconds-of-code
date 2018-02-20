import types,functools
from tape import test
from deep_flatten import deep_flatten
def deep_flatten_test(t):
    t.true(isinstance(deep_flatten, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'deep_flatten is a function')
test('Testing deep_flatten',deep_flatten_test)
