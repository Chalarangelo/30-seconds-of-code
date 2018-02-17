import types,functools
from pytape import test
from zip import zip
def zip_test(t):
    t.true(isinstance(zip, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'zip is a function')
test('Testing zip',zip_test)