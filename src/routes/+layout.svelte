<script lang="ts">
	import '../app.postcss';

	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	//
	import {
		type DApp,
		type AuthData,
		type ProxyAccount,
		type Delegation,
		type AppStoreApp,
		DynamicAccess
	} from '$lib/ProxyAccount';
	import { saveState, loadState } from '$lib/db';


	const dapps = writable<DApp[]>();
	const authDatas = writable<AuthData[]>();
	const proxies = writable<ProxyAccount[]>();
	const appStoreApps = writable<AppStoreApp[]>();
	const dynamicAccess = writable<DynamicAccess>();

	dapps.set([]);
	authDatas.set([]);
	proxies.set([]);
	appStoreApps.set([]);
	dynamicAccess.set(new DynamicAccess(''));
	onMount(async () => {
		const loadedAppData = await loadState();
		dapps.set(loadedAppData.dapps);
		authDatas.set(loadedAppData.authDatas);
		proxies.set(loadedAppData.proxyAccounts);
		appStoreApps.set(loadedAppData.appStoreApps);
		dynamicAccess.set(loadedAppData.dynamicAccess);
	});
	setContext('dapps', dapps);
	setContext('authDatas', authDatas);
	setContext('proxies', proxies);
	setContext('appStoreApps', appStoreApps);
	setContext('dynamicAccess', dynamicAccess);
</script>

<slot />
