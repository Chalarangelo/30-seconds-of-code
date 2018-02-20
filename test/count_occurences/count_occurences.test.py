import types,functools
from tape import test
from count_occurences import count_occurences
def count_occurences_test(t):
    t.true(isinstance(count_occurences, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'count_occurences is a function')
test('Testing count_occurences',count_occurences_test)
