# WCAGify Markdown macro

You can use WCAGify in your Markdown templates using MarkedJS as the renderer.

```markdown
<!-- Markdown code -->
[1.1.1]({wcagify})
```

```html
<!-- Output when compiled -->
<a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html">
  1.1.1 Non-text Content
</a>
```

## Installing the macro


```javascript
const wcagify = require('wcagify')
const marked = require('marked')

// Create your renderer
const renderer = new marked.Renderer()

// Pass the renderer into apply the WCAGify macro
wcagifyMarked(renderer)

// Use your modified rendered with MarkedJS
marked.setOptions({ renderer: renderer })
```