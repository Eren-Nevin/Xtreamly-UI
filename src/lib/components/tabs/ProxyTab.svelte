<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import type { Writable } from 'svelte/store';
	import ProxyControlRow from '../ProxyControlRow.svelte';
	import ProxyDetail from '../ProxyTab/ProxyDetail.svelte';

	export let proxies: Writable<ProxyAccount[]>;

	let selectedProxyId = '';
</script>

<div class="w-full flex flex-col items-center px-2">
	{#if selectedProxyId}
		<ProxyDetail bind:selectedProxyId />
	{:else}
		<div class="w-full flex flex-row px-2 items-center">
			<h2 class="text-md font-semibold">Proxy Accounts</h2>
			<button class="btn btn-primary btn-sm ml-auto" on:click={() => {}}>New</button>
		</div>
		{#each $proxies as proxy}
			<ProxyControlRow bind:proxy bind:selectedProxyId />
		{/each}
	{/if}
</div>
