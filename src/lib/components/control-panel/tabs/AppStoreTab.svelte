<script lang="ts">
	import type { AppStoreApp } from '$lib/ProxyAccount';
	import type { Writable } from 'svelte/store';
	import AppletControlRow from '../AppletControlRow.svelte';
	import AppStoreDetail from '../AppStoreTab/AppStoreDetail.svelte';

	export let appStoreApps: Writable<AppStoreApp[]>;

	let selectedAppId = '1';
</script>

<div class="w-full flex flex-col items-center px-2">
	{#if selectedAppId}
		<AppStoreDetail {selectedAppId}/>
	{:else}
		{#each $appStoreApps as applet}
			<AppletControlRow app={applet} />
		{/each}
	{/if}
</div>
