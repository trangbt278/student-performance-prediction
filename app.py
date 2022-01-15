# import dependencies
import numpy as np
import pandas as pd
import datetime as dt

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
import config
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# import Flask and jsonify
from flask import Flask, jsonify, render_template, request

# create engine to hawaii.sqlite
engine = create_engine(f"postgresql://{config.user}:{config.password}@{config.host}:{config.port}/{config.database}")

# reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(engine, reflect=True)
# # Save reference to the table


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

@app.route("/comingSoon.html")
def comingSoon():
    return render_template("comingSoon.html") 

@app.route("/AssementProcess.html")
def AssementProcess():
    return render_template("/AssementProcess.html")

@app.route("/proj1charts.html")
def proj1charts():
    return render_template("/proj1charts.html")
    

if __name__ == '__main__':
    app.run( debug=True )