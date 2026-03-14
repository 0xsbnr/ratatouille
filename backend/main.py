from flask import Flask
from db import Database
import json
from flask_cors import CORS
import our_types

database = Database("i")

app = Flask(__name__)
CORS(app, origins=["https://localhost:8080", "http://localhost:8080",
     "https://localhost:3000", "http://localhost:3000", "192.168.0.37"])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/api/get_thing/', methods=['GET', 'POST'])
def get_thing():
    if request.is_json:
        data = request.json
        return json.dumps(db.get_thing(argument=data.argument_name))
    else:
        return json.dumps("ERR Content type is not supported."), 418
