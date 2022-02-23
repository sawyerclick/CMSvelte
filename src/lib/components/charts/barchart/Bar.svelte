<!--
  @component
  Generates an SVG bar chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	/** @type {String} [fill='fill-primary'] - The shape's fill color as a CSS class, optimized for TailWind integration. This is technically optional because it comes with a default value but you'll likely want to replace it with your own fill class. */
	export let fill = 'fill-primary';
</script>

<g class="bar-group">
	{#each $data as d, i}
		<rect
			class="group-rect {fill}"
			data-id={i}
			x={$xScale.range()[0]}
			y={$yGet(d)}
			height={$yScale.bandwidth()}
			width={$xGet(d)}
		/>
	{/each}
</g>
