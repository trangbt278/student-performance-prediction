console.log("Nationawide Stats JS")

var input_data = "data/input_data.json"

var myRevChart = echarts.init(document.getElementById('allRev'));
var myExpChart = echarts.init(document.getElementById('allExp'));
var myIncChart = echarts.init(document.getElementById('allInc'));
var myPovChart = echarts.init(document.getElementById('allPov'));

var mathScore =[];
var readScore =[];
var allRev =[];
var allExp =[];
var allInc =[];
var allPov =[];
var i = 0

// function collectData() {
d3.json(input_data).then((data) => {

    var allData = data.alldata;
    // console.log(allData)
   
    var mathData = allData.filter(x => x.subject == 'Mathematics')[0];
    var readData = allData.filter(x => x.subject == 'Reading')[0];

    for (i = 0; i < allData.length ; i++) {

        allRev.push(allData[i].total_revenue);
        allExp.push(allData[i].total_expenditure_per_student);
        allInc.push(allData[i].med_income);
        allPov.push(allData[i].poverty_percentage);

        var mathData = allData.filter(x => x.subject == 'Mathematics')[0];
        mathScore.push(mathData[i].avg_score)}
        var readData = allData.filter(x => x.subject == 'Reading')[0];

        for (i = 0; i < mathData.length ; i++) {
            mathScore.push(mathData[i].avg_score)};
        for (i = 0; i < readData.length ; i++) {
            readScore.push(readData[i].avg_score)};
        console.log(mathScore);
    };
});
    // drawScatterChart(myRevChart, mathScore, readScore, allRev);
    // drawScatterChart(myExpChart, mathScore, readScore, allExp);
    // drawScatterChart(myIncChart, mathScore, readScore, allInc);
    // drawScatterChart(myPovChart, mathScore, readScore, allPov);
// };

// ******************* //
// ** Scatter Chart ** //
// ******************* //

// function drawScatterChart(scatterChart, mathScore, readScore, finFactor) {    
option_scatter = {
    title: {
        // text: 'Total Revenue per Student',
        padding: ['0','10','10','0'],
    },
    grid: {
        left: '3%',
        right: '7%',
        bottom: '7%',
        containLabel: true
    },
    tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },

    // brush: {},
    legend: {
        data: ['Math', 'Reading'],
        left: 'center', 
        top: 20
    },
    xAxis: [{
        type: 'value',
        name: 'Score',
        scale: true,
        axisLabel: {
            formatter: '{value}'
        },
        splitLine: {
            show: false
        }
    }],
    yAxis: [{
        type: 'value',
        // name: finFactorName,
        scale: true,
        axisLabel: {
            formatter: '{value}'
        },
        splitLine: {
            show: false
        }
    }],
    series: [{
        name: 'Math',
        type: 'scatter',
        emphasis: {
            focus: 'series'
        },
        // **Data:  All data [Math avg score, revenue per student] ** //
        data: [[mathScore, allRev]],

    },
    {
        name: 'Reading',
        type: 'scatter',
        emphasis: {
            focus: 'series'
        },
        // **Data: All data [Reading avg score, revenue per student] ** //
        data: [[readScore, allRev]],
    }],

};    
option_scatter && myRevChart.setOption(option_scatter);
