import util
import subprocess
import sys
for snippet in util.read_snippets():
    print(snippet.name)
    code = snippet.read_code()
    check_1 = subprocess.run(['flake8', '-','--select=E901,E999,F821,F822,F823','--count','--show-source','--statistics'], input=code, encoding='utf8',stdout=subprocess.PIPE)
    check_2 = subprocess.run(['flake8', '-','--exit-zero','--max-complexity=10','--count','--max-line-length=127','--statistics','--ignore=W292'], input=code, encoding='utf8',stdout=subprocess.PIPE)
    check_1.check_returncode()
    check_2.check_returncode()