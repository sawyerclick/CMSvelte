import './app.postcss';

import Fieri from '$lib/assets/fieri.jpeg?w=650&webp';
import FieriSrcset from '$lib/assets/fieri.jpeg?w=300;600;900&webp&srcset';

// viz components
import BarChart from '$lib/components/charts/barchart/index.svelte';
import AI2HTML from '$lib/components/media/ai2html/ai2html.svelte';
import Image from '$lib/components/media/Image.svelte';

const components = [
	{
		chartID: 'fieri-img',
		Component: Image,
		props: {
			loading: 'lazy',
			alt: 'A picture of Flavortown Mayor Guy Fieri',
			src: Fieri,
			srcset: FieriSrcset,
			width: '650px',
			classes: 'mx-auto'
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
	const target = document.querySelector(`figure[data-chart="${chartID}"]`);
	mountComponent({
		Component,
		target,
		props
	});
});
