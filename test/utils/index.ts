import { expect } from 'chai'
import { flatMap } from '../../src/utils'
describe('test selfmade flatMap', () => {
  const testData = [
    {
      name: '1',
      data: [
        { name: '土地均價', value: 54.21 },
        { name: '透天厝均價', value: 24.86 },
        { name: '區分建物均價', value: 15.33 }
      ]
    },
    {
      name: '2',
      data: [
        { name: '土地均價', value: 54.21 },
        { name: '透天厝均價', value: 24.86 },
        { name: '區分建物均價', value: 15.33 }
      ]
    },
    {
      name: '3',
      data: [
        { name: '土地均價', value: 54.21 },
        { name: '透天厝均價', value: 24.86 },
        { name: '區分建物均價', value: 15.33 }
      ]
    }
  ]

  const result = flatMap(testData, (d) => {
    return d.data.map(dd => dd.value)
  })

  const sum = result.reduce((acc, curr) => {
    let newAcc = acc
    newAcc += curr
    return newAcc
  }, 0)

  it('length of result array is 9', () => {
     expect(9).to.be.equals(result.length)
  })

  it('the sum of the flatMapresult is 283.2', () => {
    expect(283.2).to.be.equals(sum)
  })
})
