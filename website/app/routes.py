from flask import render_template, redirect ,request, url_for
from app import app, vote, vote_data

@app.route('/')
@app.route('/index')
@app.route('/index/')
def index():
    return render_template('index.html',vote={})
'''
For future when we have logins
@app.route('/',methods=['POST'])
@app.route('/index',methods=['POST'])
@app.route('/index/',methods=['POST'])
def post():
    try:
        vote.vote(request.form['submit'])
    except Exception as e:
        return render_template('index.html', vote=vote_data.vote_data(),err_400=True,message=e)
    return redirect(f"/#{request.form['submit']}",code=302)
'''



