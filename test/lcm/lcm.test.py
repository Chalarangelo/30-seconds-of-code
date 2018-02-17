import types,functools
from pytape import test
from lcm import lcm
def lcm_test(t):
    t.true(isinstance(lcm, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'lcm is a function')
test('Testing lcm',lcm_test)