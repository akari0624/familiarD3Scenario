import React, { RefObject, useMemo, useRef, useLayoutEffect } from 'react'
import { BarCharts as F_LibBarchart } from '../parts/barcharts'
import { BarChartDataType } from '../types'

const barTestData2: BarChartDataType[] = [
  {
    date: '10705',
    categories: [
      { date: '10705', name: '土地+建物的案件量', value: 100 },
      { date: '10705', name: '建物的案件量', value: 20 }
    ]
  },
  {
    date: '10706',
    categories: [
      { date: '10706', name: '土地+建物的案件量', value: 250 },
      { date: '10706', name: '建物的案件量', value: 40 }
    ]
  },
  {
    date: '10707',
    categories: [
      { date: '10707', name: '土地+建物的案件量', value: 120 },
      { date: '10707', name: '建物的案件量', value: 20 }
    ]
  },
  {
    date: '10708',
    categories: [
      { date: '10708', name: '土地+建物的案件量', value: 20 },
      { date: '10708', name: '建物的案件量', value: 40 }
    ]
  }
]

interface Props {
  parentRef: RefObject<HTMLElement>
}

const BarchartReactComponent: React.FunctionComponent<Props> = ({
  parentRef
}) => {
  const wrapperRef = parentRef.current

  const svgRefHolder = useRef<SVGSVGElement>(null)

  // const memo = useMemo(() => {
  //   // const bcRect = wrapperRef.getBoundingClientRect()

  //   const bcRect = {
  //     width: '300px',
  //     height: '300px'
  //   }
  //   let barChart
  //   if (svgRefHolder.current) {
  //     barChart = new F_LibBarchart(svgRefHolder.current)
  //   }
  //   console.log('execute')
  //   return {
  //     barChart,
  //     width: bcRect.width,
  //     height: bcRect.height
  //   }
  // }, [wrapperRef, svgRefHolder])
  const memo = {
    width: '300px',
    height: '300px'
  }
// useLayoutEffect this hook fires synchronously after all DOM mutations  
// https://github.com/facebook/react/issues/14387#issuecomment-444504934
  useLayoutEffect(() => {
    const barChart = new F_LibBarchart(svgRefHolder.current)

    barChart.initD3ishSVG()
    barChart.draw(barTestData2)
  }, [wrapperRef])

  return <svg height={memo.height} width={memo.width} ref={svgRefHolder} />
}

export default BarchartReactComponent
