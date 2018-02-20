from flask import Flask

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = 'thedarklordisgreat'

from app import routes,vote