import os
files = os.listdir('snippets')
print(os.listdir())
start = open("static-parts/readme-start.md").read() + '\n\n'
end = open("static-parts/readme-end.md").read()
toAppend = ''
for file in files:
    someFile = open("snippets/" + file)
    fileData = someFile.read() 
    toAppend += fileData + '\n'
open("README.md",'w').write(start+toAppend+'\n'+end)    
