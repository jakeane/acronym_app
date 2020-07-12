
from flask import Flask, request
from create_acronym import generate_acronym

app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/test')
def get_test():
    return {'result': ['first acronym of sorts', 'another series of words', 'wow more words']}


@app.route('/api/acronym')
def get_acronym():
    word = request.args.get('word')
    data = request.args.get('data')
    # test_word = "play"
    # acronym_data = ["quotes", "shakespeare", "state_union", "inaugural", "bible", "all"]
    top_acro = generate_acronym(word, data)
    return {'result': top_acro}
