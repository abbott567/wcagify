const slugify = require('slugify')
const criteria = require('./criteria')

const wcagpath = 'https://www.w3.org/WAI/WCAG22/Understanding'

function wcagify (string) {
  const notFound = new Error(`${string}: No WCAG reference found`)
  const wcagMatch = string.match(/(\d*\.\d*\.\d*)/)

  if (!wcagMatch) throw notFound

  const ref = wcagMatch[1]
  let name, slug, level, impacts

  criteria.forEach(criterion => {
    if (criterion.ref === ref) {
      name = criterion.name
      slug = slugify(criterion.name, { lower: true, strict: true })
      level = criterion.level
      impacts = criterion.impacts
    }
  })

  if (name === undefined) throw notFound

  return {
    criterion: `${ref} ${name}`,
    ref,
    name,
    link: `${wcagpath}/${slug}.html`,
    level,
    impacts
  }
}

module.exports = wcagify
