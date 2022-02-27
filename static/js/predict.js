console.log("predictJS success.")

//get hostname
var hostname = window.location.origin;
//set get all states end point
var getStateURL = `${hostname}/api/get_all_states`;
//set get all data end point
var getAllDataURL = `${hostname}/api/get_all_data`;

// Get the state and county by zipcode entered
var zip_state = d3.select("#zip_state")
var zip_county = d3.select("#zip_county")

// input to the model 
var zip_state = d3.select("#iPov_rate")
var zip_state = d3.select("#iMed_inc")
var zip_state = d3.select("#iUnemp_rate")

// IDs for return the predicting score
var zip_state = d3.select("#pred_4M")
var zip_state = d3.select("#pred_4R")
var zip_state = d3.select("#pred_8M")
var zip_state = d3.select("#pred_8R")


