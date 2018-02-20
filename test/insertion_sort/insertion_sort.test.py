import types,functools
from pytape import test
from insertion_sort import insertion_sort
def insertion_sort_test(t):
    t.true(isinstance(insertion_sort, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'insertion_sort is a function')
test('Testing insertion_sort',insertion_sort_test)