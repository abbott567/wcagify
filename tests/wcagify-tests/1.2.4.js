/* global it, describe */
const { expect } = require('chai')
const wcagify = require('../../wcagify')

const expectedResult = {
  criterion: '1.2.4 Captions (Live)',
  ref: '1.2.4',
  name: 'Captions (Live)',
  link: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-live.html',
  level: 'AA',
  impacts: ['Auditory', 'Cognitive']
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