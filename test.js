const requireDir = require('require-dir')

// Run WCAGify tests
requireDir('./tests/wcagify-tests')

// Run Nunjucks Macro tests
requireDir('./tests/nunjucks-tests')
