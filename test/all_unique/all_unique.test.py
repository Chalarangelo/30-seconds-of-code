import types,functools
from pytape import test
from all_unique import all_unique
def all_unique(t):
    t.true(isinstance(all_unique, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'all_unique is a function')
test('Testing all_unique',all_unique_test)