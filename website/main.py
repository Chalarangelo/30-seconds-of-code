import os
import re

import emoji
import mistune

codeRe = "```\s*python([\s\S]*?)```"
def tagger():
    tag_data = open('tag_database').read()
    tag_dict = {}
    tag_list = filter(lambda x:x.strip() != '',tag_data.split('\n'))
    for tag in tag_list:
        category = tag.split(':')[1]
        snippet = tag.split(':')[0]
        if category in tag_dict:
            tag_dict[category].append(snippet)
        else:
            tag_dict[category] = [snippet]
    return tag_dict

class MyRenderer(mistune.Renderer):
    def block_code(self, code, lang):
        if not lang:
            return f'\n<pre>{mistune.escape(code.strip())}</pre>\n'
        else:
            return f'\n<pre class="language-{lang}">{mistune.escape(code.strip())}</pre>\n'


renderer = MyRenderer()
md = mistune.Markdown(renderer=renderer,escape=True)
def title_case(str):
    return str[:1].upper() + str[1:].lower()

rendered = ''

tag_dict = tagger()

for category in tag_dict:
	rendered += f'<h2 style="text-align:center">{title_case(category)}</h2>'
	snippets = tag_dict[category]
	for file in snippets:
		content = open('snippets/'+file+'.md').read()
		content = re.sub(':(\S+):',r'<emoji>:\1:</emoji>',content)
		codeParts = re.split(codeRe,content)
		codeParts[3] = f'\n\n<label class="collapse">Show examples</label>\n\n```python\n{codeParts[3].strip()}\n```\n'
		content = codeParts[0] + '``` python' + codeParts[1] + '```' + codeParts[2] + codeParts[3]
		content = f'<div class="card fluid">{emoji.emojize(md.render(content),use_aliases=True)}<button class="primary clipboard-copy">📋&nbsp;Copy to clipboard</button></div>'+'\n\n'
		rendered += re.sub('<h3>(\S+)</h3>',r'<h3>\1</h3><div class="section double-padded">',content) + '</div>'
		rendered = re.sub('<h3>(\S+)</h3>',r'<h3 id="\1" class="section double-padded">\1</h3><!--<form action="" method="post"><button type="submit" value="\1" name="submit">Vote</button></form>'+'<p></p>-->',rendered)
nav_string = '<input id="doc-drawer-checkbox" class="drawer" value="on" type="checkbox"><nav class="col-md-4 col-lg-3" style="border-top:0"><div class="group"><input class="search" id="searchInput" onkeyup="search(this)" type="text"><label id="search-label">Search for snippet...</label></div><label for="doc-drawer-checkbox" class="button drawer-close"></label>'
for category in tag_dict:
	nav_string += f'<h3 style = "">{title_case(category)}</h3>'
	for file in tag_dict[category]:
		nav_string += f'<a class="sublink-1" tags="{category}" href="#{file}" style="">{file}</a>'
nav_string += '</nav>'
start = '''{% extends "base.html" %}

{% block content %}'''

end = '{% endblock %}'

footer = '''
			<footer><p style="display:inline-block"><strong>30 seconds of python code</strong> is licensed under the <a href="https://github.com/kriadmin/30-seconds-of-python-code/blob/master/LICENSE">GPL-3.0</a> license.<br>Icons made by <a href="https://www.flaticon.com/authors/smashicons">Smashicons</a> from <a href="https://www.flaticon.com/">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</a>.<br>Ribbon made by <a href="https://github.com/tholman/github-corners">Tim Holman</a> is licensed by <a href="https://opensource.org/licenses/MIT">The MIT License</a><br>Built with the <a href="https://minicss.org">mini.css framework</a>.</p></footer>
			'''
rendered = f'<div class="row" style="height:calc(100vh - 5.875rem);overflow:hidden">{nav_string}<main class="col-sm-12 col-md-8 col-lg-9" style="height:100%;overflow-y:auto;background:#eceef2;padding:0"><a id="top"></a>' + rendered + f'<button class="scroll-to-top">↑</button>{footer}</main></div>'
rendered = re.sub('<code\s*class=" language-python">','',rendered)
open('website/app/templates/index.html','w',encoding='utf-8').write(start + rendered + end)
snippets = [snippet.replace('.md','') for snippet in snippets]
open('website/app/snippets','w').write('\n'.join(snippets))
