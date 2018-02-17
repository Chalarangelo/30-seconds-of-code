import types,functools
from pytape import test
from capitalize_every_word import capitalize_every_word
def capitalize_every_word_test(t):
    t.true(isinstance(capitalize_every_word, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'capitalize_every_word is a function')
test('Testing capitalize_every_word',capitalize_every_word_test)