import types,functools
from pytape import test
from chunk import chunk
def chunk_test(t):
    t.true(isinstance(chunk, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'chunk is a function')
test('Testing chunk',chunk_test)