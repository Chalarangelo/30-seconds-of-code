import types,functools
from pytape import test
from decapitalize import decapitalize
def decapitalize_test(t):
    t.true(isinstance(decapitalize, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'decapitalize is a function')
test('Testing decapitalize',decapitalize_test)