/* global it, describe */
const { expect } = require('chai')
const wcagifyMarked = require('../../markedjs')
const marked = require('marked')
const minify = require('html-minifier').minify

// Configure HTML Minfier for tests
const minifyOpts = { collapseWhitespace: true }

const renderer = new marked.Renderer()
wcagifyMarked(renderer)
marked.setOptions({ renderer: renderer })

describe('MarkedJS extended syntax', () => {
  // Block tests
  it('should render correctly as a block when ref and name match perfectly [1.1.1 Non-text Content]', async () => {
    const expectedResult = minify('<p><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a></p>', minifyOpts)
    const test = minify(marked('[1.1.1 Non-text Content]({wcagify})'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly with a title, as a block when using ref only [1.1.1]', async () => {
    const expectedResult = minify('<p><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html" title="1.1.1 Non-text Content">1.1.1 Non-text Content</a></p>', minifyOpts)
    const test = minify(marked('[1.1.1 Non-text Content]({wcagify} "{title}")'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly without a title, as a block when using ref only: [1.1.1]', async () => {
    const expectedResult = minify('<p><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a></p>', minifyOpts)
    const test = minify(marked('[1.1.1]({wcagify})'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly as a block when ref is a match but name is close: [1.1.1 nontext content]', async () => {
    const expectedResult = minify('<p><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a></p>', minifyOpts)
    const test = minify(marked('[1.1.1 nontext content]({wcagify})'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly as a block when ref is a match but name is nonsense: [1.1.1 potato]', async () => {
    const expectedResult = minify('<p><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a></p>', minifyOpts)
    const test = minify(marked('[1.1.1 potato]({wcagify})'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly with a title, as a block when link is not a wcag link', async () => {
    const expectedResult = minify('<p><a href="https://en.wikipedia.org/wiki/Potato" title="Potatoes">Potatoes</a></p>', minifyOpts)
    const test = minify(marked('[Potatoes](https://en.wikipedia.org/wiki/Potato "Potatoes")'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly without a title, as a block when link is not a wcag link', async () => {
    const expectedResult = minify('<p><a href="https://en.wikipedia.org/wiki/Potato">Potatoes</a></p>', minifyOpts)
    const test = minify(marked('[Potatoes](https://en.wikipedia.org/wiki/Potato)'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  // Inline tests
  it('should render correctly inline when ref and name match perfectly [1.1.1 Non-text Content]', async () => {
    const expectedResult = minify('<p>this fails <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a> of WCAG 2.1</p>', minifyOpts)
    const test = minify(marked('this fails [1.1.1 Non-text Content]({wcagify}) of WCAG 2.1'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly with a title, inline when using ref only: [1.1.1]', async () => {
    const expectedResult = minify('<p>this fails <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html" title="1.1.1 Non-text Content">1.1.1 Non-text Content</a> of WCAG 2.1</p>', minifyOpts)
    const test = minify(marked('this fails [1.1.1]({wcagify} "{title}") of WCAG 2.1'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly without a title, inline when using ref only: [1.1.1]', async () => {
    const expectedResult = minify('<p>this fails <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a> of WCAG 2.1</p>', minifyOpts)
    const test = minify(marked('this fails [1.1.1]({wcagify}) of WCAG 2.1'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly inline when ref is a match but name is close: [1.1.1 nontext content]', async () => {
    const expectedResult = minify('<p>this fails <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a> of WCAG 2.1</p>', minifyOpts)
    const test = minify(marked('this fails [1.1.1 nontext content]({wcagify}) of WCAG 2.1'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly inline when ref is a match but name is nonsense: [1.1.1 potato]', async () => {
    const expectedResult = minify('<p>this fails <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">1.1.1 Non-text Content</a> of WCAG 2.1</p>', minifyOpts)
    const test = minify(marked('this fails [1.1.1 potato]({wcagify}) of WCAG 2.1'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly with a title, inline when link is not a wcag link', async () => {
    const expectedResult = minify('<p>Read more about <a href="https://en.wikipedia.org/wiki/Potato" title="Potatoes">potatoes</a></p>', minifyOpts)
    const test = minify(marked('Read more about [potatoes](https://en.wikipedia.org/wiki/Potato "Potatoes")'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })

  it('should render correctly without a title, inline when link is not a wcag link', async () => {
    const expectedResult = minify('<p>Read more about <a href="https://en.wikipedia.org/wiki/Potato">potatoes</a></p>', minifyOpts)
    const test = minify(marked('Read more about [potatoes](https://en.wikipedia.org/wiki/Potato)'), minifyOpts)
    expect(test).to.equal(expectedResult)
  })
})
