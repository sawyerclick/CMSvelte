The typical code to embed in a CMS would include your JavaScript and CSS files as well as your [data-cmsvelte] elements. Move visual elements around as needed. CMSvelte supports modular placement since the content lives natively in the page and not as an iframe.

```html
<script type="module" crossorigin src="https://cmsvelte.s3.amazonaws.com/index.js"></script>
<figure data-cmsvelte="castle-img"></figure>
<figure data-cmsvelte="bar-chart"></figure>
<figure data-cmsvelte="ai2html"></figure>
```

