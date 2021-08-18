/* global describe, it */
const wcagify = require('../../wcagify')
const minify = require('html-minifier').minify
const { expect } = require('chai')
const nunjucks = require('nunjucks')

// Configure HTML Minfier for tests
const minifyOpts = { collapseWhitespace: true }

// Configure Nunjucks env for tests
const paths = ['nunjucks', 'tests/nunjucks-tests']
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(paths))

// Add WCAGify filter to Nunjucks env
env.addFilter('wcagify', wcagify)

// Test Nunjucks Macro
describe('Nunjucks filter', () => {
  it("should render correctly when correct ref is provided: {{'1.1.1'|wcagify}}", async () => {
    const expectedOutput = minify('{"criterion":"1.1.1 Non-text Content","ref":"1.1.1","name":"Non-text Content","link":"https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html","level":"A","impacts":["Auditory","Visual"]}', minifyOpts)
    const response = await minify(env.renderString("{{'1.1.1'|wcagify|dump|safe}}"), minifyOpts)
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it("should throw an error if incorrect ref is provided: {{'1.1.2'|wcagify}}", async () => {
    expect(() => { env.renderString("{{'1.1.2'|wcagify|dump|safe}}") }).to.throw(Error)
  })

  it("should throw an error if no ref is provided: {{''|wcagify}}", async () => {
    expect(() => { env.renderString("{{''|wcagify|dump|safe}}") }).to.throw(Error)
  })
})
