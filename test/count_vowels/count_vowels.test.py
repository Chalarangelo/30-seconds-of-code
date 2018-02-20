import types,functools
from tape import test
from count_vowels import count_vowels
def count_vowels_test(t):
    t.true(isinstance(count_vowels, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'count_vowels is a function')
test('Testing count_vowels',count_vowels_test)
