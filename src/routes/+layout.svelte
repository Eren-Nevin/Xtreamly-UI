<script lang="ts">
	import '../app.postcss';

	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import type {
		ProxyAccount,
		Applet,
	} from '$lib/models';;

	const proxies = writable<ProxyAccount[]>();
	const applets = writable<Applet[]>();

	proxies.set([]);
	applets.set([]);


    setContext('applets', applets);
    setContext('proxies', proxies);
</script>

<slot />

