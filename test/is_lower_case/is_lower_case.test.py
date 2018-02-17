import types,functools
from pytape import test
from is_lower_case import is_lower_case
def is_lower_case_test(t):
    t.true(isinstance(is_lower_case, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'is_lower_case is a function')
test('Testing is_lower_case',is_lower_case_test)