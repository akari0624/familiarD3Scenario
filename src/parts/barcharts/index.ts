import {
  select as D3Select,
  Selection,
  scaleBand,
  ScaleBand,
  scaleOrdinal,
  ScaleOrdinal,
  max,
  schemeCategory10,
  line,
  Line,
  scaleLinear,
  ScaleLinear,
  scaleTime,
  timeParse,
  timeFormat,
  axisRight,
  Axis,
  axisBottom,
  axisLeft,
  mouse,
  BaseType,
  timeout,
} from 'd3'
import { marginInPX, BarChartDataType, LinePointDataType, BarCategoryDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'
import { flatMap } from '../../utils'

function drawBottomXAxis(instance: BarCharts): void {
  const { svgHeight, d3ishSVG, xScaleBandG, margin, isFirstDraw } = instance

  if (isFirstDraw) {
    d3ishSVG
      .append('g')
      .attr('class', 'x_axis')
      .attr('transform', `translate(${margin.left}, ${svgHeight - margin.bottom})`)
      .call(axisBottom(xScaleBandG))
  }else {
    d3ishSVG
    .select('.x_axis')
    .attr('transform', `translate(${margin.left}, ${svgHeight - margin.bottom})`)
    .call(axisBottom(xScaleBandG))
  }
}

function drawLeftYAxis(instance: BarCharts): void {
  const { yScaleLinear, d3ishSVG, isFirstDraw, margin } = instance

  if (isFirstDraw) {
    d3ishSVG
      .append('g')
      .attr('class', 'y_axis_left')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(yScaleLinear).ticks(5))
      .append('text')
      .style('fill', 'steelblue') // fill the text with the colour black
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('案件數')
  }else {
    d3ishSVG.select('.y_axis_left').call(axisLeft(yScaleLinear).ticks(5))
  }
}



const wrapRect_G_ClassName = '.state'
const wrapRect_G_ClassNameWithoutDot = wrapRect_G_ClassName.substring(
  1,
  wrapRect_G_ClassName.length
)

const  addClickCBOnNewEnterG = (newEnterGsThatWrapTheRects: Selection<SVGRectElement, BarCategoryDataType, SVGGElement, BarChartDataType>, cb: (data: BarCategoryDataType) => void) => {

  if (cb) {
    newEnterGsThatWrapTheRects.on('click', cb)
  }
}

export class BarCharts {
  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  data: BarChartDataType[]
  margin: marginInPX = { top: 40, right: 40, bottom: 40, left: 40 }
  svgWidth: number
  svgHeight: number

  xScaleBandG: ScaleBand<string>
  xScaleBandRect: ScaleBand<string>

  yScaleLinear: ScaleLinear<number, number>
  yMaxScaleLinear: ScaleLinear<number, number>

  tColors: ScaleOrdinal<string, string>
  dataBinds: Selection<BaseType, BarChartDataType, SVGGElement, any>
  newEnterGsThatWrapTheRects: Selection<
    SVGGElement,
    BarChartDataType,
    SVGGElement,
    BarChartDataType
  >
  theNewEnterBarsRects: Selection<
    SVGRectElement,
    BarCategoryDataType,
    SVGGElement,
    BarChartDataType
  >
  isFirstDraw: boolean = true
  onRectClick: (data: BarCategoryDataType) => void
  categoryLength: number


  constructor(svgDom: HTMLOrSVGElement) {
    this.svgDom = svgDom
    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height
  }

  initD3ishSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, BarChartDataType>(this
        .svgDom as any)
    }

    this.d3ishSVG
    .attr('width', this.svgWidth)
    .attr('height', this.svgHeight)
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  }

  getTheD3ishSVG() {
    return this.d3ishSVG
  }
  /*
  arrangeLineChartData = (arrangeCB: (data: BarChartDataType) => LinePointDataType[]) => {
    this.lineChartData = arrangeCB(this.data)
  }
*/
  setMargins(pMargins: marginInPX) {
    this.margin = pMargins
  }

  _prepareAxisAndScale = () => {
    const { svgWidth: width, svgHeight: height, data, margin } = this

    //  給g用的
    this.xScaleBandG = scaleBand()
    // range 參數array的第二個數  是要給入  所有g最後會用到多少空間，而不是一個g會用到多少空間
    // d3會自己這次進來的資料應該有多少個g, 然後d3會去除出各個g應該分配多少寬度
      .range([0, width - margin.left - margin.right])
      .padding(0.1)
      .domain(data.map(d => d.date))

     // 給rect用的  一個g裡可能包多個rect i.e. grouped bar chart
    const oneData = data.slice(0, 1)
    const forXScaleDomain  = flatMap(oneData, d => d.categories.map(c => c.name))
    this.xScaleBandRect = scaleBand<string>()
    // 同理 這裡range 參數array的第二個數  是要給入  所有rect最後會用到多少空間，而不是一個rect會用到多少空間
    // d3會自己這次進來的資料應該有多少個rect, 然後d3會去除出各個g應該分配多少寬度
    // 所以這個array裡的第二個參數等於是這一次一塊g的寬度
      .range([0, this.xScaleBandG.bandwidth()])
    // 給入這次有的category name
      .domain(forXScaleDomain)

    this.yScaleLinear = scaleLinear()
      .range([height - margin.top, 0])
      .domain([0, max(flatMap(data, d => d.categories.map(c => c.value)))])

    this.tColors = scaleOrdinal(schemeCategory10).range([
      '#FFF279',
      '#FFFF00',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ])

  }

  bindDataToG() {
    this.dataBinds = this.d3ishSVG
      .selectAll(wrapRect_G_ClassName)
      .data(this.data)
  }

  enter_drawNewGsThatToWrapTheRect() {
    // 包住 rect的 g
    this.newEnterGsThatWrapTheRects = this.dataBinds
      .enter()
      .append('g')
      .attr('class', wrapRect_G_ClassNameWithoutDot)
      .attr('transform', (d: BarChartDataType) => {
        const result = this.xScaleBandG(d.date)
        return `translate( ${result + this.margin.left}, 0)`
      })
  }

  setOnRectClick(onClickFromUser: (data: BarCategoryDataType) => void) {
    this.onRectClick = onClickFromUser
  }


  drawNewEnterRectInTheGs = () => {
    this.theNewEnterBarsRects = this.newEnterGsThatWrapTheRects
      .selectAll('rect')
      .data(d => d.categories)
      .enter()
      .append('rect')
      .attr('width', this.xScaleBandG.bandwidth() / this.categoryLength)
      .attr('x', d => this.xScaleBandRect(d.name))
      .attr('y', this.svgHeight - this.margin.top)
      .style('fill', d => this.tColors(d.name)
      )
      .on('click', this.onRectClick)
  }

  setRectTransition = () => {
    this.theNewEnterBarsRects
      .transition()
      .duration(1000)
      //由下往上長
      .attr('y', d  => this.yScaleLinear(d.value))
      .attr(
        'height',
        d => this.svgHeight - this.margin.top - this.yScaleLinear(d.value)
      )
  }

  update_updateExistedBar = () => {

    // 移動g
    this.dataBinds.attr('transform', d => {
      const result = this.xScaleBandG(d.date)
      return `translate( ${result + this.margin.left}, 0 )`
    })

    // update not enter rect
    this.dataBinds
    .selectAll('rect')
    .data(d => d.categories)
    .style('fill', d =>
      this.tColors(d.name)
    ) .transition()
    .duration(1000)
    .attr('width', (this.xScaleBandG.bandwidth() / this.categoryLength))
    .attr('x', d  => this.xScaleBandRect(d.name))
    //由下往上長
    .attr('y', d => this.yScaleLinear(d.value))
    .attr(
      'height',
      d => this.svgHeight - this.margin.top -  this.yScaleLinear(d.value)
    )
  }

  exit_removeNoDataCorrespondedBar = () => {
    //  再給資料然後 再比對rect一次  刪掉沒有資料對應的rect
    const existingRect =  this.dataBinds.selectAll('rect').data(d => d.categories).exit()

    existingRect.transition()
     .duration(1200)
     .attr('y', this.svgHeight- this.margin.top)
     .attr(
       'height',
       0,
     )

    existingRect.on('click', null)
    timeout(() => {
      existingRect.remove()
    }, 1500)

     //刪掉沒有資料對應的g
    this.dataBinds.exit().remove()
  }

  draw = (data: BarChartDataType[]) => {

    this.data = data
    this.categoryLength = data[0].categories.length

    this._prepareAxisAndScale()

    drawBottomXAxis(this)
    drawLeftYAxis(this)
    if (this.isFirstDraw) {
      this.isFirstDraw = false
    }

    this.bindDataToG()

    this.exit_removeNoDataCorrespondedBar()

    this.enter_drawNewGsThatToWrapTheRect()
    this.drawNewEnterRectInTheGs()
    this.setRectTransition()

    this.update_updateExistedBar()

    addClickCBOnNewEnterG(this.theNewEnterBarsRects, this.onRectClick)

  }

  onSVGDestroy = () => {
    this.d3ishSVG.selectAll('g').on('click', null)
  }
}
