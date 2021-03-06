import { BarChartDataType, LengendDataType, LengendIconEnum } from '../../src/types'
import familiarD3Scenario from '../../src'


interface lineData {
  name: string
  value: number
}
interface lineCategory {
  LineCategory: lineData[]
}

type BarcharData = BarChartDataType & lineCategory

const testData: BarcharData[] = [
  {
    date: '10705',
    categories: [
      { date: '10705', name: '土地+建物的案件量', value: 40 },
      { date: '10705', name: '建物的案件量', value: 20 },
      { date: '10705', name: 'PP的案件量', value: 20 },
    ],
    LineCategory: [
      { name: '土地均價', value: 77.71 },
      { name: '透天厝均價', value: 23.29 },
      { name: '區分建物均價', value: 15.8 }
    ]
  },
  {
    date: '10706',
    categories: [
      { date: '10706', name: '土地+建物的案件量', value: 20 },
      { date: '10706', name: '建物的案件量', value: 20 },
      { date: '10706', name: 'PP的案件量', value: 20 },
     
    ],
    LineCategory: [
      { name: '土地均價', value: 54.21 },
      { name: '透天厝均價', value: 24.86 },
      { name: '區分建物均價', value: 15.8 }

    ]
  },
  {
    date: '10707',
    categories: [
      { date: '10707', name: '土地+建物的案件量', value: 80 },
      { date: '10707', name: '建物的案件量', value: 50 },
      { date: '10707', name: 'PP的案件量', value: 90 },
     
    ],
    LineCategory: [
      { name: '土地均價', value: 54.21 },
      { name: '透天厝均價', value: 24.86 },
      { name: '區分建物均價', value: 15.33 }
    ]
  },
  {
    date: '10708',
    categories: [
      { date: '10708', name: '土地+建物的案件量', value: 120 },
      { date: '10708', name: '建物的案件量', value: 20 },
      { date: '10708', name: 'PP的案件量', value: 20 },
     
    ],
    LineCategory: [
      { name: '土地均價', value: 54.21 },
      { name: '透天厝均價', value: 24.86 },
      { name: '區分建物均價', value: 15.33 }
    ]
  }
]

const barTestData2: BarcharData[] = [
  {
    date: '10705',
    categories: [
      { date: '10705', name: '土地+建物的案件量', value: 100 },
      { date: '10705', name: '建物的案件量', value: 20 }
    ],
    LineCategory: [
      { name: '土地均價', value: 100.71 },
      { name: '透天厝均價', value: 70.29 },
      { name: '區分建物均價', value: 30.8 }
    ]
  },
  {
    date: '10706',
    categories: [
      { date: '10706', name: '土地+建物的案件量', value: 250 },
      { date: '10706', name: '建物的案件量', value: 40 }
    ],
    LineCategory: [
      { name: '土地均價', value: 20.71 },
      { name: '透天厝均價', value: 23.29 },
      { name: '區分建物均價', value: 15.8 }
    ]
  },
  {
    date: '10707',
    categories: [
      { date: '10707', name: '土地+建物的案件量', value: 120 },
      { date: '10707', name: '建物的案件量', value: 20 }
    ],
    LineCategory: [
      { name: '土地均價', value: 37.71 },
      { name: '透天厝均價', value: 63.29 },
      { name: '區分建物均價', value: 5.8 }
    ]
  },
  {
    date: '10708',
    categories: [
      { date: '10708', name: '土地+建物的案件量', value: 20 },
      { date: '10708', name: '建物的案件量', value: 40 }
    ],
    LineCategory: [
      { name: '土地均價', value: 27.71 },
      { name: '透天厝均價', value: 50.29 },
      { name: '區分建物均價', value: 200.8 }
    ]
  }
]

const barTestData3: BarcharData[] = [
  {
    date: '10705',
    categories: [
      { date: '10705', name: '土地+建物的案件量', value: 200 },
      { date: '10705', name: '建物的案件量', value: 20 }
    ],
    LineCategory: [
      { name: '土地均價', value: 27.71 },
      { name: '透天厝均價', value: 50.29 },
      { name: '區分建物均價', value: 200.8 }
    ]
  },
  {
    date: '10706',
    categories: [
      { date: '10706', name: '土地+建物的案件量', value: 300 },
      { date: '10706', name: '建物的案件量', value: 20 }
    ],
    LineCategory: [
      { name: '土地均價', value: 200.71 },
      { name: '透天厝均價', value: 63.29 },
      { name: '區分建物均價', value: 5.8 }
    ]
  },
  {
    date: '10707',
    categories: [
      { date: '10707', name: '土地+建物的案件量', value: 120 },
      { date: '10707', name: '建物的案件量', value: 20 }
    ],
    LineCategory: [
      { name: '土地均價', value: 47.71 },
      { name: '透天厝均價', value: 63.29 },
      { name: '區分建物均價', value: 32.8 }
    ]
  },

  {
    date: '10708',
    categories: [
      { date: '10708', name: '土地+建物的案件量', value: 400 },
      { date: '10708', name: '建物的案件量', value: 50 }
    ],
    LineCategory: [
      { name: '土地均價', value: 47.71 },
      { name: '透天厝均價', value: 63.29 },
      { name: '區分建物均價', value: 32.8 }
    ]
  }

]

const transToLineData = (tdata: BarcharData[]) => {
  const landLine = tdata.reduce(
    (acc, curr) => {
      const d = { date: '', value: 0 }
      d.date = curr.date
      d.value = curr.LineCategory[0].value
      acc.datas.push(d)
      return acc
    },
    { name: '土地均價', datas: [] }
  )

  const wholeBuildLine = tdata.reduce(
    (acc, curr) => {
      const d = { date: '', value: 0 }
      d.date = curr.date
      d.value = curr.LineCategory[1].value
      acc.datas.push(d)
      return acc
    },
    { name: '透天厝均', datas: [] }
  )

  const buildingLine = tdata.reduce(
    (acc, curr) => {
      const d = { date: '', value: 0 }
      d.date = curr.date
      d.value = curr.LineCategory[2].value
      acc.datas.push(d)
      return acc
    },
    { name: '區分建物均價', datas: [] }
  )

  return [landLine, wholeBuildLine, buildingLine]
}

const fD3Module = familiarD3Scenario()

const svgDom1 = document.getElementById('svg1')
const barChart1 = new fD3Module.BarChart(svgDom1)
const tooltip = new fD3Module.ToolTip()
barChart1.initD3ishSVG()
barChart1.setLeftYAxisText('案件數 要爆啦！')
barChart1.setOnRectClick((d: any) => console.log(d))
barChart1.setOnRectMouseOver((d, pX, pY) => {
  tooltip.show(`${d.name}:${d.value}`, pX + 10, pY - 30)
})
barChart1.setOnRectMouseOut(() => {
  tooltip.hide()
})
barChart1.draw(testData)

const linesData = transToLineData(testData)
const lineChart1 = new fD3Module.LineChart(svgDom1)

lineChart1.setD3ishSVGFromOtherChart(barChart1.getTheD3ishSVG())
lineChart1.setColorRangeArr(['#db061b', '#665e5f', '#d8a817'])
lineChart1.setRightYAxisText('均價')
lineChart1.setIsDrawPoint(true, 3)
lineChart1.draw(linesData)

const svgDom2 = document.getElementById('svg2')
const pieChart1 = new fD3Module.PieChart(svgDom2)

const testPieChartData = [
  { name: '土地均價', value: 54.21 },
  { name: '透天厝均價', value: 24.86 },
  { name: '區分建物均價', value: 15.33 }
]

pieChart1.initD3ishSVG()
pieChart1.draw(testPieChartData)

const tColorRangeArr = ['#29bc69', '#102d6d', '#cd1dd3', '#9b0806']

const svgDom3 = document.getElementById('svg3')
const barChart2 = new fD3Module.BarChart(svgDom3)
barChart2.initD3ishSVG()
barChart2.setLeftYAxisText('案件數')
barChart2.setColorRangeArr(tColorRangeArr)
barChart2.draw(testData)

const svgDom4 = document.getElementById('svg4')
const lineChart2 = new fD3Module.LineChart(svgDom4)
lineChart2.draw(linesData)

const legendSVG = document.getElementById('lengendSvg')
const legend1 = new fD3Module.Legend(legendSVG)
legend1.setColorRange(tColorRangeArr)
const legend1Data: LengendDataType[] = [
  {
    text: '套房',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
  {
    text: '區分建物',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
  {
    text: '土地',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
]

const legend1Data_2: LengendDataType[] = [
  {
    text: '星野源',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
  {
    text: '偽明',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
  {
    text: '細野晴臣',
    hexColorStr: '',
    iconType: LengendIconEnum.bar,
  },
]

legend1.draw(legend1Data)

setTimeout(() => {
  barChart1.draw(barTestData2)
  barChart2.draw(barTestData2)
  const linesData2 = transToLineData(barTestData2)
  lineChart1.draw(linesData2.slice(0, 2))
  pieChart1.setColorRangeArr(['#29bc69', '#102d6d', '#cd1dd3', '#9b0806'])
  pieChart1.draw(testPieChartData.slice(0, 2))

  legend1.setColorRange(['#db061b', '#665e5f', '#d8a817'])
  legend1.draw(legend1Data_2)
}, 3000)

setTimeout(() => {
  barChart1.draw(barTestData3)
  barChart2.draw(barTestData3.slice(0,2))
  const linesData3 = transToLineData(barTestData3)
  lineChart1.draw(linesData3)
  pieChart1.draw(testPieChartData)
}, 5500)
