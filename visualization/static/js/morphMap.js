console.log('MorphMap JS sucess.')

var geoUSAurl = "data/geoUSA.json"

var myMorphChart = echarts.init(document.getElementById("morphMap"));
var app = {};

var option_morph;


myMorphChart.showLoading();

$.get(geoUSAurl, function (usaJson) {
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

  // *********************** //
  // ** 2015 Revenue data ** //
  // *********************** //

    var revData = [
        { name: 'Alabama', value: 7360222},
        { name: 'Alaska', value: 2920986},
        { name: 'Arizona', value: 8230507},
        { name: 'Arkansas', value: 5308625},
        { name: 'California', value: 78248042},
        { name: 'Colorado', value: 9648297},
        { name: 'Connecticut', value: 11099837},
        { name: 'Delaware', value: 2017075},
        { name: 'District of Columbia', value: 1382282},
        { name: 'Florida', value: 26971491},
        { name: 'Georgia', value: 18584666},
        { name: 'Hawaii', value: 2703683},
        { name: 'Idaho', value: 2167967},
        { name: 'Illinois', value: 32096832},
        { name: 'Indiana', value: 12456571},
        { name: 'Iowa', value: 6714410},
        { name: 'Kansas', value: 5991731},
        { name: 'Kentucky', value: 7548871},
        { name: 'Louisiana', value: 8448743},
        { name: 'Maine', value: 2739589},
        { name: 'Maryland', value: 14491642},
        { name: 'Massachusetts', value: 16985185},
        { name: 'Michigan', value: 19025996},
        { name: 'Minnesota', value: 11684249},
        { name: 'Mississippi', value: 4592343},
        { name: 'Missouri', value: 10623391},
        { name: 'Montana', value: 1804339},
        { name: 'Nebraska', value: 4248695},
        { name: 'Nevada', value: 4345419},
        { name: 'New Hampshire', value: 3093061},
        { name: 'New Jersey', value: 29335237},
        { name: 'New Mexico', value: 3789651},
        { name: 'New York', value: 63712218},
        { name: 'North Carolina', value: 13146934},
        { name: 'North Dakota', value: 1644533},
        { name: 'Ohio', value: 24378660},
        { name: 'Oklahoma', value: 6121188},
        { name: 'Oregon', value: 7111710},
        { name: 'Pennsylvania', value: 29967185},
        { name: 'Rhode Island', value: 2367068},
        { name: 'South Carolina', value: 8759944},
        { name: 'South Dakota', value: 1415149},
        { name: 'Tennessee', value: 9455920},
        { name: 'Texas', value: 55582029},
        { name: 'Utah', value: 4705084},
        { name: 'Vermont', value: 1996795},
        { name: 'Virginia', value: 15857524},
        { name: 'Washington', value: 13709442},
        { name: 'West Virginia', value: 3478401},
        { name: 'Wisconsin', value: 11637376},
        { name: 'Wyoming', value: 1962874},
    ];

    revData.sort(function (a, b) {
        return a.value - b.value;
    });


    const mapOption = {
        visualMap: {
            left: 'right',
            min: 1000000,
            max: 80000000,
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
