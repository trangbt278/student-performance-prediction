console.log("Nationawide Stats JS")

var RevRegChart = echarts.init(document.getElementById('allRev'));
var ExpRegChart = echarts.init(document.getElementById('allExp'));
var IncRegChart = echarts.init(document.getElementById('allInc'));
var PovRegChart = echarts.init(document.getElementById('allPov'));

var option_RevReg;
var option_ExpReg;
var option_IncReg;
var option_PovReg;

echarts.registerTransform(ecStat.transform.regression);

// ** Data format: [['avg score', 'revenue']]**

const data = [
  [0.067732, 3.176513],
  [0.42781, 3.816464],
  [0.995731, 4.550095]
];

option_RevReg = {
  dataset: [
    {
      source: data
    },
    {
      transform: {
        type: 'ecStat:regression'
        // 'linear' by default.
        // config: { method: 'linear', formulaOn: 'end'}
      }
    }
  ],
//   title: {
//     text: 'Linear Regression',
//     subtext: 'By ecStat.regression',
//     sublink: 'https://github.com/ecomfe/echarts-stat',
//     left: 'center'
//   },

  legend: {
    bottom: 5
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
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: 'scatter',
      type: 'scatter'
    },
    {
      name: 'line',
      type: 'line',
      datasetIndex: 1,
      symbolSize: 0.1,
      symbol: 'circle',
      label: { show: true, fontSize: 16 },
      labelLayout: { dx: -20 },
      encode: { label: 2, tooltip: 1 }
    }
  ]
};

option_RevReg && RevRegChart.setOption(option_RevReg);