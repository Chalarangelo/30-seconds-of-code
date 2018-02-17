import types,functools
from pytape import test
from shuffle import shuffle
def shuffle_test(t):
    t.true(isinstance(shuffle, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'shuffle is a function')
test('Testing shuffle',shuffle_test)