
interface ClientBox {
  width: number
  height: number
}

export const getClientRectWidthAndHeight = (svgDom: HTMLOrSVGElement): ClientBox => {
  const box = (svgDom as SVGElement).getBoundingClientRect()
  return {
    width: box.width,
    height: box.height,
  }
}