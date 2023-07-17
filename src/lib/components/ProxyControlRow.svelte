<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import AppStoreTab from './tabs/AppStoreTab.svelte';
	export let proxy: ProxyAccount;

	export let selectedProxyId: string;
</script>

<div
	on:click={() => {
		selectedProxyId = proxy.uid;
	}}
>
	<h1 class="text-xs mr-auto">{`${proxy.status}: ${proxy.uid.substring(0, 16)}...`}</h1>
</div>
