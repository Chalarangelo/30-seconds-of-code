import autopep8
import re
import os
files = os.listdir('snippets')
codeRe = "```\s*python([\s\S]*?)```"
for file in files:
    someFile = open("snippets/" + file)
    fileData = someFile.read() 
    someFile.close()
    originalCode = re.search(codeRe,fileData).group(0)
    formatedCode = autopep8.fix_code(re.split(codeRe,fileData)[1])
    fileToSave = fileData.replace(originalCode,('```python \n'+formatedCode[0]+'\n```'))
    someFile = open("snippets/"+file,'w')
    someFile.write(fileToSave)
    someFile.close()