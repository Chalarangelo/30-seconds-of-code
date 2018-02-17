import types,functools
from pytape import test
from min_n import min_n
def min_n_test(t):
    t.true(isinstance(min_n, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'min_n is a function')
test('Testing min_n',min_n_test)