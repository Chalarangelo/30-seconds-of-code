import types,functools
from tape import test
from gcd import gcd
def gcd_test(t):
    t.true(isinstance(gcd, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'gcd is a function')
test('Testing gcd',gcd_test)
