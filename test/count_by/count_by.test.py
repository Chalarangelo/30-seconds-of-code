import types,functools
from pytape import test
from count_by import count_by
def count_by_test(t):
    t.true(isinstance(count_by, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'count_by is a function')
test('Testing count_by',count_by_test)