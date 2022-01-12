console.log("Math 8 grade JS")

var mym8RevChart = echarts.init(document.getElementById('m8Rev'));
var mym8ExpChart = echarts.init(document.getElementById('m8Exp'));
var mym8IncChart = echarts.init(document.getElementById('m8Inc'));
var mym8PovChart = echarts.init(document.getElementById('m8Pov'));

var option_m8Rev;
var option_m8Exp;
var option_m8Inc;
var option_m8Pov;

option_m8Rev = {
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
            [10500, 50804],
            [50000, 20804],
            [60500, 78004],
        ],
        type: 'scatter'
    }]
};

option_m8Exp = {
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
        name: 'Expenditure',
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

option_m8Inc = {
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

option_m8Pov = {
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


option_m8Rev && mym8RevChart.setOption(option_m8Rev);
option_m8Exp && mym8ExpChart.setOption(option_m8Exp);
option_m8Inc && mym8IncChart.setOption(option_m8Inc);
option_m8Pov && mym8PovChart.setOption(option_m8Pov);

