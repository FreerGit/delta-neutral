<script lang="ts">
	import type { FutureWithSpot } from 'src/app';
	import { onMount } from 'svelte';
	import FtxLogo from '/static/ftx.svg';
	interface rowType {
		// row_type: string;
		exchange: string;
		name: string;
		expiry?: string;
		apy: number;
		fut_price: number;
		spot_price: number;
		delta: number;
		trade_setup_info: string;
	}
	export let propValue: FutureWithSpot[];
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
		} else if (bundle.future.type == 'perpetual' && !bundle.future.expiry) {
			return [0, 0];
			// return n;
		} else {
			throw 'Futures contract is not of type future nor perpetual';
		}
	}
	function splitByTradeIdea(bundle: FutureWithSpot[]): rowType[] {
		const rows = bundle.map((bundle: FutureWithSpot): rowType => {
			const fut = bundle.future;
			const spot = bundle.spot;
			const [delta, apy] = calc_apy(bundle);
			if (bundle.future.type == 'future') {
				return {
					exchange: fut.exchange,
					name: fut.name,
					expiry: fut.expiry,
					apy: apy,
					fut_price: fut.price,
					spot_price: spot.price,
					delta: delta,
					trade_setup_info: 'fdsf'
				};
			} else {
				return {
					exchange: fut.exchange,
					name: fut.name,
					expiry: fut.expiry,
					apy: apy,
					fut_price: fut.price,
					spot_price: spot.price,
					delta: delta,
					trade_setup_info: 'fdsf'
				};
			}
		});
		return rows;
	}
	let allTradeRows: rowType[] = [];
	onMount(async () => {
		allTradeRows = splitByTradeIdea(propValue).sort(
			(a: rowType, b: rowType) => a.apy < b.apy
		);
	});
</script>

<div class="overflow-hidden h-full w-full">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr class="text-center">
				<th class="bg-secondary">Market</th>
				<th class="bg-secondary">apy</th>
				<th class="bg-secondary">Future price</th>
				<th class="bg-secondary">Spot price</th>
				<th class="bg-secondary">Δ</th>
				<th class="bg-secondary">Trade Info</th>
			</tr>
		</thead>
		{#each allTradeRows as row}
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
