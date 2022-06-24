<script lang="ts">
	import type { FuturesMarket, FutureWithSpot, spotMarket } from 'src/app';

	function bundleFutureWithSpot(
		futures: [FuturesMarket],
		spotMarkets: [spotMarket]
	): FutureWithSpot[] {
		let bundle: FutureWithSpot[] = [];
		const length = futures.length;
		for (let num = 0; num < length; num++) {
			let future_underlying = futures[num].underlying;
			let foundSpot = spotMarkets.find(
				(spot: spotMarket) => spot.baseCurrency == future_underlying
			);
			console.log(foundSpot);
			if (foundSpot !== undefined) {
				bundle.push({
					spot: foundSpot,
					future: futures[num]
				});
			}
		}
		return bundle;
	}

	async function getFuturesWithSpotMarkets(): Promise<FutureWithSpot[]> {
		let [fut_resp, spot_resp] = await Promise.all([
			fetch('ftx/futures.json'),
			fetch('ftx/spotMarkets.json')
		]);
		const futures: [FuturesMarket] = await fut_resp.json();
		const spotMarkets: [spotMarket] = await spot_resp.json();
		const bundled = bundleFutureWithSpot(futures, spotMarkets);
		console.log(JSON.stringify(bundled));
		return bundled;
	}
</script>

<div class="h-full w-full">
	<div class="p-16">
		{#await getFuturesWithSpotMarkets()}
			<p>Loading....</p>
		{:then futuresWithSpotMarkets}
			<ul>
				{#each futuresWithSpotMarkets as bundle}
					<li class="py-3">
						<!-- {#if future.type == 'future'} -->
						Future data: {JSON.stringify(bundle)}
						<!-- {/if}
						{#if future.type == 'perpetual'}
							Perp data: {future.name}
						{/if} -->
					</li>
				{/each}
			</ul>
		{:catch error}
			<p style="">{error}</p>
		{/await}
	</div>
</div>
