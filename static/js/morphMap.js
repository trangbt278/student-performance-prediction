console.log('MorphMap JS sucess.')

var geoUSAurl = "/static/data/geoUSA.json"

var myMorphChart = echarts.init(document.getElementById("morphMap"));

var option_morph;


myMorphChart.showLoading();

$.get(geoUSAurl, function (usaJson) {
    // console.log(usaJson)
    myMorphChart.hideLoading();
    echarts.registerMap('USA', usaJson, {
        Alaska: {
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,
            top: 26,
            width: 5
        }
    });

  // ***************************** //
  // ** 2017 Total Revenue data ** //
  // ***************************** //

    var revData = [
        { name: 'Alabama', value: 7909958000},
        { name: 'Alaska', value: 2504464000},
        { name: 'Arizona', value: 8601449000},
        { name: 'Arkansas', value: 5462279000},
        { name: 'California', value: 89109048000},
        { name: 'Colorado', value: 10383949000},
        { name: 'Connecticut', value: 11074485000},
        { name: 'Delaware', value: 2206856000},
        { name: 'District of Columbia', value: 1520849000},
        { name: 'Florida', value: 28996448000},
        { name: 'Georgia', value: 20373536000},
        { name: 'Hawaii', value: 2844167000},
        { name: 'Idaho', value: 2396039000},
        { name: 'Illinois', value: 35270459000},
        { name: 'Indiana', value: 12684323000},
        { name: 'Iowa', value: 6898375000},
        { name: 'Kansas', value: 6280387000},
        { name: 'Kentucky', value: 7917769000},
        { name: 'Louisiana', value: 8406687000},
        { name: 'Maine', value: 2768378000},
        { name: 'Maryland', value: 14913187000},
        { name: 'Massachusetts', value: 18036288000},
        { name: 'Michigan', value: 18756551000},
        { name: 'Minnesota', value: 12439701000},
        { name: 'Mississippi', value: 4750751000},
        { name: 'Missouri', value: 11086375000},
        { name: 'Montana', value: 1820789000},
        { name: 'Nebraska', value: 4431533000},
        { name: 'Nevada', value: 4670479000},
        { name: 'New Hampshire', value: 3124636000},
        { name: 'New Jersey', value: 29394902000},
        { name: 'New Mexico', value: 3790083000},
        { name: 'New York', value: 70031703000},
        { name: 'North Carolina', value: 13975840000},
        { name: 'North Dakota', value: 1773481000},
        { name: 'Ohio', value: 23573180000},
        { name: 'Oklahoma', value: 6165537000},
        { name: 'Oregon', value: 7654699000},
        { name: 'Pennsylvania', value: 31179409000},
        { name: 'Rhode Island', value: 2443850000},
        { name: 'South Carolina', value: 9726983000},
        { name: 'South Dakota', value: 1568440000},
        { name: 'Tennessee', value: 10149683000},
        { name: 'Texas', value: 58891226000},
        { name: 'Utah', value: 5160802000},
        { name: 'Vermont', value: 1804614000},
        { name: 'Virginia', value: 16529157000},
        { name: 'Washington', value: 15646461000},
        { name: 'West Virginia', value: 3476338000},
        { name: 'Wisconsin', value: 11686068000},
        { name: 'Wyoming', value: 1930057000},
    ];

    revData.sort(function (a, b) {
        return a.value - b.value;
    });


    const mapOption = {
        visualMap: {
            left: 'right',
            min: 1000000000,
            max: 90000000000,
            inRange: {
                // prettier-ignore
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text: ['High', 'Low'],
            calculable: true
        },

        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              const value = (params.value + '').split('.');
              const valueStr = value[0].replace(
                /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                '$1,'
              );
              return params.name + ' Revenue : ' + valueStr;
            }
          },

        series: [
            {
                id: 'revenue',
                type: 'map',
                roam: true,
                map: 'USA',
                animationDurationUpdate: 2000,
                universalTransition: true,
                data: revData
            }
        ]
    };


    const barOption = {
        xAxis: {
        type: 'value'
        },
        yAxis: {
        type: 'category',
        axisLabel: {
            rotate: 0
        },
        data: revData.map(function (item) {
            return item.name;
        })
        },
        animationDurationUpdate: 2000,
        series: {
        type: 'bar',
        id: 'revenue',
        color: 'rgba(174, 66, 196, 0.8)',
        data: revData.map(function (item) {
            return item.value;
        }),
        universalTransition: true
        }
    };


    let currentOption = mapOption;

    myMorphChart.setOption(mapOption);

    setInterval(function () {
        currentOption = currentOption === mapOption ? barOption : mapOption;
        myMorphChart.setOption(currentOption, true);
    }, 3000);
});


if (option_morph && typeof option_morph === 'object') {
    myMorphChart.setOption(option_morph);
};
