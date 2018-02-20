import os,re
def author_reader():

    contributor_file = open('contributor_database')

    author_database = {}

    contributor_db = contributor_file.read().split('\n')
    contributor_db = [contributor for contributor in contributor_db if contributor.strip() != '']
    for contributor_data_db in contributor_db:
        snippetName,contributor_data = contributor_data_db.split(':')  
        author = contributor_data.split(',')[0]
        contributors = contributor_data.split(',')
        author = re.sub('(\[[\w\s]+\]\()\@(\w+)\)','\g<1>https://www.github.com/\g<2>)',author.strip())
        contributors = [re.sub('(\[[\w\s]+\]\()\@(\w+)\)','\g<1>https://www.github.com/\g<2>)',contributor) for contributor in contributors]
        author_database[snippetName] = (author,contributors)
    return author_database
def tagger():

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
    with open('static-parts/readme-start.md') as f:
        readme_start = f.read()
    return readme_start
def read_readme_end():
    with open('static-parts/readme-end.md') as f:
        readme_end = f.read()
    return readme_end 
