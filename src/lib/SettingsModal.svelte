<script lang="ts">
	import { global_settings } from '$lib/stores/settings';
</script>

<div class="flex">
	<label
		for="settings"
		class="btn btn-sm btn-outline btn-secondary modal-button">Settings</label
	>
	<input type="checkbox" id="settings" class="modal-toggle" />
	<label for="settings" class="modal cursor-pointer">
		<label class="modal-box relative max-w-xl" for="">
			<h3 class="text-xl font-bold text-center">Settings</h3>
			<div class="grid pt-6 justify-center">
				<p class="text-center pb-2">
					refresh rate: {$global_settings.refresh_rate}m
				</p>
				<input
					type="range"
					min="1"
					max="60"
					bind:value={$global_settings.refresh_rate}
					class="range range-secondary range-xs"
				/>
			</div>
			<!-- FTX -->
			<div>
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">Data from FTX:</span>
						<input
							type="checkbox"
							class="checkbox checkbox-secondary"
							bind:checked={$global_settings.exchanges.ftx}
						/>
					</label>
				</div>
			</div>
			<!-- BYBIT -->
			<div>
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">Data from Bybit:</span>
						<input
							type="checkbox"
							class="checkbox checkbox-secondary"
							bind:checked={$global_settings.exchanges.bybit}
						/>
					</label>
				</div>
			</div>
			<!-- BINANCE -->
			<div>
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">Data from Binance:</span>
						<input
							type="checkbox"
							class="checkbox checkbox-secondary"
							bind:checked={$global_settings.exchanges.binance}
						/>
					</label>
				</div>
			</div>
			<!-- PERP OR DATED -->
			<label class="cursor-pointer label">
				<span class="label-text">Dated Futures (Basis trade)</span>
				<input
					type="radio"
					name="radio-3"
					class="radio radio-secondary"
					bind:group={$global_settings.type}
					value={'future'}
					checked
				/>
			</label>
			<label class="cursor-pointer label">
				<span class="label-text">Perpetuals (Collect funding)</span>
				<input
					type="radio"
					name="radio-3"
					class="radio radio-secondary"
					bind:group={$global_settings.type}
					value={'perpetual'}
				/>
			</label>
		</label>
	</label>
</div>

<!-- - [ ] Settings
  - [ ] Size of list
  - [ ] Refresh rate
  - [ ] auto refresh on/off
  - [ ] exchange list
  - [ ] show all the same pair from all exchanges or best one
  - [ ] persist storage between page visits (sessionStorage or smth) -->
