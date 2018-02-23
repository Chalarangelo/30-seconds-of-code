import autopep8
import os
import util
snippets = util.read_snippets()
for snippet in snippets:
    formatedCode = autopep8.fix_code(snippet.read_code()).strip()
    fixedCode = snippet.content.replace(snippet.read_code(),formatedCode)
    snippetFile = open(f"snippets/{snippet.name}.md",'w')
    snippetFile.write(fixedCode)
    snippetFile.close()