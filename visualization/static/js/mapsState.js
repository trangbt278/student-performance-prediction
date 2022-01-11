console.log("mapStateJS success.")

var input_data = "data/input_data.json"
console.log
var menu = d3.select("#selDataset")

var mybarChart = echarts.init(document.getElementById('StateAvgScore'));
var myGaugeChart = echarts.init(document.getElementById('ExpRevRatio'));


// var gauge_chart = d3.select("#ExpRevRatio");

// ************************* //
// ** State Dropdown Menu ** //
// ************************* //

// read the data, get the first state as the default, plot with the default state
function dropDownMenu() {
    d3.json(input_data).then((data) => {
        var stateName = data.states;
        // console.log(stateName);
        stateName.forEach((state) => {
            menu
            .append("option")
            .text(state)
            .property("value", state);                
        });
        //set default
        const defaultState = stateName[0];
        // demoTable(defaultState);
        charting(defaultState);
    });
};

// ************************ //
// When the dropdown change //
// ************************ //
function optionChanged(stateName) {
    charting(stateName);
};


// Get financial data for the table
function charting(stateName){
    //get all data from json file
    d3.json("data/input_data.json").then((data) => {
        var allData = data.alldata;
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
        //get revenue by year and format it like number
        rev2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        rev2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        rev2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].total_revenue).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        //get instructional expenditure by year and format it like number
        exp2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        exp2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        exp2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].total_instructional_spending).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        //get median income by year and format it like number
        inc2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        inc2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        inc2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].med_income).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        //get poverty rate by year and format it like number
        // ** Should we do RE to %? ** //
        pov2013.text(String(finDataByYear.filter(x => x.year == '2013')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        pov2015.text(String(finDataByYear.filter(x => x.year == '2015')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
        pov2017.text(String(finDataByYear.filter(x => x.year == '2017')[0].poverty_percentage).replace(/(.)(?=(\d{3})+$)/g,'$1,'));





        // *************** //
        // ** Bar graph ** //
        // *************** //
        //get avg score by grade and format it like number
        var grade4 = stateData.filter(x => x.grade == '4');
        console.log(grade4);
        var grade8 = stateData.filter(x => x.grade == '8');
        console.log(grade8);


        var option_bar;
        
        option_bar = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          xAxis: {
            type: 'category',
            data: ['2013', '2015', '2017']
          },
          series: [
            {
                name: '4th Grade Math',
                type: 'bar',
                data: [250, 303, 205]
            },
            {
                name: '8th Grade Math',
                type: 'bar',
                data: [220, 258, 295]
            },
            {
                name: '4th Grade Reading',
                type: 'bar',
                data: [250, 303, 205]
              },
              {
                name: '8th Grade Reading',
                type: 'bar',
                data: [220, 258, 295]
              }
          ]
        };
        
        option_bar && mybarChart.setOption(option_bar);

    });


        var option_gauge;

        var _panelImageURL = 'static/images/custom-gauge-panel.png';
        var _animationDuration = 1000;
        var _animationDurationUpdate = 1000;
        var _animationEasingUpdate = 'quarticInOut';
        var _valOnRadianMax = 200;  // ** _valOnRadianMax = Total REV by selected state ** //
        var _outerRadius = 200;
        var _innerRadius = 170;
        var _pointerInnerRadius = 40;
        var _insidePanelRadius = 140;
        var _currentDataIndex = 0;

        function renderItem(params, api) {
        var valOnRadian = api.value(1);  // ** valOnRadian = Instruction Exp by selected state ** //
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
        return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
        }


        option_gauge = {
        animationEasing: _animationEasingUpdate,
        animationDuration: _animationDuration,
        animationDurationUpdate: _animationDurationUpdate,
        animationEasingUpdate: _animationEasingUpdate,
        dataset: {
            source: [[1, 156]]
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
        setInterval(function () {
        var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
        myGaugeChart.setOption({
            dataset: {
            source: nextSource
            }
        });
        }, 3000);

        option_gauge && myGaugeChart.setOption(option_gauge);

};


//initialize Dashboard
dropDownMenu();