
from flask import Flask
 
app = Flask(__name__) 
 
@app.route('/api/test')
def get_test():
    return {'result': 'hello world'}