import types,functools
from tape import test
from difference import difference
def difference_test(t):
    t.true(isinstance(difference, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'difference is a function')
test('Testing difference',difference_test)