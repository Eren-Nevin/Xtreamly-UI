<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { ProxyAccount, Applet } from '$lib/models';

	let activeTab = 'App Store';

	import logo from '$lib/assets/download.svg';
	import TabSelector from '$lib/components/TabSelector.svelte';
	import AppletTab from '$lib/components/tabs/AppletTab.svelte';
	import DataTab from '$lib/components/tabs/DataTab.svelte';
	import ProxyTab from '$lib/components/tabs/ProxyTab.svelte';

	// TODO: Make it part of state
	let advancedAccessControl = false;
</script>

<TabSelector bind:activeTab />
<div class="w-auto flex flex-col items-center py-2">
	{#if activeTab === 'App Store'}
		<AppletTab />
	{:else if activeTab === 'Data'}
		<!-- <DataTab {authDatas} {dynamicAccess} /> -->
	{:else}
		<ProxyTab />
	{/if}
</div>
