from flask import Flask
from db import Database
import json
from flask_cors import CORS
import our_types

database = Database("i")

app = Flask(__name__)
CORS(app, origins=["https://localhost:8080", "http://localhost:8080",
     "https://localhost:3000", "http://localhost:3000", "192.168.0.37"])


@app.route("/api/")
def hello_world():
    return "<p>spinning rats api</p>"



@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.is_json:
        data = request.json
        return json.dumps(database.log_in(username=data["username"],password=data["password"]))
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    if request.is_json:
        data = request.json
        return json.dumps(database.sign_up(username=data["username"],password=data["password"]))
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/get_groups', methods=['GET', 'POST'])
def get_groups():
    if request.is_json:
        data = request.json
        return json.dumps(database.get_groups(user_id=data["user_id"]))
    else:
        return json.dumps("ERR Content type is not supported."), 418
    


@app.route('/api/join_group', methods=['GET', 'POST'])
def join_group():
    if request.is_json:
        data = request.json
        return json.dumps(database.join_group(user_id=data["user_id"],group_id=data["group_id"]))
    else:
        return json.dumps("ERR Content type is not supported."), 418


@app.route('/api/send_drawing', methods=['GET', 'POST'])
def send_drawing():
    if request.is_json:
        data = request.json
        return json.dumps(database.add_square(user_id=["user_id"],file_path=data["file_path"],complete=data["complete"]))
    else:

        return json.dumps("ERR Content type is not supported."), 418

@app.route('/api/get_full_drawing', methods=['GET', 'POST'])
def get_full_drawing():
    if request.is_json:
        data = request.json
        return json.dumps(bad_data)
    else:

        return json.dumps("ERR Content type is not supported."), 418
    
    















