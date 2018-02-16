import types,functools
from tape import test
from average import average
def average_test(t):
    t.true(isinstance(average, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'average is a function')
test('Testing average',average_test)