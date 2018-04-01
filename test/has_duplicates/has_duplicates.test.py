import types,functools
from pytape import test
from has_duplicates import has_duplicates
def has_duplicates(t):
    t.true(isinstance(has_duplicates, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'has_duplicates is a function')
test('Testing has_duplicates',has_duplicates_test)