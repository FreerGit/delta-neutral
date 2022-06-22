<script lang="ts">
	import type { FuturesCoin } from 'src/app';
	async function getFutures(): Promise<[FuturesCoin]> {
		const resp = await fetch('ftx/futures.json');
		const json = await resp.json();
		console.log(JSON.stringify(json));
		return json.result;
	}
</script>

{#await getFutures()}
	<p>Loading....</p>
{:then futures}
	{#each futures as future}
		<p class="font-bold">
			{#if future.type == 'future'}
				Future data: {future.name}
			{/if}
			{#if future.type == 'perpetual'}
				Perp data: {future.name}
			{/if}
		</p>
	{/each}
{:catch error}
	<p style="">{error}</p>
{/await}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
