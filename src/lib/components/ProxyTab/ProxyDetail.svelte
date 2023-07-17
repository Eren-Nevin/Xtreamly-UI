<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
	import { getContext } from 'svelte';
	import { Icon } from 'svelte-awesome';
	import type { Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');

	export let selectedProxyId: string;

	$: proxy = $proxies.find((e) => e.uid == selectedProxyId);
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
        <h2> {proxy.status} </h2>
		<p class="text-sm font-light">
			Program: {proxy.program}
		</p>
		<div class="divider my-1" />
		<p class="text-sm font-light">Delegations:</p>
		<ul class="font-light list-disc">
			{#each proxy.delegations as delegation}
				<li class="text-xs font-light ml-4">
					{`${delegation.token}: ${delegation.amount}`}
				</li>
			{/each}
		</ul>
		<button class="btn btn-secondary btn-xs mt-1">Change Delegations</button>
		<div class="divider my-1" />
		<button class="btn btn-secondary btn-xs">Pause</button>
		<button class="btn btn-secondary btn-xs">Stop</button>
		<button class="btn btn-error btn-xs">Remove</button>
		<div class="divider my-1" />
		{#if proxy.code}
			<p class="text-sm font-light">Code:</p>
			<textarea
				class="w-64 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
				bind:value={proxy.code}
			/>
		{/if}
	</div>
{/if}
