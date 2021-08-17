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
describe('Nunjucks macro', () => {
  it('should render correctly when no params are provided', async () => {
    const expectedOutput = minify(`
      <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/no-params.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should render correctly when only an ID is provided', async () => {
    const expectedOutput = minify(`
      <a id="wcag-1-1-1" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/id-only.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should render correctly when an ID and a single class is provided', async () => {
    const expectedOutput = minify(`
      <a id="wcag-1-1-1" class="link" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/id-and-single-class.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should render correctly when an ID and a multiple classes are provided', async () => {
    const expectedOutput = minify(`
      <a id="wcag-1-1-1" class="link link--small" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/id-and-multiple-classes.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should render correctly when only a single class is provided', async () => {
    const expectedOutput = minify(`
      <a class="link" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/single-class-only.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should render correctly when only multiple classes are provided', async () => {
    const expectedOutput = minify(`
      <a class="link link--small" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
        1.1.1 Non-text Content
      </a>  
    `, minifyOpts)
    const response = await env.render('templates/multiple-classes-only.njk')
    const result = minify(response, minifyOpts)
    expect(result).to.eql(expectedOutput)
  })

  it('should throw an error if nothing is provided', async () => {
    expect(() => { env.render('templates/nothing-provided.njk') }).to.throw(Error)
  })
})
