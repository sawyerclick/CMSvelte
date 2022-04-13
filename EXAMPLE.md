The typical code to embed in a CMS would include your JavaScript and CSS files as well as your [data-chart] elements. Move visual elements around as needed. CMSvelte is modular by default since the content lives natively in the page and not as an iframe.

```html
<script type="module" crossorigin src="https://cmsvelte.s3.amazonaws.com/index.js"></script>
<link rel="modulepreload" href="https://cmsvelte.s3.us-east-2.amazonaws.com/vendor.js" />
<link rel="stylesheet" href="https://cmsvelte.s3.us-east-2.amazonaws.com/vendor.css" />
<link rel="stylesheet" href="https://cmsvelte.s3.us-east-2.amazonaws.com/index.css" />
<figure data-chart="castle-img"></figure>
<figure data-chart="bar-chart"></figure>
<figure data-chart="ai2html"></figure>
```

