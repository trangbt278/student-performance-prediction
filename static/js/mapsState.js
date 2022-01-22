console.log("mapStateJS success.")

//get hostname
var hostname = window.location.origin;
//set get all states end point
var getStateURL = `${hostname}/api/get_all_states`;
//set get all data end point
var getAllDataURL = `${hostname}/api/get_all_data`;

var menu = d3.select("#selDataset")
var myBarChart4 = echarts.init(document.getElementById('StateAvgScore4'));
var myBarChart8 = echarts.init(document.getElementById('StateAvgScore8'));
var myGaugeChart13 = echarts.init(document.getElementById('ExpRevRatio13'));
var myGaugeChart15 = echarts.init(document.getElementById('ExpRevRatio15'));
var myGaugeChart17 = echarts.init(document.getElementById('ExpRevRatio17'));


// ************************* //
// ** State Dropdown Menu ** //
// ************************* //

// read the data, get the first state as the default, plot with the default state
function dropDownMenu() {
    //call api to get states
    d3.json(getStateURL).then((data) => {
        data.forEach((state) => {
            menu
            .append("option")
            .text(state.state)
            .property("value", state.state);                
        });
        //set default
        const defaultState = data[0].state;
        // demoTable(defaultState);
        fecthData(defaultState);
        
    });
};

// ************************ //
// When the dropdown change //
// ************************ //
function optionChanged(stateName) {
    fecthData(stateName);
};


// Get data for the table and charts
function fecthData(stateName){
    //call api to get all
    d3.json(getAllDataURL).then((data) => {
        var allData = data;
        //filter data by the selected state
        var stateData = allData.filter(x => x.state == stateName);

        // ** get unique financial data by year for the finance table ** //
        const key = 'year';
        var finDataByYear = [...new Map(stateData.map(item => [item[key], item])).values()];
        //set variable connect with html #id
        var rev2013 = d3.select("#rev_13");
        var rev2015 = d3.select("#rev_15");
        var rev2017 = d3.select("#rev_17");
        var exp2013 = d3.select("#exp_13");
        var exp2015 = d3.select("#exp_15");
        var exp2017 = d3.select("#exp_17");
        var inc2013 = d3.select("#inc_13");
        var inc2015 = d3.select("#inc_15");
        var inc2017 = d3.select("#inc_17");
        var pov2013 = d3.select("#pov_13");
        var pov2015 = d3.select("#pov_15");
        var pov2017 = d3.select("#pov_17");
        var ratio2013 = d3.select("#ratio_13");
        var ratio2015 = d3.select("#ratio_15");
        var ratio2017 = d3.select("#ratio_17");
        //get revenue by year and format it like number
        rev2013.text(`$`+ String(finDataByYear.filter(x => x.year == '2013')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        rev2015.text(`$`+ String(finDataByYear.filter(x => x.year == '2015')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        rev2017.text(`$`+ String(finDataByYear.filter(x => x.year == '2017')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        //get instructional expenditure by year and format it like number
        exp2013.text(`$`+ String(finDataByYear.filter(x => x.year == '2013')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        exp2015.text(`$`+ String(finDataByYear.filter(x => x.year == '2015')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        exp2017.text(`$`+ String(finDataByYear.filter(x => x.year == '2017')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        
        ratio2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].percent_spending_of_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
        ratio2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].percent_spending_of_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
        ratio2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].percent_spending_of_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);

        //get median income by year and format it like number
        inc2013.text(`$`+ String(finDataByYear.filter(x => x.year == '2013')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        inc2015.text(`$`+ String(finDataByYear.filter(x => x.year == '2015')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        inc2017.text(`$`+ String(finDataByYear.filter(x => x.year == '2017')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        //get poverty rate by year and format it like number
        pov2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
        pov2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);
        pov2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `%`);


        // ***************** //
        // ** Gauge Chart ** //
        // ***************** //
        drawGauge(myGaugeChart13, finDataByYear.filter(x => x.year == '2013')[0].percent_spending_of_revenue);
        drawGauge(myGaugeChart15, finDataByYear.filter(x => x.year == '2015')[0].percent_spending_of_revenue);
        drawGauge(myGaugeChart17, finDataByYear.filter(x => x.year == '2017')[0].percent_spending_of_revenue)

        
        // ************************ //
        // ** 4th Grade barchart ** //
        // ************************ //
        // get math score, reading score, med_income and poverty_percentage for grade 4
        // filter data for grade 4 and math
        var grade4 = stateData.filter(x => (x.grade == '4') && (x.subject == 'Mathematics'));
        var math4 = [];
        var read4 = [];
        var med4 = [];
        var pov4 =[];
        var i = 0;
        //add data to arrays of math score, med_income and poverty_percentage for all years
        for (i = 0; i <grade4.length; i++)
        {
                math4.push(grade4[i].avg_score);
                med4.push(grade4[i].med_income);
                pov4.push(grade4[i].poverty_percentage);
        }
        grade4 = stateData.filter(x => (x.grade == '4') && (x.subject == 'Reading'));
        //add data to arrays of reading score for all years
        for (i = 0; i <grade4.length; i++)
        {
                read4.push(grade4[i].avg_score);
        }
        
        // get math score, reading score, med_income and poverty_percentage for grade 8
        // filter data for grade 8 and math
        var grade8 = stateData.filter(x => (x.grade == '8') && (x.subject == 'Mathematics'));
        var math8 = [];
        var read8 = [];
        var med8 = [];
        var pov8 =[];
        //add data to arrays of math score, med_income and poverty_percentage for all years
        for (i = 0; i <grade8.length; i++)
        {
                math8.push(grade8[i].avg_score);
                med8.push(grade8[i].med_income);
                pov8.push(grade8[i].poverty_percentage);
        }
        grade8 = stateData.filter(x => (x.grade == '8') && (x.subject == 'Reading'));
        //add data to arrays of reading score for all years
        for (i = 0; i <grade8.length; i++)
        {
                read8.push(grade8[i].avg_score);
        }
        //Bar Charts for 4th and 8th grade
        drawBarChart(myBarChart4, math4, read4, med4, pov4);
        drawBarChart(myBarChart8, math8, read8, med8, pov8);

    });

};

function drawBarChart(barChart, math, read, med, pov){
    var option_bar;
        
    // set colors for the plotting: Math, Reading, Median Income, Poverty, chart lable
    const colors = ['#6baed6', '#fc9272', '#002EFF', '#FF0000', '#000000','rgb(213, 225, 214)'];

    option_bar = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },

        legend: {
            data: ['Math', 'Reading', 'Median Income', 'Poverty Rate'],
            height: 12,
        },
        xAxis: [
            {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            // prettier-ignore
            data: ['2013', '2015', '2017']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Avg Scores',
                min: 0,
                max: 320,
                position: 'left',
                offset: 0,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[4]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 320,
                position: 'left',
                offset: 0,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: colors[4]
                    }
                },
                axisLabel: {
                    show: false,
                    formatter: '',
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 100000,
                position: 'right',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: colors[4],
                        width: 3,
                    }
                },
                axisLabel: {
                    formatter: ''
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 100,
                position: 'right',
                offset: 100,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: colors[4],
                        width: 3,
                    }
                },
                axisLabel: {
                    formatter: ''
                }
            }
        ],

        series: [
            {
            name: 'Math',
            type: 'bar',
            yAxisIndex: 1,
            data: math   // ** [2013 avg score, 2015 avg score, 2017 avg score] **//
            },
            {
            name: 'Reading',
            type: 'bar',
            yAxisIndex: 1,
            data: read    // ** [2013 avg score, 2015 avg score, 2017 avg score] **//
            },
            {
            name: 'Median Income',
            type: 'line',
            yAxisIndex: 2,
            data: med  // ** [2013 med income, 2015 med income, 2017 med income] **//
            },
            {
            name: 'Poverty Rate',
            type: 'line',
            yAxisIndex: 3,
            data: pov   // ** [2013 Poverty, 2015 Poverty, 2017 Poverty] **//
            } 
        ] 
    };
    
    option_bar && barChart.setOption(option_bar);


}

function drawGauge(gaugeChart, ratio){
    var option_gauge;
  
    var _panelImageURL = 'static/images/custom-gauge-panel.png';
    var _animationDuration = 1000;
    var _animationDurationUpdate = 1000;
    var _animationEasingUpdate = 'quarticInOut';
    var _valOnRadianMax = 100;
    var _outerRadius = 175;
    var _innerRadius = 155;
    var _pointerInnerRadius = 30;
    var _insidePanelRadius = 130;
    var _currentDataIndex = 0;

    function renderItem(params, api) {
    var valOnRadian = api.value(1);
    var coords = api.coord([api.value(0), valOnRadian]);
    var polarEndRadian = coords[3];
    var imageStyle = {
        image: _panelImageURL,
        x: params.coordSys.cx - _outerRadius,
        y: params.coordSys.cy - _outerRadius,
        width: _outerRadius * 2,
        height: _outerRadius * 2
    };
    return {
        type: 'group',
        children: [
        {
            type: 'image',
            style: imageStyle,
            clipPath: {
            type: 'sector',
            shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _outerRadius,
                r0: _innerRadius,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: 'endAngle',
                enterFrom: { endAngle: 0 }
            }
            }
        },
        {
            type: 'image',
            style: imageStyle,
            clipPath: {
            type: 'polygon',
            shape: {
                points: makePionterPoints(params, polarEndRadian)
            },
            extra: {
                polarEndRadian: polarEndRadian,
                transition: 'polarEndRadian',
                enterFrom: { polarEndRadian: 0 }
            },
            during: function (apiDuring) {
                apiDuring.setShape(
                'points',
                makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
                );
            }
            }
        },
        {
            type: 'circle',
            shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _insidePanelRadius
            },
            style: {
            fill: '#fff',
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(76,107,167,0.4)'
            }
        },
        {
            type: 'text',
            extra: {
            valOnRadian: valOnRadian,
            transition: 'valOnRadian',
            enterFrom: { valOnRadian: 0 }
            },
            style: {
            text: makeText(valOnRadian),
            fontSize: 50,
            fontWeight: 700,
            x: params.coordSys.cx,
            y: params.coordSys.cy,
            fill: 'rgb(0,50,190)',
            align: 'center',
            verticalAlign: 'middle',
            enterFrom: { opacity: 0 }
            },
            during: function (apiDuring) {
            apiDuring.setStyle(
                'text',
                makeText(apiDuring.getExtra('valOnRadian'))
            );
            }
        }
        ]
    };
    }


    function convertToPolarPoint(renderItemParams, radius, radian) {
    return [
        Math.cos(radian) * radius + renderItemParams.coordSys.cx,
        -Math.sin(radian) * radius + renderItemParams.coordSys.cy
    ];
    }


    function makePionterPoints(renderItemParams, polarEndRadian) {
    return [
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
        convertToPolarPoint(
        renderItemParams,
        _outerRadius,
        polarEndRadian + Math.PI * 0.03
        ),
        convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
    ];
    }

    function makeText(valOnRadian) {
    // Validate additive animation calc.
    if (valOnRadian < -10) {
        alert('illegal during val: ' + valOnRadian);
    }
    return ((valOnRadian / _valOnRadianMax) * 100).toFixed(2) + '%';
    }


    option_gauge = {
    animationEasing: _animationEasingUpdate,
    animationDuration: _animationDuration,
    animationDurationUpdate: _animationDurationUpdate,
    animationEasingUpdate: _animationEasingUpdate,

    dataset: {
        source: [[1, ratio]] 
    },
    tooltip: {},
    angleAxis: {
        type: 'value',
        startAngle: 0,
        show: false,
        min: 0,
        max: _valOnRadianMax
    },
    radiusAxis: {
        type: 'value',
        show: false
    },
    polar: {},
    series: [
        {
        type: 'custom',
        coordinateSystem: 'polar',
        renderItem: renderItem
        }
    ]
    };


    // ** Interval for the gauge to change randomly, we don't need this section ** //
    // setInterval(function () {
    // var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
    // myGaugeChart.setOption({
    //     dataset: {
    //     source: nextSource
    //     }
    // });
    // }, 3000);

    option_gauge && gaugeChart.setOption(option_gauge);

}

//initialize Dashboard
dropDownMenu();