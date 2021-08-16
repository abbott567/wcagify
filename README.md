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
  level: 'A'
}
```

## Tests

```
npm test
```