/* global it, describe */
const { expect } = require('chai')
const wcagify = require('../../wcagify')

const expectedResult = {
  criterion: '1.3.5 Identify Input Purpose',
  ref: '1.3.5',
  name: 'Identify Input Purpose',
  link: 'https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html',
  level: 'AA',
  impacts: ['Cognitive', 'Motor', 'Visual']
}

describe(expectedResult.criterion, () => {
  it(`should be level ${expectedResult.level}`, () => {
    const test = wcagify(expectedResult.criterion)
    expect(test.level).to.equal(expectedResult.level)
  })

  it(`should impact: "${expectedResult.impacts}"`, () => {
    const test = wcagify(expectedResult.criterion)
    expect(test.impacts).to.eql(expectedResult.impacts)
  })

  it(`should work with a correct reference and name: "${expectedResult.criterion}"`, () => {
    const test = wcagify(expectedResult.criterion)
    expect(test.criterion).to.equal(expectedResult.criterion)
    expect(test.ref).to.equal(expectedResult.ref)
    expect(test.name).to.equal(expectedResult.name)
    expect(test.link).to.equal(expectedResult.link)
  })

  it(`should work with a correct reference only: "${expectedResult.ref}"`, () => {
    const test = wcagify(expectedResult.ref)
    expect(test.criterion).to.equal(expectedResult.criterion)
    expect(test.ref).to.equal(expectedResult.ref)
    expect(test.name).to.equal(expectedResult.name)
    expect(test.link).to.equal(expectedResult.link)
  })

  it(`should work with a correct reference despit a nonsense name: "${expectedResult.ref} potato"`, () => {
    const test = wcagify(`${expectedResult.ref} potato`)
    expect(test.criterion).to.equal(expectedResult.criterion)
    expect(test.ref).to.equal(expectedResult.ref)
    expect(test.name).to.equal(expectedResult.name)
    expect(test.link).to.equal(expectedResult.link)
  })
})
