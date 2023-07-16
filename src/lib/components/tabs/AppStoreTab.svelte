<script lang="ts">
	import type { AppStoreApp } from '$lib/ProxyAccount';
	import type { Writable } from 'svelte/store';
	import AppletControlRow from '../AppletControlRow.svelte';
	import AppStoreDetail from '../AppStoreTab/AppStoreDetail.svelte';
	import { getContext } from 'svelte';

	const appStoreApps = getContext<Writable<AppStoreApp[]>>('appStoreApps');

	let selectedAppId = 'app:xtreamly:456';
</script>

<div class="w-full flex flex-col items-center px-2">
	{#if selectedAppId}
		<AppStoreDetail bind:selectedAppId />
	{:else}
		{#each $appStoreApps as applet}
			<AppletControlRow app={applet} bind:selectedAppId />
		{/each}
	{/if}
</div>
