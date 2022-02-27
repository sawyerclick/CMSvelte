<script>
	// example chart from LayerCake
	// https://layercake.graphics/example/Bar/
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3';

	import Bar from './Bar.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '$lib/data/groups.csv';

	const xKey = 'value';
	const yKey = 'year';

	data.forEach((d) => {
		d[xKey] = +d[xKey];
	});
</script>

<div class="cmsvelte-h-[400px] cmsvelte-w-full cmsvelte-px-4">
	<LayerCake
		padding={{ top: 0, bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner([0.05]).round(true)}
		yDomain={['1979', '1980', '1981', '1982', '1983']}
		xDomain={[0, null]}
		{data}
	>
		<Svg>
			<AxisX gridlines={true} baseline={true} snapTicks={true} />
			<AxisY gridlines={false} />
			<Bar />
		</Svg>
	</LayerCake>
</div>
