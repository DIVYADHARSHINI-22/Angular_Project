from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle as p
import json
import csv
# import pandas as pd

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

@app.route('/predict')
def predict():
    # data = request.get_json()
    # features = [[13495]]
    # prediction = np.array2string(model.predict(features))
    # print("Predicted value ", jsonify(prediction))
    # return jsonify(prediction)

    with open('./Backend/predicted_values.csv', mode ='r') as file:
        data = list( csv.reader(file))
        print("Data ", data[1])
        # for lines in data:
        #     print(lines)
        return data[1]

    # data = pd.read_csv('./Backend/predicted_values.csv')
    # print("Data ", data)
    # return data

if __name__ =="__main__":
    modelfile = './Backend/Car_Dd_Predicted.pkl'
    model = p.load(open(modelfile, 'rb'))
    print("Model is ", model)
    print("Type is ", type(model))
    app.run(debug=True)
    