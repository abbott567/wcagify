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

### Nunjucks filter
You can use WCAGify in your Nunjucks templates using a filter. The filter needs a `string` value to work. For example:

```javascript
{% set issue = '1.1.1'|wcagify %}

{{issue.criterion}} // 1.1.1 Non-text Content
{{issue.name}} // Non-text Content
{{issue.ref}} // 1.1.1
{{issue.url}} // https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
```

#### Installing the Nunjucks filter

You need to expose the WCAGify function to Nunjucks as a simple filter. This wont make the macro work, this functionality just means we have the ability to call WCAGify from inside Nunjucks templates and return the object which you can use for your own Nunjucks templates. For example `{{'1.1.1'|wcagify}}`. If you need to return formatted HTML, use the supplied Macro or write your own.

An example `server.js` might look something like the following:

```javascript
const nunjucks = require('nunjucks')
const express = require('express')

const app = express()

const env = nunjucks.configure('src', { express: app, })

// Add the Nunjucks filter
const wcagify = require('wcagify')
env.addFilter('wcagify', wcagify)
```

### Nunjucks macro

There is an included macro if you don't want to template your own Nunjucks. It needs a `string` value to work. For example:

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

First, expose the location of the macro to your Nunjucks environment, and then make sure you've passed in the filter. The macro wont work without the filter as it calls it from inside the template. An example `server.js` file might look something like the following:

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

// Add the Nunjucks filter
const wcagify = require('wcagify')
env.addFilter('wcagify', wcagify)

```

Import the macro into your Nunjucks template and use it. For example:

```javascript
// Imports from the .njk file from the node_modules path
{%- from 'wcagify.njk' import wcagify -%}

{{ wcagify('1.1.1', {
  id: 'wcag-ref-1',
  class: 'link link--small'
}) }}
```

### Markdown macro

You can use WCAGify in your Markdown templates using [MarkedJS](https://www.npmjs.com/package/marked) as the renderer.

```markdown
<!-- Markdown code -->
[1.1.1]({wcagify})
```

```html
<!-- Output when compiled -->
<a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
  1.1.1 Non-text Content
</a>
```

#### Installing the Markdown macro

```javascript
const wcagifyMarked = require('wcagify/markedjs')
const marked = require('marked')

// Create your renderer
const renderer = new marked.Renderer()

// Pass the renderer into apply the WCAGify macro
wcagifyMarked(renderer)

// Use your modified rendered with MarkedJS
marked.setOptions({ renderer: renderer })
```

## Tests

```
npm test
```