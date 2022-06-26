<script lang="ts">
	import type {
		datedFutureRowType,
		futureType,
		FutureWithSpot,
		perpRowType
	} from 'src/app';
	import { onMount } from 'svelte';
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
		console.log(bundles);
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
					case 'binance':
						freq = '8 hours';
					case 'bybit':
						freq = '8 hours';
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
				console.log(bundle);
				throw 'Future is not perp or dated';
			}
		});

		return [dated_futures, perps];
	}
	let datedFutureTradeRows: datedFutureRowType[] = [];
	let perpTradeRows: perpRowType[] = [];
	onMount(async () => {
		[datedFutureTradeRows, perpTradeRows] = splitByTradeIdea(propValue);
		// .sort((a: rowType, b: rowType) => a.apy < b.apy);
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
				{:else if perp_or_dated == 'perpetual'}
					<th class="bg-secondary">Funding rate</th>
				{/if}
				<th class="bg-secondary">Future price</th>
				<th class="bg-secondary">Spot price</th>
				<th class="bg-secondary">Δ</th>
				<th class="bg-secondary">Trade Info</th>
			</tr>
		</thead>
		{#each datedFutureTradeRows as row}
			<tbody class="border-b">
				<tr class="text-center">
					<td>
						<div class="flex pl-3 space-x-3">
							<div class="w-5">
								{#if row.exchange == 'ftx'}
									<FtxLogo />
								{:else if row.exchange == 'binance'}
									<p>fdafsd</p>
								{:else if row.exchange == 'bybit'}
									<p>fdafsd</p>
								{/if}
							</div>
							<div class="items-center">
								<div class="font-bold">{row.name}</div>
							</div>
						</div>
					</td>
					<td>{parseFloat(row.apy.toFixed(5))}</td>
					<td>{row.fut_price}</td>
					<td>{row.spot_price}</td>
					<td>{parseFloat(row.delta.toFixed(5))}</td>
					<div class="container py-3">
						<label for="my-modal-4" class="btn btn-sm btn-outline modal-button"
							>Details</label
						>
						<input type="checkbox" id="my-modal-4" class="modal-toggle" />
						<label for="my-modal-4" class="modal cursor-pointer">
							<label class="modal-box relative" for="">
								<h3 class="text-lg font-bold">
									Congratulations random Interner user!
								</h3>
								<p class="py-4">
									You've been selected for a chance to get one year of
									subscription to use Wikipedia for free!
								</p>
							</label>
						</label>
					</div>
				</tr>
				<!-- row 1 -->
			</tbody>
		{/each}
	</table>
</div>
