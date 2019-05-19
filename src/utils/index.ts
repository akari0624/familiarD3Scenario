export const flatMap = <T>(arr: T[], accessor: (arr: T) => any[]): any[] => {

  return arr.reduce( (acc, curr) => {
    const level2Arr = accessor(curr)
    return acc.concat(level2Arr)
  }, [])

}