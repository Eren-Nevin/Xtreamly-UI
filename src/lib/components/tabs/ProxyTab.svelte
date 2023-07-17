<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import type { Writable } from 'svelte/store';
	import ProxyControlRow from '../ProxyControlRow.svelte';
	import ProxyDetail from '../ProxyTab/ProxyDetail.svelte';
	import { Icon } from 'svelte-awesome';
	import { faArrowsRotate, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

	export let proxies: Writable<ProxyAccount[]>;

	let selectedProxyId = '';

	$: runningProxies = $proxies.filter((pr) => pr.status === 'Running');
	$: pausedProxies = $proxies.filter((pr) => pr.status === 'Paused');
	$: stoppedProxies = $proxies.filter((pr) => pr.status === 'Stopped');
</script>

<div class="w-full flex flex-col items-start px-4 gap-3">
	{#if selectedProxyId}
		<ProxyDetail bind:selectedProxyId />
	{:else}
        <div class="w-full mt-2"></div>
		{#if runningProxies.length !== 0}
			<h2 class="text-md font-semibold">Running:</h2>
			{#each runningProxies as proxy}
				<div class="w-full flex flex-row h-8">
					<ProxyControlRow proxyId={proxy.uid} bind:selectedProxyId />
				</div>
			{/each}
		{/if}
			<h2 class="text-md font-semibold">Paused</h2>
		{#if pausedProxies.length !== 0}
			{#each pausedProxies as proxy}
				<div class="w-full flex flex-row h-8">
					<ProxyControlRow proxyId={proxy.uid} bind:selectedProxyId />
				</div>
			{/each}
		{/if}
			<h2 class="text-md font-semibold">Stopped</h2>
		{#if stoppedProxies.length !== 0}
			{#each stoppedProxies as proxy}
				<div class="w-full flex flex-row h-8">
					<ProxyControlRow proxyId={proxy.uid} bind:selectedProxyId />
				</div>
			{/each}
		{/if}
		<div class="w-full flex flex-row px-2 items-center">
			<button class="btn btn-primary btn-sm ml-auto" on:click={() => {}}>New</button>
		</div>
        <div class="w-full my-2"></div>
	{/if}
</div>
