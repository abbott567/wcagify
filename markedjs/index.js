const wcagify = require('../wcagify')

function wcagifyMarked (renderer) {
  renderer.link = function (href, title, text) {
    const iswcag = href.match(/{wcagify}/)
    if (iswcag) {
      const wcag = wcagify(text)
      return `<a href="${wcag.link}">${wcag.criterion}</a>`
    }
  }
}

module.exports = wcagifyMarked
