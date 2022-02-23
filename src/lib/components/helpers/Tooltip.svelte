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
		class="bg-white text-black absolute border border-black rounded-md shadow-md text-left p-2 z-50 pointer-events-none text-base font-regular max-w-[200px] w-auto"
		style="left:{left}px;top:{top}px;"
		bind:clientWidth={tipWidth}
	>
		<slot />
	</div>
{/if}
