console.log("Nationawide Stats JS")
var input_data = "data/input_data.json";

var RevRegChart = echarts.init(document.getElementById('allRev'));
var ExpRegChart = echarts.init(document.getElementById('allExp'));
var IncRegChart = echarts.init(document.getElementById('allInc'));
var PovRegChart = echarts.init(document.getElementById('allPov'));

var option_RevReg;
var option_ExpReg;
var option_IncReg;
var option_PovReg;

d3.json(input_data).then((data) => {
  var revData = [];
  var expData = [];
  var incData = [];
  var povData = [];
  var i = 0;
  var allData = data.alldata;
  mathGrade8 = allData.filter(x => (x.grade == '8') && (x.subject == 'Mathematics'));
  for (i = 0; i < mathGrade8.length; i++){
    revData[i] = [];
    expData[i] = [];
    incData[i] = [];
    povData[i] = [];

    revData[i][0] = mathGrade8[i].total_revenue/1000000;
    revData[i][1] = mathGrade8[i].avg_score;

    expData[i][0] = mathGrade8[i].total_instructional_spending/1000000;
    expData[i][1] = mathGrade8[i].avg_score;
    
    incData[i][0] = mathGrade8[i].med_income;
    incData[i][1] = mathGrade8[i].avg_score;
    
    povData[i][0] = mathGrade8[i].poverty_percentage;
    povData[i][1] = mathGrade8[i].avg_score;
  }
  console.log(revData);
  drawRegScatter(revData, RevRegChart);
  drawRegScatter(expData, ExpRegChart);
  drawRegScatter(incData, IncRegChart);
  drawRegScatter(povData, PovRegChart);
  
})

function drawRegScatter(data, regChart)
{
  echarts.registerTransform(ecStat.transform.regression);
  option_Reg = {
    dataset: [
      {
        source: data
      },
      {
        transform: {
          type: 'ecStat:regression',
          // 'linear' by default.
          config: { method: 'linear', formulaOn: 'end'}
        }
      }
    ],
    legend: {
      // bottom: 5,
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis:[
    {
      min: 250,

    }, 
    {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [
      {
        name: 'scatter',
        type: 'scatter'
      },
      {
        name: 'line',
        type: 'line',
        colorBy: 'data',  
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: 50 },
        encode: { label: 2, tooltip: 1 }
      }
    ],
    color: ['#ee6666','#5100FF' ]
  };

  option_Reg && regChart.setOption(option_Reg);
}