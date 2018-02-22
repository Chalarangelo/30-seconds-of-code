import types,functools
from pytape import test
from average import average
def average_test(t):
    t.true(isinstance(average, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'average is a function')
    t.equal(2,2,'equal')
test('Testing average',average_test)