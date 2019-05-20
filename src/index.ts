import { BarCharts } from './parts/barcharts'
import { LineCharts } from './parts/linecharts'
import { PieCharts } from './parts/piecharts'
import { BarChartDataType } from './types'

export default function familiarD3Scenario() {
  return {
    BarChart: BarCharts,
    LineChart: LineCharts,
    PieChart: PieCharts
  }
}

const fD3Module = familiarD3Scenario()

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
    categories: [{ name: '土地+建物的案件量', value: 300 }],
    LineCategory: [
      { name: '土地均價', value: 77.71 },
      { name: '透天厝均價', value: 23.29 },
      { name: '區分建物均價', value: 15.8 }
    ]
  },
  {
    date: '10706',
    categories: [{ name: '土地+建物的案件量', value: 20 }],
    LineCategory: [
      { name: '土地均價', value: 54.21 },
      { name: '透天厝均價', value: 24.86 },
      { name: '區分建物均價', value: 15.33 }
    ]
  },
  {
    date: '10707',
    categories: [{ name: '土地+建物的案件量', value: 80 }],
    LineCategory: [
      { name: '土地均價', value: 54.21 },
      { name: '透天厝均價', value: 24.86 },
      { name: '區分建物均價', value: 15.33 }
    ]
  },
  {
    date: '10708',
    categories: [{ name: '土地+建物的案件量', value: 120 }],
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
    categories: [{ name: '土地+建物的案件量', value: 200 }],
    LineCategory: [
      { name: '土地均價', value: 100.71 },
      { name: '透天厝均價', value: 70.29 },
      { name: '區分建物均價', value: 30.8 }
    ]
  },
  {
    date: '10706',
    categories: [{ name: '土地+建物的案件量', value: 300 }],
    LineCategory: [
      { name: '土地均價', value: 20.71 },
      { name: '透天厝均價', value: 23.29 },
      { name: '區分建物均價', value: 15.8 }
    ]
  },
  {
    date: '10707',
    categories: [{ name: '土地+建物的案件量', value: 120 }],
    LineCategory: [
      { name: '土地均價', value: 37.71 },
      { name: '透天厝均價', value: 63.29 },
      { name: '區分建物均價', value: 5.8 }
    ]
  },
  {
    date: '10708',
    categories: [{ name: '土地+建物的案件量', value: 20 }],
    LineCategory: [
      { name: '土地均價', value: 27.71 },
      { name: '透天厝均價', value: 50.29 },
      { name: '區分建物均價', value: 200.8 }
    ]
  }
]

const barTestData3: BarChartDataType[] = [
  {
    date: '10705',
    categories: [{ name: '土地+建物的案件量', value: 200 }],
  },
  {
    date: '10706',
    categories: [{ name: '土地+建物的案件量', value: 300 }],
  },
  {
    date: '10707',
    categories: [{ name: '土地+建物的案件量', value: 120 }],
  },
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

const svgDom1 = document.getElementById('svg1')
const barChart1 = new fD3Module.BarChart(svgDom1)
barChart1.initD3ishSVG()
barChart1.draw(testData)

const linesData = transToLineData(testData)
const lineChart1 = new fD3Module.LineChart(svgDom1)

lineChart1.setD3ishSVGFromOtherChart(barChart1.getTheD3ishSVG())
lineChart1.draw(linesData)

const svgDom2 = document.getElementById('svg2')
const pieChart1 = new fD3Module.PieChart(svgDom2, [
  { name: '土地均價', value: 54.21 },
  { name: '透天厝均價', value: 24.86 },
  { name: '區分建物均價', value: 15.33 }
])

pieChart1.initD3ishSVG()
pieChart1.draw()


const svgDom3 = document.getElementById('svg3')
const barChart2 = new fD3Module.BarChart(svgDom3)
barChart2.initD3ishSVG()
barChart2.draw(testData)

setTimeout(() => {
  barChart1.draw(barTestData2)

  const linesData2 = transToLineData(barTestData2)
  lineChart1.draw(linesData2)
}, 5555)

setTimeout(() => {
  barChart1.draw(barTestData3)
}, 10000)