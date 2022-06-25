<script lang="ts">
	// on futures with spot:
	// Basis: picture of exchange, name, expiry, apy, fut price, spot price, delta, trade_setup(hover)

	// on perp with spot:
	// Funding: picture of exchange, name, apy, perp price, spot price, delta, trade_setup(hover)

	import type {
		exchangeFutureDataT,
		exchangeSpotDataT,
		FutureWithSpot
	} from 'src/app';
	function calc_apy(bundle: FutureWithSpot): number {
		const days_in_year = 365.25;
		const now = new Date(Date.now());
		if (bundle.future.type == 'future' && bundle.future.expiry) {
			const spot_price = bundle.spot.price;
			const expiration_timestamp = new Date(bundle.future.expiry);
			const expiration = new Date(expiration_timestamp);
			const price_delta = bundle.future.price - spot_price;
			const price_percent_change = price_delta / bundle.future.price;
			const date_days_delta =
				(expiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
			const n = date_days_delta / days_in_year;
			const apy = ((bundle.future.price / spot_price - 1) / n) * 100;
			return apy;
		} else if (bundle.future.type == 'perpetual' && !bundle.future.expiry) {
			console.log('perp');
			return 0;
			// return n;
		} else {
			console.log(bundle.future);
			throw 'Futures contract is not of type future nor perpetual';
		}
	}

	function bundleFutureWithSpot(
		futures: [exchangeFutureDataT],
		spotMarkets: [exchangeSpotDataT]
	): FutureWithSpot[] {
		let bundle: FutureWithSpot[] = [];
		const length = futures.length;
		for (let num = 0; num < length; num++) {
			let future_underlying = futures[num].underlying;
			let foundSpot = spotMarkets.find((spot: exchangeSpotDataT) => {
				console.log(future_underlying + ' ' + spot.underlying);
				return spot.underlying == future_underlying;
			});
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
		const futures: [exchangeFutureDataT] = await fut_resp.json();
		const spotMarkets: [exchangeSpotDataT] = await spot_resp.json();
		console.log(futures);
		console.log(spotMarkets);
		const bundled = bundleFutureWithSpot(futures, spotMarkets);
		console.log(bundled);
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
						fut: {bundle.future.name} with spot: {bundle.spot.name} gives -> {calc_apy(
							bundle
						)}
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
