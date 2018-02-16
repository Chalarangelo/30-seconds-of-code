import types,functools
from tape import test
from max_n import max_n
def max_n_test(t):
    t.true(isinstance(max_n, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'max_n is a function')
test('Testing max_n',max_n_test)