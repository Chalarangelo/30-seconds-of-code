import types,functools
from tape import test
from spread import spread
def spread_test(t):
    t.true(isinstance(spread, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'spread is a function')
test('Testing spread',spread_test)