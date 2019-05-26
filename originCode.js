/* global d3 */

function getTextWidth(text, fontSize, fontName) {
  c = document.createElement('canvas');
  ctx = c.getContext('2d');
  ctx.font = fontSize + ' ' + fontName;
  return ctx.measureText(text + '              ').width;
}

function DataSegregator(array, on) {
  var SegData;
  OrdinalPositionHolder = {
    valueOf: function() {
      thisObject = this;
      keys = Object.keys(thisObject);
      keys.splice(keys.indexOf('valueOf'), 1);
      keys.splice(keys.indexOf('keys'), 1);
      return keys.length == 0
        ? -1
        : d3.max(keys, function(d) {
            return thisObject[d];
          });
    },
    keys: function() {
      keys = Object.keys(thisObject);
      keys.splice(keys.indexOf('valueOf'), 1);
      keys.splice(keys.indexOf('keys'), 1);
      return keys;
    }
  };
  array[0]
    .map(function(d) {
      return d[on];
    })
    .forEach(function(b) {
      value = OrdinalPositionHolder.valueOf();
      OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
    });

  SegData = OrdinalPositionHolder.keys().map(function() {
    return [];
  });

  array.forEach(function(d) {
    d.forEach(function(b) {
      SegData[OrdinalPositionHolder[b[on]]].push(b);
    });
  });

  return SegData;
}

var Data = [
  {
    Date: '10704',
    Categories: [{ Name: '土地+建物的案件量', Value: 281 }],
    LineCategory: [
      { Name: '土地均價', Value: 22.91 },
      { Name: '透天厝均價', Value: 23.88 },
      { Name: '區分建物均價', Value: 15.81 }
    ]
  },
  {
    Date: '10705',
    Categories: [{ Name: '土地+建物的案件量', Value: 274 }],
    LineCategory: [
      { Name: '土地均價', Value: 77.71 },
      { Name: '透天厝均價', Value: 23.29 },
      { Name: '區分建物均價', Value: 15.8 }
    ]
  },
  {
    Date: '10706',
    Categories: [{ Name: '土地+建物的案件量', Value: 260 }],
    LineCategory: [
      { Name: '土地均價', Value: 54.21 },
      { Name: '透天厝均價', Value: 24.86 },
      { Name: '區分建物均價', Value: 15.33 }
    ]
  },
  {
    Date: '10707',
    Categories: [{ Name: '土地+建物的案件量', Value: 309 }],
    LineCategory: [
      { Name: '土地均價', Value: 63.1 },
      { Name: '透天厝均價', Value: 22.64 },
      { Name: '區分建物均價', Value: 16.83 }
    ]
  },
  {
    Date: '10708',
    Categories: [{ Name: '土地+建物的案件量', Value: 294 }],
    LineCategory: [
      { Name: '土地均價', Value: 51.46 },
      { Name: '透天厝均價', Value: 25.12 },
      { Name: '區分建物均價', Value: 17.47 }
    ]
  },
  {
    Date: '10709',
    Categories: [{ Name: '土地+建物的案件量', Value: 223 }],
    LineCategory: [
      { Name: '土地均價', Value: 95.13 },
      { Name: '透天厝均價', Value: 24.38 },
      { Name: '區分建物均價', Value: 17.05 }
    ]
  },
  {
    Date: '10710',
    Categories: [{ Name: '土地+建物的案件量', Value: 274 }],
    LineCategory: [
      { Name: '土地均價', Value: 87.44 },
      { Name: '透天厝均價', Value: 21.39 },
      { Name: '區分建物均價', Value: 15.57 }
    ]
  },
  {
    Date: '10711',
    Categories: [{ Name: '土地+建物的案件量', Value: 254 }],
    LineCategory: [
      { Name: '土地均價', Value: 44.13 },
      { Name: '透天厝均價', Value: 25.15 },
      { Name: '區分建物均價', Value: 15.9 }
    ]
  },
  {
    Date: '10712',
    Categories: [{ Name: '土地+建物的案件量', Value: 310 }],
    LineCategory: [
      { Name: '土地均價', Value: 56.59 },
      { Name: '透天厝均價', Value: 24.76 },
      { Name: '區分建物均價', Value: 16.07 }
    ]
  },
  {
    Date: '10801',
    Categories: [{ Name: '土地+建物的案件量', Value: 289 }],
    LineCategory: [
      { Name: '土地均價', Value: 53.19 },
      { Name: '透天厝均價', Value: 24.71 },
      { Name: '區分建物均價', Value: 15.73 }
    ]
  },
  {
    Date: '10802',
    Categories: [{ Name: '土地+建物的案件量', Value: 126 }],
    LineCategory: [
      { Name: '土地均價', Value: 59.97 },
      { Name: '透天厝均價', Value: 23.67 },
      { Name: '區分建物均價', Value: 15.22 }
    ]
  },
  {
    Date: '10803',
    Categories: [{ Name: '土地+建物的案件量', Value: 50 }],
    LineCategory: [
      { Name: '土地均價', Value: 0.0 },
      { Name: '透天厝均價', Value: 22.9 },
      { Name: '區分建物均價', Value: 19.25 }
    ]
  }
];
var DataLevel2ForBarChart = JSON.parse(
  '{"10704":[{"label":"土地","value":8},{"label":"透天厝","value":44},{"label":"區分建物","value":229}],"10705":[{"label":"土地","value":11},{"label":"透天厝","value":37},{"label":"區分建物","value":226}],"10706":[{"label":"土地","value":10},{"label":"透天厝","value":40},{"label":"區分建物","value":210}],"10707":[{"label":"土地","value":13},{"label":"透天厝","value":34},{"label":"區分建物","value":262}],"10708":[{"label":"土地","value":4},{"label":"透天厝","value":37},{"label":"區分建物","value":253}],"10709":[{"label":"土地","value":9},{"label":"透天厝","value":29},{"label":"區分建物","value":185}],"10710":[{"label":"土地","value":8},{"label":"透天厝","value":49},{"label":"區分建物","value":217}],"10711":[{"label":"土地","value":7},{"label":"透天厝","value":35},{"label":"區分建物","value":212}],"10712":[{"label":"土地","value":8},{"label":"透天厝","value":44},{"label":"區分建物","value":258}],"10801":[{"label":"土地","value":5},{"label":"透天厝","value":46},{"label":"區分建物","value":238}],"10802":[{"label":"土地","value":1},{"label":"透天厝","value":29},{"label":"區分建物","value":96}],"10803":[{"label":"土地","value":0},{"label":"透天厝","value":9},{"label":"區分建物","value":41}]}'
);
var DataLevel2ForLine = JSON.parse(
  '{"10704":[{"label":"土地","value":22.91},{"label":"透天厝","value":23.88},{"label":"區分建物","value":15.81}],"10705":[{"label":"土地","value":77.71},{"label":"透天厝","value":23.29},{"label":"區分建物","value":15.8}],"10706":[{"label":"土地","value":54.21},{"label":"透天厝","value":24.86},{"label":"區分建物","value":15.33}],"10707":[{"label":"土地","value":63.1},{"label":"透天厝","value":22.64},{"label":"區分建物","value":16.83}],"10708":[{"label":"土地","value":51.46},{"label":"透天厝","value":25.12},{"label":"區分建物","value":17.47}],"10709":[{"label":"土地","value":95.13},{"label":"透天厝","value":24.38},{"label":"區分建物","value":17.05}],"10710":[{"label":"土地","value":87.44},{"label":"透天厝","value":21.39},{"label":"區分建物","value":15.57}],"10711":[{"label":"土地","value":44.13},{"label":"透天厝","value":25.15},{"label":"區分建物","value":15.9}],"10712":[{"label":"土地","value":56.59},{"label":"透天厝","value":24.76},{"label":"區分建物","value":16.07}],"10801":[{"label":"土地","value":53.19},{"label":"透天厝","value":24.71},{"label":"區分建物","value":15.73}],"10802":[{"label":"土地","value":59.97},{"label":"透天厝","value":23.67},{"label":"區分建物","value":15.22}],"10803":[{"label":"土地","value":0.0},{"label":"透天厝","value":22.9},{"label":"區分建物","value":19.25}]}'
);
var currHalfWindowWidth = document.getElementById('verticalDIVRight2')
  .offsetWidth;
var currQuarterWindowHeight = document.getElementById('verticalDIVRight2')
  .offsetHeight;
var margin = { top: 20, right: 40, bottom: 60, left: 40 },
  width = currHalfWindowWidth - margin.left - margin.right,
  height = currQuarterWindowHeight - margin.top - margin.bottom;

var textWidthHolder = 0;
/// Adding Date in LineCategory
Data.forEach(function(d) {
  d.LineCategory.forEach(function(b) {
    b.Date = d.Date;
  });
});

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select('#verticalDIVRight2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // trans the origin data from server to the dat that d3 line chart can use and will put in this `Categories`
var __Categories = new Array();
// Extension method declaration

__Categories.pro;

//     var Data;

// set the ranges
var x0 = d3
  .scaleBand()
  .range([0, width])
  .padding(0.1);

var XLine = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

var x1 = d3.scaleOrdinal();

var y = d3.scaleLinear().range([height, 0]);

var YLine = d3
  .scaleLinear()
  .range([height, 0])
  .domain([
    0,
    d3.max(Data, function(d) {
      return d3.max(d.LineCategory, function(b) {
        return b.Value;
      });
    })
  ]);

var color = d3
  .scaleOrdinal(d3.schemeCategory10)
  .range([
    '#FFF279',
    '#FFFF00',
    '#7b6888',
    '#6b486b',
    '#a05d56',
    '#d0743c',
    '#ff8c00'
  ]);

var line = d3
  .line()
  .x(function(d) {
    return x0(d.Date) + x0.bandwidth() / 2;
  })
  .y(function(d) {
    return YLine(d.Value);
  });

var YRightAxis = d3.axisRight(YLine);

// Bar Data categories
Data.forEach(function(d) {
  d.Categories.forEach(function(b) {
    var index = -1;
    for (var i = 0; i < __Categories.length; ++i) {
      if (__Categories[i].Name == b.Name) {
        index = i;
        break;
      }
    }

    if (index == -1) {
      b.Type = 'bar';
      console.log(JSON.stringify(b));
      __Categories.push(b);
    }
  });
});

// Line Data categories
Data.forEach(function(d) {
  d.LineCategory.forEach(function(b) {
    var index = -1;
    for (var i = 0; i < __Categories.length; ++i) {
      if (__Categories[i].Name == b.Name) {
        index = i;
        break;
      }
    }

    if (index == -1) {
      b.Type = 'line';
      console.log(JSON.stringify(b));
      __Categories.push(b);
    }
  });
});

// Processing Line data
var lineData = DataSegregator(
  Data.map(function(d) {
    return d.LineCategory;
  }),
  'Name'
);

// Line Coloring
var LineColor = d3.scaleOrdinal(d3.schemeCategory10);
LineColor.domain(
  __Categories.filter(function(d) {
    return d.Type == 'line';
  }).map(function(d) {
    return d.Name;
  })
);

LineColor.range(['#FF33CC', '#0070C0', '#00B050', '#671919', '#0b172b']);

x0.domain(
  Data.map(function(d) {
    return d.Date;
  })
);
XLine.domain(
  Data.map(function(d) {
    return d.Date;
  })
);
x1.domain(
  __Categories.filter(function(d) {
    return d.Type == 'bar';
  }).map(function(d) {
    return d.Name;
  })
);
y.domain([
  0,
  d3.max(Data, function(d) {
    return d3.max(d.Categories, function(d) {
      return d.Value;
    });
  })
]);

// add the x Axis
svg
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x0));

// Add the Y Axis
svg
  .append('g')
  .attr('class', 'y axis')
  .call(d3.axisLeft(y).ticks(5))
  .append('text')
  .style('fill', 'steelblue') // fill the text with the colour black
  .attr('transform', 'rotate(-90)')
  .attr('y', 6)
  .attr('dy', '.71em')
  .style('text-anchor', 'end')
  .text('案件數');

svg
  .append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + width + ',0)')
  .call(d3.axisRight(YLine).ticks(5))
  .append('text')
  .style('fill', 'steelblue') // fill the text with the colour black
  .attr('transform', 'rotate(-90)')
  .attr('y', -10)
  .attr('dy', '.71em')
  .style('text-anchor', 'end')
  .text('均價');

  // 包住 rect的 g
var state = svg
  .selectAll('.state')
  .data(Data)
  .enter()
  .append('g')
  .attr('class', 'state')
  .attr('transform', function(d) {
    return 'translate(' + x0(d.Date) + ',0)';
  });

var mouseoverDate;
state.on('mouseover', function(d) {
  mouseoverDate = d.Date;
});

var rects = state
  .selectAll('rect')
  .data(function(d) {
    return d.Categories;
  })
  .enter()
  .append('rect')
  .attr('x', function(d) {
    return x1(d.Name);
  })
  .attr('width', x0.bandwidth())
  .attr('y', height)
  //      .attr("height", function(d) { return height - y(d.Value); })
  .style('fill', function(d) {
    return color(d.Name);
  });

//     rects.transition().delay(500).attrTween("height", function (d) {
//		      var i = d3.interpolate(0, height - y(d.Value));
//	      return function (t)
//	      {
//	          return i(t);
//	      }
//    });

rects
  .transition()
  .duration(1000) //由下往上長
  .attr('y', function(d) {
    return y(d.Value);
  }) //由下往上長
  .attr('height', function(d) {
    return height - y(d.Value);
  }); //由下往上長

rects
  .on('mouseover', function(d) {
    d3.select(this).style('fill', function(d) {
      return color(5);
    });

    toolTipDiv
      .transition()
      .duration(200)
      .style('opacity', 0.9);

    toolTipDiv
      .html('案件數:' + d.Value + '件')
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
  })
  .on('mouseout', function(d) {
    d3.select(this).style('fill', function(d) {
      return color(d.Name);
    });

    toolTipDiv
      .transition()
      .duration(500)
      .style('opacity', 0);
  });

rects.on('click', function(d) {
  //alert(mouseoverDate + " " + JSON.stringify(d));

  var currMonthCaseDataArr = DataLevel2ForBarChart[mouseoverDate];
  //alert(mouseoverDate + ":: " + JSON.stringify(currMonthCaseDataArr));
  var caseTypeInfo = []; // 給圓餅圖旁邊的說明框的文字
  var rawDataArr = DataLevel2ForBarChart[mouseoverDate]; //  給圓餅圖的資料來源
  for (var gg = 0; gg < currMonthCaseDataArr.length; gg++) {
    // 經過這個迴圈  資料就整理完了
    caseTypeInfo.push(currMonthCaseDataArr[gg].label);
    //rawDataArr[gg].value;
  }
  var pieChartData = {
    YYYYMM: mouseoverDate,
    areaName: '三民區',
    typeName: d.Name,
    typeValue: d.Value
  };

  var parameterForPieChart = {
    whereToDraw: '#pieChartArea',
    build_type: '件',
    chartWidth: currHalfWindowWidth,
    chartHeight: currQuarterWindowHeight,
    otherTextToDispalyOnPie: caseTypeInfo
  };

  var pieChartAreaDom = document.getElementById('pieChartArea');
  pieChartAreaDom.innerHTML = '';
  drawPieChartByOneArea(pieChartData, parameterForPieChart, rawDataArr);
  pieChartAreaDom.style.display = 'inline';
});

// drawaing lines
svg
  .selectAll('.lines')
  .data(lineData)
  .enter()
  .append('g')
  .attr('class', 'axis line')
  .each(function(d) {
    Name = d[0].Name;
    d3.select(this)
      .append('path')
      .attr('d', function(b) {
        return line(b);
      })
      .attr('stroke', LineColor(Name))
      .transition()
      .duration(1500);
  });
console.log('Line Data :' + JSON.stringify(lineData));

var toolTipDiv = d3
  .select('body')
  .append('div')
  .attr('class', 'bubbleToolTip')
  .style('opacity', 0);

// append circle on line    在折線的折點上加上醒目的圓點
// lineData 是一個長度2 的二維陣列   lineData[0]是土地均價折線上的一個個點
// lineData[1]是建物均價折線上的一個個點
lineData.forEach(function(one, i1) {
  svg
    .selectAll('.dots')
    .data(one)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', function(d, i2_1) {
      return x0(d.Date) + x0.bandwidth() / 2;
    })
    .attr('cy', function(d, i2_2) {
      return YLine(d.Value);
    })
    .style('fill', function(d) {
      {
        return LineColor(d.Name);
      }
    })
    .style('stroke', function(d) {
      {
        return '#c00';
      }
    })
    .style('stroke-width', function(d) {
      {
        return '1px';
      }
    })
    .on('mouseover', function(d) {
      toolTipDiv
        .transition()
        .duration(200)
        .style('opacity', 0.9);

      toolTipDiv
        .html(d.Name + ' : ' + d.Value)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
    })
    .on('mouseout', function(d) {
      toolTipDiv
        .transition()
        .duration(500)
        .style('opacity', 0);
    })
    .on('click', function(d) {
      // 在這裡面做任何按下圓點後想做的事  ajax , 開隱藏視窗 , 畫圓餅圖 ...etc

      console.log(d.Name + 'ssscc:' + d.Value + ' clicked...');
      console.log('Line Data :' + JSON.stringify(d.Date));
      //if(d.Name=="建物均價"){
      //	 var currMonthCaseDataArr = DataLevel2ForLine[d.Date];
      //alert(mouseoverDate + ":: " + JSON.stringify(currMonthCaseDataArr));
      //     var caseTypeInfo = [];  // 給圓餅圖旁邊的說明框的文字
      //     var rawDataArr =DataLevel2ForLine[d.Date];    //  給圓餅圖的資料來源
      //     for(var gg=0;gg<currMonthCaseDataArr.length;gg++){  // 經過這個迴圈  資料就整理完了
      //       	 caseTypeInfo.push(currMonthCaseDataArr[gg].label);
      //rawDataArr[gg].value;
      //     }
      //     var pieChartData = {
      //             YYYYMM:mouseoverDate,
      //             areaName:'三民區',
      //             typeName:d.Name,
      //             typeValue:d.Value
      //         }

      //     var parameterForPieChart = {
      //            whereToDraw:'#pieChartArea',
      //            build_type:'元',
      //            chartWidth: currHalfWindowWidth,
      //            chartHeight:currQuarterWindowHeight,
      //            otherTextToDispalyOnPie:caseTypeInfo
      //    }

      //    var pieChartAreaDom = document.getElementById('pieChartArea');
      //    pieChartAreaDom.innerHTML = '';
      //   drawPieChartByOneArea(pieChartData,parameterForPieChart,rawDataArr);
      //    pieChartAreaDom.style.display = 'inline';

      //}
    });
});

// Legends

var LegendHolder = svg.append('g').attr('class', 'legendHolder');
var legend = LegendHolder.selectAll('.legend')
  .data(
    __Categories.map(function(d) {
      return { Name: d.Name, Type: d.Type };
    })
  )
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    return 'translate(0,' + (height + margin.bottom / 2) + ')';
  })
  .each(function(d, i) {
    //  Legend Symbols

    d3.select(this)
      .append('rect')
      .attr('width', function() {
        return 18;
      })
      .attr('x', function(b) {
        var left = (i + 1) * 15 + i * 18 + i * 5 + textWidthHolder;
        return left;
      })
      .attr('y', function(b) {
        return b.Type == 'bar' ? 0 : 7;
      })
      .attr('height', function(b) {
        return b.Type == 'bar' ? 18 : 5;
      })
      .style('fill', function(b) {
        return b.Type == 'bar' ? color(d.Name) : LineColor(d.Name);
      });

    //  Legend Text

    d3.select(this)
      .append('text')
      .attr('x', function(b) {
        var left = (i + 1) * 15 + (i + 1) * 18 + (i + 1) * 5 + textWidthHolder;

        return left;
      })
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d.Name);

    textWidthHolder += getTextWidth(d.Name, '10px', 'calibri');
  });

// Legend Placing

d3.select('.legendHolder').attr('transform', function(d) {
  thisWidth = d3
    .select(this)
    .node()
    .getBBox().width;
  return 'translate(' + (width / 2 - thisWidth / 2) + ',0)';
});

// 畫圓餅圖
function drawPieChartByOneArea(originalData, parameters, rowData) {
  console.log('draw pieChart in');
  console.log(originalData);

  var outherTextIndex = 0;
  var dataset = rowData;

  var pAreaName = originalData.areaName;
  var container = parameters.whereToDraw;
  var width = parameters.chartWidth;
  var height = parameters.chartHeight;
  var radius = Math.min(width, height) / 2;
  var otherText = parameters.otherTextToDispalyOnPie;
  var build_type = parameters.build_type;
  var threeColorForPirChart = d3
    .scaleOrdinal()
    .range(['#ff7f50', '#7f55d4', '#6fbfad']);
  var color = d3.scaleOrdinal(d3.schemeCategory20c);

  var outerRadius = width / 3;
  var innerRadius = 0;

  //var arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
  var arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius - 40);

  //var labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

  var PIE_LAYOUT = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    }); // Pie layOut

  // 在pieChartSVG 上 動態放上一個叉叉  以用來關閉圓餅圖    "&times;" 就是 叉叉 , 所以還要在 叉叉 上綁事件
  d3.select(container)
    .append('span')
    .attr('class', 'closePopupWindowX')
    .html('關閉')
    .on('click', function() {
      var shapSignForD3_Deleted = container.substring(1, container.length); // 給的時候是要給d3 selector用的  所以那時多加了一個# 表示ID , 現在要去掉 ,不然 getElementById 會取不到節點
      document.getElementById(shapSignForD3_Deleted).style.display = 'none';
      document.getElementById(shapSignForD3_Deleted).innerHTML = '';
    });

  var svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  var those_Gs = svg
    .selectAll('.arc')
    .data(PIE_LAYOUT(dataset))
    .enter()
    .append('g')
    .attr('class', 'arc');

  those_Gs
    .append('span')
    .attr('class', 'hoverInfoSpan')
    .html(function(d) {
      return d.data + '件';
    });

  //  再重新選取一次所有 弧形G  以用來貼上字   不這樣做的話 因為SVG render順序規則  path的顏色會蓋掉文字
  // 詳見:  http://stackoverflow.com/questions/39156030/text-being-covered-by-paths-in-d3-pie-chart
  //但沒有用  字還是會被path的色塊蓋住
  var those_Gs_2 = svg
    .selectAll('.arc2')
    .data(PIE_LAYOUT(dataset))
    .enter()
    .append('g')
    .attr('class', 'arc');

  //those_Gs.append('path').attr('d',arc).style('fill',function(d,i){  //第二個參數i是index 就像 Array.prototype.map , filter...那些方法一樣

  //    return color(i);});

  those_Gs
    .append('path')
    .attr('fill', function(d, i) {
      return threeColorForPirChart(i);
    })
    .attr('d', function(d) {
      return arc(d);
    });

  if (otherText !== undefined) {
    // 為了換行,所以分開append兩個text
    //those_Gs_2.append('text').attr('transform',function(d){return 'translate('+labelArc.centroid(d)+')';})
    //.attr('dx','-2em')   // 相對於弧心的位置 調整字出現
    //.attr('dy','1em')
    // .text(function(d,i){ return (d.data>0 ? otherText[i] : '');});  // 0件的話就不顯示

    those_Gs_2
      .append('text')
      .attr('transform', function(d) {
        var x = arc.centroid(d)[0] * 1.4;
        var y = arc.centroid(d)[1] * 1.4;
        //return 'translate('+labelArc.centroid(d)+')';
        return 'translate(' + x + ',' + y + ')';
      })
      .attr('text-anchor', 'small')
      //.attr('dx','-2em')
      //.attr('dy','2em')
      .text(function(d, i) {
        return d.value > 0 ? d.value + build_type : '';
      });

    //	generateIfNeedLineAndTradingTypeText(those_Gs_2,otherText,arc);
  } else {
    those_Gs_2
      .append('text')
      .attr('transform', function(d) {
        return 'translate(' + labelArc.centroid(d) + ')';
      })
      // .attr('dy','0.35em')
      .text(function(d) {
        return d.data;
      });
  }

  generateExplainDescriptionArea(
    svg,
    otherText,
    threeColorForPirChart,
    width,
    height,
    pAreaName,
    originalData
  );
}

// 產生  圓餅圖  畫面右端的顏色說明
function generateExplainDescriptionArea(
  svgObj,
  CategoryTextArr,
  ColorFunctionObj,
  svgWidth,
  svgHeight,
  areaName,
  originalData
) {
  originalData.YYYYMM =
    originalData.YYYYMM.substring(0, 3) +
    '年' +
    originalData.YYYYMM.substring(3, 5) +
    '月';
  originalData.typeName === '建物均價'
    ? (originalData.typeValue = '平均' + originalData.typeValue + '元')
    : (originalData.typeValue = '共' + originalData.typeValue + '件');

  // 把 JS Object 轉成Array
  var dataArr = [];
  for (var aKey in originalData) {
    dataArr.push(originalData[aKey]);
  }

  //把 Array裡的 [0]跟[1] 對調    變 [areaName,YYYYMM,typeName,typeValue];
  var temp = dataArr[0];
  dataArr[0] = dataArr[1];
  dataArr[1] = temp;

  var pieChartInfoHolder = svgObj
    .append('g')
    .attr('class', 'pieChartInfoHolder');
  var offSetWidthFromCircleCenter = svgWidth / 5;
  var pairInfos = pieChartInfoHolder
    .selectAll('.pairInfo')
    .data(CategoryTextArr)
    .enter()
    .append('g')
    .attr('class', 'pairInfo')
    .attr('transform', function(d, i) {
      return 'translate(' + offSetWidthFromCircleCenter + ', 0)';
    })

    .each(function(d, i) {
      // 三種顏色色塊
      d3.select(this)
        .append('rect')
        .attr('width', function(b) {
          return 20;
        })
        .attr('height', function(b) {
          return 18;
        })
        .attr('x', function(b) {
          return 0;
        })
        .attr('y', function(b) {
          return i * 30;
        })

        .style('fill', function(b) {
          return ColorFunctionObj(i);
        });

      // 三種交易型態的文字
      d3.select(this)
        .append('text')
        .attr('x', function(b) {
          return 0 + 25;
        })
        .attr('y', function(b) {
          return i * 30 + 15;
        })
        .style('text-anchor', 'start')
        .text(d);
    });

  //  顯示 是 XX區, 時間 ,建物均價或案件量 ,平均價格或總案件量    四個東西
  var moreInfoHolder = svgObj.append('g').attr('class', 'moreInfoHolder');

  moreInfoHolder
    .selectAll('.moreInfoDetail')
    .data(dataArr)
    .enter()
    .append('g')
    .attr('class', 'moreInfoDetail')
    .attr('transform', 'translate(-' + offSetWidthFromCircleCenter + ',0)')
    .attr(
      'transform',
      'translate(-' + svgWidth / 2.5 + ',-' + svgHeight / 3 + ')'
    )
    .each(function(d, i) {
      if (i === 0) {
        // XX區
        d3.select(this)
          .append('text')
          .attr('x', 0)
          .attr('y', 0 + i * 50)
          .text(d)
          .style('font-size', '34px');
      } else {
        d3.select(this)
          .append('text')
          .attr('x', 0)
          .attr('y', 0 + i * 40)
          .text(d)
          .style('font-size', '16px');
      }
    });

  //這時svgObj的transform基準點 在圓餅中心 也就是 (svgWidth/2 , svgHeight / 2);
  svgObj
    .append('g')
    .attr('class', 'separatedDescArea')
    .attr(
      'transform',
      'translate(-' + svgWidth * 0.3 + ',' + svgHeight * 0.45 + ')'
    )
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .text('區分建物  為 公寓,住宅大樓,華廈,套房 四類案件之總合')
    .style('font-size', '12px');
}

//  產生 圓餅圖  區塊說明  指示線條  與 文字
function generateIfNeedLineAndTradingTypeText(
  those_G,
  tradingTypeTextArray,
  arcFromCaller
) {
  // 如果需要的話  就劃線   不然就不劃(回傳0)
  those_G
    .append('line')
    .attr('stroke', 'black')
    .attr('x1', function(d) {
      return d.data > 0 ? arcFromCaller.centroid(d)[0] * 2 : 0;
    })
    .attr('y1', function(d) {
      return d.data > 0 ? arcFromCaller.centroid(d)[1] * 2 : 0;
    })
    .attr('x2', function(d) {
      return d.data > 0 ? arcFromCaller.centroid(d)[0] * 2.2 : 0;
    })
    .attr('y2', function(d) {
      return d.data > 0 ? arcFromCaller.centroid(d)[1] * 2.2 : 0;
    });

  those_G
    .append('text')
    .attr('transform', function(d) {
      var x = arcFromCaller.centroid(d)[0] * 2.5;
      var y = arcFromCaller.centroid(d)[1] * 2.5;
      return 'translate(' + x + ',' + y + ')';
    })
    .attr('text-anchor', 'small')
    .text(function(d, i) {
      return d.data > 0 ? tradingTypeTextArray[i] : '';
    }); // 0件的話就不顯示
}
