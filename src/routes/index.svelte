<script lang="ts">
	import type {
		exchangeFutureDataT,
		exchangeSpotDataT,
		futureType,
		FutureWithSpot
	} from 'src/app';
	import TradesTable from '$lib/TradesTable.svelte';
	function bundleFutureWithSpot(
		futures: [exchangeFutureDataT],
		spotMarkets: [exchangeSpotDataT]
	): FutureWithSpot[] {
		let bundle: FutureWithSpot[] = [];
		const length = futures.length;
		console.log(futures);
		for (let num = 0; num < length; num++) {
			let future_underlying = futures[num].underlying;
			let foundSpot = spotMarkets.find((spot: exchangeSpotDataT) => {
				return spot.underlying == future_underlying;
			});
			if (foundSpot !== undefined && foundSpot !== null) {
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
		const bundled = bundleFutureWithSpot(futures, spotMarkets);
		return bundled;
	}

	import { writable } from 'svelte/store';

	const table_type = writable({ type: 'future' as futureType });
</script>

<div class="h-screen w-full">
	<div class="p-16">
		<div class="pb-4">
			Dated Futures (Basis trade)
			<input
				type="radio"
				name="radio-3"
				class="radio radio-secondary"
				bind:group={$table_type.type}
				value={'future'}
				checked
			/>
			<br />
			Collect funding (Perpetuals)
			<input
				type="radio"
				name="radio-3"
				class="radio radio-secondary pb-2"
				bind:group={$table_type.type}
				value={'perpetual'}
			/>
		</div>
		{#await getFuturesWithSpotMarkets()}
			<div class="flex items-center justify-center h-24">
				<svg
					role="status"
					class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			</div>
		{:then futuresWithSpotMarkets}
			<TradesTable
				perp_or_dated={$table_type.type}
				propValue={futuresWithSpotMarkets}
			/>
		{:catch error}
			<p style="">{error}</p>
		{/await}
	</div>
</div>
