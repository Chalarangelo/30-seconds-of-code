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
    #print(re.split(codeRe,fileData)[0])
    formatedCode = '\n'+autopep8.fix_code(re.split(codeRe,fileData)[1]).strip()+'\n'
    fileToSave = fileData.replace(originalCode,('```python'+formatedCode+'```'))
    someFile = open("snippets/"+file,'w')
    someFile.write(fileToSave)
    someFile.close()