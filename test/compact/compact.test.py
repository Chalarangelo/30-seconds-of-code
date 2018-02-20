import types,functools
from pytape import test
from compact import compact
def compact_test(t):
    t.true(isinstance(compact, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'compact is a function')
test('Testing compact',compact_test)