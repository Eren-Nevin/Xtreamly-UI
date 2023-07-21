<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import {
		faArrowsRotate,
		faChevronLeft,
		faPause,
		faStop
	} from '@fortawesome/free-solid-svg-icons';

	import { getContext } from 'svelte';
	import { Icon } from 'svelte-awesome';
	import type { Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');

	export let selectedProxyId: string;

	type ProxyState = 'Running' | 'Paused' | 'Stopped' | 'Undefined';

	const statesMap = new Map<string, ProxyState>();

	$: proxy = $proxies.find((e) => e.uid == selectedProxyId);

	const getProxyState = (proxy?: ProxyAccount): ProxyState => {
		if (!proxy) {
			return 'Undefined';
		}
		if (['Running', 'Paused', 'Stopped'].includes(proxy.status)) {
			return proxy.status as ProxyState;
		} else {
			return 'Undefined';
		}
	};

	const getDelegations = (proxy: ProxyAccount) => {};

	const getTokenBalances = (proxy: ProxyAccount) => {};

	const getEthBalance = (proxy: ProxyAccount) => {};

	let proxyState: ProxyState;

	$: proxyState = getProxyState(proxy) ?? 'Undefined';

    // TODO: Add button to retreive chain addresses and mnemonica 
</script>

{#if selectedProxyId && proxy}
	<div
		transition:fly={{ duration: 200, x: '50vw', opacity: 0.5 }}
		class="w-full flex flex-col items-start px-2"
	>
		<div class="w-full flex flex-row justify-start my-4">
			<button
				class="btn btn-xs text-blue-400 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
				on:click={() => {
					selectedProxyId = '';
				}}
			>
				<Icon data={faChevronLeft} />
				Back
			</button>
		</div>
		<div class="flex flex-row items-center gap-2">
			{#if proxyState === 'Running'}
				<Icon data={faArrowsRotate} class="text-blue-600 fa-thin" />
			{:else if proxyState === 'Paused'}
				<Icon data={faPause} class="text-blue-600" />
			{:else if proxyState === 'Stopped'}
				<Icon data={faStop} class="text-blue-600" />
			{/if}
			<h2>{proxy.status}</h2>
		</div>
		<!-- TODO: Query The Applet info -->
		{#if proxy.appId}
			<p class="text-xs font-light">
				Applet: {proxy.appId}
			</p>
		{/if}
		<div class="flex flex-row gap-2 my-2">
			<button class="btn btn-secondary font-light btn-xs">Pause</button>
			<button class="btn btn-secondary font-light btn-xs">Stop</button>
			<button class="btn btn-xs font-light bg-red-500 text-gray-100">Remove</button>
		</div>
		<div class="divider my-1" />
		<h2 class="">Delegations</h2>
		<ul class="font-light list-disc my-2">
			<!-- TODO: Get Balances And Delgations Info -->
			<!-- {#each proxy.delegations as delegation} -->
			<!-- 	<li class="text-xs font-light ml-4"> -->
			<!-- 		{`${delegation.token}: ${delegation.amount}`} -->
			<!-- 	</li> -->
			<!-- {/each} -->
		</ul>
		<button class="btn btn-secondary btn-xs font-light mt-1">Change</button>
		<div class="divider my-1" />
		<!-- TODO: Query The Applet info -->
		{#if proxy.appId}
			<!-- <button -->
			<!-- 	class="h-6 text-blue-700 text-sm ms-auto font-light normal-case p-0" -->
			<!-- 	onclick="my_modal_3.showModal()">Show Code</button -->
			<!-- > -->
			<dialog id="my_modal_3" class="modal">
				<form method="dialog" class="modal-box">
					<button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
					<h3 class="font-bold text-lg">Code</h3>
					<p
						class="border-gray-300 border rounded-md p-2 my-2 text-xs font-light whitespace-break-spaces break-words"
					>
						{proxy.code}
					</p>
				</form>
			</dialog>
		{:else}
			<!-- TODO: Send user to applet screen -->
			<button class="h-6 text-blue-700 text-sm ms-auto font-light normal-case p-0">
				Install
			</button>
		{/if}
	</div>
{/if}
