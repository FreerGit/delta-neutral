<script lang="ts">
	import type { perpRowType } from 'src/app';
	import FtxLogo from '/static/ftx.svg';
	export let row_info: perpRowType;
</script>

<tbody class="border-b">
	<tr class="text-center">
		<td>
			<div class="flex pl-3 space-x-3">
				<div class="w-5">
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
		<td>{parseFloat(row_info.funding_rate.toFixed(9))}</td>
		<td>{row_info.frequency}</td>
		<td>{row_info.fut_price}</td>
		<td>{row_info.spot_price}</td>
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
						You've been selected for a chance to get one year of subscription to
						use Wikipedia for free!
					</p>
				</label>
			</label>
		</div>
	</tr>
	<!-- row 1 -->
</tbody>
