from flask import Flask
#from db import Database
import json
from flask_cors import CORS
import our_types

#database = Database("i")

app = Flask(__name__)
CORS(app, origins=["https://localhost:8080", "http://localhost:8080",
     "https://localhost:3000", "http://localhost:3000", "192.168.0.37"])

bad_data = { "yo" : "no" }

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"



@app.route('/api/login', methods=['GET', 'POST'])
def login(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/signup', methods=['GET', 'POST'])
def signup(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/get_groups', methods=['GET', 'POST'])
def get_groups(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:
        return json.dumps("ERR Content type is not supported."), 418
    


@app.route('/api/join_group', methods=['GET', 'POST'])
def join_group(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/send_drawing', methods=['GET', 'POST'])
def send_drawing(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:

        return json.dumps("ERR Content type is not supported."), 418

@app.route('/api/get_full_drawing', methods=['GET', 'POST'])
def get_full_drawing(username, password):
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:

        return json.dumps("ERR Content type is not supported."), 418
    
    















