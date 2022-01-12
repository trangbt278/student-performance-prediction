console.log("m4Rev JS")

var mym4RevChart = echarts.init(document.getElementById('m4Rev'));
var option_m4Rev;

option_m4Rev = {
    // legend: {
    //     right: '10%',
    //         top: '3%',
    //         // data: ['1990', '2015']
    // },
        grid: {
            left: '8%',
            top: '10%'
            
    },
    
    xAxis: {
        name: 'Average Score',
        splitLine: {
            lineStyle: {
                type: 'dashed',
                width: 5,
            }
        }
    },
    yAxis: {
        name: 'Revenue',
        min: 10000,
        max: 80000,
        splitLine: {
            lineStyle: {
                type: 'dashed',
                width: 5,
            }
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
    },
    
    series: [{
        symbolSize: 5,
        data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ],
        type: 'scatter'
    }]
  };

option_m4Rev && mym4RevChart.setOption(option_m4Rev);
