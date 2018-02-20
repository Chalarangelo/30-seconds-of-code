import json

def vote_data():
    f = open('website/app/snippets')
    snippets =  f.read().split('\n')
    f.close()

    f = open('website/app/votes.json')
    votes_data = json.load(f)
    votes = {}
    for snippet in snippets:
        try:
            votes[snippet] = votes_data[snippet]
        except KeyError:
            votes[snippet] = 0
    return votes
