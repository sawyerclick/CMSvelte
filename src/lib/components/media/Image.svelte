<!-- 
  @component A lazy-loading component that will load images, videos and iframes as the user approaches them. The component checks if a browser has native lazy loading and defers to it if it exists.
 -->
<script>
	import { onMount } from 'svelte';
	import { lazyloader } from '$lib/stores';

	export let lazy = true; // lazy or eager loading, required
	export let alt = ''; // alt text, required
	export let src = ''; // src value, required
	export let classes = ''; // classes to apply to image
	export let width = '100%';
	export let height = '100%';

	let imgEl; // img node
	let loadingExists; // check if native lazy load exists
	let isLoaded = false; // js to track if image is loaded

	// run once when loaded to remove blur
	const load = (e) => {
		// use .includes to be inclusive of URL in new path, if image is local
		if (e.target.src.includes(e.target.dataset.src)) isLoaded = true;
	};

	// check for native lazy Load
	// if it exists, use it and run no code
	onMount(() => {
		loadingExists = 'loading' in HTMLImageElement.prototype;
		if (loadingExists) {
			imgEl.src = imgEl.dataset.src;
			isLoaded = true;
		}
	});

	// start observing when node is available
	$: if (imgEl && !loadingExists) $lazyloader.observe(imgEl);
</script>

<img
	class="m-0 transition-[filter] duration-300 ease {classes}"
	class:blur-sm={!isLoaded}
	src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg=="
	{alt}
	{height}
	{width}
	loading={lazy ? 'lazy' : 'eager'}
	decoding="async"
	draggable="false"
	data-src={src}
	bind:this={imgEl}
	on:load={load}
/>
