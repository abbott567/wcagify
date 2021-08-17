# WCAGify Nunjucks Macro

You can use wCAGify in your Nunjucks templates using a macro and filter. The macro needs a `string` value to work. For example:

```javascript
// Nunjucks code
{{ wcagify('1.1.1') }}
```

```html
<!-- Output when compiled -->
<a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
  1.1.1 Non-text Content
</a>
```

You can also pass in an object to set an ID and classes as optional parameters. For example:

```javascript
// Nunjucks code
{{ wcagify('1.1.1', {
  id: 'wcag-ref-1',
  class: 'link link--small'
}) }}
```

```html
<!-- Output when compiled -->
<a id="wcag-ref-1" class="link link--small" href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
  1.1.1 Non-text Content
</a>
```

## Installing the macro

First, expose the location of the macro to your Nunjucks environment. An example `server.js` file might look something like the following:

```javascript
const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')

const app = express()

const paths = [
  ...
  // Add a link to the Nunjucks folder in the WCAGify module
  path.join(__dirname, 'node_modules', 'wcagify', 'nunjucks')
]

const env = nunjucks.configure(paths, { express: app, })
```

Next, expose the WCAGify function to Nunjucks as a simple filter. This wont make the macro work yet, this functionality just means we have the ability to call WCAGify from inside the macro. For example `{{'1.1.1'|wcagify}}`. This would return an object, not the formatted anchor tag we need.

```javascript
const wcagify = require('wcagify')
env.addFilter('wcagify', wcagify)
```

Lastly, import the macro into your Nunjucks template and use it. For example:

```javascript
{%- from 'wcagify.njk' import wcagify -%}
{{ wcagify('1.1.1', {
  id: 'wcag-ref-1',
  class: 'link link--small'
}) }}
```
