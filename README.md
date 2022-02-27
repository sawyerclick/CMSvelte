# Tiny Svelte
A [Svelte](https://svelte.dev/) starter template built with newsrooms in mind. It dynamically creates inline graphics based on the placement of `figure` elements with defined *data-chart* attributes.

Inspired by graphics rigs at Bloomberg, The Pudding, and The Wall Street Journal. Created with the help of [Kazi Awal](https://github.com/superKazi).

## Local env requirements

- [Node 16 LTS](https://nodejs.org/dist/latest-v16.x/docs/api/)

## Useful docs to features

- [Svelte](https://svelte.dev/docs) as a component framework
- [Vite](https://vitejs.dev/guide/) (with [Rollup](https://rollupjs.org/guide/en/) under the hood) for front-end tooling
- [TailwindCSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) for predefined styles, classes and syntax
- [ArchieML](http://archieml.org/) as a micro-CMS powered by Google Docs
- [ai2html](http://ai2html.org/) for responsive static images and charts
- [D3](https://github.com/d3/d3) + [LayerCake](https://layercake.graphics/) for charting

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
```
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

This template uses [Tailwind](https://tailwindcss.com/) for out-of-the-box classes that we don't have to think about. If you want to write global styles, do so in `app.postcss`. Otherwise, use [Svelte's built-in scroped styling syntax](https://svelte.dev/tutorial/styling).

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

### Deploy

```bash
npm run build
```

In the project root the command generates a directory called `build`. The built files have names without hashing thanks to [Rollup's config options](https://rollupjs.org/guide/en/#rolluprollup). You only have to embed once as the graphics are generated client-side.

The generated files will likely live in an S3 bucket or other storage site. If that's the case, update the `base` url in `vite.config.js` to match the URL when in production mode.

```js
base: mode === 'production' ? link : '/',
```


