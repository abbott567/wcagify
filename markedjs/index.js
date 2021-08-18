const wcagify = require('../wcagify')

function wcagifyMarked (renderer) {
  renderer.link = function (href, title, text) {
    const iswcag = href.match(/{wcagify}/)
    if (iswcag) {
      const wcag = wcagify(text)
      const titleAttr = (title && title.match(/{title}/)) ? `title="${wcag.criterion}"` : ''
      return `<a href="${wcag.link}"${titleAttr}">${wcag.criterion}</a>`
    } else {
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}>${text}</a>`
    }
  }
}

module.exports = wcagifyMarked
