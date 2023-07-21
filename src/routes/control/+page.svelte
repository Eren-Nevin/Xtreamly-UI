<script lang="ts">
	import logo from '$lib/assets/download.svg';
	import TabSelector from '$lib/components/TabSelector.svelte';
	import AppletTab from '$lib/components/tabs/AppletTab.svelte';
	import DataTab from '$lib/components/tabs/DataTab.svelte';
	import ProxyTab from '$lib/components/tabs/ProxyTab.svelte';

	import type { PageData } from './$types';
	import { type ProxyAccount, type Applet, ExecutionPerscription } from '$lib/models';

	import { BackendHandler } from '$lib/backend';

	import { setContext, getContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let data: PageData;


	const proxies = writable<ProxyAccount[]>(data.proxies);
	// NOTE: This is user applets, not all available applets
	const applets = writable<Applet[]>(data.applets);
	const allApplets = writable<Applet[]>(data.allApplets);
	const executions = writable<ExecutionPerscription[]>(data.executionPerscription);


	setContext('proxies', proxies);
	setContext('applets', applets);
	setContext('allApplets', allApplets);
	setContext('executions', executions);

	let activeTab = 'App Store';

	// TODO: Make it part of state
	// let advancedAccessControl = false;
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
