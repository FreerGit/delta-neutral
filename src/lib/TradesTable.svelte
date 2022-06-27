<script lang="ts">
	import type {
		datedFutureRowType,
		exchangeFutureDataT,
		futureType,
		marketBundle,
		perpRowType
	} from 'src/app';
	import { onMount } from 'svelte';
	import PerpRow from './PerpRow.svelte';
	import DatedFutureRow from './DatedFutureRow.svelte';

	export let propValue: marketBundle[];

	export let perp_or_dated: futureType;

	function calc_apy(bundle: exchangeFutureDataT): [number, number] {
		const days_in_year = 365.25;
		const now = new Date(Date.now());
		if (bundle.type == 'future' && bundle.expiry) {
			const spot_price = bundle.index;
			const expiration_timestamp = new Date(bundle.expiry);
			const expiration = new Date(expiration_timestamp);
			const price_delta = bundle.mark - spot_price;
			const price_percent_change = price_delta / bundle.mark;
			const date_days_delta =
				(expiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
			const n = date_days_delta / days_in_year;
			const apy = ((bundle.mark / spot_price - 1) / n) * 100;
			return [price_percent_change, apy];
		} else {
			throw 'Not an dated future or expiry did not exist';
		}
	}

	function splitByTradeIdea(
		bundles: marketBundle
	): [datedFutureRowType[], perpRowType[]] {
		let dated_futures: datedFutureRowType[] = [];
		let perps: perpRowType[] = [];
		Array.from(bundles.futures).forEach((bundle: exchangeFutureDataT) => {
			if (bundle.type == 'future') {
				const [delta, apy] = calc_apy(bundle);
				dated_futures.push({
					exchange: bundle.exchange,
					name: bundle.name,
					expiry: bundle.expiry,
					apy: apy,
					mark: bundle.mark,
					index: bundle.index,
					delta: delta
				} as datedFutureRowType);
			} else if (bundle.type == 'perpetual') {
				let freq = 'hourly';
				switch (bundle.exchange) {
					case 'ftx':
						freq = 'hourly';
						break;
					case 'binance':
						freq = '8 hours';
						break;
					case 'bybit':
						freq = '8 hours';
						break;
				}
				perps.push({
					exchange: bundle.exchange,
					name: bundle.name,
					funding_rate: bundle.funding_rate,
					frequency: freq,
					mark: bundle.mark,
					index: bundle.index
				} as perpRowType);
			} else {
				throw 'Future is not perp or dated';
			}
		});

		return [dated_futures, perps];
	}
	let datedFutureTradeRows: datedFutureRowType[] = [];
	let perpTradeRows: perpRowType[] = [];
	onMount(async () => {
		let [dated, perps] = splitByTradeIdea(propValue);
		datedFutureTradeRows = dated.sort(
			(a: datedFutureRowType, b: datedFutureRowType) =>
				Math.abs(b.apy) - Math.abs(a.apy)
		);
		perpTradeRows = perps.sort(
			(a, b) => Math.abs(b.funding_rate) - Math.abs(a.funding_rate)
		);
	});
</script>

<div class="overflow-hidden h-full w-full py-2">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr class="text-center">
				<th class="bg-secondary">Market</th>
				{#if perp_or_dated == 'future'}
					<th class="bg-secondary">Apy</th>
					<th class="bg-secondary">Δ</th>
				{:else if perp_or_dated == 'perpetual'}
					<th class="bg-secondary">Funding rate</th>
					<th class="bg-secondary">frequency</th>
				{/if}
				<th class="bg-secondary">Future price</th>
				<th class="bg-secondary">Spot price</th>
				<th class="bg-secondary">Trade Info</th>
			</tr>
		</thead>
		<!-- head -->
		{#if perp_or_dated == 'future'}
			{#each datedFutureTradeRows as row}
				<DatedFutureRow row_info={row} />
			{/each}
		{:else if perp_or_dated == 'perpetual'}
			{#each perpTradeRows as row}
				<PerpRow row_info={row} />
			{/each}
		{/if}
	</table>
</div>
