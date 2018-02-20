import os,re
def tagger():
    snippet_files = [snippet.replace('.md','')for snippet in os.listdir('snippets')]

    tag_database_file = open('tag_database')

    tag_database = tag_database_file.read()

    tag_database_file.close()

    tag_database = [tag for tag in tag_database.split('\n') if tag.strip() != '']

    tag_db = {}

    for tag in tag_database:
        tag_db[tag.split(':')[0].strip()] = tag.split(':')[1].strip().split(',')
    return tag_db
def read_snippets():
    snippet_files = os.listdir('snippets')

    snippets = []

    class snippet():
        def __init__(self,file_location):
            with open(file_location) as f:
                self.content = f.read()
                self.codeRe = "```\s*python([\s\S]*?)```"
                self.titleRe = '###\\s*([\\w]+)'
                self.descRe = '###\s*\w+\s*([\s\S]+)```\s*python[\s\S]+```\s*```\s*python[\s\S]+```'
                self.name = self.read_title()
                self.category = tagger()[self.name]
        def read_code(self):
            return re.findall(self.codeRe,self.content)[0].strip()
        def read_title(self):
            return re.findall(self.titleRe,self.content)[0].strip()
        def read_description(self):
            return re.findall(self.descRe,self.content)[0].strip()
        def read_example(self):
            return re.findall(self.codeRe,self.content)[1].strip()
    for snippet_file in snippet_files:
        snippets.append(snippet(f'snippets/{snippet_file}'))
    return snippets
def read_readme_start():
    with open('static-part/readme-start.md') as f:
        readme_start = f.read()
    return readme_start
def read_readme_end():
    with open('static-part/readme-end.md') as f:
        readme_end = f.read()
    return readme_end 
