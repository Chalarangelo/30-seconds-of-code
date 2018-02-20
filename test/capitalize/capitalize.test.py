import types,functools
from tape import test
from capitalize import capitalize
def capitalize_test(t):
    t.true(isinstance(capitalize, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'capitalize is a function')
test('Testing capitalize',capitalize_test)
