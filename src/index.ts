import { BarCharts } from './parts/barcharts'
import { BarChartDataType } from './types'

export default function familiarD3Scenario() {
  return {
    BarChart: BarCharts
  }
}

const fD3Module = familiarD3Scenario()

interface lineData {
  name: string,
  value: number,
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
  },
]

const barChart1 = new fD3Module.BarChart(
  document.getElementById('svg1'),
  testData
)
barChart1.draw()
