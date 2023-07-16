<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
		import type {
		ProxyAccount,
		AuthData,
		Delegation,
		DApp,
		DynamicAccess,
		AppStoreApp
	} from '$lib/ProxyAccount';;

	const dapps = getContext<Writable<DApp[]>>('dapps');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const appStoreApps = getContext<Writable<AppStoreApp[]>>('appStoreApps');
	const dynamicAccess = getContext<Writable<DynamicAccess>>('dynamicAccess');

	let activeTab = 'App Store';

	import logo from '$lib/assets/download.svg';
	import TabSelector from '$lib/components/control-panel/TabSelector.svelte';
	import AppStoreTab from '$lib/components/control-panel/tabs/AppStoreTab.svelte';
	import DataTab from '$lib/components/control-panel/tabs/DataTab.svelte';
	import ProxyTab from '$lib/components/control-panel/tabs/ProxyTab.svelte';

    // TODO: Make it part of state
	let advancedAccessControl = false;
</script>

<TabSelector {activeTab} />
<div class="w-auto flex flex-col items-center py-2">
	{#if activeTab === 'App Store'}
		<AppStoreTab {appStoreApps} />
	{:else if activeTab === 'Data'}
		<DataTab {authDatas} {dynamicAccess} />
	{:else}
		<ProxyTab {proxies} />
	{/if}
</div>
