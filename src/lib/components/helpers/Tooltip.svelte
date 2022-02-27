<script>
	export let tipData = false;
	export let margin = 10;

	let x, y, pageWidth, tipWidth;

	const mousemove = (e) => {
		if (!tipData) return;
		x = e.pageX;
		y = e.pageY;
	};

	// fixed positioning calculation
	$: left = x + margin <= pageWidth / 2 ? x + margin : x - margin - tipWidth;
	$: top = y + margin;
</script>

<svelte:window on:mousemove={mousemove} bind:innerWidth={pageWidth} />

{#if tipData}
	<div
		class="cmsvelte-bg-white cmsvelte-text-black cmsvelte-absolute cmsvelte-border cmsvelte-border-black cmsvelte-rounded-md cmsvelte-shadow-md cmsvelte-text-left cmsvelte-p-2 cmsvelte-z-50 cmsvelte-pointer-events-none cmsvelte-text-base cmsvelte-font-regular cmsvelte-max-w-[200px] cmsvelte-w-auto"
		style="left:{left}px;top:{top}px;"
		bind:clientWidth={tipWidth}
	>
		<slot />
	</div>
{/if}
