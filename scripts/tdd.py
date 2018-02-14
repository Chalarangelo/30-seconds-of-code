import os,re

codeRe = "```\s*python([\s\S]*?)```"

snippets = [string.replace('.md','') for string in os.listdir('snippets')]

for snippet in snippets:
    os.makedirs('test/' + snippet,exist_ok=True)
    with open(f'snippets/{snippet}.md','r') as f:
        content = f.read()
        code = re.search(codeRe,content).group(1).strip()
        file_to_write_to = open(f'test/{snippet}/{snippet}.py','w')
        test_file = open(f'test/{snippet}/{snippet}_test.py','w')
        file_to_write_to.write(code)
        file_to_write_to.close()
        test_file.write('''
import types,functools
from tape import test
from {snippet} import {snippet}
def {snippet}_test(t):
    t.true(isinstance({snippet}, (types.BuiltinFunctionType, types.FunctionType, functools.partial)),'{snippet} is a function')
test('Testing {snippet}',{snippet}_test)
        '''.format(snippet = snippet).strip())
        test_file.close()