console.log("predictJS success.");

//get hostname
var hostname = window.location.origin;
//set get county data end point
var getCountyDataURL = `${hostname}/api/get_county_data`;


// Get the state and county by zipcode entered
var zip_code = d3.select("#zip_state");
var zip_state = d3.select("#zip_state");
var zip_county = d3.select("#zip_county");
var zip_poverty_percentage = d3.select("#zip_county");
var zip_med_income = d3.select("#zip_county");
var zip_unemployment_rate = d3.select("#zip_county");
// input to the model 
var input_pov_percent = d3.select("#iPov_rate");
var input_med_income = d3.select("#iMed_inc");
var input_unemp_rate = d3.select("#iUnemp_rate");

// IDs for return the predicting score
var pre_4_math = d3.select("#pred_4M");
var pre_4_read = d3.select("#pred_4R");
var pre_8_math = d3.select("#pred_8M");
var pre_8_read = d3.select("#pred_8R");

//show county data county data
function showCountyDataByZip(zipcode){
    //call api to get all
    d3.json(getCountyDataURL).then((data) => {
        var allData = data;
        //filter data by the selected state
        var countyData = allData.filter(x => x.zip_code == zipcode);
        zip_state.text(countyData[0].state);
        zip_county.text(countyData[0].county);
        zip_poverty_percentage.text(String(countyData[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
        zip_med_income.text(`$`+ String(countyData[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        zip_unemployment_rate.text(String(countyData[0].unemployment_rate).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
    });
}

function predictResult(pov_percent, med_income, unemp_rate){
    //build the URL with query params
    var predictURL = `${hostname}/api/get_predicted_score?pov_percent=${pov_percent}&med_income=${med_income}&unemp_rate=${unemp_rate}`;
    d3.json(predictURL).then((data) => {
        predResult = data;
        pre_4_math = predResult[0].math_4_pred_score;
        pre_4_read = predResult[0].read_4_pred_score;
        pre_8_math = predResult[0].math_8_pred_score;
        pre_8_read = predResult[0].math_4_pred_score;
    });
}

//onclick for final predict to show state data and predicted result
function predictByZip(){
    showCountyDataByZip(zip_code.text());
    zip_poverty_percentage = removeStringFormat (zip_poverty_percentage.text())
    zip_med_income = removeStringFormat (zip_med_income.text())
    zip_unemployment_rate = removeStringFormat (zip_unemployment_rate.text())
    predictResult(parseFloat(zip_poverty_percentage), parseFloat(zip_med_income), parseFloat(zip_unemployment_rate));
}

//onclick for custom predict to show predicted result
function predictByCustom(){
    predictResult(parseFloat(input_pov_percent.text()), parseFloat(input_med_income.text()), parseFloat(input_unemp_rate,text()));
}

//remove string format (%,$)
function removeStringFormat(str){
    return str.replace(/[%$\s]/g,'');
}



