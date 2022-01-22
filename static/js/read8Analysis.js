console.log("8 read Stats JS");

var RevRegChart = echarts.init(document.getElementById('allRev'));
var ExpRegChart = echarts.init(document.getElementById('allExp'));
var IncRegChart = echarts.init(document.getElementById('allInc'));
var PovRegChart = echarts.init(document.getElementById('allPov'));

var option_RevReg;
var option_ExpReg;
var option_IncReg;
var option_PovReg;

//get hostname
var hostname = window.location.origin;
//set api enpoint
var url = `${hostname}/api/get_all_data`
//call api to get all data
d3.json(url).then((data) => {
  var revData = [];
  var expData = [];
  var incData = [];
  var povData = [];
  var i = 0;
  var allData = data;
  readGrade8 = allData.filter(x => (x.grade == '8') && (x.subject == 'Reading'));
  for (i = 0; i < readGrade8.length; i++){
    revData[i] = [];
    expData[i] = [];
    incData[i] = [];
    povData[i] = [];

    revData[i][0] = readGrade8[i].total_revenue/1000000;
    revData[i][1] = readGrade8[i].avg_score;

    expData[i][0] = readGrade8[i].total_instructional_spending/1000000;
    expData[i][1] = readGrade8[i].avg_score;
    
    incData[i][0] = readGrade8[i].med_income;
    incData[i][1] = readGrade8[i].avg_score;
    
    povData[i][0] = readGrade8[i].poverty_percentage;
    povData[i][1] = readGrade8[i].avg_score;
  }

  drawRegScatter(revData, RevRegChart);
  drawRegScatter(expData, ExpRegChart);
  drawRegScatter(incData, IncRegChart);
  drawRegScatter(povData, PovRegChart);
  
})

function drawRegScatter(data, regChart)
{
  echarts.registerTransform(ecStat.transform.regression);
  option_Reg = {
    grid: {
      right: '20%'
    },
    
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
        type: 'cross',
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
        name: 'Reading',
        type: 'scatter',
        symbolSize: 6,
      },
      {
        // name: 'line',
        type: 'line',
        colorBy: 'data',  
        datasetIndex: 1,
        symbolSize: 2,
        symbol: 'circle',
        label: { show: true, fontSize: 22},
        labelLayout: { dx: 10, dy: 20 },
        encode: { label: 2, tooltip: 1 }
      }
    ],
    color: ['#077CC7','#FF0000',"#000000" ]
  };

  option_Reg && regChart.setOption(option_Reg);
}