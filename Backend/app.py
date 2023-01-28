from flask import Flask, redirect, url_for, render_template
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/hello')
def hello():
    response_body = {
        "price": "Rs. 1,34,567.00",
    }

    return response_body


if __name__ =="__main__":
    app.run(debug=True)
    