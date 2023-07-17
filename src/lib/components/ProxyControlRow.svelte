<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import { faPause, faStop } from '@fortawesome/free-solid-svg-icons';
	import { getContext } from 'svelte';
	import { Icon } from 'svelte-awesome';
	import type { Writable } from 'svelte/store';

	export let selectedProxyId: string;
	export let proxyId: string;

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');

	$: proxy = $proxies.find((e) => e.uid == proxyId);
</script>

{#if proxy}
	{#if proxy.status === 'Running'}
		<div
			class="w-full flex flex-row"
			on:click={() => {
				selectedProxyId = proxy.uid;
			}}
		>
            <div class="flex flex-col">
            <h1 class="text-sm mr-auto">{`${proxy.name}`}</h1>
			<h3 class="text-xs mr-auto">{`${proxy.uid.slice(0, 16)}...`}</h3>
            </div>
			<div class="flex flex-row ml-auto gap-2">
				<button class="btn btn-xs bg-base-100" on:click|stopPropagation={() => {}}>
					<Icon data={faPause} class="text-blue-600 fa-thin" />
				</button>
				<button class="btn btn-xs bg-base-100" on:click|stopPropagation={() => {}}>
					<Icon data={faStop} class="text-blue-600 fa-thin" />
				</button>
			</div>
		</div>
	{/if}
{/if}
