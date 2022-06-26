<script lang="ts">
	import type { datedFutureRowType } from 'src/app';
	import FtxLogo from '/static/ftx.svg';
	export let row_info: datedFutureRowType;
</script>

<tbody class="border-b">
	<tr class="text-center">
		<td>
			<div class="flex pl-3 space-x-3">
				<div class="flex w-5 justify-center">
					{#if row_info.exchange == 'ftx'}
						<FtxLogo />
					{:else if row_info.exchange == 'binance'}
						<p>fdafsd</p>
					{:else if row_info.exchange == 'bybit'}
						<p>fdafsd</p>
					{/if}
				</div>
				<div class="items-center">
					<div class="font-bold">{row_info.name}</div>
				</div>
			</div>
		</td>
		<td>{Math.abs(parseFloat(row_info.apy.toFixed(5)))}</td>
		<td>{parseFloat(row_info.delta.toFixed(5))}</td>
		<td>{row_info.fut_price}</td>
		<td>{row_info.spot_price}</td>
		<div class="container py-3">
			<label for={row_info.name} class="btn btn-sm btn-outline modal-button"
				>Details</label
			>
			<input type="checkbox" id={row_info.name} class="modal-toggle" />
			<label for={row_info.name} class="modal cursor-pointer">
				<label class="modal-box relative" for="">
					<h3 class="text-xl font-bold">How to perform this basis trade:</h3>
					{#if row_info.delta < 0.0}
						<p class="">tldr: short spot/perp, long the future</p>
						<p class="py-4">
							Since Delta is negative (The futures price is less than the
							underlyings spot price) to capture the spread you need to margin
							short spot or short perp and long the future. Then hold that
							position until either maturity or the two prices converge.
						</p>
						<p class="underline">
							note that no fees or margin payments were taken into account,
							please take liquidation risk into account.
						</p>
					{:else}
						<p class="">tldr: buy spot, short the future</p>
						<p class="py-4">
							Since Delta is positive (The futures price is greater than the
							underlyings spot price) to capture the spread you need to buy spot
							and short the future. Then hold that position until either
							maturity or the two prices converge.
						</p>
						<p class="underline">
							note that no fees or margin payments were taken into account,
							please take liquidation risk into account.
						</p>
					{/if}
				</label>
			</label>
		</div>
	</tr>
</tbody>
