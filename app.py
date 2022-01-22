# import dependencies

import psycopg2
import psycopg2.extras
import json
import config
from flask import Flask, render_template


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
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)