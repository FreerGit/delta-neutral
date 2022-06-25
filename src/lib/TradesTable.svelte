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
		console.log(propValue);
		allTradeRows = splitByTradeIdea(propValue);
	});
</script>

<div class="overflow-hidden h-full w-full">
	{#each allTradeRows as row}
		<table class="table w-full ">
			<!-- head -->
			<thead>
				<tr>
					<th>Name</th>
					<th>Job</th>
					<th>Favorite Color</th>
					<th />
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-5">
									<FtxLogo />
								</div>
							</div>
							<div>
								<div class="font-bold">Hart Hagerty</div>
								<div class="text-sm opacity-50">United States</div>
							</div>
						</div>
					</td>
					<td>
						Zemlak, Daniel and Leannon
						<br />
						<span class="badge badge-ghost badge-sm"
							>Desktop Support Technician</span
						>
					</td>
					<td>Purple</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
				<!-- row 1 -->
			</tbody>
		</table>
	{/each}
</div>
