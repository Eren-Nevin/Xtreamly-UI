<script lang="ts">
	import type { Writable } from 'svelte/store';
	import ProxyControlRow from '../ProxyControlRow.svelte';
	import ProxyDetail from '../ProxyTab/ProxyDetail.svelte';

	import { type ProxyAccount, ExecutionStatus } from '$lib/models';
	import { BackendHandler } from '$lib/backend';
	import { getAuthToken } from '$lib/auth';
	import { getContext } from 'svelte';

	import { createProxy, getProxies } from '$lib/proxies';

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');

	// TODO: Retreive mnemonic by button

	let selectedProxyId = '';

	$: runningProxies = $proxies.filter((pr) => pr.status === ExecutionStatus.RUNNING);
	$: stoppedProxies = $proxies.filter((pr) => pr.status === ExecutionStatus.STOPPED);

	// TODO: Add Error Handling
	const backendHandler = new BackendHandler(getAuthToken() ?? '');

	const refreshProxyList = async () => {
		const receivedProxies = await getProxies(backendHandler);
		proxies.set(receivedProxies);
	};
</script>

<div class="w-full flex flex-col items-start px-4 gap-3">
	{#if selectedProxyId}
		<ProxyDetail bind:selectedProxyId />
	{:else}
		<div class="w-full mt-2" />
		{#if runningProxies.length !== 0}
			<div class="w-full flex flex-col gap-1">
				<h2 class="text-md font-semibold">Running:</h2>
				{#each runningProxies as proxy}
					<ProxyControlRow proxyId={proxy.uid} bind:selectedProxyId />
				{/each}
			</div>
		{/if}
		<h2 class="text-md font-semibold">Stopped</h2>
		{#if stoppedProxies.length !== 0}
			{#each stoppedProxies as proxy}
				<div class="w-full flex flex-row">
					<ProxyControlRow proxyId={proxy.uid} bind:selectedProxyId />
				</div>
			{/each}
		{/if}
		<div class="w-full flex flex-row px-2 items-center">
			<button
				class="btn btn-primary btn-sm ml-auto"
				on:click={async () => {
					await createProxy(backendHandler, 'Top Proxy');
					await refreshProxyList();
				}}>New</button
			>
			<button
				class="btn btn-primary btn-sm ml-auto"
				on:click={async () => {
					await refreshProxyList();
				}}>Get</button
			>
		</div>
		<div class="w-full my-2" />
	{/if}
</div>
