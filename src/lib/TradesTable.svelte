<script lang="ts">
	import type {
		datedFutureRowType,
		futureType,
		FutureWithSpot,
		perpRowType
	} from 'src/app';
	import { onMount } from 'svelte';
	import PerpRow from './PerpRow.svelte';
	import DatedFutureRow from './DatedFutureRow.svelte';
	import FtxLogo from '/static/ftx.svg';

	export let propValue: FutureWithSpot[];
	export let perp_or_dated: futureType;

	function calc_apy(bundle: FutureWithSpot): [number, number] {
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
			return [price_percent_change, apy];
		} else {
			throw 'Not an dated future or expiry did not exist';
		}
	}

	function set_trade_info(bundle: FutureWithSpot): string {
		return 'fdsfsd';
	}

	function splitByTradeIdea(
		bundles: FutureWithSpot[]
	): [datedFutureRowType[], perpRowType[]] {
		let dated_futures: datedFutureRowType[] = [];
		let perps: perpRowType[] = [];
		Array.from(bundles).forEach((bundle) => {
			const fut = bundle.future;
			const spot = bundle.spot;

			if (fut.type == 'future') {
				const [delta, apy] = calc_apy(bundle);
				dated_futures.push({
					exchange: fut.exchange,
					name: fut.name,
					expiry: fut.expiry,
					apy: apy,
					fut_price: fut.price,
					spot_price: spot.price,
					delta: delta,
					trade_setup_info: set_trade_info(bundle)
				} as datedFutureRowType);
			} else if (fut.type == 'perpetual') {
				let freq = 'hourly';
				switch (fut.exchange) {
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
					exchange: fut.exchange,
					name: fut.name,
					funding_rate: fut.funding_rate,
					frequency: freq,
					fut_price: fut.price,
					spot_price: spot.price,
					trade_setup_info: set_trade_info(bundle)
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
			(a: rowType, b: rowType) => Math.abs(a.apy) < Math.abs(b.apy)
		);
		perpTradeRows = perps.sort(
			(a, b) => Math.abs(a.funding_rate) < Math.abs(b.funding_rate)
		);
	});
</script>

<div class="overflow-hidden h-full w-full">
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
