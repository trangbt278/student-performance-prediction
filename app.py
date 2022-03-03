# import dependencies

from ntpath import join
#from urllib import request
import psycopg2
import psycopg2.extras
import json
import config
from flask import Flask, render_template, jsonify, request
import pickle
from sklearn.metrics import accuracy_score
import os
import numpy as np

# path to model files
grade_4_math_model_file = os.path.join(os.getcwd(),'sav_model_files/grade_4_math_model.sav')
grade_8_math_model_file = os.path.join(os.getcwd(),'sav_model_files/grade_8_math_model.sav')
grade_4_read_model_file = os.path.join(os.getcwd(),'sav_model_files/grade_4_read_model.sav')
grade_8_read_model_file = os.path.join(os.getcwd(),'sav_model_files/grade_8_read_model.sav')



# flask set up
app = Flask(__name__)

# set up routes
# home page route

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/homepage.html")
def motivation():
    return render_template("homepage.html")

@app.route("/stateAnalysis.html")
def stateAnalysis():
    return render_template("stateAnalysis.html") 

@app.route("/math8Analysis.html")
def math8():
    return render_template("math8Analysis.html") 

@app.route("/read8Analysis.html")
def read8():
    return render_template("read8Analysis.html") 

@app.route("/math4Analysis.html")
def math4():
    return render_template("math4Analysis.html") 

@app.route("/read4Analysis.html")
def read4():
    return render_template("read4Analysis.html") 

@app.route("/comingSoon.html")
def comingSoon():
    return render_template("comingSoon.html") 

@app.route("/AssementProcess.html")
def AssementProcess():
    return render_template("/AssementProcess.html")

@app.route("/proj1charts.html")
def proj1charts():
    return render_template("/proj1charts.html")

@app.route("/Diagram.html")
def Diagram():
    return render_template("/Diagram.html")

@app.route("/final_predict.html")
def final_predict():
    return render_template("final_predict.html")

@app.route("/custom_predict.html")
def custom_predict():
    return render_template("custom_predict.html")
    
@app.route("/api/get_all_data")
def get_all_data():
    conn = psycopg2.connect(host=config.host, port=config.port, dbname=config.database, password=config.password, user=config.user)
    with conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(config.queryString)
        rows = cursor.fetchall()
        return json.dumps(rows, indent=2)

@app.route("/api/get_all_states")
def get_all_states():
    conn = psycopg2.connect(host=config.host, port=config.port, dbname=config.database, password=config.password, user=config.user)
    queryString = "SELECT state FROM state;"
    with conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(queryString)
        rows = cursor.fetchall()
        return json.dumps(rows, indent=2)

@app.route("/api/get_county_data")
def get_county_data():
    conn = psycopg2.connect(host=config.host, port=config.port, dbname=config.database, password=config.password, user=config.user)
    with conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(config.county_data_queryString)
        rows = cursor.fetchall()
        return json.dumps(rows, indent=2)
    
# api/get_predicted_score?pov_percent=poverty_percentage_value&med_income=&unemp_rate=
@app.route("/api/get_predicted_score")
def get_predicted_score():
    #get the data from query data from api and append to X_test
    params = []
    params.append(float(request.args.get('pov_percent')))
    params.append(float(request.args.get('med_income')))
    params.append(float(request.args.get('unemp_rate')))
    X_test = []
    X_test.append(params)

    #load the models
    math_4_model = load_model(grade_4_math_model_file)
    math_8_model = load_model(grade_8_math_model_file)
    read_4_model = load_model(grade_4_read_model_file)
    read_8_model = load_model(grade_8_read_model_file)

    #predict scores
    math_4_pred_score = predict_score(math_4_model, X_test)
    math_8_pred_score = predict_score(math_8_model, X_test)
    read_4_pred_score = predict_score(read_4_model, X_test)
    read_8_pred_score = predict_score(read_8_model, X_test)

    return jsonify(math_4_predicted_score=math_4_pred_score[0], 
                math_8_predicted_score=math_8_pred_score[0],
                read_4_predicted_score=read_4_pred_score[0],
                read_8_predicted_score=read_8_pred_score[0]
                    )

#functions
# load models
def load_model(filename):
    file = open(filename, 'rb')
    loaded_model = pickle.load(file)
    return loaded_model

def get_accuracy_score(model, X_test, y_test):
    y_pred = model.predict(X_test)
    acc_score = accuracy_score(y_test,y_pred)
    return acc_score
#predict
def predict_score(model, X_test):
    y_pred = model.predict(X_test)
    return y_pred


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)