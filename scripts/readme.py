import util
from collections import defaultdict
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
    tag_db = defaultdict(list)
    for snippet in util.read_snippets():
        tag_db[snippet.category[0]].append(snippet)
    return tag_db

start = util.read_readme_start()
end = util.read_readme_end()
toAppend = ''
tag_dict = tagger()
for category in sorted(tag_dict):
    toAppend = toAppend + '### ' + EMOJIS[category] + ' ' + title_case(category) +'\n\n<details><summary>View contents</summary> <ul>'
    for snippet in sorted(tag_dict[category],key=lambda snippet : snippet.name):
        toAppend += f'<li><a href = "#{snippet.name}"><code>{snippet.name}</code></a></li>\n'
    toAppend += '</ul></details>\n\n'
toAppend += '<hr></hr> \n\n'
for category in sorted(tag_dict):
    toAppend = toAppend + '## ' + EMOJIS[category] + ' ' + title_case(scategory) +'\n\n'
    for snippet in sorted(tag_dict[category],key=lambda snippet : snippet.name):
        fileData = someFile.read() 
        toAppend += f'###{snippet.title}\n\n```py{snippet.read_code()} \n ```'.format(codeParts= codeParts) +codeParts[2] + '<details><summary>View Examples</summary>\n\n```py\n{codeParts[3]}\n```\n</details>\n\n<br><a href = "#table-of-contents">:arrow_up: Back to top</a>\n '.format(codeParts=codeParts) + '\n'
open("README.md",'w').write(start+toAppend+'\n'+end)'''    