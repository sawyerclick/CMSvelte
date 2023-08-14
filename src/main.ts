// create images on-the-fly with vite-imagetools
// https://www.npmjs.com/package/vite-imagetools
import ImagePlaceholder from '$lib/assets/san-felipe-del-morro-castle.jpg?w=100&png&blur=5';
import ImageSrcset from '$lib/assets/san-felipe-del-morro-castle.jpg?w=300;600;900&format=webp&as=srcset';
import ImageSrc from '$lib/assets/san-felipe-del-morro-castle.jpg?w=650&format=jpg';
// viz components
import BarChart from '$lib/components/charts/barchart/index.svelte';
import AI2HTML from '$lib/components/media/ai2html/ai2html.svelte';
// https://www.npmjs.com/package/svelte-lazy-loader
import { Image } from 'svelte-lazy-loader';

import './app.postcss';

// an array of our components, mapped to match the <figure data-cmsvelte=""> elements in index.html
const components = [
	{
		chartID: 'castle-img',
		Component: Image,
		props: {
			loading: 'lazy',
			alt: 'A few tourists walk up the lawn to the side of the old stone San Felipe del Morro Castle in San Juan, Puerto Rico',
			placeholder: ImagePlaceholder,
			src: ImageSrc,
			srcset: ImageSrcset,
			width: '650px',
			classes:
				'cmsvelte-mx-auto cmsvelte-block cmsvelte-w-full cmsvelte-h-auto cmsvelte-max-w-[720px]'
		}
	},
	{
		chartID: 'bar-chart',
		Component: BarChart
	},
	{
		chartID: 'ai2html',
		Component: AI2HTML
	}
];

// add objects in the cmsFiles array to mimic styles and scripts in your CMS while developing. These scripts aren't included in production mode.
const cmsFiles: { tag: string; attributes: object } = [
	// {
	// 	tag: 'link',
	// 	attributes: {
	// 		href: 'https://www.site.com/path/to.css',
	// 		rel: 'stylesheet',
	// 		type: 'text/css'
	// 	}
	// },
	// {
	// 	tag: 'script',
	// 	attributes: {
	// 		src: 'https://www.site.com/path/to.js',
	// 		async: 'true',
	// 		type: 'text/javascript'
	// 	}
	// }
];

// add files in the format below to
if (import.meta.env.DEV && cmsFiles.length > 0) {
	const head = document.head;

	cmsFiles.forEach(({ tag, attributes }) => {
		const el = document.createElement(tag);

		Object.entries(attributes).forEach(([key, value]) => (el[key] = value));

		head.appendChild(el);
	});
}

function mountComponent({
	Component,
	id,
	selector = `#svelte-${id}`,
	target = document.querySelector(selector),
	props: clientProps = {},
	...svelteOptions
}) {
	if (!Component) {
		console.trace('Missing required parameter: Component');
		return null;
	}
	if (!target) {
		console.trace('⚠️ No element found for svelte component:', selector);
		return null;
	}
	const props = {
		...clientProps
		// ...inlineProps,
	};
	return new Component({
		target,
		props,
		...svelteOptions
	});
}

components.forEach((comp) => {
	const { chartID, Component, props } = comp;
	const target = document.querySelector(`[data-cmsvelte="${chartID}"]`);
	mountComponent({
		Component,
		target,
		props
	});
});
