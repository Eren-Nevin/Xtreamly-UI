<script lang="ts">
	import { Applet, AppletVisibility } from '$lib/models';
	import type { Writable } from 'svelte/store';
	import AppletControlRow from '../AppletControlRow.svelte';
	import AppStoreDetail from '../AppStoreTab/AppStoreDetail.svelte';
	import { getContext } from 'svelte';
	import { BackendHandler } from '$lib/backend';
	import { getAuthToken } from '$lib/auth';

	import { publishApplet, getAllApplets, getMyApplets } from '$lib/applets';

	const applets = getContext<Writable<Applet[]>>('applets');
	const allApplets = getContext<Writable<Applet[]>>('allApplets');

	let selectedAppId = '';

	const backendHandler = new BackendHandler(getAuthToken() ?? '');
</script>

<div class="w-full flex flex-col items-center px-2">
	{#if selectedAppId}
		<AppStoreDetail bind:selectedAppId />
	{:else}
		<button
			class="btn btn-sm btn-primary"
			on:click={async () => {
				const newApplet = await publishApplet(
					backendHandler,
					'Top Applet',
					'a = 3;',
					'Some Developer',
					'https://google.com',
					'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/EmacsIcon.svg/1024px-EmacsIcon.svg.png',
					'desc',
					'short_desc',
					'4.3',
					'no_updates',
					'install_notes_here',
					'uninstall_notes_here',
					AppletVisibility.PRIVATE
				);

				applets.update((state) => {
					return [...state, newApplet];
				});
			}}>Add</button
		>
		<button
			class="btn btn-sm btn-primary"
			on:click={async () => {
				const res = await getAllApplets(backendHandler);
				console.log(res);
			}}
		>
			Get
		</button>
		<button
			class="btn btn-sm btn-primary"
			on:click={async () => {
				const res = await getMyApplets(backendHandler);
				console.log(res);
			}}
		>
			Get Mine
		</button>
        <div class="w-full flex flex-col">
        <h3>All Applets</h3>
		{#each $applets as applet}
			<AppletControlRow app={applet} bind:selectedAppId />
		{/each}
        </div>
        <div class="w-full flex flex-col">
        <h3>My Applets</h3>
		{#each $applets as applet}
			<AppletControlRow app={applet} bind:selectedAppId />
		{/each}
        </div>
	{/if}
</div>
