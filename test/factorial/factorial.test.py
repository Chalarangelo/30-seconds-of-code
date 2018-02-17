import types,functools
from pytape import test
from factorial import factorial
def factorial_test(t):
    t.true(isinstance(factorial, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'factorial is a function')
test('Testing factorial',factorial_test)