import os
import re
codeRe = "```\s*python([\s\S]*?)```"
def title_case(str):
    return str[:1].upper() + str[1:].lower()
EMOJIS = {
  'adapter': ':electric_plug:',
  'list': ':books:',
  'browser': ':globe_with_meridians:',
  'date': ':stopwatch:',
  'function': ':control_knobs:',
  'logic': ':crystal_ball:',
  'math': ':heavy_division_sign:',
  'media': ':tv:',
  'node': ':package:',
  'object': 'card_file_box',
  'string': ':scroll:',
  'type': ':page_with_curl:',
  'utility': ':wrench:'
}
def tagger():
    tag_data = open('tag_database').read()
    tag_dict = {}
    tag_list = tag_data.split('\n')
    for tag in tag_list:
        category = tag.split(':')[1]
        snippet = tag.split(':')[0]
        if category in tag_dict:
            tag_dict[category].append(snippet)
        else:
            tag_dict[category] = [snippet]
    return tag_dict

files = os.listdir('snippets')
start = open("static-parts/readme-start.md").read() + '\n\n'
end = open("static-parts/readme-end.md").read()
toAppend = ''
tag_dict = tagger()
toAppend += '## Table of Content \n'
for category in tag_dict:
    toAppend = toAppend + '### ' + EMOJIS[category] + ' ' + title_case(category) +'\n\n<details><summary>View contents</summary> <ul>'
    for snippet in tag_dict[category]:
        toAppend += f'<li><a href = "#{snippet}"><code>{snippet}</code></a></li>\n'
    toAppend += '</ul></details>\n\n'
toAppend += '<hr></hr> \n\n'
for category in tag_dict:
    toAppend = toAppend + '## ' + EMOJIS[category] + ' ' + title_case(category) +'\n\n'
    for snippet in tag_dict[category]:
        someFile = open("snippets/" + snippet + '.md')
        fileData = someFile.read() 
        codeParts = re.split(codeRe,fileData)
        toAppend += codeParts[0] + f'```py{codeParts[1]} \n ```' +codeParts[2] + f'<details><summary>View Examples</summary>\n\n```py\n{codeParts[3]}\n```\n<details>' + '\n'
open("README.md",'w').write(start+toAppend+'\n'+end)    
