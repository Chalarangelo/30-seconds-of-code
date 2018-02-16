import types,functools
from tape import test
from is_upper_case import is_upper_case
def is_upper_case_test(t):
    t.true(isinstance(is_upper_case, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'is_upper_case is a function')
test('Testing is_upper_case',is_upper_case_test)