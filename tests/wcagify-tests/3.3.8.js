/* global it, describe */
const { expect } = require('chai')
const wcagify = require('../../wcagify')

const expectedResult = {
  criterion: '3.3.8 Accessible Authentication (Minimum)',
  ref: '3.3.8',
  name: 'Accessible Authentication (Minimum)',
  link: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html',
  level: 'AA',
  impacts: ['Cognitive']
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
