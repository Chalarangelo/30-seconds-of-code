import types,functools
from tape import test
from palindrome import palindrome
def palindrome_test(t):
    t.true(isinstance(palindrome, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'palindrome is a function')
test('Testing palindrome',palindrome_test)
