/* global it, describe */
const { expect } = require('chai')
const wcagify = require('../../wcagify')

describe('Errors', () => {
  it('should throw an error if a non-existant ref is used: "1.1.2"', () => {
    expect(() => { wcagify('1.1.2') }).to.throw(Error)
  })

  it('should throw an error if no ref is used: "Non-text Content"', () => {
    expect(() => { wcagify('Non-text Content') }).to.throw(Error)
  })
})
