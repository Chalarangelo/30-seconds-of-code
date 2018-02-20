import types,functools
from pytape import test
from difference_by import difference_by
def difference_by_test(t):
    t.true(isinstance(difference_by, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'difference_by is a function')
test('Testing difference_by',difference_by_test)