import types
import functools
from pytape import test
from bubble_sort import bubble_sort


def bubble_sort_test(t):
    t.true(
        isinstance(bubble_sort, (types.BuiltinFunctionType, types.FunctionType,
                                 functools.partial)),
        '<util.read_snippets.<locals>.snippet object at 0x7fc8ea4c6978> is a function'
    )


test('Testing bubble_sort', bubble_sort_test)
