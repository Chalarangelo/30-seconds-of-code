import json


def vote(snippet):
    snippets = open('website/app/snippets').read().split('\n')
    with open('website/app/votes.json', 'r') as f:
        if snippet in snippets:
            data = json.load(f)
            try:
                data[snippet]
            except KeyError:
                data[snippet] = 0
            data[snippet] += 1
            open('website/app/votes.json','w').write(str(data).replace("'",'"'))
        else:
            raise Exception(f'{snippet} does not exists ')
