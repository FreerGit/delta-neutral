<script lang="ts">
	import type { perpRowType } from 'src/app';
	import BinanceLogo from '/static/binance.svg';
	import BybitLogo from '/static/bybit.svg';
	export let row_info: perpRowType;
</script>

<tbody class="border-b">
	<tr class="text-center">
		<td>
			<div class="flex pl-3 space-x-3">
				<div class="flex w-5 justify-center">
					{#if row_info.exchange == 'binance'}
						<BinanceLogo />
					{:else if row_info.exchange == 'bybit'}
						<BybitLogo />
					{/if}
				</div>
				<div class="items-center">
					<div class="font-bold">{row_info.name}</div>
				</div>
			</div>
		</td>
		<td>{parseFloat((row_info.funding_rate * 100).toFixed(9))}%</td>
		<td>{row_info.frequency}</td>
		<td
			>{row_info.mark > 100
				? row_info.mark.toFixed(2)
				: row_info.mark.toFixed(5)}</td
		>
		<td
			>{row_info.index > 100
				? row_info.index.toFixed(2)
				: row_info.index.toFixed(5)}</td
		>
		<div class="container py-3">
			<label for={row_info.name} class="btn btn-sm btn-outline modal-button"
				>Details</label
			>
			<input type="checkbox" id={row_info.name} class="modal-toggle" />
			<label for={row_info.name} class="modal cursor-pointer">
				<label class="modal-box relative" for="">
					<h3 class="text-xl font-bold">How to perform this basis trade:</h3>
					{#if row_info.funding_rate < 0.0}
						<p class="">tldr: margin short spot, long the perpetual</p>
						<p class="py-4">
							Since the funding rate is negative (The futures price is less than
							the underlyings spot price) to collect funding you need to margin
							short spot and long the perpetual. Then hold that position until
							the funding rate becomes consistently positive.
						</p>
						<p class="underline">
							note that no fees or margin payments were taken into account,
							please take liquidation risk into account.
						</p>
					{:else}
						<p class="">tldr: buy spot, short the perpetual</p>
						<p class="py-4">
							Since the funding rate is positive (The futures price is greater
							than the underlyings spot price) to collect funding you need to
							buy spot and short the perpetual. Then hold that position until
							the funding rate becomes consistently negative.
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
	<!-- row 1 -->
</tbody>
