# WCAGify

WCAGify is a simple function for people who need to reference the Web Content Accessibility Guidelines frequently and are tired of copying and pasting.

WCAGify looks up WCAG 2.1 criteria based on a reference number supplied as a string and returns an object with the URL and name etc. It means you don't have to get the criterion name 100% correct as long as you know the reference number. It also adds consistency to your reports by returning the name exactly as it's formatted in the WCAG 2.1 standard.

## Usage

Install WCAGify:

```
npm install wcagify
```

Require WCAGify:
```javascript
const wcagify = require('wcagify')
```

In the following examples, all 4 functions would return the same object.

```javascript
// Function call
wcagify('1.1.1 Non-text Content')
wcagify('1.1.1 nontext content')
wcagify('1.1.1')
wcagify('1.1.1 Potato')

// Return object
{
  criterion: '1.1.1 Non-text Content',
  ref: '1.1.1',
  name: 'Non-text Content',
  link: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
  level: 'A',
  impacts: ['Auditory', 'Visual']
}
```

### Nunjucks macro

You can use WCAGify in your Nunjucks templates using a macro and filter. The macro needs a `string` value to work. For example:

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

#### Installing the Nunjucks macro

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

## Tests

```
npm test
```