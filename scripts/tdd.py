import os,util


snippets = util.read_snippets()
for snippet in snippets:
    os.makedirs('test/' + snippet.name,exist_ok=True)
    file_to_write_to = open(f'test/{snippet.name}/{snippet.name}.py','w')
    file_to_write_to.write(snippet.read_code())
    file_to_write_to.close()
    if not os.path.isfile(f'test/{snippet.name}/{snippet.name}.test.py'):
        test_file = open(f'test/{snippet.name}/{snippet.name}.test.py','w')
        test_file.write(f'''
import types,functools
from pytape import test
from {snippet.name} import {snippet.name}
def {snippet.name}_test(t):
t.true(isinstance({snippet.name}, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'{snippet} is a function')
test('Testing {snippet.name}',{snippet.name}_test)
        '''.strip())
        test_file.close()
    else:
        pass
