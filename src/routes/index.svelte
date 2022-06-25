<script lang="ts">
	import type { FuturesMarket, FutureWithSpot, spotMarket } from 'src/app';
	function get_spot_price(market: spotMarket): number {
		let price;
		if (market.last) {
			price = market.last;
		} else if (market.price) {
			price = market.price;
		} else {
			throw 'price and last undefined';
		}
		return price;
	}

	function calc_apy(bundle: FutureWithSpot): number {
		const days_in_year = 365.25;
		const now = new Date(Date.now());
		if (bundle.future.type == 'future' && bundle.future.expiry) {
			const spot_price = get_spot_price(bundle.spot);
			const expiration_timestamp = new Date(bundle.future.expiry);
			const expiration = new Date(expiration_timestamp);
			const price_delta = bundle.future.mark - spot_price;
			const price_percent_change = price_delta / bundle.future.mark;
			const date_days_delta = (expiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
			const n = date_days_delta / days_in_year;
			const apy = ((bundle.future.mark / spot_price - 1) / n) * 100;
			return apy;
		} else if (bundle.future.type == 'perpetual' && !bundle.future.expiry) {
			console.log('perp');
			return 0;
			// return n;
		} else {
			throw 'Futures contract is not of type future nor perpetual';
		}
	}

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
						<!-- Future data: {JSON.stringify(bundle)} -->
						fut: {bundle.future.name} with spot: {bundle.spot.name} gives -> {calc_apy(bundle)}
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
