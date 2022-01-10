console.log("mapStateJS success.")

var mapState = d3.selet("#mapState")
var StateAvgScore = d3.select("#StateAvgScore")
var ExpRevRatio = d3.select("#ExpRevRatio")

// ************ //
// ** US map ** //
// ************ //

var mapSeries;
var mapChart;
var tableCharts;
var dataSet;
var tableChart;
var populationChart;
var areaChart;
var houseSeatsChart;

mapState = anychart.onDocumentReady(function () {
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/samples/maps-in-dashboard/states-of-united-states-dashboard-with-multi-select/data.json
    mapState = anychart.data.loadJsonFile(
      'https://cdn.anychart.com/samples/maps-in-dashboard/states-of-united-states-dashboard-with-multi-select/data.json',
      function (data) {
          // pre-processing of the data
          for (var i = 0; i < data.length; i++) {
              data[i].value = new Date(data[i].statehood).getUTCFullYear();
              data[i].short = data[i].id;
            }
            dataSet = anychart.data.set(data);
            tableChart = getTableChart();
            mapChart = drawMap();
            tableCharts = getTableCharts();

            // Setting layout table
            var layoutTable = anychart.standalones.table();
            layoutTable.cellBorder(null);
            layoutTable.container('container');
            layoutTable.draw();

            function getTableChart() {
                var table = anychart.standalones.table();
                table.cellBorder(null);
                table.fontSize(11).vAlign('middle').fontColor('#212121');
                table
                .getCell(0, 0)
                .colSpan(8)
                .fontSize(14)
                .vAlign('bottom')
                .border()
                .bottom('1px #dedede')
                .fontColor('#7c868e');
                table
                .useHtml(true)
                .contents([
                ['Selected States Data'],
                [
                    null,
                    'Name',
                    'Capital',
                    'Largest<br/>City',
                    'State<br/>Since',
                    'Population',
                    'Area',
                    'House<br/>Seats'
                ],
                [null]
                ]);
                table
                .getRow(1)
                .cellBorder()
                .bottom('2px #dedede')
                .fontColor('#7c868e');
                table.getRow(0).height(45).hAlign('center');
                table.getRow(1).height(35);
                table.getCol(0).width(25);
                table.getCol(1).hAlign('left');
                table.getCol(2).hAlign('left');
                table.getCol(3).hAlign('left');
                table.getCol(2).width(50);
                table.getCol(4).width(50);
                table.getCol(5).width(50);
                return table;
            }

            function solidChart(value) {
                var gauge = anychart.gauges.circular();
                gauge.data([value, 100]);
                gauge.padding(5);
                gauge.margin(0);
                var axis = gauge.axis().radius(100).width(1).fill(null);
                axis
                .scale()
                .minimum(0)
                .maximum(100)
                .ticks({ interval: 1 })
                .minorTicks({ interval: 1 });
                axis.labels().enabled(false);
                axis.ticks().enabled(false);
                axis.minorTicks().enabled(false);

                var stroke = '1 #e5e4e4';
                gauge
                .bar(0)
                .dataIndex(0)
                .radius(80)
                .width(40)
                .fill('#64b5f6')
                .stroke(null)
                .zIndex(5);
                gauge
                .bar(1)
                .dataIndex(1)
                .radius(80)
                .width(40)
                .fill('#F5F4F4')
                .stroke(stroke)
                .zIndex(4);
                gauge
                .label()
                .width('50%')
                .height('25%')
                .adjustFontSize(true)
                .hAlign('center')
                .anchor('center');
                gauge
                .label()
                .hAlign('center')
                .anchor('center')
                .padding(5, 10)
                .zIndex(1);
                gauge.background().enabled(false);
                gauge.fill(null);
                gauge.stroke(null);
                return gauge;
            }

            function getTableCharts() {
                var table = anychart.standalones.table(2, 3);
                table.cellBorder(null);
                table.getRow(0).height(45);
                table.getRow(1).height(25);
                table.fontSize(11).useHtml(true).hAlign('center');
                table
                .getCell(0, 0)
                .colSpan(3)
                .fontSize(14)
                .vAlign('bottom')
                .border()
                .bottom('1px #dedede');
                table.getRow(1).cellBorder().bottom('2px #dedede');
                populationChart = solidChart(0);
                areaChart = solidChart(0);
                houseSeatsChart = solidChart(0);
                table.contents([
                ['Percentage of Total'],
                ['Population', 'Land Area', 'House Seats'],
                [populationChart, areaChart, houseSeatsChart]
                ]);
                return table;
            }

            function changeContent(ids) {
                var i;
                var contents = [
                ['List of Selected States'],
                [
                    null,
                    'Name',
                    'State<br/>Since',
                    'Population',
                    'Water<br/>Area',
                    'House<br/>Seats'
                ]
                ];
                var population = 0;
                var area = 0;
                var seats = 0;
                for (i = 0; i < ids.length; i++) {
                var data = getDataId(ids[i]);
                population += parseInt(data.population);
                area += parseInt(data.area);
                seats += parseInt(data.house_seats);

                var label = anychart.standalones.label();
                label
                    .width('100%')
                    .height('100%')
                    .text('')
                    .background()
                    .enabled(true)
                    .fill({
                    src: data.flag,
                    mode: 'fit'
                    });
                contents.push([
                    label,
                    data.name,
                    data.value,
                    parseInt(data.population).toLocaleString(),
                    Math.round(
                    (parseInt(data.water_area) * 100) /
                    (parseInt(data.water_area) + parseInt(data.land_area))
                    ) + '%',
                    data.house_seats
                ]);
                }

                populationChart.data([
                ((population * 100) / getDataSum('population')).toFixed(2),
                100
                ]);
                populationChart
                .label()
                .text(
                    ((population * 100) / getDataSum('population')).toFixed(2) +
                    '%'
                );

                areaChart.data([
                ((area * 100) / getDataSum('area')).toFixed(2),
                100
                ]);
                areaChart
                .label()
                .text(((area * 100) / getDataSum('area')).toFixed(2) + '%');

                houseSeatsChart.data([
                ((seats * 100) / getDataSum('house_seats')).toFixed(2),
                100
                ]);
                houseSeatsChart
                .label()
                .text(
                    ((seats * 100) / getDataSum('house_seats')).toFixed(2) + '%'
                );

                tableChart.contents(contents);
                for (i = 0; i < ids.length; i++) {
                tableChart.getRow(i + 2).maxHeight(35);
                }
            }

            function drawMap() {
                var map = anychart.map();
                // set map title settings using html
                map.title().padding(10, 0, 10, 0).margin(0).useHtml(true);
                map.title(
                'US States<br/>by the Year of Joining the Union' +
                '<br/><span style="color:#212121; font-size: 11px;">Pick your state or a time period to see when chosen states joined</span>'
                );
                map.padding([0, 0, 10, 0]);
                var credits = map.credits();
                credits.enabled(true);
                credits.url(
                'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'
                );
                credits.text(
                'Data source: https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'
                );
                credits.logoSrc(
                'https://en.wikipedia.org/static/favicon/wikipedia.ico'
                );

                // set map Geo data
                map.geoData('anychart.maps.united_states_of_america');

                map.listen('pointsSelect', function (e) {
                var selected = [];
                var selectedPoints = e.seriesStatus[0].points;
                for (var i = 0; i < selectedPoints.length; i++) {
                    selected.push(selectedPoints[i].id);
                }
                changeContent(selected);
                });

                mapSeries = map.choropleth(dataSet);
                mapSeries.labels(null);
                mapSeries.tooltip().useHtml(true);
                mapSeries.tooltip().title().useHtml(true);
                mapSeries.tooltip().titleFormat(function () {
                var data = getDataId(this.id);
                return (
                    this.name +
                    '<span style="font-size: 10px"> (since ' +
                    data.statehood +
                    ')</span>'
                );
                });
                mapSeries.tooltip().format(function () {
                var data = getDataId(this.id);
                return (
                    '<span style="font-size: 12px; color: #b7b7b7">Capital: </span>' +
                    data.capital +
                    '<br/>' +
                    '<span style="font-size: 12px; color: #b7b7b7">Largest City: </span>' +
                    data.largest_city
                );
                });
                var scale = anychart.scales.ordinalColor([
                { less: 1790 },
                { from: 1790, to: 1800 },
                { from: 1800, to: 1820 },
                { from: 1820, to: 1850 },
                { from: 1850, to: 1875 },
                { from: 1875, to: 1900 },
                { greater: 1900 }
                ]);
                scale.colors([
                '#81d4fa',
                '#4fc3f7',
                '#29b6f6',
                '#039be5',
                '#0288d1',
                '#0277bd',
                '#01579b'
                ]);
                mapSeries.hovered().fill('#f06292');
                mapSeries
                .selected()
                .fill('#c2185b')
                .stroke(anychart.color.darken('#c2185b'));
                mapSeries.colorScale(scale);

                mapSeries.stroke(function () {
                this.iterator.select(this.index);
                var pointValue = this.iterator.get(this.referenceValueNames[1]);
                var color = this.colorScale.valueToColor(pointValue);
                return anychart.color.darken(color);
                });

                var colorRange = map.colorRange();
                colorRange.enabled(true);
                colorRange
                .ticks()
                .stroke('3 #ffffff')
                .position('center')
                .length(20)
                .enabled(true);
                colorRange.colorLineSize(5);
                colorRange
                .labels()
                .fontSize(11)
                .padding(0, 0, 0, 0)
                .format(function () {
                    var range = this.colorRange;
                    var name;
                    if (isFinite(range.start + range.end)) {
                    name = range.start + ' - ' + range.end;
                    } else if (isFinite(range.start)) {
                    name = 'After ' + range.start;
                    } else {
                    name = 'Before ' + range.end;
                    }
                    return name;
                });
                return map;
            }

            // Creates general layout table with two inside layout tables
            function fillInMainTable(flag) {
                if (flag === 'wide') {
                layoutTable.contents(
                    [
                    [mapChart, tableCharts],
                    [null, tableChart]
                    ],
                    true
                );
                layoutTable.getCell(0, 0).rowSpan(2);
                layoutTable.getRow(0).height(null);
                layoutTable.getRow(1).height(null);
                } else {
                layoutTable.contents(
                    [[mapChart], [tableCharts], [tableChart]],
                    true
                );
                layoutTable.getRow(0).height(350);
                layoutTable.getRow(1).height(200);
                layoutTable.getRow(2).height(250);
                }
                layoutTable.draw();
            }

            if (window.innerWidth > 768) fillInMainTable('wide');
            else {
                fillInMainTable('slim');
            }
            mapSeries.select(12);
            mapSeries.select(13);
            mapSeries.select(14);
            mapSeries.select(16);
            changeContent(['US.IN', 'US.KY', 'US.IL', 'US.IA']);

            // On resize changing layout to mobile version or conversely
            window.onresize = function () {
                if (layoutTable.colsCount() === 1 && window.innerWidth > 767) {
                fillInMainTable('wide');
                } else if (
                layoutTable.colsCount() === 2 &&
                window.innerWidth <= 767
                ) {
                fillInMainTable('slim');
                }
            };

            function getDataId(id) {
                for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) return data[i];
                }
            }

            function getDataSum(field) {
                var result = 0;
                for (var i = 0; i < data.length; i++) {
                result += parseInt(data[i][field]);
                }
                return result;
            }
            }
        );
        });
  
                

// **************************************************** //
// Display the Math and Reading Score by Selected State //
// **************************************************** //

var chartDom = document.getElementById('StateAvgScore');
var myChart = echarts.init(StateAvgScore);
var option;

option = {
  title: {
    text: 'Student Performance: Math vs Reading',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Avg Math Score', 'Avg Reading Score']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ['line', 'bar'] },
      magicType: { show: true, type: ['bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // prettier-ignore
      data: ['2013', '2015', '2017']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Avg Math Score',
      type: 'bar',
      data: [135.6, 162.2, 32.6],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Avg Reading Scor',
      type: 'bar',
      data: [175.6, 182.2, 48.7],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
};

option && myChart.setOption(option);


// ************************* //
// ** State Exp/Rev ratio ** // 
// ************************* //


var _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png';
var _animationDuration = 1000;
var _animationDurationUpdate = 1000;
var _animationEasingUpdate = 'quarticInOut';
var _valOnRadianMax = 200;
var _outerRadius = 200;
var _innerRadius = 170;
var _pointerInnerRadius = 40;
var _insidePanelRadius = 140;
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
  return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
}
option = {
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
setInterval(function () {
  var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
  myChart.setOption({
    dataset: {
      source: nextSource
    }
  });
}, 3000);