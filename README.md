# **CMS**velte

A [Svelte](https://svelte.dev/) starter template built with newsroom CMS's in mind. Dynamically create inline graphics based on the placement of `figure` elements with defined *data-chart* attributes.

Inspired by graphics rigs at Bloomberg, The Pudding, and The Wall Street Journal. Created with the help of [Kazi Awal](https://github.com/superKazi).

 *Previously known as tiny-svelte*.

## Local env requirements

- [Node 16 LTS](https://nodejs.org/dist/latest-v16.x/docs/api/)

## Useful docs to features

- [Svelte](https://svelte.dev/docs) as a component framework
- [Vite](https://vitejs.dev/guide/) (with [Rollup](https://rollupjs.org/guide/en/) under the hood) for front-end tooling
- [TailwindCSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) for predefined styles, classes and syntax
- [ArchieML](http://archieml.org/) as a micro-CMS powered by Google Docs
- [ai2html](http://ai2html.org/) for responsive static images and charts
- [D3](https://github.com/d3/d3) + [LayerCake](https://layercake.graphics/) for charting
- [vite-imagetools](https://www.npmjs.com/package/vite-imagetools) for transforming images on the fly in Vite using Sharp
- [svelte-lazy-loader](https://www.npmjs.com/package/svelte-lazy-loader) for effortless lazy loading (created by Sawyer Click, author of CMSvelte)

### Quickstart

Use [degit](https://www.npmjs.com/package/degit) to create a new repo using this one as a template.

```bash
npx degit sawyerclick/cmsvelte my-cmsvelte
```

## Scripts

### `npm run fetch:sheet`

This template has out-of-the-box features to help with consuming data from google sheets. Tag the Google Sheet for your graphic in `./config.json` and make sure you have the ID and sheet ID (gid) filled out correctly. Make sure the share permissions on the sheet are set up so that it is viewable by anyone with the share link. **Note: Don't make it available to edit by anybody!**

Directly import csv's into your .svelte file via [@rollup/plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv)

```js
import data from '$lib/data/data.csv'
```

### `npm run fetch:copy`

Like a lot of newsrooms, this uses a Google Doc and ArchieMl approach to make copy content management easier. The setup is similar to using Sheets data. Make sure the share permissions on the doc are set up so that it is viewable by anyone with the share link. Grab the document ID from the address bar — ...com/document/d/**1IiA5a5iCjbjOYvZVgPcjGzMy5PyfCzpPF-LnQdCdFI0**/edit — and paste it into the respective property in `./config.json`.

[htmlparser2](https://www.npmjs.com/package/htmlparser2) and [html-entities](https://www.npmjs.com/package/html-entities) act as a middle man to catch various tags like `<a>`, `<h*>`, `<ul>` and more.

Import copy into your package like any JSON file

```js
import copy from '$lib/data/copy.json'
```

## Development

```shell
nvm use
npm install
npm run dev
```

Modify content in `src`.

### Adding and removing graphics

CMSvelte's power is dynamic placement unrestrained by content. After build, you can place the `<figure data-chart="CHART-ID">` elements anywhere in the CMS and they will load.

To place graphics, edit `index.html` by adding or removing figures such as this: `<figure data-chart="CHART-ID"></figure>`. 

Then, in `src/main.js`, import your wrapper component up top and add the applicable data to the component array. Every object in this array should have 1) a matching `<figure>` element in index.html and 2) an imported component: 

```js
const components = [
	{
		chartID: 'CHART-ID',
		Component: ImportedComponent,
		props: {}
	},
	{
		chartID: 'CHART-ID2',
		Component: ImportedComponent2,
		props: {}
	},
	{
		chartID: 'CHART-ID3',
		Component: ImportedComponent3,
		props: {}
	},
];
```

*Notes:* 
- High-level props can be passed down here as well using the `props: {}` object passed in MountComponent.

### Writing styles

It's recommended to include the CMS's styles in a development environment and defer to them for fonts and classes to reduce the shipped CSS. This can be done by adding objects to a `cmsFiles` array in `main.js`. This appends any tag and it's listed attributes to the `<head>` while in dev mode. These are not included in production.

Otherwise, this template uses [Tailwind](https://tailwindcss.com/) for out-of-the-box classes that we don't have to think about. By default, these classes are prefixed with `cmsvelte-` to prevent clashing with CMS classes. This can be changed in `tailwind.config.cjs`. 

Write global styles in `app.postcss`. Otherwise, use [Svelte's built-in scroped styling syntax](https://svelte.dev/tutorial/styling).

### Asset management

For image optimization see [vite-imagetools](https://www.npmjs.com/package/vite-imagetools) or [sharp](https://www.npmjs.com/package/sharp).

[Vite's Static Asset Handling](https://vitejs.dev/guide/assets.html) lets us import image and SVG files with several options. 

#### As files

Imports the hashed file name for the asset. For example, `imgUrl` will be `/img.png` during development, and become `/assets/img.2d8efhg.png` in the production build.

```js
import imgUrl from '$lib/assets/img.png'
```

#### As strings

Import raw strings by appending ?raw at the end. This is useful for SVG files.

```js
import imgUrl from '$lib/assets/img.svg?raw'
```

### Useful libs

- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) - Enables body scroll locking (for iOS Mobile and Tablet, Android, desktop Safari/Chrome/Firefox) without breaking scrolling of a target element (eg. modal/lightbox/flyouts/nav-menus).
- [focus-trap](https://www.npmjs.com/package/focus-trap) - Trap focus within a DOM node.
- [fullpage.js](https://www.npmjs.com/package/fullpage.js) - Create fullscreen scrolling websites.
- [gsap](https://www.npmjs.com/package/gsap) - Professional-grade animation for the modern web.
- [journalize](https://www.npmjs.com/package/journalize) - A collection of functions useful for making prose reader friendly.
- [lodash](https://www.npmjs.com/package/lodash) - Various helper functions.
- [slugify](https://www.npmjs.com/package/slugify) - Easily slug a string.
- [@sveltejs/svelte-scroller](https://www.npmjs.com/package/@sveltejs/svelte-scroller) - Svelte-y scrollytelling
- [svelte-select](https://www.npmjs.com/package/svelte-select) - A select/autocomplete component for Svelte apps. With support for grouping, filtering, async and more.
- [swiper](https://www.npmjs.com/package/swiper) - Modern mobile touch slider with hardware accelerated transitions and amazing native behavior.

### Deployment

```bash
npm run build
```

In the project root the command generates a directory called `build`. The built files have names without hashing thanks to [Rollup's config options](https://rollupjs.org/guide/en/#rolluprollup). You only need to embed once as the graphics are generated client-side.

The generated files will likely live in an S3 bucket or other storage site. Update the `base` url in `vite.config.js` to match the final URL of the files. A script to facilitate file uploading to S3 or another service can be easily written in the scripts folder.

```js
base: mode === 'production' ? link : '/',
```

The resulting `build/index.html` file is what can be embedded. It should look something like this, with a `<figure>` element for each graphic, as well as `<script>`s and `<link>`s to external files:

```html
<script type="module" crossorigin src="https://www.site.com/path/to/index.js"></script>
<link rel="modulepreload" href="https://www.site.com/path/to/vendor.js">
<link rel="stylesheet" href="https://www.site.com/path/to/vendor.css">
<link rel="stylesheet" href="https://www.site.com/path/to/index.css">

<figure data-chart="castle-img"></figure>
<figure data-chart="bar-chart"></figure>
<figure data-chart="ai2html"></figure>
```

Scripts and styles should be embedded once anywhere in the CMS. The `<figure data-chart="">` elements can be moved around as needed and do not need to live side-by-side. The `index.js` script will generate the graphics accordingly based on the `data-chart` attribute.

